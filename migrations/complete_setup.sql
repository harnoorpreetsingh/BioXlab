-- =====================================================
-- BioXLab Complete Database Setup
-- This file contains all database migrations and test data
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- SECTION 1: Create Enums and Core Tables
-- =====================================================

-- Create role enum (only if it doesn't exist)
DO $$ BEGIN
  CREATE TYPE role_enum AS ENUM ('admin', 'user');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255),
  date_of_birth DATE NOT NULL,
  gender VARCHAR(50) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  role role_enum DEFAULT 'user',
  auth_id UUID,
  password VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for users
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_auth_id ON users(auth_id);

-- Create test_category table
CREATE TABLE IF NOT EXISTS test_category (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create tests table
CREATE TABLE IF NOT EXISTS tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (category) REFERENCES test_category(id) ON DELETE CASCADE
);

-- Create lab_branches table
CREATE TABLE IF NOT EXISTS lab_branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  lab UUID NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (lab) REFERENCES lab_branches(id) ON DELETE CASCADE
);

-- Create tests_bookings junction table
CREATE TABLE IF NOT EXISTS tests_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID NOT NULL,
  test_id UUID NOT NULL,
  result_value TEXT,
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (test_id) REFERENCES tests(id) ON DELETE CASCADE
);

-- =====================================================
-- SECTION 2: NextAuth Tables
-- =====================================================

-- Create accounts table for NextAuth
CREATE TABLE IF NOT EXISTS accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(255),
  scope TEXT,
  id_token TEXT,
  session_state VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE (provider, provider_account_id)
);

CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);

-- Create sessions table for NextAuth
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_token VARCHAR(255) UNIQUE NOT NULL,
  user_id UUID NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

-- Create verification_tokens table for NextAuth
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (identifier, token)
);

-- =====================================================
-- SECTION 3: Insert Test Users
-- =====================================================

-- Admin user: admin@bioxlab.com / admin123
INSERT INTO users (
  email,
  password,
  first_name,
  last_name,
  date_of_birth,
  gender,
  address,
  phone,
  role
) VALUES (
  'admin@bioxlab.com',
  '$2b$10$kaJ3kyRC5cNVM.3truS3qu2wn6aEUq4VRe7IKmHvDMcqj/qjK23eC',
  'Admin',
  'User',
  '1990-01-01',
  'Other',
  '123 Lab Street, Test City',
  '+1234567890',
  'admin'
) ON CONFLICT (email) DO NOTHING;

-- Regular user: user@bioxlab.com / user123
INSERT INTO users (
  email,
  password,
  first_name,
  last_name,
  date_of_birth,
  gender,
  address,
  phone,
  role
) VALUES (
  'user@bioxlab.com',
  '$2a$10$CwTycUXWue0Thq9StjUM0uJ8qd4rWOTLx8NU35n5Mf5sHp5pYhYrS',
  'Test',
  'User',
  '1995-05-15',
  'Male',
  '456 Patient Avenue, Test City',
  '+9876543210',
  'user'
) ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- SECTION 4: Insert Test Categories
-- =====================================================

INSERT INTO test_category (name, description) VALUES
('Blood Tests', 'Comprehensive blood analysis including CBC, blood chemistry, and more'),
('Urine Tests', 'Urinalysis and urine culture tests'),
('Radiology', 'X-rays, CT scans, MRI, and ultrasound imaging'),
('Pathology', 'Tissue and cell examination for disease detection'),
('Microbiology', 'Tests for bacteria, viruses, and other microorganisms'),
('Immunology', 'Tests for immune system function and antibodies'),
('Cardiac Tests', 'Heart health assessments including ECG and stress tests'),
('Diabetes Tests', 'Blood sugar monitoring and diabetes screening');

-- =====================================================
-- SECTION 5: Insert Tests
-- =====================================================

INSERT INTO tests (name, description, price, category) VALUES
-- Blood Tests
('Complete Blood Count (CBC)', 'Measures red blood cells, white blood cells, hemoglobin, and platelets', 500, (SELECT id FROM test_category WHERE name = 'Blood Tests')),
('Lipid Profile', 'Cholesterol and triglyceride levels test', 800, (SELECT id FROM test_category WHERE name = 'Blood Tests')),
('Liver Function Test (LFT)', 'Tests liver enzymes and protein levels', 900, (SELECT id FROM test_category WHERE name = 'Blood Tests')),
('Kidney Function Test', 'Measures creatinine, urea, and electrolytes', 850, (SELECT id FROM test_category WHERE name = 'Blood Tests')),
('Thyroid Profile', 'TSH, T3, and T4 hormone levels', 1200, (SELECT id FROM test_category WHERE name = 'Blood Tests')),
('Vitamin D Test', 'Measures vitamin D levels in blood', 1500, (SELECT id FROM test_category WHERE name = 'Blood Tests')),
('Iron Studies', 'Serum iron, ferritin, and TIBC levels', 950, (SELECT id FROM test_category WHERE name = 'Blood Tests')),

-- Urine Tests
('Routine Urine Analysis', 'Physical, chemical, and microscopic examination of urine', 300, (SELECT id FROM test_category WHERE name = 'Urine Tests')),
('Urine Culture', 'Detects bacteria and other organisms in urine', 600, (SELECT id FROM test_category WHERE name = 'Urine Tests')),
('24-Hour Urine Protein', 'Measures protein excretion over 24 hours', 800, (SELECT id FROM test_category WHERE name = 'Urine Tests')),

