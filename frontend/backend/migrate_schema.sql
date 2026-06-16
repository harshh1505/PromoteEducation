-- Drop existing tables if they exist (order matters due to FK constraints)
DROP TABLE IF EXISTS course_specializations CASCADE;
DROP TABLE IF EXISTS master_courses CASCADE;
DROP TABLE IF EXISTS courses CASCADE;

-- Re‑create tables (you can skip these CREATE statements if the tables already exist and you only need the indexes/constraints)
CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level TEXT NOT NULL,
    category TEXT NOT NULL,
    degree TEXT NOT NULL,
    course_name TEXT NOT NULL,
    duration_years NUMERIC(3,1),
    career_domain TEXT,
    slug TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS master_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    level TEXT NOT NULL,
    duration_years NUMERIC(3,1),
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_specializations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    master_course_id UUID NOT NULL
        REFERENCES master_courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    career_domain TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT uq_specializations_master_slug UNIQUE (master_course_id, slug)
);

-- 1️⃣ Indexes for fast slug look‑ups
CREATE INDEX IF NOT EXISTS idx_courses_slug          ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_master_courses_slug   ON master_courses(slug);
CREATE INDEX IF NOT EXISTS idx_specializations_master ON course_specializations(master_course_id);

-- 2️⃣ Composite unique constraint already added in table definition above (uq_specializations_master_slug)

-- 4️⃣ Updated‑at trigger (shared for all three tables)
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'courses_updated_at') THEN
        CREATE TRIGGER courses_updated_at
            BEFORE UPDATE ON courses
            FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'master_courses_updated_at') THEN
        CREATE TRIGGER master_courses_updated_at
            BEFORE UPDATE ON master_courses
            FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'specializations_updated_at') THEN
        CREATE TRIGGER specializations_updated_at
            BEFORE UPDATE ON course_specializations
            FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    END IF;
END $$;

-- Optional: Enable Row‑Level Security and public‑read policy (if not already present)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read courses" ON courses FOR SELECT USING (true);

ALTER TABLE master_courses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read master courses" ON master_courses FOR SELECT USING (true);

ALTER TABLE course_specializations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read course specializations" ON course_specializations FOR SELECT USING (true);

-- End of migration script
