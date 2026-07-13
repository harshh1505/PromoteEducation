-- =============================================================
-- SEED: IIT Delhi Course Catalog and Course Offerings
-- =============================================================

-- 1. Insert standard canonical courses into course_catalog
INSERT INTO course_catalog (name, slug, degree, level, career_domain)
VALUES
  ('B.Tech Computer Science and Engineering', 'btech-cse', 'B.Tech', 'UG', 'Software Engineering'),
  ('B.Tech Electrical Engineering', 'btech-electrical', 'B.Tech', 'UG', 'Electrical Engineering'),
  ('B.Tech Mechanical Engineering', 'btech-mechanical', 'B.Tech', 'UG', 'Mechanical Engineering'),
  ('B.Tech Civil Engineering', 'btech-civil', 'B.Tech', 'UG', 'Civil Engineering'),
  ('B.Tech Chemical Engineering', 'btech-chemical', 'B.Tech', 'UG', 'Chemical Engineering'),
  ('M.Tech Computer Science & Engineering', 'mtech-cse', 'M.Tech', 'PG', 'Engineering Research'),
  ('MBA', 'mba', 'MBA', 'PG', 'Management'),
  ('M.Sc. Physics', 'msc-physics', 'M.Sc.', 'PG', 'Academic & Research'),
  ('Ph.D. Engineering', 'phd-engineering', 'Ph.D.', 'Doctoral', 'Academic & Research')
ON CONFLICT (slug) DO UPDATE 
SET name = EXCLUDED.name, degree = EXCLUDED.degree, level = EXCLUDED.level, career_domain = EXCLUDED.career_domain;

-- 2. Insert per-college course offerings for IIT Delhi
DO $$
DECLARE
  v_college_id UUID;
BEGIN
  -- Select IIT Delhi college ID based on its unique slug
  SELECT id INTO v_college_id FROM colleges WHERE slug = 'indian-institute-of-technology-delhi-2';
  
  IF v_college_id IS NOT NULL THEN
    INSERT INTO courses (college_id, course_catalog_id, duration, fees, entrance_exam, eligibility, seats, avg_salary, is_popular)
    VALUES
      (v_college_id, (SELECT id FROM course_catalog WHERE slug = 'btech-cse'), '4 Years', 105000, 'JEE Advanced', 'Class 12 with 75%+', 120, '35 LPA', true),
      (v_college_id, (SELECT id FROM course_catalog WHERE slug = 'btech-electrical'), '4 Years', 105000, 'JEE Advanced', 'Class 12 with 75%+', 120, '28 LPA', false),
      (v_college_id, (SELECT id FROM course_catalog WHERE slug = 'btech-mechanical'), '4 Years', 105000, 'JEE Advanced', 'Class 12 with 75%+', 120, '22 LPA', false),
      (v_college_id, (SELECT id FROM course_catalog WHERE slug = 'btech-civil'), '4 Years', 105000, 'JEE Advanced', 'Class 12 with 75%+', 120, '18 LPA', false),
      (v_college_id, (SELECT id FROM course_catalog WHERE slug = 'btech-chemical'), '4 Years', 105000, 'JEE Advanced', 'Class 12 with 75%+', 120, '20 LPA', false),
      (v_college_id, (SELECT id FROM course_catalog WHERE slug = 'mtech-cse'), '2 Years', 18000, 'GATE', 'B.Tech / B.E.', 200, '18 LPA', false),
      (v_college_id, (SELECT id FROM course_catalog WHERE slug = 'mba'), '2 Years', 450000, 'CAT', 'Bachelor''s Degree', 90, '24 LPA', false)
    ON CONFLICT (college_id, course_catalog_id) DO UPDATE
    SET duration = EXCLUDED.duration,
        fees = EXCLUDED.fees,
        entrance_exam = EXCLUDED.entrance_exam,
        eligibility = EXCLUDED.eligibility,
        seats = EXCLUDED.seats,
        avg_salary = EXCLUDED.avg_salary,
        is_popular = EXCLUDED.is_popular;
  ELSE
    RAISE NOTICE 'IIT Delhi college record not found with slug indian-institute-of-technology-delhi-2';
  END IF;
END $$;
