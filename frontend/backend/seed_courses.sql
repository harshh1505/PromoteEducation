-- =============================================================
-- SEED: courses
-- Schema: id, college_id (FK), name, fees (₹ annual),
--         duration, eligibility
-- Run AFTER seed_colleges.sql
-- =============================================================

INSERT INTO courses (college_id, name, fees, duration, eligibility)

-- ── IIT Bombay ───────────────────────────────────────────────
SELECT id, 'B.Tech (CSE)',              200000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 'B.Tech (Electrical)',       200000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 'B.Tech (Mechanical)',       200000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 'B.Tech (Civil)',            200000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 'B.Tech (Chemical)',         200000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 'M.Tech',                   150000, '2 Years', 'GATE'          FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 'MBA (SJMSOM)',             550000, '2 Years', 'CAT + GD/PI'   FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 'M.Sc.',                     18000, '2 Years', 'IIT JAM'       FROM colleges WHERE slug='iit-bombay' UNION ALL
SELECT id, 'Ph.D.',                         0, '3-5 Years','GATE / NET + Interview' FROM colleges WHERE slug='iit-bombay'

UNION ALL

-- ── IIT Delhi ────────────────────────────────────────────────
SELECT id, 'B.Tech (CSE)',              105000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 'B.Tech (Electrical)',       105000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 'B.Tech (Mechanical)',       105000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 'M.Tech',                    18000, '2 Years', 'GATE'          FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 'MBA (DMS)',                450000, '2 Years', 'CAT + Interview'FROM colleges WHERE slug='iit-delhi' UNION ALL
SELECT id, 'M.Sc.',                     18000, '2 Years', 'IIT JAM'       FROM colleges WHERE slug='iit-delhi'

UNION ALL

-- ── IIT Madras ───────────────────────────────────────────────
SELECT id, 'B.Tech (CSE)',               75000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-madras' UNION ALL
SELECT id, 'B.Tech (Electrical)',        75000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-madras' UNION ALL
SELECT id, 'B.Tech (Mechanical)',        75000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-madras' UNION ALL
SELECT id, 'B.S. Research',             75000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-madras' UNION ALL
SELECT id, 'M.Tech',                    18000, '2 Years', 'GATE'          FROM colleges WHERE slug='iit-madras' UNION ALL
SELECT id, 'Ph.D.',                         0, '3-5 Years','GATE / NET + Interview' FROM colleges WHERE slug='iit-madras'

UNION ALL

-- ── IIT Kanpur ────────────────────────────────────────────────
SELECT id, 'B.Tech (CSE)',              111000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-kanpur' UNION ALL
SELECT id, 'B.Tech (Electrical)',       111000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-kanpur' UNION ALL
SELECT id, 'B.Tech (Mechanical)',       111000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-kanpur' UNION ALL
SELECT id, 'M.Tech',                    18000, '2 Years', 'GATE'          FROM colleges WHERE slug='iit-kanpur' UNION ALL
SELECT id, 'MBA',                      450000, '2 Years', 'CAT + Interview'FROM colleges WHERE slug='iit-kanpur'

UNION ALL

-- ── IIT Kharagpur ─────────────────────────────────────────────
SELECT id, 'B.Tech (CSE)',               74000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-kharagpur' UNION ALL
SELECT id, 'B.Tech (Electrical)',        74000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-kharagpur' UNION ALL
SELECT id, 'B.Tech (Mechanical)',        74000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-kharagpur' UNION ALL
SELECT id, 'B.Arch.',                   74000, '5 Years', 'JEE Advanced + AAT' FROM colleges WHERE slug='iit-kharagpur' UNION ALL
SELECT id, 'MBA (VGSOM)',              450000, '2 Years', 'CAT + Interview'FROM colleges WHERE slug='iit-kharagpur' UNION ALL
SELECT id, 'M.Tech',                    18000, '2 Years', 'GATE'          FROM colleges WHERE slug='iit-kharagpur'

UNION ALL

-- ── IIT Roorkee ───────────────────────────────────────────────
SELECT id, 'B.Tech (CSE)',              110000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-roorkee' UNION ALL
SELECT id, 'B.Tech (Electrical)',       110000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-roorkee' UNION ALL
SELECT id, 'B.Tech (Civil)',            110000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-roorkee' UNION ALL
SELECT id, 'M.Tech',                    18000, '2 Years', 'GATE'          FROM colleges WHERE slug='iit-roorkee' UNION ALL
SELECT id, 'MBA',                      450000, '2 Years', 'CAT + Interview'FROM colleges WHERE slug='iit-roorkee'

UNION ALL

