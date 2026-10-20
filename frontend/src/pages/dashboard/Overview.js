import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDashboardStats } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Overview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data.stats))
      .catch(() => setStats({ totalSamples: 0, testingRequests: 0, completedTests: 0, pendingTests: 0, recentReports: [] }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>;
  }

  const cards = [
    { label: 'Total Soil Samples', value: stats?.totalSamples || 0, color: '#2d6a4f' },
    { label: 'Testing Requests', value: stats?.testingRequests || 0, color: '#40916c' },
    { label: 'Completed Tests', value: stats?.completedTests || 0, color: '#52b788' },
    { label: 'Pending Tests', value: stats?.pendingTests || 0, color: '#95d5b2' }
  ];

  return (
    <div>
      <h2 className="mb-1">Welcome, {user?.full_name?.split(' ')[0]} 👋</h2>
      <p className="text-muted mb-4">Here's an overview of your soil testing activity.</p>

      <div className="row g-3 mb-4">
        {cards.map((c, i) => (
          <div className="col-6 col-lg-3" key={i}>
            <div className="dashboard-stat-card" style={{ borderLeftColor: c.color }}>
              <div className="stat-value">{c.value}</div>
              <div className="text-muted small">{c.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card-custom p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Recent Reports</h5>
              <Link to="/dashboard/reports" className="small">View all</Link>
            </div>
            {stats?.recentReports?.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-sm mb-0">
                  <thead>
                    <tr>
                      <th>Report ID</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentReports.map((r) => (
                      <tr key={r.id}>
                        <td>{r.report_id}</td>
                        <td>{new Date(r.generated_at).toLocaleDateString()}</td>
                        <td><span className="badge badge-report">{r.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted mb-0">No reports yet. Submit a soil test request to get started.</p>
            )}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card-custom p-4">
            <h5 className="mb-3">Quick Actions</h5>
            <Link to="/dashboard/request" className="btn btn-primary-custom w-100 mb-2">Request Soil Test</Link>
            <Link to="/dashboard/samples" className="btn btn-outline-custom w-100 mb-2">My Samples</Link>
            <Link to="/dashboard/results" className="btn btn-outline-custom w-100">View Results</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
