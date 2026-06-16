ALTER TABLE exams 
ALTER COLUMN full_name DROP NOT NULL;
create table if not exists exams (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

insert into exams (name) values ('NEET') on conflict do nothing;

drop table if exists cutoffs;

create table cutoffs (
  id uuid primary key default gen_random_uuid(),

  college_id uuid not null references colleges(id) on delete cascade,
  exam_id uuid not null references exams(id),

  course text not null,
  category text not null,
  quota text not null,
  state text not null,
  college_type text not null,

  rank int not null,
  marks int,

  round int not null,
  year int not null,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_cutoffs_year on cutoffs(year);
create index idx_cutoffs_course on cutoffs(course);
create index idx_cutoffs_state on cutoffs(state);
create index idx_cutoffs_quota on cutoffs(quota);
create index idx_cutoffs_category on cutoffs(category);
create index idx_cutoffs_college on cutoffs(college_id);



-- ============================================================
-- SAFE INSERT: NEET UG Cutoffs (West Bengal Govt Colleges)
-- Fixes applied:
--   1. No redefinition of exams table
--   2. Case-insensitive + trimmed college name matching
--   3. CTE for exam ID (performance)
--   4. DELETE safety to prevent duplicates on re-run
--   5. Lower/trim on both sides
-- ============================================================

BEGIN;

-- Safety: Remove existing entries for these years (prevents duplicates)
DELETE FROM cutoffs 
WHERE year IN (2023, 2024, 2025)
  AND exam_id IN (SELECT id FROM exams WHERE name = 'NEET');

-- 1. BANKURA SAMMILANI MEDICAL COLLEGE, BANKURA
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'Open', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,11895,1), (2025,18161,2), (2025,20819,3),
  (2024,10552,1), (2024,16017,2), (2024,18299,3),
  (2023,10417,1), (2023,13686,2), (2023,15037,3), (2023,21750,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('BANKURA SAMMILANI MEDICAL COLLEGE, BANKURA'));

-- 2. BARASAT GOVERNMENT MEDICAL COLLEGE AND HOSPITAL
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'Open', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,13148,1), (2025,19032,2), (2025,19805,3),
  (2024,12940,1), (2024,17599,2), (2024,19403,3),
  (2023,12776,1), (2023,15920,2), (2023,16787,3)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('BARASAT GOVERNMENT MEDICAL COLLEGE AND HOSPITAL'));

-- 3. BURDWAN MEDICAL COLLEGE, BURDWAN
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'Open', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,10078,1), (2025,15052,2), (2025,18519,3),
  (2024,9457,1), (2024,14914,2), (2024,16145,3), (2024,21322,4),
  (2023,8107,1), (2023,11418,2), (2023,12536,3)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('BURDWAN MEDICAL COLLEGE, BURDWAN'));

-- 4. CALCUTTA NATIONAL MEDICAL COLLEGE, KOLKATA
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'Open', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,6375,1), (2025,11518,2), (2025,13687,3), (2025,21457,4),
  (2024,5975,1), (2024,10003,2), (2024,11523,3), (2024,12892,4),
  (2023,5158,1), (2023,8292,2), (2023,9847,3), (2023,15081,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('CALCUTTA NATIONAL MEDICAL COLLEGE, KOLKATA'));

-- 5. COLLEGE OF MEDICINE and JNM HOSPITAL, KALYANI
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'Open', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,10895,1), (2025,16256,2), (2025,20065,3),
  (2024,9729,1), (2024,14928,2), (2024,17092,3),
  (2023,9242,1), (2023,11770,2), (2023,13686,3), (2023,21315,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('COLLEGE OF MEDICINE and JNM HOSPITAL, KALYANI'));

-- 6. COLLEGE OF MEDICINE AND SAGORE DUTTA HOSPITAL, KAMARHATI
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'Open', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,8390,1), (2025,14056,2), (2025,16600,3), (2025,26791,4),
  (2024,7347,1), (2024,11577,2), (2024,14445,3), (2024,18981,4),
  (2023,6497,1), (2023,9993,2), (2023,11410,3), (2023,18340,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('COLLEGE OF MEDICINE AND SAGORE DUTTA HOSPITAL, KAMARHATI'));

-- 7. DEBEN MAHATA GOVERNMENT MEDICAL COLLEGE & HOSPITAL, PURULIA
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'Open', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,18165,1), (2025,21259,2), (2025,22750,3),
  (2024,16398,1), (2024,20380,2), (2024,22140,3),
  (2023,15108,1), (2023,17526,2), (2023,18737,3), (2023,23161,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('Deben Mahata Government Medical College & Hospital, Purulia'));