-- ── NIT Trichy ────────────────────────────────────────────────
SELECT id, 'B.Tech (CSE)',              127000, '4 Years', 'JEE Main'      FROM colleges WHERE slug='nit-trichy' UNION ALL
SELECT id, 'B.Tech (Electrical)',       127000, '4 Years', 'JEE Main'      FROM colleges WHERE slug='nit-trichy' UNION ALL
SELECT id, 'B.Tech (Mechanical)',       127000, '4 Years', 'JEE Main'      FROM colleges WHERE slug='nit-trichy' UNION ALL
SELECT id, 'B.Tech (Civil)',            127000, '4 Years', 'JEE Main'      FROM colleges WHERE slug='nit-trichy' UNION ALL
SELECT id, 'M.Tech',                   115000, '2 Years', 'GATE'          FROM colleges WHERE slug='nit-trichy' UNION ALL
SELECT id, 'MBA',                      160000, '2 Years', 'CAT / TANCET'  FROM colleges WHERE slug='nit-trichy'

UNION ALL

-- ── NIT Warangal ──────────────────────────────────────────────
SELECT id, 'B.Tech (CSE)',              126000, '4 Years', 'JEE Main'      FROM colleges WHERE slug='nit-warangal' UNION ALL
SELECT id, 'B.Tech (Electrical)',       126000, '4 Years', 'JEE Main'      FROM colleges WHERE slug='nit-warangal' UNION ALL
SELECT id, 'B.Tech (Mechanical)',       126000, '4 Years', 'JEE Main'      FROM colleges WHERE slug='nit-warangal' UNION ALL
SELECT id, 'M.Tech',                    95000, '2 Years', 'GATE'          FROM colleges WHERE slug='nit-warangal'

UNION ALL

-- ── IIM Ahmedabad ────────────────────────────────────────────
SELECT id, 'MBA (PGP)',               2800000, '2 Years', 'CAT 99+ %ile + WAT/PI' FROM colleges WHERE slug='iim-ahmedabad' UNION ALL
SELECT id, 'MBA (PGPX – Executive)', 3200000, '1 Year',  'GMAT/CAT + 5 yrs exp'  FROM colleges WHERE slug='iim-ahmedabad' UNION ALL
SELECT id, 'Ph.D. (FPM)',                  0, '4-5 Years','CAT/GMAT + Interview'  FROM colleges WHERE slug='iim-ahmedabad'

UNION ALL

-- ── IIM Bangalore ────────────────────────────────────────────
SELECT id, 'MBA (PGP)',               2550000, '2 Years', 'CAT 98+ %ile + GD/PI'  FROM colleges WHERE slug='iim-bangalore' UNION ALL
SELECT id, 'MBA (PGPEM – Executive)',2200000, '2 Years', 'CAT + 5 yrs work exp'   FROM colleges WHERE slug='iim-bangalore' UNION ALL
SELECT id, 'Ph.D. (FPM)',                  0, '4-5 Years','CAT/GMAT + Interview'  FROM colleges WHERE slug='iim-bangalore'

UNION ALL

-- ── IIM Calcutta ─────────────────────────────────────────────
SELECT id, 'MBA (PGP)',               2500000, '2 Years', 'CAT 97+ %ile + GD/PI' FROM colleges WHERE slug='iim-calcutta' UNION ALL
SELECT id, 'MBA (MBAEx – Executive)',2900000, '1 Year',  'GMAT + work experience' FROM colleges WHERE slug='iim-calcutta'

UNION ALL

-- ── IIM Lucknow ───────────────────────────────────────────────
SELECT id, 'MBA (PGP)',               1980000, '2 Years', 'CAT 95+ %ile + GD/PI' FROM colleges WHERE slug='iim-lucknow' UNION ALL
SELECT id, 'MBA (WMP – Executive)',  2200000, '1 Year',  'GMAT + 5 yrs work exp' FROM colleges WHERE slug='iim-lucknow'

UNION ALL

-- ── IIM Kozhikode ─────────────────────────────────────────────
SELECT id, 'MBA (PGP)',               1880000, '2 Years', 'CAT 90+ %ile + GD/PI' FROM colleges WHERE slug='iim-kozhikode' UNION ALL
SELECT id, 'MBA (EPGP – Executive)', 2200000, '1 Year',  'GMAT + work experience' FROM colleges WHERE slug='iim-kozhikode'

UNION ALL

-- ── BITS Pilani ───────────────────────────────────────────────
SELECT id, 'B.E. (CSE)',               566000, '4 Years', 'BITSAT 340+'       FROM colleges WHERE slug='bits-pilani' UNION ALL
SELECT id, 'B.E. (Electrical & Electronics)', 566000,'4 Years','BITSAT 310+'  FROM colleges WHERE slug='bits-pilani' UNION ALL
SELECT id, 'B.E. (Mechanical)',        566000, '4 Years', 'BITSAT 290+'       FROM colleges WHERE slug='bits-pilani' UNION ALL
SELECT id, 'M.Sc. (Hons.)',            566000, '5 Years', 'BITSAT'            FROM colleges WHERE slug='bits-pilani' UNION ALL
SELECT id, 'M.Tech',                  390000, '2 Years', 'GATE / BITS HD'    FROM colleges WHERE slug='bits-pilani' UNION ALL
SELECT id, 'MBA',                     510000, '2 Years', 'CAT / GMAT + PI'   FROM colleges WHERE slug='bits-pilani'

UNION ALL

