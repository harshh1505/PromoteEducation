-- ==============================================================================
-- PROMOTE EDUCATION - COURSE CMS & DYNAMIC SEO SCHEMA
-- ==============================================================================

-- 1. Safely rename existing college course offerings table to avoid collision and preserve all 2500+ college records
DO $ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
          AND table_name = 'courses' 
          AND column_name = 'college_id'
    ) THEN
        ALTER TABLE public.courses RENAME TO college_courses;
    END IF;
END $;

-- If college_courses doesn't have RLS / policy, ensure public read access
DO $$ BEGIN
    ALTER TABLE college_courses ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Allow public read access for college_courses" ON college_courses;
    CREATE POLICY "Allow public read access for college_courses" ON college_courses FOR SELECT USING (true);
EXCEPTION
    WHEN undefined_table THEN null;
END $$;

-- 2. Create Master Courses CMS Table
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    course_name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    title TEXT,
    short_description TEXT,
    long_description TEXT,
    category TEXT NOT NULL,
    degree_type TEXT NOT NULL,
    duration TEXT NOT NULL,
    mode TEXT DEFAULT 'Full-Time',
    eligibility TEXT NOT NULL,
    admission_process TEXT NOT NULL,
    average_fees TEXT NOT NULL,
    starting_salary TEXT,
    top_salary TEXT,
    display_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published',
    featured BOOLEAN DEFAULT false,
    cover_image TEXT,
    icon_url TEXT,
    key_highlights JSONB DEFAULT '[]'::jsonb,
    fee_details JSONB DEFAULT '{}'::jsonb,
    admission_details JSONB DEFAULT '{}'::jsonb,
    placement_details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Normalized Relational Child Tables
CREATE TABLE IF NOT EXISTS course_specialisations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT,
    description TEXT,
    duration TEXT,
    avg_salary TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    job_role TEXT NOT NULL,
    industry TEXT,
    avg_salary TEXT,
    top_salary TEXT,
    top_recruiters TEXT[] DEFAULT '{}',
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_exams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    exam_name TEXT NOT NULL,
    exam_slug TEXT,
    exam_level TEXT,
    conducting_body TEXT,
    exam_date TEXT,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_related_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    related_course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    relation_type TEXT DEFAULT 'related',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_colleges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Performance Indexes
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_courses_status ON courses(status);
CREATE INDEX IF NOT EXISTS idx_course_specialisations_course_id ON course_specialisations(course_id);
CREATE INDEX IF NOT EXISTS idx_course_careers_course_id ON course_careers(course_id);
CREATE INDEX IF NOT EXISTS idx_course_exams_course_id ON course_exams(course_id);
CREATE INDEX IF NOT EXISTS idx_course_faqs_course_id ON course_faqs(course_id);
CREATE INDEX IF NOT EXISTS idx_course_colleges_course_id ON course_colleges(course_id);

-- 5. Row Level Security Policies
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_specialisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_related_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_colleges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read access for courses" ON courses;
CREATE POLICY "Public read access for courses" ON courses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for course_specialisations" ON course_specialisations;
CREATE POLICY "Public read access for course_specialisations" ON course_specialisations FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for course_careers" ON course_careers;
CREATE POLICY "Public read access for course_careers" ON course_careers FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for course_exams" ON course_exams;
CREATE POLICY "Public read access for course_exams" ON course_exams FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for course_faqs" ON course_faqs;
CREATE POLICY "Public read access for course_faqs" ON course_faqs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for course_related_courses" ON course_related_courses;
CREATE POLICY "Public read access for course_related_courses" ON course_related_courses FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read access for course_colleges" ON course_colleges;
CREATE POLICY "Public read access for course_colleges" ON course_colleges FOR SELECT USING (true);

-- 6. Initial Comprehensive Seed Data
-- ==============================================================================

