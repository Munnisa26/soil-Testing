import React, { useEffect, useState } from 'react';
import { getMySamples } from '../../services/api';

const History = () => {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('created_at');

  useEffect(() => {
    getMySamples({ search: search || undefined, sort, order: 'desc' })
      .then((res) => setSamples(res.data.samples || []))
      .finally(() => setLoading(false));
  }, [sort]);

  const filtered = search
    ? samples.filter(
        (s) =>
          s.request_id?.toLowerCase().includes(search.toLowerCase()) ||
          s.test_type?.toLowerCase().includes(search.toLowerCase())
      )
    : samples;

  return (
    <div>
      <h2 className="mb-4">Testing History</h2>
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <input className="form-control form-control-custom" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="col-md-4">
          <select className="form-select form-control-custom" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="created_at">Sort by Request Date</option>
            <option value="status">Sort by Status</option>
            <option value="test_type">Sort by Test Type</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>
      ) : (
        <div className="table-responsive table-custom">
          <table className="table mb-0">
            <thead>
              <tr>
                <th>Sample / Request ID</th>
                <th>Test Type</th>
                <th>Request Date</th>
                <th>Status</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.request_id}</td>
                  <td>{s.test_type}</td>
                  <td>{new Date(s.created_at).toLocaleDateString()}</td>
                  <td>{s.status}</td>
                  <td>{['Completed', 'Report Available'].includes(s.status) ? 'Available' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default History;