-- ── AIIMS Delhi ──────────────────────────────────────────────
SELECT id, 'MBBS',                      1628, '5.5 Years','NEET UG – Top 50 rank'       FROM colleges WHERE slug='aiims-delhi' UNION ALL
SELECT id, 'B.Sc. Nursing (Hons.)',     1390, '4 Years',  'AIIMS Nursing Entrance'      FROM colleges WHERE slug='aiims-delhi' UNION ALL
SELECT id, 'MD / MS',                   1390, '3 Years',  'INI CET – Top rank'          FROM colleges WHERE slug='aiims-delhi' UNION ALL
SELECT id, 'Ph.D.',                     1390, '3-5 Years','MD/MS + Interview'           FROM colleges WHERE slug='aiims-delhi'

UNION ALL

-- ── AIIMS Kalyani ─────────────────────────────────────────────
SELECT id, 'MBBS',                      1628, '5.5 Years','NEET UG – Top 2000 rank'     FROM colleges WHERE slug='aiims-kalyani' UNION ALL
SELECT id, 'B.Sc. Nursing (Hons.)',     1390, '4 Years',  'AIIMS Nursing Entrance'      FROM colleges WHERE slug='aiims-kalyani' UNION ALL
SELECT id, 'MD / MS',                   1390, '3 Years',  'INI CET'                     FROM colleges WHERE slug='aiims-kalyani'

UNION ALL

-- ── AIIMS Bhopal ──────────────────────────────────────────────
SELECT id, 'MBBS',                      1628, '5.5 Years','NEET UG – Top 5000 rank'     FROM colleges WHERE slug='aiims-bhopal' UNION ALL
SELECT id, 'B.Sc. Nursing (Hons.)',     1390, '4 Years',  'AIIMS Nursing Entrance'      FROM colleges WHERE slug='aiims-bhopal' UNION ALL
SELECT id, 'MD / MS',                   1390, '3 Years',  'INI CET'                     FROM colleges WHERE slug='aiims-bhopal'

UNION ALL

-- ── VIT Vellore ──────────────────────────────────────────────
SELECT id, 'B.Tech (CSE)',             198000, '4 Years', 'VITEEE / JEE Main'  FROM colleges WHERE slug='vit-vellore' UNION ALL
SELECT id, 'B.Tech (Electronics)',     198000, '4 Years', 'VITEEE / JEE Main'  FROM colleges WHERE slug='vit-vellore' UNION ALL
SELECT id, 'B.Tech (Mechanical)',      198000, '4 Years', 'VITEEE / JEE Main'  FROM colleges WHERE slug='vit-vellore' UNION ALL
SELECT id, 'M.Tech',                  174000, '2 Years', 'GATE / VITMEE'     FROM colleges WHERE slug='vit-vellore' UNION ALL
SELECT id, 'MBA',                     280000, '2 Years', 'CAT / XAT + PI'    FROM colleges WHERE slug='vit-vellore'

UNION ALL

-- ── Medical College Kolkata ───────────────────────────────────
SELECT id, 'MBBS',                      90000, '5.5 Years','NEET UG'              FROM colleges WHERE slug='medical-college-kolkata' UNION ALL
SELECT id, 'MD / MS',                   50000, '3 Years',  'NEET PG'             FROM colleges WHERE slug='medical-college-kolkata' UNION ALL
SELECT id, 'B.Sc. Nursing',             40000, '4 Years',  'NEET UG / State CET' FROM colleges WHERE slug='medical-college-kolkata'

UNION ALL

-- ── IPGMER Kolkata ────────────────────────────────────────────
SELECT id, 'MD / MS',                   50000, '3 Years',  'INI CET / NEET PG'  FROM colleges WHERE slug='ipgmer-kolkata' UNION ALL
SELECT id, 'DM / M.Ch.',               50000, '3 Years',  'INI SS'             FROM colleges WHERE slug='ipgmer-kolkata' UNION ALL
SELECT id, 'Ph.D.',                     50000, '3-5 Years','MD/MS + Interview'  FROM colleges WHERE slug='ipgmer-kolkata'

UNION ALL

-- ── NLSIU Bangalore ───────────────────────────────────────────
SELECT id, 'B.A. LL.B. (Hons.)',       232000, '5 Years', 'CLAT – Top 100 rank' FROM colleges WHERE slug='nlsiu-bangalore' UNION ALL
SELECT id, 'LL.M.',                    232000, '1 Year',  'CLAT PG / LL.B.'    FROM colleges WHERE slug='nlsiu-bangalore' UNION ALL
SELECT id, 'Ph.D.',                     50000, '3-5 Years','LL.M. + Interview'  FROM colleges WHERE slug='nlsiu-bangalore'

UNION ALL

-- ── NLU Delhi ─────────────────────────────────────────────────
SELECT id, 'B.A. LL.B. (Hons.)',       200000, '5 Years', 'AILET – Top 100 rank' FROM colleges WHERE slug='nlu-delhi' UNION ALL
SELECT id, 'LL.M.',                    200000, '1 Year',  'AILET PG'             FROM colleges WHERE slug='nlu-delhi';
