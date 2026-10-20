import React, { useEffect, useState } from 'react';
import { getBlogPosts, createBlogPost, deleteBlogPost } from '../../services/api';
import { toast } from 'react-toastify';

const AdminBlog = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', category: 'General' });
  const [loading, setLoading] = useState(true);

  const load = () => {
    getBlogPosts()
      .then((res) => setPosts(res.data.posts || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createBlogPost(form);
      toast.success('Post created');
      setForm({ title: '', content: '', excerpt: '', category: 'General' });
      load();
    } catch {
      toast.error('Failed to create post');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await deleteBlogPost(id);
      toast.success('Deleted');
      load();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Manage Blog</h2>
      <div className="card-custom p-4 mb-4">
        <h5>New Post</h5>
        <form onSubmit={handleCreate}>
          <div className="mb-2">
            <input className="form-control form-control-custom" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="mb-2">
            <input className="form-control form-control-custom" placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
          </div>
          <div className="mb-2">
            <textarea className="form-control form-control-custom" rows="4" placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
          </div>
          <div className="mb-2">
            <input className="form-control form-control-custom" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary-custom">Publish</button>
        </form>
      </div>
      {loading ? (
        <div className="spinner-custom mx-auto"></div>
      ) : (
        posts.map((p) => (
          <div key={p.id} className="card-custom p-3 mb-2 d-flex justify-content-between align-items-center">
            <div>
              <strong>{p.title}</strong>
              <div className="small text-muted">{p.category}</div>
            </div>
            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminBlog;