-- A. B.Tech (Bachelor of Technology)
INSERT INTO courses (
    slug, course_name, short_name, title, short_description, long_description,
    category, degree_type, duration, mode, eligibility, admission_process,
    average_fees, starting_salary, top_salary, display_order, status, featured,
    cover_image, key_highlights, fee_details, admission_details, placement_details
) VALUES (
    'btech',
    'Bachelor of Technology',
    'B.Tech',
    'B.Tech Admission 2026: Eligibility, Syllabus, Top Colleges, Fees & Scope',
    'Bachelor of Technology (B.Tech) is India''s flagship 4-year undergraduate professional engineering degree offering career opportunities across software, hardware, civil, and emerging tech sectors.',
    'Bachelor of Technology (B.Tech) is a comprehensive four-year undergraduate engineering degree designed to combine foundational scientific principles with advanced practical technical skills. Spanning eight semesters, the curriculum equips students with problem-solving capabilities, computational thinking, and hands-on laboratory experience. 

B.Tech graduates form the core workforce driving global innovations in artificial intelligence, software engineering, aerospace, robotics, green energy, and sustainable infrastructure. Top institutions such as IITs, NITs, IIITs, and premier private universities deliver rigorous academic training with cutting-edge industry collaborations.',
    'Engineering & Technology',
    'Undergraduate (UG)',
    '4 Years (8 Semesters)',
    'Full-Time',
    '10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 50% - 75% aggregate marks.',
    'National/State Entrance Examination (JEE Main, JEE Advanced, WBJEE, COMEDK, etc.) followed by Centralized Counseling (JoSAA / CSAB) or Institute-level rounds.',
    '₹2.5 Lakhs - ₹10 Lakhs (Total)',
    '₹4.5 - ₹8 LPA',
    '₹45 - ₹65+ LPA',
    1,
    'published',
    true,
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200',
    '[
        {"label": "Degree Level", "value": "Undergraduate (UG)"},
        {"label": "Program Duration", "value": "4 Years (8 Semesters)"},
        {"label": "Top Exams", "value": "JEE Main, JEE Adv, WBJEE, BITSAT"},
        {"label": "Average Package", "value": "₹6.5 - 12.5 LPA"},
        {"label": "Highest Package", "value": "₹55+ LPA"},
        {"label": "Approved By", "value": "AICTE / UGC"}
    ]'::jsonb,
    '{
        "tuition_fees": "₹60,000 - ₹2,50,000 per year",
        "hostel_fees": "₹40,000 - ₹1,20,000 per year",
        "exam_fees": "₹3,000 - ₹8,000 per year",
        "other_fees": "₹15,000 - ₹35,000 (One-time security & lab fee)",
        "total_estimated_cost": "₹2,50,000 - ₹10,00,000"
    }'::jsonb,
    '{
        "application_process": "Apply for relevant entrance exams (JEE Main / State CETs). After exam results, register for centralized counseling (JoSAA/CSAB/WBJEE/State bodies) and submit choices.",
        "important_dates": "JEE Main: Jan & April sessions | State CETs: April - June | Counseling: June - August.",
        "counselling_info": "JoSAA oversees admissions to IITs, NITs, IIITs, and GFTIs across 6 rounds. State quota counseling handles state government and private institutions.",
        "documents_required": [
            "Class 10 & 12 Marksheets and Passing Certificates",
            "Entrance Exam Admit Card and Rank Card",
            "Category / Domicile Certificate (if applicable)",
            "Transfer & Character Certificate from previous institution",
            "Government Photo ID Proof (Aadhaar / Passport)"
        ]
    }'::jsonb,
    '{
        "average_package": "₹7.5 LPA",
        "highest_package": "₹58 LPA",
        "median_package": "₹6.8 LPA",
        "placement_rate": "85% - 98% across top B-schools & engineering colleges",
        "top_recruiters": ["Google", "Microsoft", "Amazon", "Tata Consultancy Services", "Infosys", "L&T", "Qualcomm", "Texas Instruments"]
    }'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    course_name = EXCLUDED.course_name,
    short_name = EXCLUDED.short_name,
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    long_description = EXCLUDED.long_description,
    category = EXCLUDED.category,
    degree_type = EXCLUDED.degree_type,
    duration = EXCLUDED.duration,
    mode = EXCLUDED.mode,
    eligibility = EXCLUDED.eligibility,
    admission_process = EXCLUDED.admission_process,
    average_fees = EXCLUDED.average_fees,
    starting_salary = EXCLUDED.starting_salary,
    top_salary = EXCLUDED.top_salary,
    cover_image = EXCLUDED.cover_image,
    key_highlights = EXCLUDED.key_highlights,
    fee_details = EXCLUDED.fee_details,
    admission_details = EXCLUDED.admission_details,
    placement_details = EXCLUDED.placement_details;

-- B. MBA (Master of Business Administration)
INSERT INTO courses (
    slug, course_name, short_name, title, short_description, long_description,
    category, degree_type, duration, mode, eligibility, admission_process,
    average_fees, starting_salary, top_salary, display_order, status, featured,
    cover_image, key_highlights, fee_details, admission_details, placement_details
) VALUES (
    'mba',
    'Master of Business Administration',
    'MBA',
    'MBA Admission 2026: CAT, Eligibility, Top Colleges, Fees & Placements',
    'Master of Business Administration (MBA) is India''s premiere 2-year postgraduate management degree delivering transformative leadership, strategy, finance, and entrepreneurial skills.',
    'The Master of Business Administration (MBA) is a globally recognized professional postgraduate credential designed to cultivate strategic leadership, organizational acumen, and managerial excellence. Over two years, candidates engage with real-world case studies, corporate internships, and multi-disciplinary coursework in marketing, finance, analytics, and organizational behavior.

Graduates step directly into mid-to-senior level roles in consulting, investment banking, technology product management, and FMCG corporate strategy. Premium institutions like IIMs, XLRI, FMS Delhi, and SPJIMR offer unmatched placement return on investment with active alumni networks worldwide.',
    'Management',
    'Postgraduate (PG)',
    '2 Years (4 Semesters)',
    'Full-Time',
    'Bachelor''s degree in any discipline with minimum 50% aggregate marks (45% for reserved categories).',
    'National Entrance Exam (CAT, XAT, CMAT, MAT, GMAT) followed by Written Ability Test (WAT), Group Discussion (GD), and Personal Interview (PI).',
    '₹4 Lakhs - ₹25 Lakhs (Total)',
    '₹8.5 - ₹16 LPA',
    '₹35 - ₹70+ LPA',
    2,
    'published',
    true,
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
    '[
        {"label": "Degree Level", "value": "Postgraduate (PG)"},
        {"label": "Program Duration", "value": "2 Years (4 Semesters)"},
        {"label": "Top Exams", "value": "CAT, XAT, CMAT, MAT, SNAP"},
        {"label": "Average Package", "value": "₹12.5 - 24.5 LPA"},
        {"label": "Highest Package", "value": "₹65+ LPA"},
        {"label": "Approved By", "value": "AICTE / UGC / AACSB"}
    ]'::jsonb,
    '{
        "tuition_fees": "₹1,50,000 - ₹12,00,000 per year",
        "hostel_fees": "₹60,000 - ₹1,80,000 per year",
        "exam_fees": "₹5,000 - ₹15,000 per year",
        "other_fees": "₹25,000 - ₹75,000 (Library, Alumni, Courseware)",
        "total_estimated_cost": "₹4,00,000 - ₹25,00,000"
    }'::jsonb,
    '{
        "application_process": "Register and appear for CAT/XAT/CMAT. Apply to individual B-schools using entrance percentiles. Attend GD/WAT/PI rounds upon shortlist call.",
        "important_dates": "CAT Registration: Aug - Sep | Exam: Nov | Results: Jan | GD-PI: Feb - April.",
        "counselling_info": "IIMs use CAP (Common Admission Process) or individual institute shortlists based on CAT percentile, academic diversity, and work experience.",
        "documents_required": [
            "Graduation Marksheets & Degree Certificate",
            "Class 10 & 12 Certificates",
            "CAT / XAT / CMAT Scorecard",
            "Work Experience Letters & Salary Slips (if applicable)",
            "Valid Photo Identification Card"
        ]
    }'::jsonb,
    '{
        "average_package": "₹15.8 LPA",
        "highest_package": "₹68 LPA",
        "median_package": "₹14.2 LPA",
        "placement_rate": "95% - 100%",
        "top_recruiters": ["McKinsey & Company", "Boston Consulting Group", "Goldman Sachs", "J.P. Morgan", "Hindustan Unilever", "Amazon", "Deloitte"]
    }'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    course_name = EXCLUDED.course_name,
    short_name = EXCLUDED.short_name,
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    long_description = EXCLUDED.long_description,
    category = EXCLUDED.category,
    degree_type = EXCLUDED.degree_type,
    duration = EXCLUDED.duration,
    mode = EXCLUDED.mode,
    eligibility = EXCLUDED.eligibility,
    admission_process = EXCLUDED.admission_process,
    average_fees = EXCLUDED.average_fees,
    starting_salary = EXCLUDED.starting_salary,
    top_salary = EXCLUDED.top_salary,
    cover_image = EXCLUDED.cover_image,
    key_highlights = EXCLUDED.key_highlights,
    fee_details = EXCLUDED.fee_details,
    admission_details = EXCLUDED.admission_details,
    placement_details = EXCLUDED.placement_details;

