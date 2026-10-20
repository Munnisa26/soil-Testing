import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SoilTesting = () => {
  const { isAuthenticated } = useAuth();

  const tests = [
    { name: 'Soil pH Test', purpose: 'Determine acidity or alkalinity', params: 'pH (0–14 scale)', sample: '500g dry soil, 0–15 cm depth', interp: 'Ideal range 6.0–7.5 for most crops', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80', icon: 'pH' },
    { name: 'NPK Test', purpose: 'Major nutrient status', params: 'N, P, K (kg/ha)', sample: '1 kg composite sample', interp: 'Compare with crop critical levels', image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80', icon: 'NPK' },
    { name: 'Nitrogen Test', purpose: 'Available N for growth', params: 'Available N (kg/ha)', sample: '500g soil', interp: 'Low <280, Medium 280–560, High >560', image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80', icon: 'N' },
    { name: 'Phosphorus Test', purpose: 'P for roots & energy', params: 'Available P (kg/ha)', sample: '500g soil', interp: 'Low <10, Medium 10–25, High >25', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80', icon: 'P' },
    { name: 'Potassium Test', purpose: 'K for plant health', params: 'Available K (kg/ha)', sample: '500g soil', interp: 'Low <110, Medium 110–280, High >280', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=600&q=80', icon: 'K' },
    { name: 'Electrical Conductivity', purpose: 'Salinity assessment', params: 'EC (dS/m)', sample: '250g soil', interp: 'EC <1 normal, 1–2 moderate, >4 saline', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80', icon: '⚡' },
    { name: 'Organic Carbon', purpose: 'Soil health indicator', params: 'OC %', sample: '500g soil', interp: 'Low <0.5%, Medium 0.5–0.75%, High >0.75%', image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&q=80', icon: '🍃' },
    { name: 'Soil Moisture', purpose: 'Irrigation planning', params: 'Moisture %', sample: 'Fresh sealed sample', interp: 'Crop and soil type dependent', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80', icon: '💧' },
    { name: 'Soil Salinity', purpose: 'Salt-affected soils', params: 'Salinity (dS/m)', sample: '1 kg sample', interp: 'Classify non-saline / saline / sodic', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', icon: '☀' },
    { name: 'Micronutrient Test', purpose: 'Trace element status', params: 'Fe, Zn, Mn, Cu, B, Mo', sample: '500g soil', interp: 'Compare critical deficiency levels', image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=600&q=80', icon: '🔬' }
  ];

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
          <h1>Soil Testing</h1>
          <p>Professional laboratory analysis for informed farming decisions</p>
          <Link
            to={isAuthenticated ? '/dashboard/request' : '/register'}
            className="btn btn-light fw-semibold mt-3 px-4"
            style={{ borderRadius: 10 }}
          >
            Request a Soil Test
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="row g-4">
            {tests.map((t, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <div className="test-card">
                  <img src={t.image} alt={t.name} className="test-card-img" loading="lazy" />
                  <div className="test-card-body">
                    <div className="test-card-title">
                      <span className="test-card-icon">{t.icon}</span>
                      {t.name}
                    </div>
                    <p><strong>Purpose:</strong> {t.purpose}</p>
                    <p><strong>Parameters:</strong> {t.params}</p>
                    <p><strong>Sample:</strong> {t.sample}</p>
                    <p className="mb-0 text-muted small"><strong>Interpretation:</strong> {t.interp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoilTesting;