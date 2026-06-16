-- Drop existing articles table if it exists
DROP TABLE IF EXISTS articles;

-- Create the new articles table
CREATE TABLE articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    category TEXT NOT NULL CHECK (category IN ('btech', 'mba', 'mtech', 'mbbs', 'bds', 'bsc nursing')),
    sub_category TEXT DEFAULT 'General',
    tag TEXT,
    read_time TEXT,
    date TEXT,
    author TEXT,
    author_role TEXT,
    views TEXT DEFAULT '0',
    image TEXT,
    is_hot BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced', 'expert')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read access" ON articles
    FOR SELECT USING (true);

-- Seed data for 11 articles in each category
INSERT INTO articles (title, excerpt, category, sub_category, tag, read_time, date, author, author_role, views, image, is_hot, is_featured, level)
VALUES 
-- B.TECH (11 Articles)
('B.Tech Admission Guide 2026', 'Everything you need to know about JEE and JOSAA.', 'btech', 'Admission Guide', 'Must Read', '15 min', 'Apr 20, 2026', 'Ritesh Rastogi', 'MD & Founder', '1.2L', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1', true, true, 'beginner'),
('Top 10 Private Engineering Colleges', 'Reviewing placements and ROI for top private universities.', 'btech', 'College Reviews', 'Rankings', '12 min', 'Apr 18, 2026', 'Aman Rastogi', 'Managing Director', '85K', 'https://images.unsplash.com/photo-1562774053-701939374585', false, true, 'intermediate'),
('CSE vs ECE: Which Branch to Choose?', 'A deep dive into the two most popular engineering branches.', 'btech', 'Specializations', 'Comparison', '10 min', 'Apr 15, 2026', 'Somnath Ghosh', 'Head of Operations', '92K', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', true, false, 'beginner'),
('JEE Main Strategy for 99 Percentile', 'Tips from toppers on how to ace the JEE Main exam.', 'btech', 'Exams', 'Study Tips', '20 min', 'Apr 10, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '1.5L', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173', true, true, 'beginner'),
('B.Tech Placement Trends 2026', 'What skills are companies looking for this year?', 'btech', 'Careers & Salaries', 'Data Report', '14 min', 'Apr 05, 2026', 'Ritu Choudhury', 'Media Head', '78K', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c', false, false, 'advanced'),
('Life as an IITian: Reality Check', 'Beyond the brand name — what campus life is actually like.', 'btech', 'Campus Life', 'Personal Story', '11 min', 'Mar 30, 2026', 'Ritesh Rastogi', 'MD & Founder', '2.1L', 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3', true, true, 'beginner'),
('Is Civil Engineering Still Worth It?', 'Future scope and job opportunities in traditional branches.', 'btech', 'Specializations', 'Analysis', '9 min', 'Mar 25, 2026', 'Aman Rastogi', 'Managing Director', '45K', 'https://images.unsplash.com/photo-1503387762-592dea58ef21', false, false, 'intermediate'),
('Coding vs Non-Coding Jobs', 'Career paths for engineering students who dont want to code.', 'btech', 'Careers & Salaries', 'Career Map', '13 min', 'Mar 20, 2026', 'Somnath Ghosh', 'Head of Operations', '67K', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085', false, true, 'advanced'),
('BITSAT 2026 Preparation Guide', 'How to crack the BITS Admission Test in 3 months.', 'btech', 'Exams', 'Strategy', '16 min', 'Mar 15, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '54K', 'https://images.unsplash.com/photo-1454165833222-d1d44d26738f', false, false, 'intermediate'),
('Top 5 NITs for Placements', 'Comparing the top National Institutes of Technology.', 'btech', 'College Reviews', 'Comparison', '14 min', 'Mar 10, 2026', 'Ritu Choudhury', 'Media Head', '89K', 'https://images.unsplash.com/photo-1562774053-701939374585', true, false, 'beginner'),
('AI/ML Specialization in B.Tech', 'Why everyone is choosing AI/ML in 2026.', 'btech', 'Specializations', 'Trending', '11 min', 'Mar 05, 2026', 'Aman Rastogi', 'Managing Director', '1.1L', 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01', true, true, 'beginner'),

-- MBA (11 Articles)
('MBA Admission Roadmap 2026', 'From CAT to IIM interviews, the complete guide.', 'mba', 'Admission Guide', 'Must Read', '18 min', 'Apr 21, 2026', 'Aman Rastogi', 'Managing Director', '95K', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644', true, true, 'beginner'),
('Top 10 Business Schools in India', 'NIRF 2026 rankings for management institutes.', 'mba', 'College Reviews', 'Rankings', '14 min', 'Apr 19, 2026', 'Ritesh Rastogi', 'MD & Founder', '1.2L', 'https://images.unsplash.com/photo-1497366216548-37526070297c', false, true, 'intermediate'),
('MBA in Marketing vs Finance', 'Which specialization offers better career growth?', 'mba', 'Specializations', 'Comparison', '12 min', 'Apr 16, 2026', 'Somnath Ghosh', 'Head of Operations', '78K', 'https://images.unsplash.com/photo-1454165833222-d1d44d26738f', true, false, 'beginner'),
('CAT 2026 Prep Strategy', 'How to score 99.9 percentile in CAT.', 'mba', 'Exams', 'Study Tips', '22 min', 'Apr 12, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '1.4L', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173', true, true, 'beginner'),
('ROI of an Executive MBA', 'Is it worth doing an MBA after 5+ years of experience?', 'mba', 'Careers & Salaries', 'Data Report', '15 min', 'Apr 07, 2026', 'Ritu Choudhury', 'Media Head', '67K', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf', false, false, 'advanced'),
('Life at IIM Ahmedabad', 'A day in the life of an MBA student.', 'mba', 'Campus Life', 'Personal Story', '13 min', 'Apr 02, 2026', 'Aman Rastogi', 'Managing Director', '1.9L', 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1', true, true, 'beginner'),
('Is an Online MBA Worth It?', 'Evaluating the value of online degrees from top universities.', 'mba', 'Specializations', 'Analysis', '10 min', 'Mar 28, 2026', 'Somnath Ghosh', 'Head of Operations', '54K', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8', false, false, 'intermediate'),
('MBA Salary Reports 2026', 'Starting packages for freshers at top b-schools.', 'mba', 'Careers & Salaries', 'Career Map', '14 min', 'Mar 23, 2026', 'Ritu Choudhury', 'Media Head', '82K', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c', false, true, 'advanced'),
('GMAT vs GRE for MBA', 'Which exam should you take for international admissions?', 'mba', 'Exams', 'Strategy', '17 min', 'Mar 18, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '41K', 'https://images.unsplash.com/photo-1454165833222-d1d44d26738f', false, false, 'intermediate'),
('Top 5 Private MBA Colleges', 'Looking beyond the IIMs for quality education.', 'mba', 'College Reviews', 'Comparison', '15 min', 'Mar 13, 2026', 'Ritesh Rastogi', 'MD & Founder', '63K', 'https://images.unsplash.com/photo-1497366216548-37526070297c', true, false, 'beginner'),
('Business Analytics: The Future MBA', 'Why data is the new oil in management.', 'mba', 'Specializations', 'Trending', '12 min', 'Mar 08, 2026', 'Somnath Ghosh', 'Head of Operations', '1.1L', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71', true, true, 'beginner'),

-- M.TECH (11 Articles)
('M.Tech Admission Roadmap 2026', 'Steps after cracking the GATE exam.', 'mtech', 'Admission Guide', 'Must Read', '16 min', 'Apr 22, 2026', 'Somnath Ghosh', 'Head of Operations', '42K', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', true, true, 'beginner'),
('Top M.Tech Specializations', 'Which branch should you pick for research?', 'mtech', 'Specializations', 'Analysis', '13 min', 'Apr 20, 2026', 'Aman Rastogi', 'Managing Director', '38K', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', false, true, 'intermediate'),
('GATE 2026 Prep Guide', 'Subject-wise weightage and study plan.', 'mtech', 'Exams', 'Study Tips', '20 min', 'Apr 17, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '65K', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173', true, true, 'beginner'),
('M.Tech vs MS Abroad', 'Pros and cons of staying in India for masters.', 'mtech', 'Specializations', 'Comparison', '15 min', 'Apr 14, 2026', 'Ritesh Rastogi', 'MD & Founder', '54K', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644', true, false, 'beginner'),
('Stipend and Benefits for M.Tech', 'Financial aid available for GATE-qualified students.', 'mtech', 'Careers & Salaries', 'Data Report', '11 min', 'Apr 09, 2026', 'Ritu Choudhury', 'Media Head', '29K', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c', false, false, 'advanced'),
('Research at IITs: My Experience', 'What it means to be a research scholar in India.', 'mtech', 'Campus Life', 'Personal Story', '14 min', 'Apr 04, 2026', 'Somnath Ghosh', 'Head of Operations', '48K', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', true, true, 'beginner'),
('Part-time M.Tech for Professionals', 'How to balance work and higher education.', 'mtech', 'Specializations', 'Analysis', '12 min', 'Mar 30, 2026', 'Aman Rastogi', 'Managing Director', '21K', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644', false, false, 'intermediate'),
('M.Tech Placement Reports 2026', 'Average packages for postgraduate engineers.', 'mtech', 'Careers & Salaries', 'Career Map', '14 min', 'Mar 25, 2026', 'Ritu Choudhury', 'Media Head', '35K', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c', false, true, 'advanced'),
('Direct Admission to M.Tech', 'Options available without a GATE score.', 'mtech', 'Exams', 'Strategy', '16 min', 'Mar 20, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '18K', 'https://images.unsplash.com/photo-1454165833222-d1d44d26738f', false, false, 'intermediate'),
('Top 5 Colleges for M.Tech', 'Beyond the IITs for masters in engineering.', 'mtech', 'College Reviews', 'Comparison', '15 min', 'Mar 15, 2026', 'Ritesh Rastogi', 'MD & Founder', '27K', 'https://images.unsplash.com/photo-1562774053-701939374585', true, false, 'beginner'),
('VLSI Design: The Hottest M.Tech Branch', 'Why semiconductor design is booming in India.', 'mtech', 'Specializations', 'Trending', '13 min', 'Mar 10, 2026', 'Somnath Ghosh', 'Head of Operations', '44K', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158', true, true, 'beginner'),

-- MBBS (11 Articles)
('MBBS Admission Guide 2026', 'Navigating NEET and MCC counseling.', 'mbbs', 'Admission Guide', 'Must Read', '18 min', 'Apr 20, 2026', 'Ritesh Rastogi', 'MD & Founder', '1.4L', 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133', true, true, 'beginner'),
('Top 10 Medical Colleges in India', 'Reviews and cutoffs for premier medical institutes.', 'mbbs', 'College Reviews', 'Rankings', '15 min', 'Apr 18, 2026', 'Aman Rastogi', 'Managing Director', '1.1L', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d', false, true, 'intermediate'),
('MD vs MS: PG Specializations', 'Which path should you choose after MBBS?', 'mbbs', 'Specializations', 'Comparison', '14 min', 'Apr 15, 2026', 'Somnath Ghosh', 'Head of Operations', '92K', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118', true, false, 'beginner'),
('NEET UG 2026 Prep Strategy', 'How to score 700+ in NEET.', 'mbbs', 'Exams', 'Study Tips', '25 min', 'Apr 10, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '2.5L', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d', true, true, 'beginner'),
('Doctor Salaries in India 2026', 'What to expect as a fresher vs specialist.', 'mbbs', 'Careers & Salaries', 'Data Report', '16 min', 'Apr 05, 2026', 'Ritu Choudhury', 'Media Head', '1.2L', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef', false, false, 'advanced'),
('Life in a Govt Medical College', 'Dissection halls, ward rounds, and long hours.', 'mbbs', 'Campus Life', 'Personal Story', '15 min', 'Mar 30, 2026', 'Ritesh Rastogi', 'MD & Founder', '1.8L', 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed', true, true, 'beginner'),
('MBBS Abroad: Russia vs Georgia vs India', 'Is it worth going outside for your medical degree?', 'mbbs', 'Specializations', 'Analysis', '12 min', 'Mar 25, 2026', 'Aman Rastogi', 'Managing Director', '84K', 'https://images.unsplash.com/photo-1504813184591-01572f98c85f', false, false, 'intermediate'),
('Clinical Postings: My Survival Guide', 'Tips for third-year medical students.', 'mbbs', 'Campus Life', 'Guide', '13 min', 'Mar 20, 2026', 'Somnath Ghosh', 'Head of Operations', '56K', 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed', false, true, 'advanced'),
('NEET PG 2026 Changes', 'Everything you need to know about NEXT and NBE.', 'mbbs', 'Exams', 'Strategy', '18 min', 'Mar 15, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '1.1L', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d', false, false, 'intermediate'),
('Top 5 Private Medical Colleges', 'Infrastructure and patient flow analysis.', 'mbbs', 'College Reviews', 'Comparison', '15 min', 'Mar 10, 2026', 'Ritu Choudhury', 'Media Head', '72K', 'https://images.unsplash.com/photo-1538108149393-fbbd81895907', true, false, 'beginner'),
('USMLE Step 1 Prep Guide', 'Path to practicing medicine in the USA.', 'mbbs', 'Specializations', 'Trending', '20 min', 'Mar 05, 2026', 'Aman Rastogi', 'Managing Director', '94K', 'https://images.unsplash.com/photo-1504813184591-01572f98c85f', true, true, 'beginner'),

-- BDS (11 Articles)
('BDS Admission Guide 2026', 'How to pick the right dental college.', 'bds', 'Admission Guide', 'Must Read', '14 min', 'Apr 21, 2026', 'Somnath Ghosh', 'Head of Operations', '32K', 'https://images.unsplash.com/photo-1629679019933-2c2500096647', true, true, 'beginner'),
('Career Scope in Dentistry', 'MDS, Private Practice, and Overseas options.', 'bds', 'Specializations', 'Analysis', '12 min', 'Apr 19, 2026', 'Ritesh Rastogi', 'MD & Founder', '28K', 'https://images.unsplash.com/photo-1629679019933-2c2500096647', false, true, 'intermediate'),
('Top 10 Dental Colleges in India', 'Reviews of government and private BDS institutes.', 'bds', 'College Reviews', 'Rankings', '13 min', 'Apr 16, 2026', 'Aman Rastogi', 'Managing Director', '45K', 'https://images.unsplash.com/photo-1562774053-701939374585', true, false, 'beginner'),
('BDS vs MBBS: The Honest Truth', 'Comparing study load and career outcomes.', 'bds', 'Specializations', 'Comparison', '15 min', 'Apr 12, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '88K', 'https://images.unsplash.com/photo-1579684385127-1ef15d508118', true, true, 'beginner'),
('Starting a Dental Clinic: Costs', 'Financial planning for BDS graduates.', 'bds', 'Careers & Salaries', 'Data Report', '16 min', 'Apr 07, 2026', 'Ritu Choudhury', 'Media Head', '34K', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c', false, false, 'advanced'),
('Life as a Dental Intern', 'Prosthodontics, Surgery, and Patient Management.', 'bds', 'Campus Life', 'Personal Story', '12 min', 'Apr 02, 2026', 'Somnath Ghosh', 'Head of Operations', '25K', 'https://images.unsplash.com/photo-1629679019933-2c2500096647', true, true, 'beginner'),
('Is BDS Worth It in 2026?', 'Evaluating the market saturation and opportunities.', 'bds', 'Specializations', 'Analysis', '11 min', 'Mar 28, 2026', 'Aman Rastogi', 'Managing Director', '56K', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8', false, false, 'intermediate'),
('MDS Entrance Exam Tips', 'How to crack NEET MDS.', 'bds', 'Exams', 'Strategy', '18 min', 'Mar 23, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '42K', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173', false, true, 'advanced'),
('Overseas Dental Licensing', 'Practicing in the UK, USA, or Australia after BDS.', 'bds', 'Specializations', 'Guide', '17 min', 'Mar 18, 2026', 'Ritu Choudhury', 'Media Head', '21K', 'https://images.unsplash.com/photo-1454165833222-d1d44d26738f', false, false, 'intermediate'),
('Top 5 Cities for Dentists', 'Where is the highest demand for BDS graduates?', 'bds', 'Careers & Salaries', 'Career Map', '14 min', 'Mar 13, 2026', 'Ritesh Rastogi', 'MD & Founder', '19K', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c', true, false, 'beginner'),
('Digital Dentistry: The New Era', 'How technology is changing dental practice.', 'bds', 'Specializations', 'Trending', '12 min', 'Mar 08, 2026', 'Somnath Ghosh', 'Head of Operations', '15K', 'https://images.unsplash.com/photo-1629679019933-2c2500096647', true, true, 'beginner'),

-- B.SC NURSING (11 Articles)
('B.Sc Nursing Admission 2026', 'Guide to AIIMS and State Nursing exams.', 'bsc nursing', 'Admission Guide', 'Must Read', '15 min', 'Apr 22, 2026', 'Ritesh Rastogi', 'MD & Founder', '41K', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef', true, true, 'beginner'),
('Career Pathways in Nursing', 'From Hospital jobs to Research and Education.', 'bsc nursing', 'Specializations', 'Analysis', '13 min', 'Apr 20, 2026', 'Aman Rastogi', 'Managing Director', '34K', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef', false, true, 'intermediate'),
('Top Nursing Colleges in India', 'Reviews of premier nursing institutes.', 'bsc nursing', 'College Reviews', 'Rankings', '14 min', 'Apr 17, 2026', 'Somnath Ghosh', 'Head of Operations', '52K', 'https://images.unsplash.com/photo-1562774053-701939374585', true, false, 'beginner'),
('Nursing in India vs Abroad', 'Opportunities in the UK, USA, and Middle East.', 'bsc nursing', 'Specializations', 'Comparison', '16 min', 'Apr 14, 2026', 'Ritu Choudhury', 'Media Head', '89K', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644', true, true, 'beginner'),
('Salary Expectations for Nurses', 'Starting pay and growth in private vs govt hospitals.', 'bsc nursing', 'Careers & Salaries', 'Data Report', '12 min', 'Apr 09, 2026', 'Ritesh Rastogi', 'MD & Founder', '45K', 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c', false, false, 'advanced'),
('Life as a Nursing Student', 'Clinical rotations, theory exams, and duty hours.', 'bsc nursing', 'Campus Life', 'Personal Story', '14 min', 'Apr 04, 2026', 'Somnath Ghosh', 'Head of Operations', '28K', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef', true, true, 'beginner'),
('Post Basic B.Sc Nursing: Who is it for?', 'Bridging the gap between GNM and a degree.', 'bsc nursing', 'Specializations', 'Analysis', '11 min', 'Mar 30, 2026', 'Aman Rastogi', 'Managing Director', '19K', 'https://images.unsplash.com/photo-1501504905252-473c47e087f8', false, false, 'intermediate'),
('Preparation for Nursing Exams', 'Tips for AIIMS and CET nursing papers.', 'bsc nursing', 'Exams', 'Study Tips', '17 min', 'Mar 25, 2026', 'Prothoma Ghosh', 'Head Tele-Counselor', '36K', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173', false, true, 'advanced'),
('Specializations in Nursing: Critical Care', 'Becoming an ICU or ER specialist nurse.', 'bsc nursing', 'Specializations', 'Guide', '13 min', 'Mar 20, 2026', 'Ritu Choudhury', 'Media Head', '24K', 'https://images.unsplash.com/photo-1454165833222-d1d44d26738f', false, false, 'intermediate'),
('Top 5 Govt Nursing Colleges', 'Where to get quality education at low costs.', 'bsc nursing', 'College Reviews', 'Comparison', '15 min', 'Mar 15, 2026', 'Ritesh Rastogi', 'MD & Founder', '31K', 'https://images.unsplash.com/photo-1562774053-701939374585', true, false, 'beginner'),
('Male Nursing: Breaking the Stereotype', 'Career growth for male nurses in 2026.', 'bsc nursing', 'Careers & Salaries', 'Trending', '12 min', 'Mar 10, 2026', 'Somnath Ghosh', 'Head of Operations', '12K', 'https://images.unsplash.com/photo-1576091160550-2173dba999ef', true, true, 'beginner');