-- C. MBBS (Bachelor of Medicine, Bachelor of Surgery)
INSERT INTO courses (
    slug, course_name, short_name, title, short_description, long_description,
    category, degree_type, duration, mode, eligibility, admission_process,
    average_fees, starting_salary, top_salary, display_order, status, featured,
    cover_image, key_highlights, fee_details, admission_details, placement_details
) VALUES (
    'mbbs',
    'Bachelor of Medicine, Bachelor of Surgery',
    'MBBS',
    'MBBS Admission 2026: NEET UG, Eligibility, Cutoffs, Colleges & Fees',
    'Bachelor of Medicine and Bachelor of Surgery (MBBS) is the premier 5.5-year medical undergraduate degree qualifying students as licensed medical doctors in India.',
    'MBBS is the benchmark undergraduate medical program that equips students with clinical diagnostics, pharmacology, patient care, surgery fundamentals, and community health. The program spans 4.5 academic years followed by a mandatory 1-year rotating residential internship in accredited hospitals.

Admission to all medical colleges in India, including AIIMS, JIPMER, and state government medical colleges, is conducted strictly through the single-window National Eligibility cum Entrance Test (NEET UG). Graduates have diverse pathways into post-graduate specialization (MD/MS), civil medical services, hospital administration, and healthcare research.',
    'Medical',
    'Undergraduate (UG)',
    '5.5 Years (Includes 1-Year Internship)',
    'Full-Time',
    '10+2 with Physics, Chemistry, Biology/Biotechnology with minimum 50% aggregate (40% for SC/ST/OBC) and qualifying score in NEET UG.',
    'NEET UG qualified score followed by MCC All India Quota (15%) or State Medical Quota (85%) Centralized Counseling.',
    '₹50,000 - ₹20 Lakhs (Government vs Private)',
    '₹6.5 - ₹12 LPA',
    '₹25 - ₹45+ LPA',
    3,
    'published',
    true,
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
    '[
        {"label": "Degree Level", "value": "Undergraduate (UG)"},
        {"label": "Program Duration", "value": "5.5 Years (4.5 Yrs + 1 Yr Internship)"},
        {"label": "Mandatory Exam", "value": "NEET UG (National Single-Window)"},
        {"label": "Regulating Body", "value": "National Medical Commission (NMC)"},
        {"label": "Starting Stipend", "value": "₹25,000 - ₹45,000/mo"},
        {"label": "Career Pathways", "value": "Clinical Practice, MD/MS Specialization"}
    ]'::jsonb,
    '{
        "tuition_fees": "Govt: ₹5,000 - ₹50,000/yr | Private: ₹6,00,000 - ₹20,00,000/yr",
        "hostel_fees": "₹25,000 - ₹1,50,000 per year",
        "exam_fees": "₹5,000 - ₹12,000 per year",
        "other_fees": "₹20,000 - ₹60,000 (Lab, Library, Hospital clinical charges)",
        "total_estimated_cost": "Govt: ₹50,000 - ₹2,50,000 | Private: ₹35,00,000 - ₹1,10,00,000"
    }'::jsonb,
    '{
        "application_process": "Register for NEET UG through NTA portal. Appear for exam in May. Register on MCC.nic.in for 15% All India Quota and State Counseling Portals for 85% state quota.",
        "important_dates": "NEET UG Exam: May | Result: June | MCC Counseling: July - September.",
        "counselling_info": "Medical Counseling Committee (MCC) conducts 4 rounds of online counseling for AIQ, Deemed/Central Universities, AIIMS, and JIPMER.",
        "documents_required": [
            "NEET UG Admit Card and Scorecard",
            "Class 10 & 12 Marksheets and Passing Certificates",
            "Provisional Allotment Letter from MCC/State Portal",
            "Identity Verification (Aadhaar / Voter ID / Passport)",
            "Medical Fitness Certificate & Domicile/Category Certificate"
        ]
    }'::jsonb,
    '{
        "average_package": "₹9.5 LPA",
        "highest_package": "₹32 LPA",
        "median_package": "₹8.8 LPA",
        "placement_rate": "100% (High Clinical Demand)",
        "top_recruiters": ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Medanta", "Manipal Hospitals", "Government Health Services"]
    }'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    course_name = EXCLUDED.course_name,
    short_name = EXCLUDED.short_name,
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    long_description = EXCLUDED.long_description,
    category = EXCLUDED.category,
    degree_type = EXCLUDED.degree_type,
    duration = EXCLUDED.duration,
    mode = EXCLUDED.mode,
    eligibility = EXCLUDED.eligibility,
    admission_process = EXCLUDED.admission_process,
    average_fees = EXCLUDED.average_fees,
    starting_salary = EXCLUDED.starting_salary,
    top_salary = EXCLUDED.top_salary,
    cover_image = EXCLUDED.cover_image,
    key_highlights = EXCLUDED.key_highlights,
    fee_details = EXCLUDED.fee_details,
    admission_details = EXCLUDED.admission_details,
    placement_details = EXCLUDED.placement_details;

