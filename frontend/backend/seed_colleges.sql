-- =============================================================
-- SEED: colleges
-- Exact schema: id, name, slug, location, state, stream,
--               established, ownership, nirf_rank, avg_package,
--               highest_package, description
-- =============================================================

INSERT INTO colleges (name, slug, location, state, stream, established, ownership, nirf_rank, avg_package, highest_package, description)
VALUES

-- ── IITs ──────────────────────────────────────────────────────────────────────
('IIT Bombay',    'iit-bombay',    'Mumbai',         'Maharashtra',    'Engineering', 1958, 'Government', 3,  23.5,  100, 'IIT Bombay is one of India''s premier engineering institutes known for excellence in education, research, and placements. It consistently ranks among the top IITs and attracts top recruiters globally.'),
('IIT Delhi',     'iit-delhi',     'New Delhi',       'Delhi',          'Engineering', 1961, 'Government', 2,  20.5,  95,  'IIT Delhi is a leading technical university located in the heart of the capital, renowned for cutting-edge research and industry partnerships with Fortune 500 companies.'),
('IIT Madras',    'iit-madras',    'Chennai',         'Tamil Nadu',     'Engineering', 1959, 'Government', 1,  18.9,  87,  'IIT Madras holds the #1 NIRF ranking for engineering in India. Its sprawling 600-acre campus is home to world-class labs, incubation centres, and a vibrant startup ecosystem.'),
('IIT Kanpur',    'iit-kanpur',    'Kanpur',          'Uttar Pradesh',  'Engineering', 1959, 'Government', 4,  17.6,  82,  'IIT Kanpur pioneered computer science education in India and is celebrated for its rigorous academic culture, strong alumni network, and interdisciplinary research programs.'),
('IIT Kharagpur', 'iit-kharagpur', 'Kharagpur',       'West Bengal',    'Engineering', 1951, 'Government', 5,  16.8,  2.5, 'IIT Kharagpur is the oldest IIT in India. Its 2,100-acre campus hosts 19 academic departments and is a hub for engineering, law, management, and medical sciences.'),
('IIT Roorkee',   'iit-roorkee',   'Roorkee',         'Uttarakhand',   'Engineering', 1847, 'Government', 6,  15.7,  76,  'IIT Roorkee, founded in 1847, is one of Asia''s oldest technical institutions. It excels in civil, electrical, and computer engineering with a strong placement record.'),

-- ── NITs ──────────────────────────────────────────────────────────────────────
('NIT Trichy',     'nit-trichy',     'Tiruchirappalli', 'Tamil Nadu',  'Engineering', 1964, 'Government', 9,  10.5,  52,  'NIT Trichy is consistently ranked among the top NITs in India. Known for its strong placement cell and vibrant student culture, it attracts top recruiters across engineering domains.'),
('NIT Warangal',   'nit-warangal',   'Warangal',        'Telangana',   'Engineering', 1959, 'Government', 16, 10.2,  43,  'NIT Warangal is one of the oldest and most prestigious NITs, offering excellent programs in engineering, science, and management with outstanding campus placements.'),
('NIT Surathkal',  'nit-surathkal',  'Mangaluru',       'Karnataka',   'Engineering', 1960, 'Government', 18, 9.8,   40,  'NITK Surathkal is a top NIT with strong industry connections, world-class labs, and a scenic coastal campus that attracts students from across the country.'),
('NIT Rourkela',   'nit-rourkela',   'Rourkela',        'Odisha',      'Engineering', 1961, 'Government', 17, 9.6,   35,  'NIT Rourkela is a premier technical institution known for its metallurgy, civil, and computer science programs, with a strong focus on research and innovation.'),
('NIT Calicut',    'nit-calicut',    'Calicut',         'Kerala',      'Engineering', 1961, 'Government', 27, 9.0,   30,  'NIT Calicut, situated in Kerala, offers a rich academic environment with state-of-the-art infrastructure, a strong alumni network, and excellent campus placement support.'),

-- ── IIMs ──────────────────────────────────────────────────────────────────────
('IIM Ahmedabad',  'iim-ahmedabad', 'Ahmedabad',   'Gujarat',          'Management',  1961, 'Government', 1,  33.0, 100, 'IIM Ahmedabad is India''s most prestigious business school. With a CAT cutoff exceeding 99.5 percentile, it prepares leaders for top consulting, banking, and entrepreneurship roles globally.'),
('IIM Bangalore',  'iim-bangalore', 'Bengaluru',   'Karnataka',        'Management',  1973, 'Government', 2,  30.2,  95, 'IIM Bangalore is globally ranked and known for its rigorous PGP curriculum, strong alumni network, and strategic partnerships with leading multinational corporations worldwide.'),
('IIM Calcutta',   'iim-calcutta',  'Kolkata',     'West Bengal',      'Management',  1961, 'Government', 3,  29.5,  90, 'IIM Calcutta, the oldest IIM, is a pioneer in management education in India and consistently attracts top global recruiters in consulting, finance, and technology.'),
('IIM Lucknow',    'iim-lucknow',   'Lucknow',     'Uttar Pradesh',    'Management',  1984, 'Government', 4,  27.6,  75, 'IIM Lucknow is known for its industry-integrated curriculum, strong placement record, and specializations in agribusiness and sustainable management.'),
('IIM Kozhikode',  'iim-kozhikode', 'Kozhikode',   'Kerala',           'Management',  1996, 'Government', 9,  22.8,  60, 'IIM Kozhikode is recognized for innovation in management education, offering programs that blend liberal arts with business strategy on a picturesque hilltop campus.'),
('IIM Indore',     'iim-indore',    'Indore',       'Madhya Pradesh',  'Management',  1996, 'Government', 7,  25.0,  70, 'IIM Indore offers the flagship PGP and the highly competitive IPM (5-year integrated program), making it a top destination for students seeking early management education.'),

