-- 1. CLEAR OLD DATA
TRUNCATE colleges, courses, placements, cutoffs, rankings, faqs, reviews, gallery, scholarships, important_dates, related_colleges CASCADE;

-- 2. INSERT IIT DELHI
DO $$
DECLARE
    v_college_id UUID;
BEGIN
    INSERT INTO colleges (
        slug, name, short_name, location, state, stream, ownership, affiliation, 
        established, description, nirf_rank, naac_grade, naac_cgpa, campus_size,
        total_students, faculty_count, phd_scholars, international_students, research_publications,
        avg_package, highest_package, placement_rate, total_offers, companies_visited,
        entrance_exam, rating, review_count, video_url,
        facilities, official_website, contact_email,
        meta_title, meta_description
    ) VALUES (
        'iit-delhi',
        'Indian Institute of Technology, Delhi',
        'IITD',
        'New Delhi', 'Delhi',
        'Engineering',
        'Government (Central)',
        'Autonomous / UGC',
        1961,
        'Indian Institute of Technology Delhi is one of the 23 IITs created to be Centres of Excellence for training, research and development in science, engineering and technology in India. Established in 1961, it has become a world leader in technical education and research.',
        2,
        'A++', 3.61,
        '320 Acres',
        8400, 640, 3200, 220, 4100,
        22.50, 280.00, 94.5, 1240, 450,
        'JEE Advanced',
        4.8, 3120,
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        ARRAY['Hostel', 'Central Library', 'Advanced Research Lab', 'Sports Complex', 'Wifi Enabled Campus'],
        'https://home.iitd.ac.in',
        'admissions@admin.iitd.ac.in',
        'IIT Delhi 2026: Admission, Fees, Cutoff, Placements & Ranking',
        'Explore IIT Delhi. Check engineering courses, fees structure, placement statistics (Avg ₹22.5 LPA), JEE Advanced cutoffs, and 2026 admission process.'
    ) RETURNING id INTO v_college_id;

    -- Courses
    INSERT INTO courses (college_id, name, level, fees, duration, eligibility, is_popular) VALUES
        (v_college_id, 'B.Tech Computer Science & Engineering', 'UG', 846000, '4 Years', 'JEE Advanced · 10+2 PCM ≥75%', true),
        (v_college_id, 'B.Tech Electrical Engineering', 'UG', 846000, '4 Years', 'JEE Advanced · 10+2 PCM ≥75%', true),
        (v_college_id, 'M.Tech Artificial Intelligence', 'PG', 112000, '2 Years', 'GATE + B.Tech (Relevant Stream)', true);

    -- Placements
    INSERT INTO placements (college_id, year, avg_package, highest_package, placement_rate, recruiters) VALUES
        (v_college_id, 2025, 22.50, 280.00, 94.5, ARRAY['Microsoft', 'Google', 'Goldman Sachs', 'Apple', 'Nvidia', 'Flipkart']);

    -- Cutoffs
    INSERT INTO cutoffs (college_id, branch, category, gender, opening_rank, closing_rank, year) VALUES
        (v_college_id, 'Computer Science & Engineering', 'General', 'Gender-Neutral', 1, 115, 2024);

    -- Scholarships
    INSERT INTO scholarships (college_id, name, amount, eligibility) VALUES
        (v_college_id, 'Merit-cum-Means (MCM) Scholarship', 'Full Tuition Fee Waiver + ₹1,000 Monthly', 'Family Income < ₹4.5 LPA'),
        (v_college_id, 'Institute Free Messing', 'Full Mess Charge Waiver', 'SC/ST Category Students');

    -- Important Dates
    INSERT INTO important_dates (college_id, event_name, event_date) VALUES
        (v_college_id, 'JEE Advanced 2026 Registration Starts', '2026-04-15'),
        (v_college_id, 'IIT Delhi Open House 2026', '2026-06-10');

    -- Gallery
    INSERT INTO gallery (college_id, image_url, caption, category) VALUES
        (v_college_id, 'https://images.unsplash.com/photo-1562774053-701939374585?w=800', 'Main Administrative Building', 'Campus'),
        (v_college_id, 'https://images.unsplash.com/photo-1541339907198-e08759df9a13?w=800', 'Central Library', 'Library');

    -- Reviews
    INSERT INTO reviews (college_id, user_name, rating, comment, user_tag, is_verified) VALUES
        (v_college_id, 'Aman Gupta', 5.0, 'Incredible research opportunities and a very strong alumni network.', 'B.Tech CSE, 2024 Batch', true);

END $$;