-- D. BDS (Bachelor of Dental Surgery)
INSERT INTO courses (
    slug, course_name, short_name, title, short_description, long_description,
    category, degree_type, duration, mode, eligibility, admission_process,
    average_fees, starting_salary, top_salary, display_order, status, featured,
    cover_image, key_highlights, fee_details, admission_details, placement_details
) VALUES (
    'bds',
    'Bachelor of Dental Surgery',
    'BDS',
    'BDS Admission 2026: NEET Cutoff, Eligibility, Top Colleges & Career Scope',
    'Bachelor of Dental Surgery (BDS) is the primary 5-year dental education program in India qualifying students as professional dental surgeons and oral healthcare specialists.',
    'BDS is a five-year undergraduate professional healthcare program that trains students in oral anatomy, dental radiology, prosthodontics, periodontics, and oral maxillofacial surgery. It incorporates four academic years of classroom and clinical instruction alongside a mandatory 1-year rotatory clinical internship.

Governed by the Dental Council of India (DCI), admissions are granted solely through NEET UG. Dental graduates can operate private dental practices, work in multispecialty hospital dental wings, or pursue MDS (Master of Dental Surgery) for specialized orthodontics and surgical careers.',
    'Medical',
    'Undergraduate (UG)',
    '5 Years (Includes 1-Year Internship)',
    'Full-Time',
    '10+2 with Physics, Chemistry, Biology and English with minimum 50% aggregate marks and NEET UG qualification.',
    'NEET UG Score followed by MCC counseling for Central/Deemed Universities and State Dental Counseling.',
    '₹1.5 Lakhs - ₹15 Lakhs (Total)',
    '₹4 - ₹7 LPA',
    '₹18 - ₹30+ LPA',
    4,
    'published',
    true,
    'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200',
    '[
        {"label": "Degree Level", "value": "Undergraduate (UG)"},
        {"label": "Program Duration", "value": "5 Years (4 Yrs + 1 Yr Internship)"},
        {"label": "Governing Council", "value": "Dental Council of India (DCI)"},
        {"label": "Entrance Exam", "value": "NEET UG"},
        {"label": "Average Package", "value": "₹5.5 - 9.5 LPA"},
        {"label": "Higher Studies", "value": "MDS (Master of Dental Surgery)"}
    ]'::jsonb,
    '{
        "tuition_fees": "Govt: ₹15,000 - ₹50,000/yr | Private: ₹2,50,000 - ₹8,00,000/yr",
        "hostel_fees": "₹30,000 - ₹1,20,000 per year",
        "exam_fees": "₹4,000 - ₹10,000 per year",
        "other_fees": "₹15,000 - ₹40,000 (Dental kit, materials & clinical charges)",
        "total_estimated_cost": "Govt: ₹1,50,000 - ₹3,00,000 | Private: ₹12,00,000 - ₹35,00,000"
    }'::jsonb,
    '{
        "application_process": "Qualify NEET UG. Participate in MCC 15% AIQ rounds or respective State Medical/Dental counseling sessions.",
        "important_dates": "NEET UG: May | Counseling: July - October.",
        "counselling_info": "Both central and state counseling allocate seats based on NEET ranks and student preferred college selections.",
        "documents_required": [
            "NEET Scorecard & Admit Card",
            "Class 10 & 12 Marksheets & Passing Certificates",
            "Seat Allotment Letter",
            "Government Photo ID Proof",
            "Caste/Domicile Certificate (if claiming reservation)"
        ]
    }'::jsonb,
    '{
        "average_package": "₹6.2 LPA",
        "highest_package": "₹22 LPA",
        "median_package": "₹5.5 LPA",
        "placement_rate": "88%",
        "top_recruiters": ["Clove Dental", "Apollo Dental", "Fortis Healthcare", "Smile Care", "Army Dental Corps", "Private Practice"]
    }'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    course_name = EXCLUDED.course_name,
    short_name = EXCLUDED.short_name,
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    long_description = EXCLUDED.long_description,
    category = EXCLUDED.category,
    degree_type = EXCLUDED.degree_type,
    duration = EXCLUDED.duration,
    mode = EXCLUDED.mode,
    eligibility = EXCLUDED.eligibility,
    admission_process = EXCLUDED.admission_process,
    average_fees = EXCLUDED.average_fees,
    starting_salary = EXCLUDED.starting_salary,
    top_salary = EXCLUDED.top_salary,
    cover_image = EXCLUDED.cover_image,
    key_highlights = EXCLUDED.key_highlights,
    fee_details = EXCLUDED.fee_details,
    admission_details = EXCLUDED.admission_details,
    placement_details = EXCLUDED.placement_details;

