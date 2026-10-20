import React, { useEffect, useState } from 'react';
import { getAdminStats } from '../../services/api';

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then((res) => setStats(res.data.stats))
      .catch(() => setStats({}))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5"><div className="spinner-custom mx-auto"></div></div>;

  const cards = [
    { label: 'Total Users', value: stats?.totalUsers || 0 },
    { label: 'Total Soil Samples', value: stats?.totalSoilSamples || 0 },
    { label: 'Pending Requests', value: stats?.pendingRequests || 0 },
    { label: 'Tests in Progress', value: stats?.testsInProgress || 0 },
    { label: 'Completed Tests', value: stats?.completedTests || 0 },
    { label: 'Reports Generated', value: stats?.reportsGenerated || 0 }
  ];

  return (
    <div>
      <h2 className="mb-4">Admin Dashboard</h2>
      <div className="row g-3">
        {cards.map((c, i) => (
          <div className="col-6 col-md-4 col-lg-2" key={i}>
            <div className="dashboard-stat-card text-center">
              <div className="stat-value" style={{ fontSize: '1.75rem' }}>{c.value}</div>
              <div className="text-muted small">{c.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
