import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMySamples, deleteSample } from '../../services/api';
import { toast } from 'react-toastify';

const statusBadge = (status) => {
  const map = {
    Pending: 'badge-pending',
    'Sample Received': 'badge-received',
    Testing: 'badge-testing',
    Completed: 'badge-completed',
    'Report Available': 'badge-report'
  };
  return <span className={`badge ${map[status] || 'bg-secondary'}`}>{status}</span>;
};

const MySamples = () => {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');

  const load = () => {
    setLoading(true);
    getMySamples({ search: search || undefined, status: status || undefined })
      .then((res) => setSamples(res.data.samples || []))
      .catch(() => toast.error('Failed to load samples'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this sample request?')) return;
    try {
      await deleteSample(id);
      toast.success('Deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <div>
          <h2 className="mb-1">My Soil Samples</h2>
          <p className="text-muted mb-0">Track all your soil testing requests</p>
        </div>
        <Link to="/dashboard/request" className="btn btn-primary-custom">+ New Request</Link>
      </div>

      <div className="card-custom p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control form-control-custom"
              placeholder="Search by Request ID, location, crop..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select className="form-select form-control-custom" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Sample Received">Sample Received</option>
              <option value="Testing">Testing</option>
              <option value="Completed">Completed</option>
              <option value="Report Available">Report Available</option>
            </select>
          </div>
          <div className="col-md-3">
            <button className="btn btn-primary-custom w-100" onClick={load}>Search / Filter</button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>
      ) : samples.length === 0 ? (
        <div className="card-custom p-5 text-center">
          <p className="text-muted mb-3">No samples found.</p>
          <Link to="/dashboard/request" className="btn btn-primary-custom">Request Your First Test</Link>
        </div>
      ) : (
        <div className="table-responsive table-custom">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Test Type</th>
                <th>Location</th>
                <th>Crop</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {samples.map((s) => (
                <tr key={s.id}>
                  <td className="fw-semibold">{s.request_id}</td>
                  <td>{s.test_type}</td>
                  <td>{s.sample_location}</td>
                  <td>{s.crop_name || '—'}</td>
                  <td>{statusBadge(s.status)}</td>
                  <td>{new Date(s.created_at).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/dashboard/samples/${s.id}`} className="btn btn-sm btn-outline-primary me-1">View</Link>
                    {s.status === 'Pending' && (
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s.id)}>Delete</button>
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

export default MySamples;