-- E. BCA (Bachelor of Computer Applications)
INSERT INTO courses (
    slug, course_name, short_name, title, short_description, long_description,
    category, degree_type, duration, mode, eligibility, admission_process,
    average_fees, starting_salary, top_salary, display_order, status, featured,
    cover_image, key_highlights, fee_details, admission_details, placement_details
) VALUES (
    'bca',
    'Bachelor of Computer Applications',
    'BCA',
    'BCA Admission 2026: Eligibility, Syllabus, Top Colleges, Fees & Placements',
    'Bachelor of Computer Applications (BCA) is a high-demand 3-year undergraduate course focusing on software engineering, web technologies, database design, and cloud development.',
    'BCA is an intensive 3-year undergraduate program tailored for aspirants keen on establishing careers in the software industry without requiring an engineering degree. Spanning six semesters, the curriculum focuses on computer languages (C++, Java, Python), database management systems, data structures, web application architecture, and computer networking.

With India''s booming IT, SaaS, and fintech sectors, BCA graduates enjoy widespread placement opportunities in full-stack development, mobile app engineering, QA testing, and systems administration. Many students choose to combine BCA with an MCA or professional cloud certifications for exponential salary growth.',
    'Computer Applications',
    'Undergraduate (UG)',
    '3 Years (6 Semesters)',
    'Full-Time',
    '10+2 in any stream (Science, Commerce, Arts) with Mathematics/Computer Science as a subject preferred and minimum 45% - 50% aggregate.',
    'Merit-based on Class 12 marks or University Entrance Tests (CUET UG, IPU CET, SET, etc.) followed by counseling.',
    '₹1.5 Lakhs - ₹4.5 Lakhs (Total)',
    '₹3.5 - ₹6 LPA',
    '₹15 - ₹25+ LPA',
    5,
    'published',
    true,
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200',
    '[
        {"label": "Degree Level", "value": "Undergraduate (UG)"},
        {"label": "Program Duration", "value": "3 Years (6 Semesters)"},
        {"label": "Key Exams", "value": "CUET UG, IPU CET, SET, Symbiosis"},
        {"label": "Average Package", "value": "₹4.5 - 7.5 LPA"},
        {"label": "Highest Package", "value": "₹22+ LPA"},
        {"label": "Degree Pathway", "value": "BCA + MCA or Direct IT Career"}
    ]'::jsonb,
    '{
        "tuition_fees": "₹40,000 - ₹1,40,000 per year",
        "hostel_fees": "₹35,000 - ₹90,000 per year",
        "exam_fees": "₹2,500 - ₹6,000 per year",
        "other_fees": "₹10,000 - ₹25,000 (Computer Lab, Registration & Activity fee)",
        "total_estimated_cost": "₹1,50,000 - ₹4,50,000"
    }'::jsonb,
    '{
        "application_process": "Register for CUET UG or individual university portals. Submit Class 12 scores and program preferences. Attend counseling or merit selection.",
        "important_dates": "CUET UG: May | University Admissions: May - July.",
        "counselling_info": "State and central universities publish merit cutoff lists based on standardized test percentiles or Class 12 scores.",
        "documents_required": [
            "Class 10 & 12 Marksheet & Passing Certificate",
            "Entrance Exam Scorecard (CUET / IPU CET)",
            "Transfer Certificate / Migration Certificate",
            "Aadhaar Card or Government Photo ID",
            "Passport Size Photographs"
        ]
    }'::jsonb,
    '{
        "average_package": "₹4.8 LPA",
        "highest_package": "₹24 LPA",
        "median_package": "₹4.2 LPA",
        "placement_rate": "82%",
        "top_recruiters": ["Tata Consultancy Services", "Wipro", "Infosys", "Cognizant", "Accenture", "Capgemini", "HCL Tech"]
    }'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    course_name = EXCLUDED.course_name,
    short_name = EXCLUDED.short_name,
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    long_description = EXCLUDED.long_description,
    category = EXCLUDED.category,
    degree_type = EXCLUDED.degree_type,
    duration = EXCLUDED.duration,
    mode = EXCLUDED.mode,
    eligibility = EXCLUDED.eligibility,
    admission_process = EXCLUDED.admission_process,
    average_fees = EXCLUDED.average_fees,
    starting_salary = EXCLUDED.starting_salary,
    top_salary = EXCLUDED.top_salary,
    cover_image = EXCLUDED.cover_image,
    key_highlights = EXCLUDED.key_highlights,
    fee_details = EXCLUDED.fee_details,
    admission_details = EXCLUDED.admission_details,
    placement_details = EXCLUDED.placement_details;

