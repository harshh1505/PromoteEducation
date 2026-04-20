INSERT INTO colleges (name, location, state, rank, ranking_body, stream, type, avg_ctc, highest_ctc, cutoff, cutoff_exam, tags, accreditation, established, total_fee, verified, match_score, admission_chance)
VALUES 
('IIT Bombay', 'Mumbai', 'Maharashtra', 1, 'NIRF', 'Engineering', 'government', 18.5, 2.4, '98.5+', 'JEE Advanced', '{"Govt. funded", "NAAC A++", "NBA", "ABET"}', '{"NAAC A++", "NBA"}', 1958, 2.2, true, 92, 68),
('AIIMS Delhi', 'New Delhi', 'Delhi', 1, 'NIRF Medical', 'Medical', 'government', 14.0, 38, '715+', 'NEET', '{"Govt. funded", "NAAC A+", "Premier Institute"}', '{"NAAC A+", "MCI"}', 1956, 0.13, true, 85, 42),
('IIM Ahmedabad', 'Ahmedabad', 'Gujarat', 1, 'NIRF Management', 'MBA', 'government', 35.0, 1.08, '99.5+', 'CAT', '{"Govt. funded", "AACSB", "EQUIS", "AMBA"}', '{"AACSB", "EQUIS"}', 1961, 24.0, true, 78, 31),
('NLS Bangalore', 'Bengaluru', 'Karnataka', 1, 'NIRF Law', 'Law', 'government', 22.0, 72, '99+', 'CLAT', '{"Govt. funded", "NAAC A", "Premier Law School"}', '{"NAAC A", "BCI"}', 1987, 3.6, true, 88, 55),
('NID Ahmedabad', 'Ahmedabad', 'Gujarat', 1, 'NIRF Design', 'Design', 'government', 12.0, 45, 'Top 5%', 'NID DAT', '{"Govt. funded", "WDO Member", "Design Excellence"}', '{"WDO", "NAAC A"}', 1961, 5.2, true, 74, 62),
('IIT Delhi', 'New Delhi', 'Delhi', 2, 'NIRF', 'Engineering', 'government', 17.2, 2.1, '98.2+', 'JEE Advanced', '{"Govt. funded", "NAAC A++", "NBA"}', '{"NAAC A++", "NBA"}', 1961, 2.1, true, 89, 72);

INSERT INTO exams (name, full_name, conducted_by, exam_date, registration_deadline, stream, level, applicants)
VALUES
('JEE Main', 'Joint Entrance Examination Main', 'NTA', 'Jan 22 – Feb 1, 2025', 'Dec 15, 2024', 'Engineering', 'national', '12L+'),
('NEET UG', 'National Eligibility cum Entrance Test', 'NTA', 'May 4, 2025', 'Mar 7, 2025', 'Medical', 'national', '24L+'),
('CAT 2024', 'Common Admission Test', 'IIM Calcutta', 'Nov 24, 2024', 'Sep 13, 2024', 'MBA', 'national', '3.3L+'),
('CLAT', 'Common Law Admission Test', 'Consortium of NLUs', 'Dec 1, 2024', 'Oct 15, 2024', 'Law', 'national', '70K+'),
('GATE', 'Graduate Aptitude Test in Engineering', 'IIT Roorkee', 'Feb 1–2, 2025', 'Oct 3, 2024', 'Engineering', 'national', '8L+');

INSERT INTO reviews (student_name, initials, college_name, course, year, rating, review_text, verified, pros, cons)
VALUES
('Arjun Mehta', 'AM', 'IIT Bombay', 'B.Tech CSE', 2024, 5, 'The research culture here is unmatched in India...', true, '{"Research opportunities", "Placements"}', '{"Intense competition"}');
