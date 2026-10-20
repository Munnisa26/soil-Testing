import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SoilTestTypes = () => {
  const { isAuthenticated } = useAuth();

  const types = [
    {
      name: 'Soil pH Test',
      icon: 'pH',
      purpose: 'Determine acidity or alkalinity of soil on a 0–14 scale.',
      parameters: 'pH (0–14 scale)',
      sample: '500g dry soil, 0–15 cm depth',
      interpretation: 'Ideal range 6.0–7.5 for most crops.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80'
    },
    {
      name: 'NPK Test',
      icon: 'NPK',
      purpose: 'Major nutrient status.',
      parameters: 'N, P, K (kg/ha)',
      sample: '1 kg composite sample',
      interpretation: 'Compare with crop critical levels.',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80'
    },
    {
      name: 'Nitrogen Test',
      icon: 'N',
      purpose: 'Available N for growth.',
      parameters: 'Available N (kg/ha)',
      sample: '500g soil',
      interpretation: 'Low < 280, Medium 280–560, High > 560.',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80'
    },
    {
      name: 'Phosphorus Test',
      icon: 'P',
      purpose: 'P for roots & energy.',
      parameters: 'Available P (kg/ha)',
      sample: '500g soil',
      interpretation: 'Low < 10, Medium 10–25, High > 25.',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80'
    },
    {
      name: 'Potassium Test',
      icon: 'K',
      purpose: 'K for plant health.',
      parameters: 'Available K (kg/ha)',
      sample: '500g soil',
      interpretation: 'Low < 110, Medium 110–280, High > 280.',
      image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80'
    },
    {
      name: 'Electrical Conductivity Test',
      icon: '⚡',
      purpose: 'Salinity assessment.',
      parameters: 'EC (dS/m)',
      sample: '250g soil',
      interpretation: 'Normal < 1, Moderate 1–2, High > 4.',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80'
    },
    {
      name: 'Organic Carbon Test',
      icon: '🍃',
      purpose: 'Soil health indicator.',
      parameters: 'OC %',
      sample: '500g soil',
      interpretation: 'Low < 0.5, Medium 0.5–0.75, High > 0.75.',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80'
    },
    {
      name: 'Soil Moisture Test',
      icon: '💧',
      purpose: 'Irrigation planning.',
      parameters: 'Moisture %',
      sample: 'Fresh sealed sample',
      interpretation: 'Depends on soil type and crop.',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80'
    },
    {
      name: 'Soil Salinity Test',
      icon: '☀',
      purpose: 'Salt-affected soils.',
      parameters: 'Salinity (dS/m)',
      sample: '1 kg sample',
      interpretation: 'Classify non-saline / saline / sodic.',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80'
    },
    {
      name: 'Micronutrient Test',
      icon: '🔬',
      purpose: 'Trace element status (Fe, Zn, Mn, Cu, B, Mo).',
      parameters: 'Fe, Zn, Mn, Cu, B, Mo',
      sample: '500g soil',
      interpretation: 'Compare critical deficiency levels.',
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80'
    }
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
        <div className="container">
          <div className="breadcrumb-custom">
            <Link to="/">Home</Link> / Soil Test Types
          </div>
          <h1>Soil Test Types</h1>
          <p>Explore our full range of professional soil analyses</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            {types.map((t, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className="test-card">
                  <img src={t.image} alt={t.name} className="test-card-img" loading="lazy" />
                  <div className="test-card-body">
                    <div className="test-card-title">
                      <span className="test-card-icon">{t.icon}</span>
                      {t.name}
                    </div>
                    <p><strong>Purpose:</strong> {t.purpose}</p>
                    <p><strong>Parameters:</strong> {t.parameters}</p>
                    <p><strong>Sample:</strong> {t.sample}</p>
                    <p className="mb-0"><strong>Interpretation:</strong> {t.interpretation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link
              to={isAuthenticated ? '/dashboard/request' : '/register'}
              className="btn btn-primary-custom btn-lg"
            >
              Request a Soil Test
            </Link>
          </div>
        </div>
      </section>

      <div className="text-center py-4" style={{ background: 'linear-gradient(90deg, #e8f5e9, #f0f7f4, #e8f5e9)' }}>
        <span style={{ color: 'var(--primary)', fontWeight: 500 }}>
          🌱 Healthy Soil &nbsp;|&nbsp; Healthy Crops &nbsp;|&nbsp; A Sustainable Future 🌱
        </span>
      </div>
    </div>
  );
};

export default SoilTestTypes;