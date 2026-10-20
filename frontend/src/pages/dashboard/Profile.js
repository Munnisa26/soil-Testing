import React, { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Profile = () => {
  const { updateUser } = useAuth();
  const [form, setForm] = useState({ full_name: '', email: '', mobile: '', location: '', user_type: 'Farmer' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getProfile()
      .then((res) => {
        const u = res.data.user;
        setForm({
          full_name: u.full_name || '',
          email: u.email || '',
          mobile: u.mobile || '',
          location: u.location || '',
          user_type: u.user_type || 'Farmer'
        });
      })
      .catch(() => toast.error('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateProfile({
        full_name: form.full_name,
        mobile: form.mobile,
        location: form.location,
        user_type: form.user_type
      });
      updateUser(res.data.user);
      toast.success('Profile updated');
    } catch {
      toast.error('Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>;

  return (
    <div>
      <h2 className="mb-4">My Profile</h2>
      <div className="card-custom p-4" style={{ maxWidth: 560 }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label form-label-custom">Full Name</label>
            <input className="form-control form-control-custom" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label form-label-custom">Email</label>
            <input className="form-control form-control-custom" value={form.email} disabled />
          </div>
          <div className="mb-3">
            <label className="form-label form-label-custom">Mobile</label>
            <input className="form-control form-control-custom" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label form-label-custom">Location</label>
            <input className="form-control form-control-custom" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label form-label-custom">User Type</label>
            <select className="form-select form-control-custom" value={form.user_type} onChange={(e) => setForm({ ...form, user_type: e.target.value })}>
              <option>Farmer</option>
              <option>Student</option>
              <option>Researcher</option>
              <option>Other</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary-custom" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
