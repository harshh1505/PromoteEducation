-- =============================================================
-- SEED: cutoffs
-- Schema: id, college_id (FK), year, branch, cutoff_rank
-- Run AFTER seed_colleges.sql
-- NOTE: cutoff_rank = closing rank (AIR). For CAT percentile,
--       value is stored as percentile × 10 (e.g. 995 = 99.5 %ile).
-- =============================================================

INSERT INTO cutoffs (college_id, year, branch, cutoff_rank)

-- ── IIT Bombay (JEE Advanced – closing rank) ─────────────────
SELECT id, 2025, 'CSE',               67   FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2025, 'Electrical',        450  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2025, 'Mechanical',       1600  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2025, 'Civil',            3000  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2025, 'Chemical',         1300  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2024, 'CSE',               66   FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2024, 'Electrical',        312  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2024, 'Mechanical',        782  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2024, 'Civil',            1870  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2023, 'CSE',               72   FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2023, 'Electrical',        348  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 2022, 'CSE',               68   FROM colleges WHERE slug='iit-bombay' UNION ALL

-- ── IIT Delhi ────────────────────────────────────────────────
SELECT id, 2025, 'CSE',               54   FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 2025, 'Electrical',        267  FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 2025, 'Mechanical',        712  FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 2025, 'Civil',            1750  FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 2024, 'CSE',               58   FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 2024, 'Electrical',        290  FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 2023, 'CSE',               61   FROM colleges WHERE slug='iit-delhi' UNION ALL

-- ── IIT Madras ───────────────────────────────────────────────
SELECT id, 2025, 'CSE',              127   FROM colleges WHERE slug='iit-madras' UNION ALL
SELECT id, 2025, 'Electrical',       504   FROM colleges WHERE slug='iit-madras' UNION ALL
SELECT id, 2025, 'Mechanical',      1200   FROM colleges WHERE slug='iit-madras' UNION ALL
SELECT id, 2024, 'CSE',              119   FROM colleges WHERE slug='iit-madras' UNION ALL
SELECT id, 2023, 'CSE',              131   FROM colleges WHERE slug='iit-madras' UNION ALL

-- ── IIT Kanpur ────────────────────────────────────────────────
SELECT id, 2025, 'CSE',              155   FROM colleges WHERE slug='iit-kanpur' UNION ALL
SELECT id, 2025, 'Electrical',       558   FROM colleges WHERE slug='iit-kanpur' UNION ALL
SELECT id, 2025, 'Mechanical',      1420   FROM colleges WHERE slug='iit-kanpur' UNION ALL
SELECT id, 2024, 'CSE',              162   FROM colleges WHERE slug='iit-kanpur' UNION ALL

-- ── IIT Kharagpur ─────────────────────────────────────────────
SELECT id, 2025, 'CSE',              309   FROM colleges WHERE slug='iit-kharagpur' UNION ALL
SELECT id, 2025, 'Electrical',       742   FROM colleges WHERE slug='iit-kharagpur' UNION ALL
SELECT id, 2025, 'Mechanical',      1760   FROM colleges WHERE slug='iit-kharagpur' UNION ALL
SELECT id, 2025, 'B.Arch.',         2190   FROM colleges WHERE slug='iit-kharagpur' UNION ALL
SELECT id, 2024, 'CSE',              325   FROM colleges WHERE slug='iit-kharagpur' UNION ALL

-- ── NIT Trichy (JEE Main – closing rank) ──────────────────────
SELECT id, 2025, 'CSE (Home State)',    1820  FROM colleges WHERE slug='nit-trichy' UNION ALL
SELECT id, 2025, 'CSE (Other State)',   3452  FROM colleges WHERE slug='nit-trichy' UNION ALL
SELECT id, 2025, 'Electrical (Home State)', 5610 FROM colleges WHERE slug='nit-trichy' UNION ALL
SELECT id, 2025, 'Mechanical (Home State)',10280 FROM colleges WHERE slug='nit-trichy' UNION ALL
SELECT id, 2024, 'CSE (Home State)',    1740  FROM colleges WHERE slug='nit-trichy' UNION ALL
SELECT id, 2023, 'CSE (Home State)',    1690  FROM colleges WHERE slug='nit-trichy' UNION ALL

-- ── NIT Warangal ─────────────────────────────────────────────
SELECT id, 2025, 'CSE (Home State)',    2104  FROM colleges WHERE slug='nit-warangal' UNION ALL
SELECT id, 2025, 'CSE (Other State)',   4280  FROM colleges WHERE slug='nit-warangal' UNION ALL
SELECT id, 2025, 'Electrical',          7342  FROM colleges WHERE slug='nit-warangal' UNION ALL
SELECT id, 2024, 'CSE (Home State)',    1980  FROM colleges WHERE slug='nit-warangal' UNION ALL

-- ── IIM Ahmedabad (CAT percentile × 10) ──────────────────────
SELECT id, 2025, 'MBA (PGP) – General', 995  FROM colleges WHERE slug='iim-ahmedabad' UNION ALL
SELECT id, 2025, 'MBA (PGP) – OBC',     990  FROM colleges WHERE slug='iim-ahmedabad' UNION ALL
SELECT id, 2025, 'MBA (PGP) – SC',      980  FROM colleges WHERE slug='iim-ahmedabad' UNION ALL
SELECT id, 2024, 'MBA (PGP) – General', 993  FROM colleges WHERE slug='iim-ahmedabad' UNION ALL