-- F. MCA (Master of Computer Applications)
INSERT INTO courses (
    slug, course_name, short_name, title, short_description, long_description,
    category, degree_type, duration, mode, eligibility, admission_process,
    average_fees, starting_salary, top_salary, display_order, status, featured,
    cover_image, key_highlights, fee_details, admission_details, placement_details
) VALUES (
    'mca',
    'Master of Computer Applications',
    'MCA',
    'MCA Admission 2026: NIMCET, Eligibility, Top NITs, Fees & Placements',
    'Master of Computer Applications (MCA) is an advanced 2-year postgraduate program designed to cultivate elite software engineers, system architects, and technical team leads.',
    'The Master of Computer Applications (MCA) is a comprehensive two-year postgraduate degree designed to produce high-caliber software engineering and computing professionals. Over four semesters, students master advanced algorithms, distributed cloud architectures, artificial intelligence, cybersecurity, and enterprise application frameworks.

Regulated by AICTE, admissions into top national institutions such as NITs are conducted through the premier NIMCET examination. MCA holders compete head-to-head with B.Tech CSE graduates for coveted Tier-1 software engineering and tech architect roles in global product firms.',
    'Computer Applications',
    'Postgraduate (PG)',
    '2 Years (4 Semesters)',
    'Full-Time',
    'BCA / B.Sc. Computer Science / B.Tech or any graduate degree with Mathematics at 10+2 or Graduation level with minimum 50% aggregate.',
    'National Entrance (NIMCET, CUET PG, MAH MCA CET) followed by centralized counseling.',
    '₹1.8 Lakhs - ₹5.5 Lakhs (Total)',
    '₹6.5 - ₹10 LPA',
    '₹30 - ₹50+ LPA',
    6,
    'published',
    true,
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200',
    '[
        {"label": "Degree Level", "value": "Postgraduate (PG)"},
        {"label": "Program Duration", "value": "2 Years (4 Semesters)"},
        {"label": "Premier Exam", "value": "NIMCET (for NITs), CUET PG"},
        {"label": "Average Package", "value": "₹8.5 - 14.5 LPA"},
        {"label": "Highest Package", "value": "₹48+ LPA"},
        {"label": "Equivalence", "value": "Competes directly with B.Tech CSE"}
    ]'::jsonb,
    '{
        "tuition_fees": "Govt/NITs: ₹60,000 - ₹1,20,000/yr | Private: ₹1,00,000 - ₹2,50,000/yr",
        "hostel_fees": "₹35,000 - ₹90,000 per year",
        "exam_fees": "₹3,000 - ₹7,000 per year",
        "other_fees": "₹15,000 - ₹30,000 (Lab, Library & Placement charges)",
        "total_estimated_cost": "₹1,80,000 - ₹5,50,000"
    }'::jsonb,
    '{
        "application_process": "Register for NIMCET or CUET PG. Rank holders participate in national counseling for seat allocation across participating NITs and state universities.",
        "important_dates": "NIMCET: June | Results: late June | Counseling: July.",
        "counselling_info": "NIMCET counseling is conducted online across 3 main rounds followed by an institutional spot round.",
        "documents_required": [
            "Graduation Degree & Semester Marksheets",
            "Class 10 & 12 Marksheets with Mathematics proof",
            "NIMCET / CUET PG Scorecard and Admit Card",
            "Category Certificate / Domicile (if applicable)",
            "Photo Identification Proof"
        ]
    }'::jsonb,
    '{
        "average_package": "₹9.2 LPA",
        "highest_package": "₹52 LPA",
        "median_package": "₹8.5 LPA",
        "placement_rate": "92%",
        "top_recruiters": ["Amazon", "Microsoft", "Oracle", "Goldman Sachs", "Cisco", "Adobe", "Cognizant", "Infosys"]
    }'::jsonb
) ON CONFLICT (slug) DO UPDATE SET
    course_name = EXCLUDED.course_name,
    short_name = EXCLUDED.short_name,
    title = EXCLUDED.title,
    short_description = EXCLUDED.short_description,
    long_description = EXCLUDED.long_description,
    category = EXCLUDED.category,
    degree_type = EXCLUDED.degree_type,
    duration = EXCLUDED.duration,
    mode = EXCLUDED.mode,
    eligibility = EXCLUDED.eligibility,
    admission_process = EXCLUDED.admission_process,
    average_fees = EXCLUDED.average_fees,
    starting_salary = EXCLUDED.starting_salary,
    top_salary = EXCLUDED.top_salary,
    cover_image = EXCLUDED.cover_image,
    key_highlights = EXCLUDED.key_highlights,
    fee_details = EXCLUDED.fee_details,
    admission_details = EXCLUDED.admission_details,
    placement_details = EXCLUDED.placement_details;


-- 7. Seed Relational Data (Specialisations, Careers, Exams, FAQs)
-- ==============================================================================

-- B.Tech Specialisations
INSERT INTO course_specialisations (course_id, name, slug, description, duration, avg_salary, display_order)
SELECT id, 'Computer Science & Engineering', 'cse', 'Algorithms, systems software, full-stack programming, and software development.', '4 Years', '₹8.5 - 18 LPA', 1 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'Artificial Intelligence & Machine Learning', 'ai-ml', 'Deep learning, neural networks, natural language processing, and computer vision.', '4 Years', '₹10 - 22 LPA', 2 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'Data Science', 'data-science', 'Big data systems, statistical computing, predictive modeling, and business analytics.', '4 Years', '₹9 - 20 LPA', 3 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'Electronics & Communication (ECE)', 'ece', 'Semiconductors, VLSI chip design, embedded systems, and wireless communications.', '4 Years', '₹7 - 16 LPA', 4 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'Mechanical Engineering', 'mechanical', 'Thermal systems, CAD/CAM, automotive engineering, manufacturing, and robotics.', '4 Years', '₹5.5 - 12 LPA', 5 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'Civil Engineering', 'civil', 'Structural design, transportation, smart city planning, and environmental engineering.', '4 Years', '₹5 - 10 LPA', 6 FROM courses WHERE slug = 'btech'
ON CONFLICT DO NOTHING;

-- MBA Specialisations
INSERT INTO course_specialisations (course_id, name, slug, description, duration, avg_salary, display_order)
SELECT id, 'Finance & Banking', 'finance', 'Investment banking, corporate valuation, portfolio management, and venture capital.', '2 Years', '₹14 - 28 LPA', 1 FROM courses WHERE slug = 'mba'
UNION ALL
SELECT id, 'Marketing & Brand Strategy', 'marketing', 'Digital growth marketing, brand management, consumer psychology, and market research.', '2 Years', '₹12 - 24 LPA', 2 FROM courses WHERE slug = 'mba'
UNION ALL
SELECT id, 'Business Analytics & AI', 'business-analytics', 'Data-driven business decisions, econometric modeling, and executive dashboarding.', '2 Years', '₹15 - 30 LPA', 3 FROM courses WHERE slug = 'mba'
UNION ALL
SELECT id, 'Operations & Supply Chain', 'operations', 'Global logistics, procurement, lean six sigma, and warehouse automation.', '2 Years', '₹11 - 22 LPA', 4 FROM courses WHERE slug = 'mba'
UNION ALL
SELECT id, 'Human Resource Management', 'hr', 'Talent acquisition, organizational development, compensation, and corporate culture.', '2 Years', '₹10 - 18 LPA', 5 FROM courses WHERE slug = 'mba'
ON CONFLICT DO NOTHING;

