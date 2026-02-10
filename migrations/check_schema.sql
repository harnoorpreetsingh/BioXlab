-- Check current schema of tests table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'tests'
ORDER BY ordinal_position;
