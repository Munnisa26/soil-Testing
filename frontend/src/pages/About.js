import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <section
        className="page-hero"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(27,67,50,0.88), rgba(45,106,79,0.82)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container text-center">
          <h1>About Soil Testing</h1>
          <p>Empowering agriculture through accurate, accessible soil analysis</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="section-title">Our Mission</h2>
              <p className="text-muted">
                Soil Testing was built to make professional laboratory soil analysis accessible to every farmer,
                student, and researcher. We believe that informed decisions start with understanding the soil
                beneath our feet.
              </p>
              <p className="text-muted">
                Through a modern digital platform combined with standardized laboratory methods, we deliver
                clear reports, actionable recommendations, and tools to track soil health over time.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80"
                alt="Agriculture"
                className="img-fluid img-rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">What We Offer</h2>
          </div>
          <div className="row g-4">
            {[
              { title: 'Comprehensive Tests', desc: 'pH, NPK, organic carbon, EC, moisture, salinity, micronutrients and more.', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=80' },
              { title: 'Digital Dashboard', desc: 'Track samples, view results, download PDF reports, and manage history.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80' },
              { title: 'Expert Interpretation', desc: 'Results include reference ranges and practical recommendations.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80' },
              { title: 'Knowledge Hub', desc: 'Blog articles and guides on soil science and best practices.', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80' }
            ].map((item, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="test-card h-100">
                  <img src={item.image} alt={item.title} className="test-card-img" loading="lazy" />
                  <div className="test-card-body text-center">
                    <h5>{item.title}</h5>
                    <p className="text-muted small mb-0">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white text-center">
        <div className="container">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="text-muted mb-4">Join Soil Testing and take the first step toward healthier soil and better yields.</p>
          <Link to="/register" className="btn btn-primary-custom btn-lg">Create Free Account</Link>
        </div>
      </section>
    </div>
  );
};

export default About;