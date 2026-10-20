-- Seed data for Soil Testing Platform
-- Run AFTER schema.sql
-- 
-- IMPORTANT: Create users via the Register page for correct password hashing.
-- To create an admin: register normally, then run in Supabase SQL Editor:
--   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';

-- Soil Test Types
INSERT INTO soil_test_types (name, description, purpose, parameters, sample_requirements, interpretation) VALUES
('Soil pH Test', 'Measures the acidity or alkalinity of soil', 'Determine soil suitability for crops and lime requirements', 'pH value (0-14 scale)', '500g of dry soil sample from 0-15 cm depth', 'pH 6.0-7.5 is ideal for most crops. Below 6.0 is acidic, above 7.5 is alkaline.'),
('NPK Test', 'Comprehensive test for Nitrogen, Phosphorus and Potassium', 'Assess major nutrient availability for fertilizer recommendations', 'N, P, K levels in kg/ha', '1 kg composite soil sample', 'Compare against crop-specific critical levels for recommendations.'),
('Nitrogen Test', 'Measures available nitrogen content', 'Determine nitrogen fertilizer needs', 'Available Nitrogen (kg/ha)', '500g soil sample', 'Low: <280, Medium: 280-560, High: >560 kg/ha'),
('Phosphorus Test', 'Measures available phosphorus', 'Assess P availability for root development and energy transfer', 'Available Phosphorus (kg/ha)', '500g soil sample', 'Low: <10, Medium: 10-25, High: >25 kg/ha'),
('Potassium Test', 'Measures available potassium', 'Determine K needs for plant health and stress resistance', 'Available Potassium (kg/ha)', '500g soil sample', 'Low: <110, Medium: 110-280, High: >280 kg/ha'),
('Electrical Conductivity Test', 'Measures soil salinity via electrical conductivity', 'Identify salinity issues affecting crop growth', 'EC in dS/m', '250g soil sample', 'EC <1.0 is normal, 1-2 moderate, >4 saline'),
('Organic Carbon Test', 'Measures soil organic matter content', 'Assess soil health and carbon sequestration potential', 'Organic Carbon %', '500g soil sample', 'Low: <0.5%, Medium: 0.5-0.75%, High: >0.75%'),
('Soil Moisture Test', 'Measures current moisture content', 'Irrigation scheduling and drought assessment', 'Moisture %', 'Fresh soil sample in sealed container', 'Optimal range depends on soil type and crop'),
('Soil Salinity Test', 'Detailed salinity analysis', 'Manage salt-affected soils', 'Salinity in dS/m and ion composition', '1 kg soil sample', 'Classify as non-saline, saline, sodic or saline-sodic'),
('Micronutrient Test', 'Tests for Fe, Zn, Mn, Cu, B, Mo', 'Identify micronutrient deficiencies', 'Fe, Zn, Mn, Cu, B, Mo concentrations', '500g soil sample', 'Compare against critical deficiency levels for each element')
ON CONFLICT (name) DO NOTHING;

-- Blog posts
INSERT INTO blog_posts (id, title, content, excerpt, category, is_published) VALUES
('b0000000-0000-0000-0000-000000000001',
 'Why Soil Testing is Essential for Modern Farming',
 'Soil testing is the foundation of productive agriculture. By understanding the nutrient status, pH, and physical properties of your soil, you can make informed decisions about fertilizer application, crop selection, and soil amendments. Regular testing helps prevent over-fertilization, reduces costs, and protects the environment from nutrient runoff.',
 'Discover why regular soil testing is critical for sustainable and profitable farming.',
 'Farming Tips',
 true),
('b0000000-0000-0000-0000-000000000002',
 'Understanding Soil pH and Its Impact on Crop Growth',
 'Soil pH affects nutrient availability more than any other single factor. Most nutrients are optimally available between pH 6.0 and 7.5. Acidic soils can lock up phosphorus while increasing toxicity of aluminum. Alkaline soils reduce availability of iron, zinc, and manganese.',
 'Learn how soil pH influences nutrient availability and what you can do about it.',
 'Soil Science',
 true),
('b0000000-0000-0000-0000-000000000003',
 'NPK Fertilizers: How to Use Soil Test Results',
 'Nitrogen, Phosphorus, and Potassium are the primary macronutrients. Soil test results tell you the current levels so you can apply only what is needed. Balanced application based on soil tests improves efficiency and protects the environment.',
 'A practical guide to interpreting NPK results and applying fertilizers correctly.',
 'Fertilizers',
 true)
ON CONFLICT DO NOTHING;
