-- Soil Testing Platform - Supabase Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  mobile VARCHAR(20),
  password TEXT NOT NULL,
  location VARCHAR(255),
  user_type VARCHAR(50) DEFAULT 'Farmer' CHECK (user_type IN ('Farmer', 'Student', 'Researcher', 'Other')),
  role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Soil Samples table
CREATE TABLE IF NOT EXISTS soil_samples (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_id VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  soil_type VARCHAR(100) NOT NULL,
  test_type VARCHAR(150) NOT NULL,
  sample_location VARCHAR(255) NOT NULL,
  land_area VARCHAR(50),
  crop_name VARCHAR(100),
  collection_date DATE,
  additional_notes TEXT,
  document_url TEXT,
  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Sample Received', 'Testing', 'Completed', 'Report Available')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Soil Test Results table
CREATE TABLE IF NOT EXISTS soil_test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sample_id UUID NOT NULL REFERENCES soil_samples(id) ON DELETE CASCADE,
  ph DECIMAL(4,2),
  nitrogen DECIMAL(10,2),
  phosphorus DECIMAL(10,2),
  potassium DECIMAL(10,2),
  organic_carbon DECIMAL(5,2),
  electrical_conductivity DECIMAL(8,3),
  moisture DECIMAL(5,2),
  salinity DECIMAL(8,3),
  micronutrients JSONB,
  interpretation TEXT,
  recommendations TEXT,
  tested_by UUID REFERENCES users(id),
  test_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id VARCHAR(50) UNIQUE NOT NULL,
  sample_id UUID NOT NULL REFERENCES soil_samples(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  result_id UUID REFERENCES soil_test_results(id),
  status VARCHAR(30) DEFAULT 'Generated',
  generated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(30) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category VARCHAR(100) DEFAULT 'General',
  image_url TEXT,
  author_id UUID REFERENCES users(id),
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  subject VARCHAR(255),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Soil Test Types reference table (optional)
CREATE TABLE IF NOT EXISTS soil_test_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(150) NOT NULL UNIQUE,
  description TEXT,
  purpose TEXT,
  parameters TEXT,
  sample_requirements TEXT,
  interpretation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_soil_samples_user_id ON soil_samples(user_id);
CREATE INDEX IF NOT EXISTS idx_soil_samples_status ON soil_samples(status);
CREATE INDEX IF NOT EXISTS idx_soil_samples_request_id ON soil_samples(request_id);
CREATE INDEX IF NOT EXISTS idx_soil_test_results_sample_id ON soil_test_results(sample_id);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(is_published);

-- Disable RLS for service role usage (or configure policies as needed)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE soil_samples ENABLE ROW LEVEL SECURITY;
ALTER TABLE soil_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (policies for anon can be added later)
CREATE POLICY "Service role full access users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access samples" ON soil_samples FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access results" ON soil_test_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access reports" ON reports FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access notifications" ON notifications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access blog" ON blog_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access contact" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
