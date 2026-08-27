-- Create contact_submissions table for storing contact form queries
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  stream TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new' NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so contact form on public website works without login)
CREATE POLICY "Allow public inserts" ON contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Allow authenticated users (like admin) to read, update and delete submissions
CREATE POLICY "Allow authenticated read" ON contact_submissions
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update" ON contact_submissions
  FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete" ON contact_submissions
  FOR DELETE TO authenticated
  USING (true);