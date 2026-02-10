-- Insert test data for BioXLab

-- Insert Test Categories
INSERT INTO test_category (name, description) VALUES
('Blood Tests', 'Comprehensive blood analysis including CBC, blood chemistry, and more'),
('Urine Tests', 'Urinalysis and urine culture tests'),
('Radiology', 'X-rays, CT scans, MRI, and ultrasound imaging'),
('Pathology', 'Tissue and cell examination for disease detection'),
('Microbiology', 'Tests for bacteria, viruses, and other microorganisms'),
('Immunology', 'Tests for immune system function and antibodies'),
('Cardiac Tests', 'Heart health assessments including ECG and stress tests'),
('Diabetes Tests', 'Blood sugar monitoring and diabetes screening');

-- Insert Tests
INSERT INTO tests (name, description, price, test_category_id) VALUES
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

-- Insert Lab Branches
INSERT INTO lab_branches (name, address, phone, email) VALUES
('BioXLab Central Branch', '123 Medical Plaza, Downtown, Main City, 10001', '+1-555-0101', 'central@bioxlab.com'),
('BioXLab North Branch', '456 Health Avenue, North District, Main City, 10002', '+1-555-0102', 'north@bioxlab.com'),
('BioXLab East Branch', '789 Wellness Street, East Side, Main City, 10003', '+1-555-0103', 'east@bioxlab.com'),
('BioXLab West Branch', '321 Care Boulevard, West End, Main City, 10004', '+1-555-0104', 'west@bioxlab.com'),
('BioXLab South Branch', '654 Clinic Road, South Quarter, Main City, 10005', '+1-555-0105', 'south@bioxlab.com');

-- Insert a few sample bookings (for the existing admin user)
INSERT INTO bookings (user_id, lab_branch_id, booking_date, status) VALUES
((SELECT id FROM users WHERE email = 'admin@bioxlab.com'), 
 (SELECT id FROM lab_branches WHERE name = 'BioXLab Central Branch'),
 '2026-02-10', 
 'pending'),
 
((SELECT id FROM users WHERE email = 'admin@bioxlab.com'), 
 (SELECT id FROM lab_branches WHERE name = 'BioXLab North Branch'),
 '2026-02-15', 
 'confirmed');

-- Link tests to bookings
INSERT INTO tests_bookings (booking_id, test_id, result, doc_link) VALUES
((SELECT id FROM bookings WHERE booking_date = '2026-02-10' LIMIT 1),
 (SELECT id FROM tests WHERE name = 'Complete Blood Count (CBC)'),
 NULL, NULL),
 
((SELECT id FROM bookings WHERE booking_date = '2026-02-10' LIMIT 1),
 (SELECT id FROM tests WHERE name = 'Lipid Profile'),
 NULL, NULL),
 
((SELECT id FROM bookings WHERE booking_date = '2026-02-15' LIMIT 1),
 (SELECT id FROM tests WHERE name = 'Thyroid Profile'),
 NULL, NULL);

-- Verify the data
SELECT 'Test Categories:' as info, COUNT(*) as count FROM test_category
UNION ALL
SELECT 'Tests:', COUNT(*) FROM tests
UNION ALL
SELECT 'Lab Branches:', COUNT(*) FROM lab_branches
UNION ALL
SELECT 'Bookings:', COUNT(*) FROM bookings
UNION ALL
SELECT 'Test Bookings:', COUNT(*) FROM tests_bookings;

-- Show sample data
SELECT tc.name as category, COUNT(t.id) as test_count
FROM test_category tc
LEFT JOIN tests t ON t.test_category_id = tc.id
GROUP BY tc.name
ORDER BY tc.name;
