import React, { useEffect, useState } from 'react';
import { getAdminSamples, updateSampleStatus } from '../../services/api';
import { toast } from 'react-toastify';

const statuses = ['Pending', 'Sample Received', 'Testing', 'Completed', 'Report Available'];

const AdminSamples = () => {
  const [samples, setSamples] = useState([]);
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    getAdminSamples({ status: status || undefined, search: search || undefined })
      .then((res) => setSamples(res.data.samples || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const changeStatus = async (id, newStatus) => {
    try {
      await updateSampleStatus(id, newStatus);
      toast.success('Status updated');
      load();
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Manage Soil Samples</h2>
      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input className="form-control form-control-custom" placeholder="Search request ID / location" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="col-md-3">
          <select className="form-select form-control-custom" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary-custom w-100" onClick={load}>Filter</button>
        </div>
      </div>
      {loading ? (
        <div className="spinner-custom mx-auto"></div>
      ) : (
        <div className="table-responsive table-custom">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>User</th>
                <th>Test Type</th>
                <th>Location</th>
                <th>Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((s) => (
                <tr key={s.id}>
                  <td className="fw-semibold">{s.request_id}</td>
                  <td>{s.users?.full_name || '—'}</td>
                  <td>{s.test_type}</td>
                  <td>{s.sample_location}</td>
                  <td>{s.status}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={s.status}
                      onChange={(e) => changeStatus(s.id, e.target.value)}
                    >
                      {statuses.map((st) => <option key={st}>{st}</option>)}
                    </select>
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

export default AdminSamples;
