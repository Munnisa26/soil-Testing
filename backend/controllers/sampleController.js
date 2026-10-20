const { v4: uuidv4 } = require('uuid');
const { supabaseAdmin } = require('../config/supabase');

const generateRequestId = () => {
  const prefix = 'ST';
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${date}-${random}`;
};

exports.createSample = async (req, res) => {
  try {
    const {
      soil_type,
      test_type,
      sample_location,
      land_area,
      crop_name,
      collection_date,
      additional_notes
    } = req.body;

    const sampleId = uuidv4();
    const requestId = generateRequestId();

    const { data: sample, error } = await supabaseAdmin
      .from('soil_samples')
      .insert([{
        id: sampleId,
        request_id: requestId,
        user_id: req.user.id,
        soil_type,
        test_type,
        sample_location,
        land_area: land_area || null,
        crop_name: crop_name || null,
        collection_date: collection_date || new Date().toISOString().slice(0, 10),
        additional_notes: additional_notes || null,
        status: 'Pending',
        document_url: req.file ? `/uploads/${req.file.filename}` : null
      }])
      .select('*')
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Failed to create soil sample request.' });
    }

    // Create notification
    await supabaseAdmin.from('notifications').insert([{
      id: uuidv4(),
      user_id: req.user.id,
      title: 'Soil Test Request Submitted',
      message: `Your soil test request ${requestId} has been submitted successfully and is pending review.`,
      type: 'info',
      is_read: false
    }]);

    res.status(201).json({
      success: true,
      message: 'Soil test request submitted successfully!',
      sample
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getMySamples = async (req, res) => {
  try {
    const { status, search, sort = 'created_at', order = 'desc' } = req.query;
    let query = supabaseAdmin
      .from('soil_samples')
      .select('*')
      .eq('user_id', req.user.id);

    if (status) query = query.eq('status', status);
    if (search) {
      query = query.or(`request_id.ilike.%${search}%,sample_location.ilike.%${search}%,crop_name.ilike.%${search}%`);
    }

    query = query.order(sort, { ascending: order === 'asc' });

    const { data, error } = await query;
    if (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch samples.' });
    }

    res.json({ success: true, samples: data || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getSampleById = async (req, res) => {
  try {
    const { id } = req.params;
    let query = supabaseAdmin
      .from('soil_samples')
      .select('*')
      .eq('id', id);

    // Non-admins can only see their own
    if (req.user.role !== 'admin') {
      query = query.eq('user_id', req.user.id);
    }

    const { data: sample, error } = await query.single();
    if (error || !sample) {
      return res.status(404).json({ success: false, message: 'Sample not found.' });
    }

    res.json({ success: true, sample });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.updateSample = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    delete updates.id;
    delete updates.user_id;
    delete updates.request_id;

    // Only owner or admin
    const { data: existing } = await supabaseAdmin
      .from('soil_samples')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Sample not found.' });
    }

    if (req.user.role !== 'admin' && existing.user_id !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    // Users can only update limited fields if status is Pending
    if (req.user.role !== 'admin') {
      const allowed = ['additional_notes', 'crop_name', 'land_area'];
      Object.keys(updates).forEach(k => {
        if (!allowed.includes(k) && k !== 'updated_at') delete updates[k];
      });
    }

    const { data: sample, error } = await supabaseAdmin
      .from('soil_samples')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: 'Failed to update sample.' });
    }

    res.json({ success: true, message: 'Sample updated.', sample });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.deleteSample = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: existing } = await supabaseAdmin
      .from('soil_samples')
      .select('user_id, status')
      .eq('id', id)
      .single();

    if (!existing) {
      return res.status(404).json({ success: false, message: 'Sample not found.' });
    }

    if (req.user.role !== 'admin' && existing.user_id !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    // Only allow delete if Pending or by admin
    if (req.user.role !== 'admin' && existing.status !== 'Pending') {
      return res.status(400).json({ success: false, message: 'Cannot delete sample that is already being processed.' });
    }

    await supabaseAdmin.from('soil_samples').delete().eq('id', id);
    res.json({ success: true, message: 'Sample deleted successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: samples } = await supabaseAdmin
      .from('soil_samples')
      .select('id, status')
      .eq('user_id', userId);

    const total = samples?.length || 0;
    const pending = samples?.filter(s => s.status === 'Pending' || s.status === 'Sample Received').length || 0;
    const inProgress = samples?.filter(s => s.status === 'Testing').length || 0;
    const completed = samples?.filter(s => s.status === 'Completed' || s.status === 'Report Available').length || 0;

    // Recent reports
    const { data: reports } = await supabaseAdmin
      .from('reports')
      .select('id, report_id, sample_id, generated_at, status')
      .eq('user_id', userId)
      .order('generated_at', { ascending: false })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalSamples: total,
        testingRequests: total,
        completedTests: completed,
        pendingTests: pending + inProgress,
        recentReports: reports || []
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
