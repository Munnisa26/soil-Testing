import React, { useState } from 'react';
import { submitContact } from '../services/api';
import { toast } from 'react-toastify';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill required fields.');
      return;
    }
    setLoading(true);
    try {
      await submitContact(form);
      toast.success('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section
        className="page-hero"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(27,67,50,0.88), rgba(45,106,79,0.82)), url(https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container text-center">
          <h1>Contact Us</h1>
          <p>We are here to help with your soil testing needs</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-5">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&q=80"
                alt="Contact"
                className="img-fluid img-rounded shadow mb-4"
              />
              <h3 className="mb-3">Get in Touch</h3>
              <p className="text-muted mb-4">
                Have questions about tests, samples, or reports? Send us a message and our team will respond promptly.
              </p>
              <div className="mb-2">📧 support@soiltesting.com</div>
              <div className="mb-2">📞 +91 98765 43210</div>
              <div className="mb-2">📍 Agriculture Hub, India</div>
              <div className="mb-2">🕒 Mon–Sat: 9:00 AM – 6:00 PM</div>
            </div>
            <div className="col-lg-7">
              <div className="card-custom p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label form-label-custom">Name *</label>
                      <input type="text" name="name" className="form-control form-control-custom" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label form-label-custom">Email *</label>
                      <input type="email" name="email" className="form-control form-control-custom" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label form-label-custom">Subject</label>
                    <input type="text" name="subject" className="form-control form-control-custom" value={form.subject} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label form-label-custom">Message *</label>
                    <textarea name="message" className="form-control form-control-custom" rows="5" value={form.message} onChange={handleChange} required />
                  </div>
                  <button type="submit" className="btn btn-primary-custom" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;