const { supabaseAdmin } = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');

exports.getStats = async (req, res) => {
  try {
    const [
      { count: totalUsers },
      { count: totalSamples },
      { data: samples }
    ] = await Promise.all([
      supabaseAdmin.from('users').select('*', { count: 'exact', head: true }).eq('role', 'user'),
      supabaseAdmin.from('soil_samples').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('soil_samples').select('status')
    ]);

    const pending = samples?.filter(s => s.status === 'Pending').length || 0;
    const inProgress = samples?.filter(s => ['Sample Received', 'Testing'].includes(s.status)).length || 0;
    const completed = samples?.filter(s => ['Completed', 'Report Available'].includes(s.status)).length || 0;

    const { count: reportsGenerated } = await supabaseAdmin
      .from('reports')
      .select('*', { count: 'exact', head: true });

    res.json({
      success: true,
      stats: {
        totalUsers: totalUsers || 0,
        totalSoilSamples: totalSamples || 0,
        pendingRequests: pending,
        testsInProgress: inProgress,
        completedTests: completed,
        reportsGenerated: reportsGenerated || 0
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = supabaseAdmin
      .from('users')
      .select('id, full_name, email, mobile, location, user_type, role, is_active, created_at')
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ success: false, message: 'Failed to fetch users.' });
    res.json({ success: true, users: data || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ is_active, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('id, full_name, email, is_active')
      .single();

    if (error) return res.status(500).json({ success: false, message: 'Failed to update user.' });
    res.json({ success: true, message: 'User status updated.', user: data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getAllSamples = async (req, res) => {
  try {
    const { status, search, sort = 'created_at', order = 'desc' } = req.query;
    let query = supabaseAdmin
      .from('soil_samples')
      .select('*, users(full_name, email, mobile)')
      .order(sort, { ascending: order === 'asc' });

    if (status) query = query.eq('status', status);
    if (search) {
      query = query.or(`request_id.ilike.%${search}%,sample_location.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ success: false, message: 'Failed to fetch samples.' });
    res.json({ success: true, samples: data || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.updateSampleStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Pending', 'Sample Received', 'Testing', 'Completed', 'Report Available'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const { data: sample, error } = await supabaseAdmin
      .from('soil_samples')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select('*, users(id)')
      .single();

    if (error) return res.status(500).json({ success: false, message: 'Failed to update status.' });

    // Notify user
    if (sample?.users?.id) {
      await supabaseAdmin.from('notifications').insert([{
        id: uuidv4(),
        user_id: sample.users.id,
        title: 'Status Update',
        message: `Your soil sample ${sample.request_id} status has been updated to: ${status}`,
        type: 'info',
        is_read: false
      }]);
    }

    res.json({ success: true, message: 'Status updated.', sample });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getContactMessages = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
    res.json({ success: true, messages: data || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.markMessageRead = async (req, res) => {
  try {
    const { id } = req.params;
    await supabaseAdmin
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id);
    res.json({ success: true, message: 'Marked as read.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