-- B.Tech Careers
INSERT INTO course_careers (course_id, job_role, industry, avg_salary, top_salary, top_recruiters, description, display_order)
SELECT id, 'Software Development Engineer (SDE)', 'Information Technology & SaaS', '₹8.5 LPA', '₹45+ LPA', ARRAY['Google', 'Microsoft', 'Amazon', 'Uber'], 'Designs, builds, and optimizes large-scale software systems and cloud backend architectures.', 1 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'Data Scientist / ML Engineer', 'Artificial Intelligence & Analytics', '₹11.5 LPA', '₹50+ LPA', ARRAY['Meta', 'NVIDIA', 'Walmart Labs', 'Adobe'], 'Builds machine learning models, neural networks, and scalable data analytics pipelines.', 2 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'VLSI / Chip Design Engineer', 'Semiconductors & Hardware', '₹12 LPA', '₹38+ LPA', ARRAY['Qualcomm', 'Intel', 'Texas Instruments', 'AMD'], 'Architects microscopic integrated circuits, microprocessors, and hardware accelerators.', 3 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'Systems / Cloud Architect', 'Enterprise Cloud & DevOps', '₹14 LPA', '₹42+ LPA', ARRAY['AWS', 'Microsoft Azure', 'Oracle Cloud', 'IBM'], 'Manages multi-region cloud infrastructures, Kubernetes clusters, and security policies.', 4 FROM courses WHERE slug = 'btech'
ON CONFLICT DO NOTHING;

-- MBA Careers
INSERT INTO course_careers (course_id, job_role, industry, avg_salary, top_salary, top_recruiters, description, display_order)
SELECT id, 'Management Consultant', 'Strategy & Consulting', '₹18 LPA', '₹55+ LPA', ARRAY['McKinsey & Co', 'BCG', 'Bain & Co', 'EY Parthenon'], 'Advises Fortune 500 leadership on corporate growth, digital transformation, and restructuring.', 1 FROM courses WHERE slug = 'mba'
UNION ALL
SELECT id, 'Investment Banking Associate', 'Financial Services', '₹22 LPA', '₹65+ LPA', ARRAY['Goldman Sachs', 'Morgan Stanley', 'J.P. Morgan'], 'Structures high-stakes mergers and acquisitions (M&A), IPOs, and corporate debt offerings.', 2 FROM courses WHERE slug = 'mba'
UNION ALL
SELECT id, 'Product Manager', 'Technology & Startups', '₹19 LPA', '₹48+ LPA', ARRAY['Google', 'Microsoft', 'Flipkart', 'Swiggy'], 'Defines product roadmaps, user requirements, and leads cross-functional engineering teams.', 3 FROM courses WHERE slug = 'mba'
ON CONFLICT DO NOTHING;

-- B.Tech Entrance Exams
INSERT INTO course_exams (course_id, exam_name, exam_slug, exam_level, conducting_body, exam_date, description, display_order)
SELECT id, 'JEE Main', 'jee-main', 'National', 'National Testing Agency (NTA)', 'Session 1: Jan | Session 2: April', 'The national gateway exam for admission to NITs, IIITs, GFTIs, and the prerequisite for JEE Advanced.', 1 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'JEE Advanced', 'jee-advanced', 'National', 'IIT Organising Body', 'May (Annual)', 'The elite entrance exam exclusively for admission to the Indian Institutes of Technology (IITs).', 2 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'WBJEE', 'wbjee', 'State', 'West Bengal Joint Entrance Examinations Board', 'April (Annual)', 'State engineering entrance examination for top institutions like Jadavpur University and Heritage.', 3 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'BITSAT', 'bitsat', 'University', 'BITS Pilani', 'May & June', 'Online computer-based test for BITS Pilani, Goa, and Hyderabad engineering campuses.', 4 FROM courses WHERE slug = 'btech'
ON CONFLICT DO NOTHING;

-- MBA Entrance Exams
INSERT INTO course_exams (course_id, exam_name, exam_slug, exam_level, conducting_body, exam_date, description, display_order)
SELECT id, 'CAT', 'cat', 'National', 'Indian Institutes of Management (IIMs)', 'Last Sunday of November', 'India''s premier management test accepted by all 21 IIMs, FMS Delhi, SPJIMR, and IIT B-schools.', 1 FROM courses WHERE slug = 'mba'
UNION ALL
SELECT id, 'XAT', 'xat', 'National', 'XLRI Jamshedpur', 'First Sunday of January', 'High-repute exam accepted by XLRI, IMT Ghaziabad, XIMB, and over 160 associate management schools.', 2 FROM courses WHERE slug = 'mba'
UNION ALL
SELECT id, 'CMAT', 'cmat', 'National', 'National Testing Agency (NTA)', 'February / May', 'National-level testing exam accepted by over 1,300 AICTE-approved B-schools nationwide.', 3 FROM courses WHERE slug = 'mba'
ON CONFLICT DO NOTHING;

-- MBBS Entrance Exams
INSERT INTO course_exams (course_id, exam_name, exam_slug, exam_level, conducting_body, exam_date, description, display_order)
SELECT id, 'NEET UG', 'neet-ug', 'National', 'National Testing Agency (NTA)', 'First Sunday of May', 'Mandatory single-window national examination for MBBS and BDS admissions throughout India.', 1 FROM courses WHERE slug = 'mbbs'
ON CONFLICT DO NOTHING;

-- BDS Entrance Exams
INSERT INTO course_exams (course_id, exam_name, exam_slug, exam_level, conducting_body, exam_date, description, display_order)
SELECT id, 'NEET UG', 'neet-ug', 'National', 'National Testing Agency (NTA)', 'First Sunday of May', 'Mandatory single-window national examination for all Dental Surgery admissions across India.', 1 FROM courses WHERE slug = 'bds'
ON CONFLICT DO NOTHING;

-- BCA Entrance Exams
INSERT INTO course_exams (course_id, exam_name, exam_slug, exam_level, conducting_body, exam_date, description, display_order)
SELECT id, 'CUET UG', 'cuet-ug', 'National', 'National Testing Agency (NTA)', 'May - June', 'Common entrance test for undergraduate admissions across Central, State, and Deemed Universities.', 1 FROM courses WHERE slug = 'bca'
ON CONFLICT DO NOTHING;

