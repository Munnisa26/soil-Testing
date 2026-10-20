const { v4: uuidv4 } = require('uuid');
const { supabaseAdmin } = require('../config/supabase');

exports.createResult = async (req, res) => {
  try {
    const {
      sample_id,
      ph,
      nitrogen,
      phosphorus,
      potassium,
      organic_carbon,
      electrical_conductivity,
      moisture,
      salinity,
      micronutrients,
      interpretation,
      recommendations
    } = req.body;

    // Verify sample exists
    const { data: sample } = await supabaseAdmin
      .from('soil_samples')
      .select('id, user_id, status')
      .eq('id', sample_id)
      .single();

    if (!sample) {
      return res.status(404).json({ success: false, message: 'Sample not found.' });
    }

    const resultId = uuidv4();
    const { data: result, error } = await supabaseAdmin
      .from('soil_test_results')
      .insert([{
        id: resultId,
        sample_id,
        ph: ph || null,
        nitrogen: nitrogen || null,
        phosphorus: phosphorus || null,
        potassium: potassium || null,
        organic_carbon: organic_carbon || null,
        electrical_conductivity: electrical_conductivity || null,
        moisture: moisture || null,
        salinity: salinity || null,
        micronutrients: micronutrients || null,
        interpretation: interpretation || null,
        recommendations: recommendations || null,
        tested_by: req.user.id,
        test_date: new Date().toISOString()
      }])
      .select('*')
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Failed to save test results.' });
    }

    // Update sample status
    await supabaseAdmin
      .from('soil_samples')
      .update({ status: 'Completed', updated_at: new Date().toISOString() })
      .eq('id', sample_id);

    // Notify user
    await supabaseAdmin.from('notifications').insert([{
      id: uuidv4(),
      user_id: sample.user_id,
      title: 'Test Results Available',
      message: 'Your soil test results are now available. You can view and download the report.',
      type: 'success',
      is_read: false
    }]);

    res.status(201).json({ success: true, message: 'Test results saved successfully.', result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getResultBySample = async (req, res) => {
  try {
    const { sampleId } = req.params;

    // Check ownership if not admin
    if (req.user.role !== 'admin') {
      const { data: sample } = await supabaseAdmin
        .from('soil_samples')
        .select('user_id')
        .eq('id', sampleId)
        .single();

      if (!sample || sample.user_id !== req.user.id) {
        return res.status(403).json({ success: false, message: 'Not authorized.' });
      }
    }

    const { data: result, error } = await supabaseAdmin
      .from('soil_test_results')
      .select('*')
      .eq('sample_id', sampleId)
      .single();

    if (error || !result) {
      return res.status(404).json({ success: false, message: 'Results not found for this sample.' });
    }

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    delete updates.id;
    delete updates.sample_id;

    const { data: result, error } = await supabaseAdmin
      .from('soil_test_results')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: 'Failed to update results.' });
    }

    res.json({ success: true, message: 'Results updated.', result });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
