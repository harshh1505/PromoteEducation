-- 1. Custom Types
DO $$ BEGIN
    CREATE TYPE college_type AS ENUM ('government', 'private', 'deemed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Colleges Table
CREATE TABLE IF NOT EXISTS colleges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  ranking INTEGER,
  stream TEXT NOT NULL,
  type college_type DEFAULT 'private',
  avg_ctc TEXT,
  total_fee TEXT,
  verified BOOLEAN DEFAULT false
);

-- 3. Exams Table
CREATE TABLE IF NOT EXISTS exams (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  full_name TEXT NOT NULL,
  conducted_by TEXT,
  exam_date TEXT,
  registration_deadline TEXT,
  stream TEXT,
  level TEXT,
  applicants TEXT
);

-- 4. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  initials TEXT,
  college_name TEXT NOT NULL,
  course TEXT,
  year INTEGER,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  verified BOOLEAN DEFAULT false,
  pros TEXT[] DEFAULT '{}',
  cons TEXT[] DEFAULT '{}'
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 6. Create Public Access Policies (Read-only for everyone)
DROP POLICY IF EXISTS "Allow public read access for colleges" ON colleges;
DROP POLICY IF EXISTS "Allow public read access for exams" ON exams;
DROP POLICY IF EXISTS "Allow public read access for reviews" ON reviews;
CREATE POLICY "Allow public read access for colleges" ON colleges FOR SELECT USING (true);
CREATE POLICY "Allow public read access for exams" ON exams FOR SELECT USING (true);
CREATE POLICY "Allow public read access for reviews" ON reviews FOR SELECT USING (true);

-- 7. Profiles Table (Linked to Auth.Users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  updated_at TIMESTAMPTZ,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  role TEXT DEFAULT 'student'
);

-- 8. Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 9. Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Leads Table (Brochure Requests)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  college_id UUID REFERENCES colleges(id),
  college_name TEXT,
  stream TEXT,
  source TEXT DEFAULT 'brochure_download',
  status TEXT DEFAULT 'new'
);

-- 11. Enable RLS on leads
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public insert for leads" ON leads;
DROP POLICY IF EXISTS "Admins can view all leads" ON leads;
CREATE POLICY "Allow public insert for leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all leads" ON leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);


-- 12. Articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  category TEXT NOT NULL,
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
  content TEXT
);


-- Drop existing articles table if it exists
DROP TABLE IF EXISTS articles;

-- Create the new articles table
CREATE TABLE articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    -- Stream-based category as requested
    category TEXT NOT NULL CHECK (category IN ('btech', 'mba', 'mtech', 'mbbs', 'bds', 'bsc nursing')),
    -- Added sub_category for the type of article (Admission, Review, etc.)
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


