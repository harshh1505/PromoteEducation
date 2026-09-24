-- ==============================================================================
-- STEP 1: CREATE COURSE CMS TABLES & PERMISSIONS
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/cnfmhdlkdjgnaqhngpin/sql
-- ==============================================================================

-- 1. Safely rename existing college course offerings table to avoid collision
DO $$ 
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

-- 3. Create Child Tables
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

-- 4. Performance Indexes
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
