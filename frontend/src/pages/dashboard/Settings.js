import React, { useState } from 'react';
import { changePassword } from '../../services/api';
import { toast } from 'react-toastify';

const Settings = () => {
  const [form, setForm] = useState({ current_password: '', new_password: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.new_password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.new_password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await changePassword({ current_password: form.current_password, new_password: form.new_password });
      toast.success('Password changed successfully');
      setForm({ current_password: '', new_password: '', confirm: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Settings</h2>
      <div className="card-custom p-4" style={{ maxWidth: 480 }}>
        <h5 className="mb-3">Change Password</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label form-label-custom">Current Password</label>
            <input type="password" className="form-control form-control-custom" value={form.current_password} onChange={(e) => setForm({ ...form, current_password: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label form-label-custom">New Password</label>
            <input type="password" className="form-control form-control-custom" value={form.new_password} onChange={(e) => setForm({ ...form, new_password: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label form-label-custom">Confirm New Password</label>
            <input type="password" className="form-control form-control-custom" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary-custom" disabled={loading}>{loading ? 'Updating...' : 'Update Password'}</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
