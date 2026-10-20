import React, { useEffect, useState } from 'react';
import { getAdminSamples } from '../../services/api';
import api from '../../services/api';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch reports via admin - using samples that have Report Available
    getAdminSamples({ status: 'Report Available' })
      .then((res) => setReports(res.data.samples || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="mb-4">Manage Reports</h2>
      {loading ? (
        <div className="spinner-custom mx-auto"></div>
      ) : reports.length === 0 ? (
        <div className="card-custom p-5 text-center text-muted">No reports generated yet.</div>
      ) : (
        <div className="table-responsive table-custom">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Test Type</th>
                <th>User</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((s) => (
                <tr key={s.id}>
                  <td>{s.request_id}</td>
                  <td>{s.test_type}</td>
                  <td>{s.users?.full_name || '—'}</td>
                  <td>{s.status}</td>
                  <td>{new Date(s.updated_at || s.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminReports;
