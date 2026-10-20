const bcrypt = require('bcryptjs');
const { supabaseAdmin } = require('../config/supabase');

exports.getProfile = async (req, res) => {
  try {
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, full_name, email, mobile, location, user_type, role, created_at, updated_at')
      .eq('id', req.user.id)
      .single();

    if (error || !user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { full_name, mobile, location, user_type } = req.body;
    const updates = {};
    if (full_name) updates.full_name = full_name;
    if (mobile) updates.mobile = mobile;
    if (location !== undefined) updates.location = location;
    if (user_type) updates.user_type = user_type;
    updates.updated_at = new Date().toISOString();

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('id', req.user.id)
      .select('id, full_name, email, mobile, location, user_type, role, created_at, updated_at')
      .single();

    if (error) {
      return res.status(500).json({ success: false, message: 'Failed to update profile.' });
    }

    res.json({ success: true, message: 'Profile updated successfully.', user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { current_password, new_password } = req.body;

    const { data: user } = await supabaseAdmin
      .from('users')
      .select('password')
      .eq('id', req.user.id)
      .single();

    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
    }

    const salt = await bcrypt.genSalt(12);
    const hashed = await bcrypt.hash(new_password, salt);

    await supabaseAdmin
      .from('users')
      .update({ password: hashed, updated_at: new Date().toISOString() })
      .eq('id', req.user.id);

    res.json({ success: true, message: 'Password changed successfully.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
