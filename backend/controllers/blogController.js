const { v4: uuidv4 } = require('uuid');
const { supabaseAdmin } = require('../config/supabase');

exports.getAllPosts = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) return res.status(500).json({ success: false, message: 'Failed to fetch posts.' });
    res.json({ success: true, posts: data || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return res.status(404).json({ success: false, message: 'Post not found.' });
    res.json({ success: true, post: data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, excerpt, category, image_url } = req.body;
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .insert([{
        id: uuidv4(),
        title,
        content,
        excerpt: excerpt || content?.substring(0, 150),
        category: category || 'General',
        image_url: image_url || null,
        author_id: req.user.id,
        is_published: true
      }])
      .select('*')
      .single();

    if (error) return res.status(500).json({ success: false, message: 'Failed to create post.' });
    res.status(201).json({ success: true, post: data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select('*')
      .single();

    if (error) return res.status(500).json({ success: false, message: 'Failed to update post.' });
    res.json({ success: true, post: data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await supabaseAdmin.from('blog_posts').delete().eq('id', id);
    res.json({ success: true, message: 'Post deleted.' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};
