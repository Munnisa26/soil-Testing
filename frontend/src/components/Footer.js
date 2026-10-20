import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5>🌱 Soil Testing</h5>
            <p className="mb-3">
              Professional soil analysis platform helping farmers, researchers, and students
              make data-driven decisions for better crop yields and sustainable agriculture.
            </p>
          </div>
          <div className="col-lg-2 col-md-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/">Home</Link></li>
              <li className="mb-2"><Link to="/about">About Us</Link></li>
              <li className="mb-2"><Link to="/soil-testing">Soil Testing</Link></li>
              <li className="mb-2"><Link to="/how-it-works">How It Works</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5>Resources</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/soil-test-types">Test Types</Link></li>
              <li className="mb-2"><Link to="/blog">Blog / Knowledge</Link></li>
              <li className="mb-2"><Link to="/contact">Contact Us</Link></li>
              <li className="mb-2"><Link to="/register">Get Started</Link></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li className="mb-2">📧 support@soiltesting.com</li>
              <li className="mb-2">📞 +91 98765 43210</li>
              <li className="mb-2">📍 Agriculture Hub, India</li>
            </ul>
          </div>
        </div>
        <hr className="mt-4 mb-3" style={{ borderColor: 'rgba(255,255,255,0.15)' }} />
        <div className="text-center">
          <p className="mb-0 small">
            © {new Date().getFullYear()} Soil Testing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