-- 8. DIAMOND HARBOUR GOVT MEDICAL COLLEGE, DIAMOND HARBOUR
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'Open', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,11448,1), (2025,18340,2), (2025,21828,3),
  (2024,11809,1), (2024,15220,2), (2024,18398,3), (2024,19036,4), (2024,25097,5),
  (2023,10870,1), (2023,12782,2), (2023,14567,3)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('Diamond Harbour Govt Medical College, Diamond Harbour'));

COMMIT;

-- Verification
SELECT COUNT(*) AS inserted_rows FROM cutoffs;


BEGIN;

-- Safety: Remove existing cutoffs for these colleges & years
DELETE FROM cutoffs 
WHERE year IN (2023, 2024, 2025)
  AND exam_id IN (SELECT id FROM exams WHERE name = 'NEET')
  AND college_id IN (
    SELECT id FROM colleges WHERE lower(trim(name)) IN (
      lower(trim('ESI PGI MSR AND ESIC MEDICAL COLLEGE, JOKA, KOLKATA')),
      lower(trim('Government Medical College & Hospital, Jalpaiguri')),
      lower(trim('INSTITUTE OF PG MEDICAL EDUCATION AND RESEARCH, KOLKATA')),
      lower(trim('Jhargram Government Medical College and Hospital, Jhargram')),
      lower(trim('Maharaja Jitendra Narayan Medical College and Hospital Coochbehar')),
      lower(trim('MALDA MED. COLLEGE, MALDA')),
      lower(trim('MEDICAL COLLEGE, KOLKATA'))
    )
  );

-- 1. ESI PGI MSR AND ESIC MEDICAL COLLEGE, JOKA, KOLKATA (Category: OPEN (General))
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'OPEN (General)', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2024,23178,1),
  (2024,23178,2),
  (2023,23178,3)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('ESI PGI MSR AND ESIC MEDICAL COLLEGE, JOKA, KOLKATA'));

-- 2. Government Medical College & Hospital, Jalpaiguri (Category: UR)
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'UR', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,41180,1),
  (2025,42738,2),
  (2025,45707,3),
  (2025,45707,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('Government Medical College & Hospital, Jalpaiguri'));

-- 3. INSTITUTE OF PG MEDICAL EDUCATION AND RESEARCH, KOLKATA (Category: UR)
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'UR', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,7598,1),
  (2025,8609,2),
  (2025,8857,3),
  (2025,8857,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('INSTITUTE OF PG MEDICAL EDUCATION AND RESEARCH, KOLKATA'));

-- 4. Jhargram Government Medical College and Hospital, Jhargram (Category: UR)
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'UR', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,40160,1),
  (2025,41588,2),
  (2025,44151,3),
  (2025,44151,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('Jhargram Government Medical College and Hospital, Jhargram'));

-- 5. Maharaja Jitendra Narayan Medical College and Hospital Coochbehar (Category: UR)
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'UR', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,41522,1),
  (2025,42879,2),
  (2025,46820,3),
  (2025,47367,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('Maharaja Jitendra Narayan Medical College and Hospital Coochbehar'));

-- 6. MALDA MED. COLLEGE, MALDA (Category: UR)
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'UR', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,32604,1),
  (2025,37007,2),
  (2025,40016,3),
  (2025,40016,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('MALDA MED. COLLEGE, MALDA'));

-- 7. MEDICAL COLLEGE, KOLKATA (Category: UR)
INSERT INTO cutoffs (college_id, exam_id, course, category, quota, state, college_type, rank, round, year)
SELECT c.id, e.id, 'MBBS', 'UR', 'State', 'West Bengal', 'Govt.', v.rank, v.round, v.year
FROM (VALUES
  (2025,5684,1),
  (2025,8597,2),
  (2025,8982,3),
  (2025,8982,4)
) AS v(year, rank, round)
CROSS JOIN (SELECT id FROM exams WHERE name = 'NEET') e
CROSS JOIN colleges c
WHERE lower(trim(c.name)) = lower(trim('MEDICAL COLLEGE, KOLKATA'));

COMMIT;

-- Verify
SELECT COUNT(*) FROM cutoffs
WHERE college_id IN (
  SELECT id FROM colleges WHERE lower(trim(name)) IN (
    lower(trim('ESI PGI MSR AND ESIC MEDICAL COLLEGE, JOKA, KOLKATA')),
    lower(trim('Government Medical College & Hospital, Jalpaiguri')),
    lower(trim('INSTITUTE OF PG MEDICAL EDUCATION AND RESEARCH, KOLKATA')),
    lower(trim('Jhargram Government Medical College and Hospital, Jhargram')),
    lower(trim('Maharaja Jitendra Narayan Medical College and Hospital Coochbehar')),
    lower(trim('MALDA MED. COLLEGE, MALDA')),
    lower(trim('MEDICAL COLLEGE, KOLKATA'))
  )
);