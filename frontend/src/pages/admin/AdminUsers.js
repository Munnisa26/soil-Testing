import React, { useEffect, useState } from 'react';
import { getAdminUsers, updateUserStatus } from '../../services/api';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    getAdminUsers({ search: search || undefined })
      .then((res) => setUsers(res.data.users || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const toggleStatus = async (id, current) => {
    try {
      await updateUserStatus(id, !current);
      toast.success('User status updated');
      load();
    } catch {
      toast.error('Failed to update');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Manage Users</h2>
      <div className="mb-3 d-flex gap-2">
        <input className="form-control form-control-custom" style={{ maxWidth: 300 }} placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="btn btn-primary-custom" onClick={load}>Search</button>
      </div>
      {loading ? (
        <div className="spinner-custom mx-auto"></div>
      ) : (
        <div className="table-responsive table-custom">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Type</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.full_name}</td>
                  <td>{u.email}</td>
                  <td>{u.user_type}</td>
                  <td>{u.role}</td>
                  <td>{u.is_active ? <span className="badge bg-success">Active</span> : <span className="badge bg-danger">Inactive</span>}</td>
                  <td>{new Date(u.created_at).toLocaleDateString()}</td>
                  <td>
                    {u.role !== 'admin' && (
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => toggleStatus(u.id, u.is_active)}>
                        {u.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