-- ── BITS ──────────────────────────────────────────────────────────────────────
('BITS Pilani',    'bits-pilani',    'Pilani',   'Rajasthan',  'Engineering', 1964, 'Deemed',  26, 16.5, 1.62, 'BITS Pilani is a top-tier private technical university famed for its practice school program, flexible curriculum, and exceptional placements in tech and consulting sectors.'),
('BITS Hyderabad', 'bits-hyderabad', 'Hyderabad','Telangana',  'Engineering', 2008, 'Deemed',  58, 14.2, 80,   'BITS Hyderabad offers the same rigorous curriculum as BITS Pilani and has quickly established itself as a premier campus with strong industry exposure.'),
('BITS Goa',       'bits-goa',       'Goa',      'Goa',        'Engineering', 2004, 'Deemed',  62, 13.8, 75,   'BITS Goa combines quality engineering education with a vibrant coastal campus culture. It is renowned for its tech fests and strong startup ecosystem.'),

-- ── AIIMS ─────────────────────────────────────────────────────────────────────
('AIIMS New Delhi', 'aiims-delhi',   'New Delhi',  'Delhi',           'Medical', 1956, 'Government', 1,  12.0, 25,  'AIIMS New Delhi is India''s top medical institution offering MBBS, nursing, and postgraduate programs. Admission through NEET UG is among the most competitive in the world.'),
('AIIMS Kalyani',   'aiims-kalyani', 'Kalyani',    'West Bengal',     'Medical', 2018, 'Government', NULL, 10.0, 18, 'AIIMS Kalyani, established under PMSSY, is a rapidly growing centre of medical excellence in Eastern India with a 179-acre campus and cutting-edge clinical facilities.'),
('AIIMS Bhopal',    'aiims-bhopal',  'Bhopal',     'Madhya Pradesh',  'Medical', 2012, 'Government', 6,  9.5,  15,  'AIIMS Bhopal is a premier medical institute in Central India known for its research output, strong clinical training, and state-of-the-art super-speciality facilities.'),
('AIIMS Jodhpur',   'aiims-jodhpur', 'Jodhpur',    'Rajasthan',       'Medical', 2012, 'Government', 7,  9.0,  14,  'AIIMS Jodhpur serves as a regional hub for healthcare in Rajasthan, offering comprehensive medical education with a focus on desert medicine and rural health.'),

-- ── Private Engineering ────────────────────────────────────────────────────────
('VIT Vellore',   'vit-vellore',   'Vellore',         'Tamil Nadu',   'Engineering', 1984, 'Deemed',  11, 8.5, 52,  'VIT Vellore is one of India''s top private engineering universities with a diverse student body, cutting-edge labs, and a strong global alumni network.'),
('Manipal MIT',   'manipal-mit',   'Manipal',         'Karnataka',   'Engineering', 1957, 'Private', 52, 7.8, 40,  'Manipal Institute of Technology is a globally recognized engineering institution with state-of-the-art facilities, a diverse student community, and excellent industry connections.'),
('SRM Kattankulathur','srm-kattankulathur','Kattankulathur','Tamil Nadu','Engineering',1985,'Deemed', 34, 6.5, 44,  'SRM Institute of Science and Technology is a top-ranked deemed university offering engineering and science programs with strong placement support and research infrastructure.'),

-- ── Medical Colleges ──────────────────────────────────────────────────────────
('Maulana Azad Medical College', 'mamc-delhi',              'New Delhi', 'Delhi',         'Medical', 1958, 'Government', 8,  11.5, 22, 'MAMC Delhi is a prestigious government medical college affiliated with the University of Delhi, offering MBBS and MD programs with renowned clinical training.'),
('Grant Medical College',         'grant-medical-mumbai',    'Mumbai',    'Maharashtra',   'Medical', 1845, 'Government', 18, 10.2, 18, 'Grant Medical College is one of the oldest and most respected medical institutions in India, offering comprehensive undergraduate and postgraduate medical programs.'),
('Medical College Kolkata',       'medical-college-kolkata', 'Kolkata',   'West Bengal',   'Medical', 1835, 'Government', 15, 9.8,  16, 'Medical College Kolkata is one of Asia''s oldest medical institutions. It offers MBBS, MD/MS, and nursing programs with exceptional clinical exposure.'),
('IPGMER Kolkata',                'ipgmer-kolkata',          'Kolkata',   'West Bengal',   'Medical', 1957, 'Government', 12, 11.0, 20, 'IPGMER Kolkata is Eastern India''s premier postgraduate medical college and research institute, widely known for super-speciality training and breakthrough research.'),

-- ── Law ───────────────────────────────────────────────────────────────────────
('NLSIU Bangalore', 'nlsiu-bangalore', 'Bengaluru', 'Karnataka',      'Law', 1987, 'Government', 1, 18.0, 60, 'NLSIU Bangalore is India''s top law school and the pioneer of the National Law School movement. It has produced generations of top lawyers, judges, and policy makers.'),
('NALSAR Hyderabad','nalsar-hyderabad', 'Hyderabad', 'Telangana',     'Law', 1998, 'Government', 2, 15.5, 45, 'NALSAR University of Law is ranked among India''s top law schools, known for its rigorous academic culture, moot court achievements, and strong corporate law placements.'),
('NLU Delhi',       'nlu-delhi',        'New Delhi',  'Delhi',         'Law', 2008, 'Government', 3, 17.2, 52, 'National Law University Delhi, home to the AILET exam, is one of India''s most competitive law schools, consistently placing graduates in top law firms and judiciary.')

ON CONFLICT (slug) DO NOTHING;
