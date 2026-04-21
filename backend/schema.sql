-- 1. Custom Types
DO $$ BEGIN
    CREATE TYPE college_type AS ENUM ('government', 'private', 'deemed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Colleges Table (Includes Ranking Data)
CREATE TABLE IF NOT EXISTS colleges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  state TEXT NOT NULL,
  
  -- Ranking Details
  ranking INTEGER,
  ranking_body TEXT DEFAULT 'NIRF',
  
  -- Specialized Categories: 
  -- University, College, Engineering, Management, Pharmacy, 
  -- Medical, Dental, Law, Architecture, Agriculture
  stream TEXT NOT NULL, 
  
  type college_type DEFAULT 'private',
  avg_ctc NUMERIC(10, 2),
  highest_ctc NUMERIC(10, 2),
  cutoff TEXT,
  cutoff_exam TEXT,
  tags TEXT[] DEFAULT '{}',
  accreditation TEXT[] DEFAULT '{}',
  established INTEGER,
  total_fee NUMERIC(10, 2),
  verified BOOLEAN DEFAULT false,
  logo_url TEXT,
  website TEXT
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
CREATE POLICY "Allow public read access for colleges" ON colleges FOR SELECT USING (true);
CREATE POLICY "Allow public read access for exams" ON exams FOR SELECT USING (true);
CREATE POLICY "Allow public read access for reviews" ON reviews FOR SELECT USING (true);


-----------------------------------------------------------------------------------
-- NEW QUERIES: CORE AUTH & PROFILES SYNC (RUN THESE NEXT)
-----------------------------------------------------------------------------------

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
CREATE POLICY "Allow public insert for leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view all leads" ON leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
