import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HowItWorks = () => {
  const { isAuthenticated } = useAuth();
  const steps = [
    { title: 'Create Account', desc: 'Register with your details. Choose user type: Farmer, Student, Researcher or Other.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80' },
    { title: 'Submit Request', desc: 'Fill the soil test request form — select test type, location, crop, and upload documents.', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80' },
    { title: 'Collect Sample', desc: 'Follow the sample collection guidelines. Collect soil from the correct depth and quantity.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80' },
    { title: 'Send to Lab', desc: 'Label and send your sample. Your request ID tracks everything end to end.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80' },
    { title: 'Laboratory Testing', desc: 'Status updates: Pending → Sample Received → Testing → Completed. Get notifications at each stage.', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80' },
    { title: 'View Results & Report', desc: 'Access results with tables and charts. Download a professional PDF with recommendations.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80' }
  ];

  return (
    <div>
      <section
        className="page-hero"
        style={{
          backgroundImage: 'linear-gradient(135deg, rgba(27,67,50,0.88), rgba(45,106,79,0.82)), url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container text-center">
          <h1>How It Works</h1>
          <p>From request to report — a clear, trackable process</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            {steps.map((s, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className="test-card h-100">
                  <img src={s.image} alt={s.title} className="test-card-img" loading="lazy" />
                  <div className="test-card-body">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <span
                        className="d-flex align-items-center justify-content-center"
                        style={{
                          width: 36, height: 36, borderRadius: '50%',
                          background: 'var(--primary)', color: 'white',
                          fontWeight: 700, fontSize: '0.9rem', flexShrink: 0
                        }}
                      >
                        {i + 1}
                      </span>
                      <h5 className="mb-0">{s.title}</h5>
                    </div>
                    <p className="text-muted small mb-0">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to={isAuthenticated ? '/dashboard/request' : '/register'} className="btn btn-primary-custom btn-lg">
              Start Your First Test
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;