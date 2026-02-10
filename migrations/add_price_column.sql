-- Add missing price column to tests table
ALTER TABLE tests ADD COLUMN IF NOT EXISTS price DECIMAL(10, 2);

-- Verify the column was added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'tests' 
ORDER BY ordinal_position;
