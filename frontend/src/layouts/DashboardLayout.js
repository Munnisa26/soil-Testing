import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ admin = false }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const userLinks = [
    { to: '/dashboard', label: 'Overview', end: true },
    { to: '/dashboard/profile', label: 'Profile' },
    { to: '/dashboard/request', label: 'Request Soil Test' },
    { to: '/dashboard/samples', label: 'My Soil Samples' },
    { to: '/dashboard/results', label: 'Test Results' },
    { to: '/dashboard/reports', label: 'Reports' },
    { to: '/dashboard/history', label: 'Testing History' },
    { to: '/dashboard/notifications', label: 'Notifications' },
    { to: '/dashboard/settings', label: 'Settings' }
  ];

  const adminLinks = [
    { to: '/admin', label: 'Overview', end: true },
    { to: '/admin/users', label: 'Manage Users' },
    { to: '/admin/samples', label: 'Soil Samples' },
    { to: '/admin/results', label: 'Enter Results' },
    { to: '/admin/reports', label: 'Reports' },
    { to: '/admin/blog', label: 'Manage Blog' },
    { to: '/admin/messages', label: 'Contact Messages' },
    { to: '/admin/settings', label: 'Settings' }
  ];

  const links = admin ? adminLinks : userLinks;
  const base = admin ? '/admin' : '/dashboard';

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <nav className="navbar navbar-dark" style={{ background: 'var(--primary-dark)' }}>
        <div className="container-fluid">
          <button className="btn btn-link text-white d-lg-none" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>
          <Link to="/" className="navbar-brand mb-0 h1" style={{ color: 'white' }}>
            🌱 Soil Testing {admin && <span className="badge bg-warning text-dark ms-2">Admin</span>}
          </Link>
          <div className="d-flex align-items-center gap-3 text-white">
            <span className="d-none d-md-inline small">{user?.full_name}</span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      <div className="d-flex flex-grow-1">
        <aside
          className={`dashboard-sidebar ${sidebarOpen ? 'd-block' : 'd-none'} d-lg-block`}
          style={{ width: 260, flexShrink: 0 }}
        >
          <div className="px-3 mb-3 small text-white-50">MENU</div>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </aside>
        <main className="flex-grow-1 p-3 p-md-4" style={{ background: 'var(--bg-light)', overflow: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
