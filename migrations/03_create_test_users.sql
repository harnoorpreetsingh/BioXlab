-- Create a test user for BioXLab
-- Email: admin@bioxlab.com
-- Password: admin123

-- First, hash the password using bcrypt
-- Password: admin123
-- Bcrypt hash: $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy

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
  '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
  'Admin',
  'User',
  '1990-01-01',
  'Other',
  '123 Lab Street, Test City',
  '+1234567890',
  'admin'
);

-- Create a regular test user
-- Email: user@bioxlab.com
-- Password: user123

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
);

-- Verify the users were created
SELECT id, email, first_name, last_name, role, created_at 
FROM users 
WHERE email IN ('admin@bioxlab.com', 'user@bioxlab.com');
