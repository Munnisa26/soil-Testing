import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand navbar-brand-custom" to="/">
          <span className="brand-logo">🌱</span>
          Soil Testing
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/about', label: 'About Us' },
              { to: '/soil-testing', label: 'Soil Testing' },
              { to: '/soil-test-types', label: 'Test Types' },
              { to: '/how-it-works', label: 'How It Works' },
              { to: '/blog', label: 'Blog' },
              { to: '/contact', label: 'Contact' }
            ].map((item) => (
              <li className="nav-item" key={item.to}>
                <NavLink
                  className="nav-link nav-link-custom"
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className="nav-link nav-link-custom"
                    to={isAdmin ? '/admin' : '/dashboard'}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <button
                    className="btn btn-link nav-link nav-link-custom dropdown-toggle"
                    data-bs-toggle="dropdown"
                  >
                    {user?.full_name?.split(' ')[0] || 'Account'}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to={isAdmin ? '/admin' : '/dashboard'}>
                        My Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/dashboard/profile">Profile</Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link nav-link-custom" to="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link
                    className="btn btn-primary-custom btn-sm px-3"
                    to="/register"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;