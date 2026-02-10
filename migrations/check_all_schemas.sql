-- Get complete schema for all tables in the database
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default,
    ordinal_position
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('users', 'test_category', 'tests', 'lab_branches', 'bookings', 'tests_bookings', 'accounts', 'sessions', 'verification_tokens')
ORDER BY table_name, ordinal_position;
