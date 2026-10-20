const { v4: uuidv4 } = require('uuid');
const { supabaseAdmin } = require('../config/supabase');

exports.submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const { data, error } = await supabaseAdmin
      .from('contact_messages')
      .insert([{
        id: uuidv4(),
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        is_read: false
      }])
      .select('*')
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Failed to send message.' });
    }

    res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