-- Radiology
('Chest X-Ray', 'Imaging of chest, lungs, and heart', 1200, (SELECT id FROM test_category WHERE name = 'Radiology')),
('Abdominal Ultrasound', 'Ultrasound imaging of abdominal organs', 2500, (SELECT id FROM test_category WHERE name = 'Radiology')),
('CT Scan - Head', 'Computed tomography scan of the head', 5000, (SELECT id FROM test_category WHERE name = 'Radiology')),
('MRI - Spine', 'Magnetic resonance imaging of the spine', 8000, (SELECT id FROM test_category WHERE name = 'Radiology')),

-- Pathology
('Biopsy Analysis', 'Microscopic examination of tissue samples', 3500, (SELECT id FROM test_category WHERE name = 'Pathology')),
('Pap Smear', 'Cervical cancer screening test', 1500, (SELECT id FROM test_category WHERE name = 'Pathology')),

-- Microbiology
('Blood Culture', 'Detects bacteria or fungi in blood', 1200, (SELECT id FROM test_category WHERE name = 'Microbiology')),
('Throat Swab Culture', 'Identifies bacteria causing throat infections', 700, (SELECT id FROM test_category WHERE name = 'Microbiology')),
('Stool Culture', 'Detects bacteria, parasites in stool', 900, (SELECT id FROM test_category WHERE name = 'Microbiology')),

-- Immunology
('COVID-19 Antibody Test', 'Detects antibodies against SARS-CoV-2', 1800, (SELECT id FROM test_category WHERE name = 'Immunology')),
('Allergy Panel', 'Tests for common allergen sensitivities', 3500, (SELECT id FROM test_category WHERE name = 'Immunology')),
('HIV Test', 'Screening for HIV antibodies', 1200, (SELECT id FROM test_category WHERE name = 'Immunology')),

-- Cardiac Tests
('ECG (Electrocardiogram)', 'Records electrical activity of the heart', 800, (SELECT id FROM test_category WHERE name = 'Cardiac Tests')),
('Echocardiogram', 'Ultrasound of the heart', 3500, (SELECT id FROM test_category WHERE name = 'Cardiac Tests')),
('Stress Test', 'Measures heart performance during exercise', 4000, (SELECT id FROM test_category WHERE name = 'Cardiac Tests')),

-- Diabetes Tests
('Fasting Blood Sugar', 'Measures blood glucose after fasting', 300, (SELECT id FROM test_category WHERE name = 'Diabetes Tests')),
('HbA1c (Glycated Hemoglobin)', 'Average blood sugar levels over 3 months', 900, (SELECT id FROM test_category WHERE name = 'Diabetes Tests')),
('Glucose Tolerance Test', 'Tests how body processes sugar', 1200, (SELECT id FROM test_category WHERE name = 'Diabetes Tests'));

-- =====================================================
-- SECTION 6: Insert Lab Branches
-- =====================================================

INSERT INTO lab_branches (name, address, phone, email) VALUES
('BioXLab Central Branch', '123 Medical Plaza, Downtown, Main City, 10001', '+1-555-0101', 'central@bioxlab.com'),
('BioXLab North Branch', '456 Health Avenue, North District, Main City, 10002', '+1-555-0102', 'north@bioxlab.com'),
('BioXLab East Branch', '789 Wellness Street, East Side, Main City, 10003', '+1-555-0103', 'east@bioxlab.com'),
('BioXLab West Branch', '321 Care Boulevard, West End, Main City, 10004', '+1-555-0104', 'west@bioxlab.com'),
('BioXLab South Branch', '654 Clinic Road, South Quarter, Main City, 10005', '+1-555-0105', 'south@bioxlab.com');

-- =====================================================
-- SECTION 7: Insert Sample Bookings
-- =====================================================

INSERT INTO bookings (user_id, lab, date, status) VALUES
((SELECT id FROM users WHERE email = 'admin@bioxlab.com'), 
 (SELECT id FROM lab_branches WHERE name = 'BioXLab Central Branch'),
 '2026-02-10', 
 'pending'),
 
((SELECT id FROM users WHERE email = 'admin@bioxlab.com'), 
 (SELECT id FROM lab_branches WHERE name = 'BioXLab North Branch'),
 '2026-02-15', 
 'confirmed');

-- =====================================================
-- SECTION 8: Link Tests to Bookings
-- =====================================================

INSERT INTO tests_bookings (booking_id, test_id, result_value, remarks) VALUES
((SELECT id FROM bookings WHERE date = '2026-02-10' LIMIT 1),
 (SELECT id FROM tests WHERE name = 'Complete Blood Count (CBC)'),
 NULL, NULL),
 
((SELECT id FROM bookings WHERE date = '2026-02-10' LIMIT 1),
 (SELECT id FROM tests WHERE name = 'Lipid Profile'),
 NULL, NULL),
 
((SELECT id FROM bookings WHERE date = '2026-02-15' LIMIT 1),
 (SELECT id FROM tests WHERE name = 'Thyroid Profile'),
 NULL, NULL);

-- =====================================================
-- SECTION 9: Verification Queries
-- =====================================================

SELECT 'Database Setup Complete!' as message;

SELECT 
  'Test Categories' as data_type, 
  COUNT(*) as count 
FROM test_category
UNION ALL
SELECT 'Tests', COUNT(*) FROM tests
UNION ALL
SELECT 'Lab Branches', COUNT(*) FROM lab_branches
UNION ALL
SELECT 'Users', COUNT(*) FROM users
UNION ALL
SELECT 'Bookings', COUNT(*) FROM bookings
UNION ALL
SELECT 'Test Bookings', COUNT(*) FROM tests_bookings;

-- Show test distribution by category
SELECT 
  tc.name as category, 
  COUNT(t.id) as test_count
FROM test_category tc
LEFT JOIN tests t ON t.category = tc.id
GROUP BY tc.name
ORDER BY tc.name;

-- Verify users created
SELECT 
  email, 
  first_name, 
  last_name, 
  role, 
  created_at 
FROM users 
ORDER BY role DESC, email;
