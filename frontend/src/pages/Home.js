import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [openFaq, setOpenFaq] = useState(null);

  const benefits = [
    { icon: '📊', title: 'Data-Driven Decisions', desc: 'Get precise nutrient levels and recommendations tailored to your soil and crop.', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500&q=80' },
    { icon: '💰', title: 'Save on Fertilizers', desc: 'Apply only what your soil needs — reduce waste and cut input costs.', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=500&q=80' },
    { icon: '🌾', title: 'Higher Yields', desc: 'Optimize soil health for stronger plants and improved crop productivity.', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500&q=80' },
    { icon: '🌍', title: 'Sustainable Farming', desc: 'Prevent over-fertilization and protect groundwater from nutrient pollution.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80' }
  ];

  const tests = [
    { name: 'Soil pH Test', desc: 'Measure acidity/alkalinity for optimal nutrient availability.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&q=80' },
    { name: 'NPK Test', desc: 'Complete analysis of Nitrogen, Phosphorus & Potassium.', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=80' },
    { name: 'Organic Carbon', desc: 'Assess soil organic matter and long-term fertility.', image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=500&q=80' },
    { name: 'Micronutrient Test', desc: 'Detect Fe, Zn, Mn, Cu, B deficiencies early.', image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=500&q=80' }
  ];

  const steps = [
    { num: '01', title: 'Register & Request', desc: 'Create an account and submit your soil test request online.', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80' },
    { num: '02', title: 'Collect Sample', desc: 'Follow simple guidelines to collect and send your soil sample.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80' },
    { num: '03', title: 'Lab Analysis', desc: 'Our experts analyze your soil using standard protocols.', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80' },
    { num: '04', title: 'Get Report', desc: 'Download detailed results with charts and recommendations.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80' }
  ];

  const faqs = [
    { q: 'How much soil sample do I need?', a: 'Typically 500g to 1kg of dry soil from 0–15 cm depth is sufficient for most tests.' },
    { q: 'How long does testing take?', a: 'Most tests are completed within 5–7 working days after the sample is received.' },
    { q: 'Can I test for multiple parameters?', a: 'Yes. You can select comprehensive packages or individual tests based on your needs.' },
    { q: 'Are the reports recognized?', a: 'Yes. Reports follow standard soil testing protocols used by agricultural extension services.' }
  ];

  const testimonials = [
    { name: 'Rajesh Kumar', role: 'Farmer, Punjab', text: 'Soil Testing helped me reduce fertilizer costs by 30% while increasing wheat yield.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    { name: 'Dr. Priya Sharma', role: 'Researcher', text: 'Excellent platform for tracking multiple samples. The PDF reports are clear and professional.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { name: 'Amit Patel', role: 'Agriculture Student', text: 'As a student I use Soil Testing for field projects. The interface is simple and helpful.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' }
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h1 className="hero-title">Professional Soil Testing for Better Harvests</h1>
              <p className="hero-subtitle">
                Understand your soil. Optimize nutrients. Grow sustainably.
                Get accurate lab analysis with clear recommendations for farmers, researchers, and students.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link
                  to={isAuthenticated ? '/dashboard/request' : '/register'}
                  className="btn btn-light btn-lg fw-semibold px-4"
                  style={{ borderRadius: 10 }}
                >
                  Test Your Soil
                </Link>
                <Link
                  to={isAuthenticated ? '/dashboard/request' : '/login'}
                  className="btn btn-outline-light btn-lg fw-semibold px-4"
                  style={{ borderRadius: 10 }}
                >
                  Request Soil Test
                </Link>
              </div>
            </div>
            <div className="col-lg-5 d-none d-lg-block">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=700&q=80"
                alt="Healthy crops in soil"
                className="img-fluid img-rounded shadow-lg"
                style={{ maxHeight: 380, width: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Intro + Benefits */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="row align-items-center g-5 mb-5">
            <div className="col-lg-6">
              <img
                src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80"
                alt="Farm field"
                className="img-fluid img-rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <h2 className="section-title">Why Test Your Soil?</h2>
              <p className="text-muted mb-4">
                Soil is a living system. Without knowing its nutrient status, pH, and physical properties,
                fertilizer application becomes guesswork. Soil Testing gives you laboratory-grade insights
                so you can feed your crops exactly what they need.
              </p>
              <ul className="list-unstyled mb-4">
                <li className="mb-2">✅ Accurate nutrient recommendations</li>
                <li className="mb-2">✅ Reduced input costs</li>
                <li className="mb-2">✅ Improved crop quality & yield</li>
                <li className="mb-2">✅ Environmentally responsible farming</li>
              </ul>
              <Link to="/about" className="btn btn-primary-custom">Learn More</Link>
            </div>
          </div>

          <div className="row g-4">
            {benefits.map((b, i) => (
              <div className="col-sm-6 col-lg-3" key={i}>
                <div className="card-custom h-100">
                  <img src={b.image} alt={b.title} className="test-card-img" loading="lazy" />
                  <div className="p-3">
                    <div className="feature-icon" style={{ width: 48, height: 48, fontSize: '1.3rem' }}>{b.icon}</div>
                    <h5 className="mb-2">{b.title}</h5>
                    <p className="text-muted small mb-0">{b.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular tests */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Popular Soil Tests</h2>
            <p className="section-subtitle">Choose from a full range of professional soil analyses</p>
          </div>
          <div className="row g-4">
            {tests.map((t, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="test-card h-100">
                  <img src={t.image} alt={t.name} className="test-card-img" loading="lazy" />
                  <div className="test-card-body text-center">
                    <h5 style={{ color: 'var(--primary-dark)' }}>{t.name}</h5>
                    <p className="text-muted small mb-0">{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/soil-test-types" className="btn btn-outline-custom">View All Test Types</Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">How Soil Testing Works</h2>
            <p className="section-subtitle">Simple process from request to report</p>
          </div>
          <div className="row g-4">
            {steps.map((s, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="card-custom h-100 text-center">
                  <img src={s.image} alt={s.title} className="test-card-img" loading="lazy" />
                  <div className="p-3">
                    <div
                      className="mx-auto mb-2 d-flex align-items-center justify-content-center"
                      style={{
                        width: 48, height: 48, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2d6a4f, #52b788)',
                        color: 'white', fontWeight: 700, fontSize: '0.95rem'
                      }}
                    >
                      {s.num}
                    </div>
                    <h5>{s.title}</h5>
                    <p className="text-muted small mb-0">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/how-it-works" className="btn btn-primary-custom">See Full Process</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        className="section-padding"
        style={{
          background: 'linear-gradient(135deg, rgba(27,67,50,0.92), rgba(45,106,79,0.88)), url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80) center/cover'
        }}
      >
        <div className="container">
          <div className="row g-4 text-white text-center">
            {[
              { n: '5,000+', l: 'Samples Tested' },
              { n: '2,500+', l: 'Happy Farmers' },
              { n: '10+', l: 'Test Types' },
              { n: '98%', l: 'Satisfaction' }
            ].map((s, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="stat-number text-white">{s.n}</div>
                <div className="stat-label" style={{ color: 'rgba(255,255,255,0.8)' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faqs.map((f, i) => (
                <div key={i} className="card-custom mb-3">
                  <button
                    className="btn w-100 text-start p-3 d-flex justify-content-between align-items-center"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ background: 'transparent', border: 'none' }}
                  >
                    <span className="fw-semibold">{f.q}</span>
                    <span>{openFaq === i ? '−' : '+'}</span>
                  </button>
                  {openFaq === i && <div className="px-3 pb-3 text-muted">{f.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">What Users Say</h2>
          </div>
          <div className="row g-4">
            {testimonials.map((t, i) => (
              <div className="col-md-4" key={i}>
                <div className="card-custom p-4 h-100">
                  <p className="text-muted mb-3">"{t.text}"</p>
                  <div className="d-flex align-items-center gap-3">
                    <img src={t.avatar} alt={t.name} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div className="fw-semibold">{t.name}</div>
                      <small className="text-muted">{t.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding text-center text-white"
        style={{
          background: 'linear-gradient(135deg, rgba(45,106,79,0.94), rgba(64,145,108,0.9)), url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&q=80) center/cover'
        }}
      >
        <div className="container">
          <h2 className="mb-3" style={{ color: 'white' }}>Ready to Test Your Soil?</h2>
          <p className="mb-4" style={{ maxWidth: 560, margin: '0 auto 1.5rem', opacity: 0.92 }}>
            Join thousands of farmers and researchers who trust Soil Testing for accurate analysis.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard/request' : '/register'}
            className="btn btn-light btn-lg fw-semibold px-5"
            style={{ borderRadius: 10 }}
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;