-- ── IIM Bangalore ─────────────────────────────────────────────
SELECT id, 2025, 'MBA (PGP) – General', 990  FROM colleges WHERE slug='iim-bangalore' UNION ALL
SELECT id, 2025, 'MBA (PGP) – OBC',     985  FROM colleges WHERE slug='iim-bangalore' UNION ALL
SELECT id, 2024, 'MBA (PGP) – General', 988  FROM colleges WHERE slug='iim-bangalore' UNION ALL

-- ── IIM Calcutta ─────────────────────────────────────────────
SELECT id, 2025, 'MBA (PGP) – General', 985  FROM colleges WHERE slug='iim-calcutta' UNION ALL
SELECT id, 2025, 'MBA (PGP) – OBC',     978  FROM colleges WHERE slug='iim-calcutta' UNION ALL
SELECT id, 2024, 'MBA (PGP) – General', 982  FROM colleges WHERE slug='iim-calcutta' UNION ALL

-- ── BITS Pilani (BITSAT score) ────────────────────────────────
SELECT id, 2025, 'CSE',                389   FROM colleges WHERE slug='bits-pilani' UNION ALL
SELECT id, 2025, 'Electrical & Electronics', 352 FROM colleges WHERE slug='bits-pilani' UNION ALL
SELECT id, 2025, 'Mechanical',         320   FROM colleges WHERE slug='bits-pilani' UNION ALL
SELECT id, 2025, 'Chemical',           305   FROM colleges WHERE slug='bits-pilani' UNION ALL
SELECT id, 2024, 'CSE',               384   FROM colleges WHERE slug='bits-pilani' UNION ALL
SELECT id, 2023, 'CSE',               375   FROM colleges WHERE slug='bits-pilani' UNION ALL

-- ── AIIMS Delhi (NEET UG closing rank) ───────────────────────
SELECT id, 2025, 'MBBS – General',     50   FROM colleges WHERE slug='aiims-delhi' UNION ALL
SELECT id, 2025, 'MBBS – OBC',         25   FROM colleges WHERE slug='aiims-delhi' UNION ALL
SELECT id, 2025, 'MBBS – SC',          15   FROM colleges WHERE slug='aiims-delhi' UNION ALL
SELECT id, 2025, 'MBBS – ST',           8   FROM colleges WHERE slug='aiims-delhi' UNION ALL
SELECT id, 2024, 'MBBS – General',     44   FROM colleges WHERE slug='aiims-delhi' UNION ALL
SELECT id, 2023, 'MBBS – General',     38   FROM colleges WHERE slug='aiims-delhi' UNION ALL

-- ── AIIMS Kalyani ─────────────────────────────────────────────
SELECT id, 2025, 'MBBS – General',   1842   FROM colleges WHERE slug='aiims-kalyani' UNION ALL
SELECT id, 2025, 'MBBS – OBC',        920   FROM colleges WHERE slug='aiims-kalyani' UNION ALL
SELECT id, 2025, 'MBBS – SC',         340   FROM colleges WHERE slug='aiims-kalyani' UNION ALL
SELECT id, 2024, 'MBBS – General',   1765   FROM colleges WHERE slug='aiims-kalyani' UNION ALL

-- ── VIT Vellore (VITEEE rank) ─────────────────────────────────
SELECT id, 2025, 'CSE',              2500   FROM colleges WHERE slug='vit-vellore' UNION ALL
SELECT id, 2025, 'Electronics',      8400   FROM colleges WHERE slug='vit-vellore' UNION ALL
SELECT id, 2025, 'Mechanical',      22000   FROM colleges WHERE slug='vit-vellore' UNION ALL
SELECT id, 2024, 'CSE',              2200   FROM colleges WHERE slug='vit-vellore' UNION ALL

-- ── Medical College Kolkata (NEET UG state quota) ─────────────
SELECT id, 2025, 'MBBS – General',   7210   FROM colleges WHERE slug='medical-college-kolkata' UNION ALL
SELECT id, 2025, 'MBBS – OBC',       4560   FROM colleges WHERE slug='medical-college-kolkata' UNION ALL
SELECT id, 2025, 'MBBS – SC',        1280   FROM colleges WHERE slug='medical-college-kolkata' UNION ALL
SELECT id, 2024, 'MBBS – General',   6940   FROM colleges WHERE slug='medical-college-kolkata' UNION ALL

-- ── NLSIU Bangalore (CLAT closing rank) ──────────────────────
SELECT id, 2025, 'B.A. LL.B. – General',  87  FROM colleges WHERE slug='nlsiu-bangalore' UNION ALL
SELECT id, 2025, 'B.A. LL.B. – OBC',      45  FROM colleges WHERE slug='nlsiu-bangalore' UNION ALL
SELECT id, 2025, 'B.A. LL.B. – SC',       28  FROM colleges WHERE slug='nlsiu-bangalore' UNION ALL
SELECT id, 2024, 'B.A. LL.B. – General',  92  FROM colleges WHERE slug='nlsiu-bangalore' UNION ALL
SELECT id, 2023, 'B.A. LL.B. – General',  95  FROM colleges WHERE slug='nlsiu-bangalore' UNION ALL

-- ── NLU Delhi (AILET closing rank) ───────────────────────────
SELECT id, 2025, 'B.A. LL.B. – General',  78  FROM colleges WHERE slug='nlu-delhi' UNION ALL
SELECT id, 2025, 'B.A. LL.B. – OBC',      42  FROM colleges WHERE slug='nlu-delhi' UNION ALL
SELECT id, 2024, 'B.A. LL.B. – General',  80  FROM colleges WHERE slug='nlu-delhi';
