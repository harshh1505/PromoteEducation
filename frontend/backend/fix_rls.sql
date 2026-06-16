-- ============================================================
-- RLS FIX — Run this in Supabase SQL Editor
-- Enables public read access on courses, placements, cutoffs
-- ============================================================

-- Step 1: Verify data exists (check output before proceeding)
SELECT 'colleges'   AS tbl, COUNT(*) FROM colleges
UNION ALL
SELECT 'courses'    AS tbl, COUNT(*) FROM courses
UNION ALL
SELECT 'placements' AS tbl, COUNT(*) FROM placements
UNION ALL
SELECT 'cutoffs'    AS tbl, COUNT(*) FROM cutoffs;

-- Step 2: Enable RLS + add public read policies
ALTER TABLE courses    ENABLE ROW LEVEL SECURITY;
ALTER TABLE placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE cutoffs    ENABLE ROW LEVEL SECURITY;

-- Drop if they already exist (safe re-run)
DROP POLICY IF EXISTS "public can read courses"    ON courses;
DROP POLICY IF EXISTS "public can read placements" ON placements;
DROP POLICY IF EXISTS "public can read cutoffs"    ON cutoffs;

-- Create fresh policies
CREATE POLICY "public can read courses"    ON courses    FOR SELECT USING (true);
CREATE POLICY "public can read placements" ON placements FOR SELECT USING (true);
CREATE POLICY "public can read cutoffs"    ON cutoffs    FOR SELECT USING (true);
