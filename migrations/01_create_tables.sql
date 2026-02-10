-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for role
CREATE TYPE role_enum AS ENUM ('admin', 'user');

-- Create users table (removed auth.users reference for local DB)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  role role_enum NOT NULL DEFAULT 'user',
  auth_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create test_category table
CREATE TABLE test_category (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tests table
CREATE TABLE tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category UUID REFERENCES test_category(id),
  description TEXT,
  duration INTERVAL,
  cost DECIMAL,
  ideal_range TEXT,
  popular BOOLEAN DEFAULT false,
  preparation TEXT,
  report_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create lab_branches table
CREATE TABLE lab_branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  opening_hours TEXT,
  manager_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table (removed doctor table and performed_by)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  status TEXT,
  date DATE,
  lab UUID REFERENCES lab_branches(id),
  total_price DECIMAL,
  collection_location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tests_bookings table
CREATE TABLE tests_bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES bookings(id),
  test_id UUID REFERENCES tests(id),
  result_value TEXT,
  remarks TEXT,
  performed_at TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_auth_id ON users(auth_id);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_tests_category ON tests(category);
CREATE INDEX idx_tests_bookings_booking_id ON tests_bookings(booking_id);
CREATE INDEX idx_tests_bookings_test_id ON tests_bookings(test_id);
