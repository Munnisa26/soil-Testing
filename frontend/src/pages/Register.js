import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: '',
    location: '',
    user_type: 'Farmer'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (form.mobile && !/^[0-9]{10}$/.test(form.mobile.replace(/\D/g, ''))) {
      e.mobile = 'Enter a valid 10-digit mobile number';
    }
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirm_password) e.confirm_password = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register(form);
      toast.success('Registration successful! Welcome to Soil Testing.');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed.';
      const fieldErrors = err.response?.data?.errors;
      if (fieldErrors) {
        const mapped = {};
        fieldErrors.forEach((fe) => { mapped[fe.field] = fe.message; });
        setErrors(mapped);
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="auth-card">
              <div className="text-center mb-4">
                <span style={{ fontSize: '2.5rem' }}>🌱</span>
                <h2 className="mt-2 mb-1">Create Account</h2>
                <p className="text-muted">Join Soil Testing platform</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <label className="form-label form-label-custom">Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      className={`form-control form-control-custom ${errors.full_name ? 'is-invalid' : ''}`}
                      value={form.full_name}
                      onChange={handleChange}
                      placeholder="Your full name"
                    />
                    {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label form-label-custom">Email *</label>
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
                  <div className="col-md-6 mb-3">
                    <label className="form-label form-label-custom">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      className={`form-control form-control-custom ${errors.mobile ? 'is-invalid' : ''}`}
                      value={form.mobile}
                      onChange={handleChange}
                      placeholder="10-digit number"
                    />
                    {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label form-label-custom">Password *</label>
                    <input
                      type="password"
                      name="password"
                      className={`form-control form-control-custom ${errors.password ? 'is-invalid' : ''}`}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min 6 characters"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label form-label-custom">Confirm Password *</label>
                    <input
                      type="password"
                      name="confirm_password"
                      className={`form-control form-control-custom ${errors.confirm_password ? 'is-invalid' : ''}`}
                      value={form.confirm_password}
                      onChange={handleChange}
                      placeholder="Repeat password"
                    />
                    {errors.confirm_password && <div className="invalid-feedback">{errors.confirm_password}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label form-label-custom">Location</label>
                    <input
                      type="text"
                      name="location"
                      className="form-control form-control-custom"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="City, State"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label form-label-custom">User Type</label>
                    <select
                      name="user_type"
                      className="form-select form-control-custom"
                      value={form.user_type}
                      onChange={handleChange}
                    >
                      <option value="Farmer">Farmer</option>
                      <option value="Student">Student</option>
                      <option value="Researcher">Researcher</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary-custom w-100 mb-3" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
                <p className="text-center mb-0">
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