-- 1. FIX SECURITY (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read access" ON articles;
CREATE POLICY "Allow public read access" ON articles FOR SELECT USING (true);

-- 2. ALIGN LABELS TO YOUR FRONTEND
UPDATE articles SET sub_category = 'NEET & Entrance' WHERE sub_category = 'Exams' AND category IN ('mbbs', 'bds', 'bsc nursing');
UPDATE articles SET sub_category = 'JEE & Entrance' WHERE sub_category = 'Exams' AND category IN ('btech', 'mtech');
UPDATE articles SET sub_category = 'CAT & Entrance' WHERE sub_category = 'Exams' AND category = 'mba';

-- 3. VERIFY DATA IS ACCESSIBLE
SELECT category, sub_category, count(*) FROM articles GROUP BY category, sub_category;



-- ============================================================
--  COLLEGE PROFILE PLATFORM — SUPABASE SCHEMA
--  Matches: college-profile.tsx types exactly
--  Conventions:
--    • All PKs are UUID generated by gen_random_uuid()
--    • created_at / updated_at on every table (auto-managed)
--    • RLS enabled on all tables (public read, auth write)
--    • Indexes on every FK + common filter columns
-- ============================================================


-- ============================================================
-- PROMOTE EDUCATION: MASTER CLEAN SLATE SCHEMA
-- ============================================================

-- 0. EXTENSIONS
create extension if not exists "pgcrypto";   -- For gen_random_uuid()
create extension if not exists pg_trgm;      -- For fuzzy search

-- 1. AUTH / PROFILES (User management)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- AUTH POLICIES
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Trigger for new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Re-create trigger safely
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. COLLEGES (Master Table)
-- 2. COLLEGES (Master Table)
drop table if exists colleges cascade;
create table colleges (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text not null unique,
  name                  text not null,
  short_name            text not null,
  location              text not null,
  state                 text not null,
  stream                text not null,
  ranking               integer,              -- New ranking field
  type                  college_type default 'private', -- New type field
  avg_ctc               text,                 -- New CTC field (Text)
  total_fee             text,                 -- New Fee field (Text)
  verified              boolean default false, -- New verified field
  ownership             text not null,
  affiliation           text,
  established           smallint,
  description           text,
  nirf_rank             smallint,
  naac_grade            text,
  naac_cgpa             numeric(3,2),
  campus_size           text,
  total_students        int,
  faculty_count         int,
  phd_scholars          int,
  international_students int,
  research_publications  int,
  avg_package           numeric(6,2),
  highest_package       numeric(7,2),
  placement_rate        numeric(5,2),
  total_offers          int,
  companies_visited     int,
  entrance_exam         text,
  rating                numeric(2,1) default 4.5,
  review_count          int default 0,
  video_url             text,
  facilities            text[],
  official_website      text,
  contact_email         text,
  meta_title            text,
  meta_description      text,
  is_active             boolean not null default true,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- 3. COURSES
create table if not exists courses (
  id            uuid primary key default gen_random_uuid(),
  college_id    uuid not null references colleges (id) on delete cascade,
  name          text not null,
  level         text not null default 'UG',
  fees          int not null,
  duration      text not null,
  eligibility   text,
  is_popular    boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
ALTER TABLE courses
ADD COLUMN career text,
ADD COLUMN avg_salary text;

-- 4. PLACEMENTS
create table if not exists placements (
  id                  uuid primary key default gen_random_uuid(),
  college_id          uuid not null references colleges (id) on delete cascade,
  year                smallint not null,
  avg_package         numeric(6,2) not null,
  highest_package     numeric(7,2),
  placement_rate      numeric(5,2),
  total_offers        int,
  companies_visited   int,
  recruiters          text[] not null default '{}',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (college_id, year)
);

-- 5. CUTOFFS
-- ============================================================
-- SAFE MIGRATION - Only adds cutoff table with your required fields
-- Your existing data is SAFE - Nothing is deleted
-- ============================================================

-- 1. Create CUTOFFS table with ONLY the fields you need
CREATE TABLE IF NOT EXISTS cutoffs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_name       TEXT NOT NULL,      -- Exam (NEET)
    year            SMALLINT NOT NULL,                  -- Years (2023, 2024)
    course          TEXT NOT NULL,                      -- Course (MBBS, BDS)
    college_type    TEXT,                               -- College Type (government, private, deemed)
    state           TEXT NOT NULL,                      -- State
    quota           TEXT NOT NULL,                      -- Counselling/Quota (AIQ, State, Management)
    college_id      UUID REFERENCES colleges(id),       -- College (foreign key)
    college_name    TEXT NOT NULL,                      -- College name (denormalized for quick display)
    category        TEXT NOT NULL,                      -- Your Category (General, OBC, SC, ST, EWS)
    opening_rank    INT,                                -- Opening rank
    closing_rank    INT NOT NULL,                       -- Closing rank
    round_number    SMALLINT DEFAULT 1,                 -- Counselling round
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Add indexes for fast filtering (based on your screenshot filters)
CREATE INDEX IF NOT EXISTS idx_cutoffs_exam_year ON cutoffs(exam_name, year);
CREATE INDEX IF NOT EXISTS idx_cutoffs_course ON cutoffs(course);
CREATE INDEX IF NOT EXISTS idx_cutoffs_college_type ON cutoffs(college_type);
CREATE INDEX IF NOT EXISTS idx_cutoffs_state ON cutoffs(state);
CREATE INDEX IF NOT EXISTS idx_cutoffs_quota ON cutoffs(quota);
CREATE INDEX IF NOT EXISTS idx_cutoffs_college ON cutoffs(college_id);
CREATE INDEX IF NOT EXISTS idx_cutoffs_category ON cutoffs(category);

-- 3. Enable RLS
ALTER TABLE cutoffs ENABLE ROW LEVEL SECURITY;

-- 4. Public read access
DROP POLICY IF EXISTS "cutoffs_public_read" ON cutoffs;
CREATE POLICY "cutoffs_public_read" ON cutoffs FOR SELECT USING (true);

-- 5. Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_cutoffs_updated_at ON cutoffs;
CREATE TRIGGER update_cutoffs_updated_at
    BEFORE UPDATE ON cutoffs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- 6. REVIEWS
create table if not exists reviews (
  id           uuid primary key default gen_random_uuid(),
  college_id   uuid not null references colleges (id) on delete cascade,
  user_name    text not null,
  rating       numeric(2,1) not null check (rating between 1 and 5),
  comment      text not null,
  user_tag     text,
  is_verified  boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 7. FAQS
create table if not exists faqs (
  id          uuid primary key default gen_random_uuid(),
  college_id  uuid not null references colleges (id) on delete cascade,
  question    text not null,
  answer      text not null,
  sort_order  smallint not null default 100,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 8. RANKINGS
create table if not exists rankings (
  id          uuid primary key default gen_random_uuid(),
  college_id  uuid not null references colleges (id) on delete cascade,
  agency      text not null,
  rank        text not null,
  year        smallint not null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 9. GALLERY
create table if not exists gallery (
  id          uuid primary key default gen_random_uuid(),
  college_id  uuid not null references colleges (id) on delete cascade,
  image_url   text not null,
  caption     text,
  category    text not null default 'Campus',
  sort_order  smallint not null default 100,
  created_at  timestamptz not null default now()
);

-- 8. SCHOLARSHIPS
create table if not exists scholarships (
  id           uuid primary key default gen_random_uuid(),
  college_id   uuid not null references colleges (id) on delete cascade,
  name         text not null,
  amount       text,
  eligibility  text,
  created_at   timestamptz not null default now()
);

-- 11. IMPORTANT DATES
create table if not exists important_dates (
  id           uuid primary key default gen_random_uuid(),
  college_id   uuid not null references colleges (id) on delete cascade,
  event_name   text not null,
  event_date   date not null,
  created_at   timestamptz not null default now()
);

-- 12. RELATED COLLEGES
create table if not exists related_colleges (
  id          uuid primary key default gen_random_uuid(),
  college_id  uuid not null references colleges (id) on delete cascade,
  related_id  uuid not null references colleges (id) on delete cascade,
  unique(college_id, related_id)
);

-- 13. ARTICLES (Clean Definition)
create table if not exists articles (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  excerpt       text,
  content       text,
  image_url     text,
  category      text not null,
  sub_category  text,
  read_time     text,
  author        text default 'Promote Education Team',
  is_published  boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ============================================================
-- GLOBAL TRIGGERS & RLS
-- ============================================================

-- Function to update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Attach triggers to all tables
create trigger colleges_updated_at before update on colleges for each row execute function update_updated_at();
create trigger courses_updated_at before update on courses for each row execute function update_updated_at();
create trigger placements_updated_at before update on placements for each row execute function update_updated_at();
create trigger cutoffs_updated_at before update on cutoffs for each row execute function update_updated_at();
create trigger reviews_updated_at before update on reviews for each row execute function update_updated_at();
create trigger faqs_updated_at before update on faqs for each row execute function update_updated_at();
create trigger rankings_updated_at before update on rankings for each row execute function update_updated_at();
create trigger articles_updated_at before update on articles for each row execute function update_updated_at();

-- ENABLE RLS
alter table colleges   enable row level security;
alter table courses    enable row level security;
alter table placements enable row level security;
alter table cutoffs    enable row level security;
alter table reviews    enable row level security;
alter table faqs       enable row level security;
alter table rankings   enable row level security;
alter table gallery    enable row level security;
alter table scholarships enable row level security;
alter table important_dates enable row level security;
alter table related_colleges enable row level security;
alter table articles   enable row level security;

-- Public read policies (All tables)
create policy "Public read: Colleges" on colleges for select using (true);
create policy "Public read: Courses" on courses for select using (true);
create policy "Public read: Placements" on placements for select using (true);
create policy "Public read: Cutoffs" on cutoffs for select using (true);
create policy "Public read: Reviews" on reviews for select using (true);
create policy "Public read: FAQs" on faqs for select using (true);
create policy "Public read: Rankings" on rankings for select using (true);
create policy "Public read: Gallery" on gallery for select using (true);
create policy "Public read: Scholarships" on scholarships for select using (true);
create policy "Public read: Dates" on important_dates for select using (true);
create policy "Public read: Related" on related_colleges for select using (true);
create policy "Public read: Articles" on articles for select using (true);

-- Indexing for performance
create index if not exists idx_colleges_slug on colleges(slug);
create index if not exists idx_courses_college on courses(college_id);
create index if not exists idx_placements_college on placements(college_id);
create index if not exists idx_cutoffs_college on cutoffs(college_id);
create index if not exists idx_reviews_college on reviews(college_id);
create index if not exists idx_articles_slug on articles(slug);

-- SYNC TRIGGER: Auto-update colleges summary from placements
create or replace function sync_college_placement_summary()
returns trigger language plpgsql as $$
declare
  latest_year smallint;
begin
  select max(year) into latest_year
  from placements
  where college_id = new.college_id;

  if new.year = latest_year then
    update colleges set
      avg_package       = new.avg_package,
      highest_package   = new.highest_package,
      placement_rate    = new.placement_rate,
      total_offers      = new.total_offers,
      companies_visited = new.companies_visited,
      updated_at        = now()
    where id = new.college_id;
  end if;

  return new;
end;
$$;

create trigger placements_sync_college
  after insert or update on placements
  for each row execute function sync_college_placement_summary();



CREATE POLICY "Public can post reviews" ON reviews FOR INSERT WITH CHECK (true);


ALTER TABLE colleges
ADD COLUMN IF NOT EXISTS content JSONB,
ADD COLUMN IF NOT EXISTS features JSONB;

UPDATE colleges
SET content = jsonb_build_object(
  'overview',
  name || ' is a ' || ownership || ' institution located in ' || location || ', ' || state || '. Established in ' || established || ', it is known for excellence in ' || stream || ' education.',

  'why_choose',
  'Students choose ' || name || ' due to its strong academic reputation, experienced faculty, and excellent placement opportunities.',

  'placements',
  'The average placement package at ' || name || ' is ₹' || avg_package || ' LPA, with top recruiters visiting every year.',

  'campus_life',
  name || ' offers a vibrant campus life with hostels, sports facilities, libraries, and student clubs.',

  'admission',
  'Admission to ' || name || ' is based on ' || entrance_exam || ' followed by counseling.'
);


UPDATE colleges
SET features = jsonb_build_object(
  'show_courses', true,
  'show_cutoffs', true,
  'show_placements', true,
  'show_faqs', true,
  'show_gallery', false,
  'show_scholarships', true
);


ALTER TABLE colleges ADD COLUMN faqs jsonb;

ALTER TABLE colleges
ADD COLUMN comparison_content JSONB;

CREATE TABLE comparisons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE,
  college1_slug TEXT,
  college2_slug TEXT,
  content JSONB,
  created_at TIMESTAMP DEFAULT now()
);


ALTER TABLE colleges 
ADD COLUMN content_version INT,
ADD COLUMN content_updated_at TIMESTAMPTZ,
ADD COLUMN raw_ai TEXT;


-- Update all colleges with the new Step-by-Step Selection content
UPDATE colleges
SET content = content || jsonb_build_object(
  'selection_steps', jsonb_build_array(
    jsonb_build_object('step', 'EXAMINATION', 'desc', 'Qualify ' || COALESCE(entrance_exam, 'the relevant national entrance exam') || ' with a strong score/rank.'),
    jsonb_build_object('step', 'REGISTRATION', 'desc', 'Register on the official counselling portal (MCC / State authority) within the deadline.'),
    jsonb_build_object('step', 'CHOICE FILLING', 'desc', 'Select ' || COALESCE(short_name, name) || ' as your preferred institution during the choice-filling window.'),
    jsonb_build_object('step', 'SEAT ALLOTMENT', 'desc', 'Based on rank, category, and availability, seats are allotted in rounds. Accept and report to the institution.')
  )
);

-- Safe update that handles NULL content columns
UPDATE colleges
SET content = COALESCE(content, '{}'::jsonb) || jsonb_build_object(
  'selection_steps', jsonb_build_array(
    jsonb_build_object('step', 'EXAMINATION', 'desc', 'Qualify ' || COALESCE(entrance_exam, 'the relevant national entrance exam') || ' with a strong score/rank.'),
    jsonb_build_object('step', 'REGISTRATION', 'desc', 'Register on the official counselling portal (MCC / State authority) within the deadline.'),
    jsonb_build_object('step', 'CHOICE FILLING', 'desc', 'Select ' || COALESCE(short_name, name) || ' as your preferred institution during the choice-filling window.'),
    jsonb_build_object('step', 'SEAT ALLOTMENT', 'desc', 'Based on rank, category, and availability, seats are allotted in rounds. Accept and report to the institution.')
  )
);
