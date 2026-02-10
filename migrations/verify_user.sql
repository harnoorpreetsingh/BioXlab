-- Verify admin user exists with correct data
SELECT 
  id, 
  email, 
  first_name, 
  last_name, 
  role,
  password IS NOT NULL as has_password,
  LENGTH(password) as password_length,
  SUBSTRING(password, 1, 10) as password_start
FROM users 
WHERE email = 'admin@bioxlab.com';