-- MCA Entrance Exams
INSERT INTO course_exams (course_id, exam_name, exam_slug, exam_level, conducting_body, exam_date, description, display_order)
SELECT id, 'NIMCET', 'nimcet', 'National', 'National Institutes of Technology', 'June (Annual)', 'The premier national common entrance test for MCA admission across participating NIT campuses.', 1 FROM courses WHERE slug = 'mca'
UNION ALL
SELECT id, 'CUET PG', 'cuet-pg', 'National', 'National Testing Agency (NTA)', 'March (Annual)', 'National examination for postgraduate admissions into Central, State, and top private universities.', 2 FROM courses WHERE slug = 'mca'
ON CONFLICT DO NOTHING;

-- B.Tech FAQs
INSERT INTO course_faqs (course_id, question, answer, display_order)
SELECT id, 'What is the eligibility criteria for B.Tech in 2026?', 'Candidates must have completed 10+2 with Physics, Mathematics, and Chemistry/Computer Science with minimum 50% to 75% aggregate marks (75% for JEE Main IIT/NIT eligibility).', 1 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'What is the average starting salary for a B.Tech graduate in India?', 'The starting salary ranges from ₹4.5 LPA to ₹12 LPA on average, with top tier college graduates (IITs/NITs/BITS) regularly commanding packages between ₹20 LPA and ₹60+ LPA.', 2 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'Can a non-science student pursue B.Tech?', 'Under latest AICTE guidelines, certain interdisciplinary branches allow students with related subject combinations, but core branches (CSE, Mechanical, Electrical) strictly require Physics and Mathematics in Class 12.', 3 FROM courses WHERE slug = 'btech'
UNION ALL
SELECT id, 'Which B.Tech branch has the highest placement package?', 'Computer Science & Engineering (CSE) and Artificial Intelligence & Machine Learning (AI & ML) consistently command the highest domestic and international compensation packages.', 4 FROM courses WHERE slug = 'btech'
ON CONFLICT DO NOTHING;

-- MBA FAQs
INSERT INTO course_faqs (course_id, question, answer, display_order)
SELECT id, 'Is work experience mandatory for MBA admission?', 'No, work experience is not mandatory. Both fresh graduates and working professionals can apply. However, premier institutes like IIMs award additional selection weightage for relevant experience.', 1 FROM courses WHERE slug = 'mba'
UNION ALL
SELECT id, 'What is the difference between MBA and PGDM?', 'MBA degrees are granted by universities recognized by UGC, while PGDM (Post Graduate Diploma in Management) diplomas are offered by autonomous institutes approved by AICTE. Both hold equivalent corporate and government recognition.', 2 FROM courses WHERE slug = 'mba'
UNION ALL
SELECT id, 'Which entrance exam is best for MBA in India?', 'The Common Admission Test (CAT) is the most prestigious and widely accepted, opening admission to all 21 IIMs, FMS Delhi, SPJIMR, and top IIT Department of Management Studies.', 3 FROM courses WHERE slug = 'mba'
ON CONFLICT DO NOTHING;

-- MBBS FAQs
INSERT INTO course_faqs (course_id, question, answer, display_order)
SELECT id, 'How many years does it take to complete an MBBS degree in India?', 'An MBBS degree requires 5.5 years in total, consisting of 4.5 years of academic and clinical training followed by a compulsory 1-year paid rotating internship in a hospital.', 1 FROM courses WHERE slug = 'mbbs'
UNION ALL
SELECT id, 'Is NEET UG compulsory for MBBS admission in India?', 'Yes. Under NMC regulations, qualifying NEET UG is 100% compulsory for admission to all government, private, deemed, and central medical universities across India, as well as for studying abroad.', 2 FROM courses WHERE slug = 'mbbs'
ON CONFLICT DO NOTHING;

-- BDS FAQs
INSERT INTO course_faqs (course_id, question, answer, display_order)
SELECT id, 'Can BDS graduates perform surgeries?', 'Yes, BDS graduates are trained oral and dental surgeons authorized to perform dental extractions, oral maxillofacial procedures, and periodontal surgeries.', 1 FROM courses WHERE slug = 'bds'
UNION ALL
SELECT id, 'What is the career scope after BDS?', 'Graduates can establish private clinical dental clinics, work in corporate dental chains (like Clove Dental), join the Army Dental Corps, or pursue MDS for advanced orthodontic and cosmetic specialization.', 2 FROM courses WHERE slug = 'bds'
ON CONFLICT DO NOTHING;

-- BCA FAQs
INSERT INTO course_faqs (course_id, question, answer, display_order)
SELECT id, 'Is BCA a good alternative to B.Tech CSE?', 'Yes. BCA is a focused, cost-effective 3-year alternative centered purely on software development, web applications, and database management, with excellent placement pathways into IT giants.', 1 FROM courses WHERE slug = 'bca'
UNION ALL
SELECT id, 'Can I apply for BCA without Maths in 12th?', 'Many recognized universities permit students from Arts or Commerce streams without Mathematics to enroll in BCA, provided they complete bridge computing courses during semester 1.', 2 FROM courses WHERE slug = 'bca'
ON CONFLICT DO NOTHING;

-- MCA FAQs
INSERT INTO course_faqs (course_id, question, answer, display_order)
SELECT id, 'Is MCA duration 2 years or 3 years now?', 'As per AICTE revised guidelines, the MCA program duration across India has been officially reduced from 3 years to 2 years (4 semesters).', 1 FROM courses WHERE slug = 'mca'
UNION ALL
SELECT id, 'What is the average package for MCA graduates from NITs?', 'Graduates from top NITs through NIMCET achieve average packages ranging from ₹10 LPA to ₹16 LPA, with top domestic packages exceeding ₹45 LPA.', 2 FROM courses WHERE slug = 'mca'
ON CONFLICT DO NOTHING;
