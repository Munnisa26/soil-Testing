import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      toast.success('Login successful!');
      if (data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(from);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="auth-card">
              <div className="text-center mb-4">
                <span style={{ fontSize: '2.5rem' }}>🌱</span>
                <h2 className="mt-2 mb-1">Welcome Back</h2>
                <p className="text-muted">Login to your Soil Testing account</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label form-label-custom">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control form-control-custom ${errors.email ? 'is-invalid' : ''}`}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label form-label-custom">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-control form-control-custom ${errors.password ? 'is-invalid' : ''}`}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      name="remember"
                      className="form-check-input"
                      checked={form.remember}
                      onChange={handleChange}
                      id="remember"
                    />
                    <label className="form-check-label" htmlFor="remember">Remember Me</label>
                  </div>
                  <a href="#!" className="small" onClick={(e) => { e.preventDefault(); toast.info('Contact support to reset password.'); }}>
                    Forgot Password?
                  </a>
                </div>
                <button type="submit" className="btn btn-primary-custom w-100 mb-3" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
                <p className="text-center mb-0">
                  Don't have an account? <Link to="/register">Register</Link>
                </p>
              </form>
              <div className="mt-4 p-3 rounded" style={{ background: '#f0fdf4', fontSize: '0.85rem' }}>
                <strong>Demo:</strong> Register a new account or use admin after seeding the database.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
