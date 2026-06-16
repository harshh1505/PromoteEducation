-- Drop existing news_articles table if it exists
DROP TABLE IF EXISTS news_articles;

-- Create news_articles table
CREATE TABLE news_articles (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    heading TEXT NOT NULL,
    content TEXT NOT NULL,
    image_link TEXT,
    views INTEGER DEFAULT 0,
    editor TEXT,
    date DATE DEFAULT CURRENT_DATE,
    is_live BOOLEAN DEFAULT false,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read access to news_articles" ON news_articles
    FOR SELECT USING (true);

-- Create RPC function to increment views securely
CREATE OR REPLACE FUNCTION increment_news_views(article_slug TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE news_articles
    SET views = views + 1
    WHERE slug = article_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Seed news articles
INSERT INTO news_articles (slug, heading, content, image_link, views, editor, date, is_live, comments_count, shares_count)
VALUES
(
    'jee-mains-2026-result-final-answer-key',
    'JEE Mains 2026 Result (Today) LIVE: Final Answer Key OUT; NTA Session 2 Scorecard Link Soon @...',
    'JEE Mains 2026 session 2 final answer key is out. JEE Mains 2026 result for the session 2 exam will be out anytime soon, TODAY, April 20, 2026. Students who appeared for the Joint Entrance Examination (Main) can check their results on the official website of the National Testing Agency (NTA). The results will determine eligibility for JEE Advanced and admission to prestigious institutions like NITs, IIITs, and CFTIs. Please keep your application number and date of birth ready to check your scorecard once the link is active.',
    'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=800&auto=format&fit=crop&q=80',
    750,
    'Mamona Majumder',
    '2026-04-20',
    true,
    1,
    7
),
(
    'xlri-results-2026-soon-xat-qualifiers',
    'XLRI Results 2026 Soon at xlri.ac.in: XAT Qualifiers wait for Final Admission Calls',
    'XLRI will soon release the final merit lists for admission to its Jamshedpur and Delhi campuses. In the last admission cycle, XLRI released the final results in the second week of April. XAT qualifiers who cleared the cutoff and participated in the Group Discussion (GD) and Personal Interview (PI) rounds are eagerly waiting for the final admission calls. Successful candidates will be required to confirm their seats by paying the admission fees within the stipulated time.',
    'https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=800&auto=format&fit=crop&q=80',
    1200,
    'Abhishek Dhawan',
    '2026-04-20',
    false,
    0,
    0
),
(
    'icse-isc-results-2026-cisce-updates',
    'ICSE, ISC Results 2026 @results.cisce.org Live Updates: Check Expected CISCE Results Date & Time',
    'ISC and ICSE results 2026 will be announced soon at cisce.org and results.cisce.org. Students can check their results by logging in with their Unique ID, Index Number, and CAPTCHA. The Council for the Indian School Certificate Examinations (CISCE) will declare the pass percentage, gender-wise performance, and school performance statistics alongside the results. Students are advised to keep checking the official website for real-time updates.',
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
    2300,
    'Anangsha Patra',
    '2026-04-20',
    true,
    4,
    113
),
(
    'nchmct-jee-2026-admit-card-download',
    'NCHMCT JEE 2026 Admit Card Live: Steps to Download Hall Ticket, Link at nchmjee.nta.nic.in; Check...',
    'NCHMCT JEE admit card is expected to be out by tomorrow morning. Candidates can download their hall tickets from the official website nchmjee.nta.nic.in. The National Council for Hotel Management Joint Entrance Examination (NCHMCT JEE) is a national-level entrance exam for admission to B.Sc. Hospitality and Hotel Administration programs. Candidates must carry a printed copy of their admit card along with a valid ID proof to the exam center.',
    'https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?w=800&auto=format&fit=crop&q=80',
    840,
    'Porishmita Paul',
    '2026-04-20',
    true,
    0,
    0
),
(
    'chef-salary-in-india-2025-packages',
    'Chef Salary in India 2025: Average Pay, Growth, and Top Hotel Packages',
    'The food and hospitality industry in India has seen big growth in recent years. Starting from luxury bars, family restaurants, to small-scale diners, the demand for skilled culinary professionals is at an all-time high. A Chef''s salary in India depends on their experience, role (e.g., Executive Chef, Sous Chef, Pastry Chef), and the hotel or restaurant package. Executive Chefs in 5-star hotels can earn between 12 to 25 Lakhs per annum, while entry-level commis chefs start around 2 to 3.5 Lakhs per annum.',
    'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=800&auto=format&fit=crop&q=80',
    940,
    'Porishmita Paul',
    '2026-04-20',
    false,
    0,
    0
),
(
    'kea-pgcet-2026-application-last-date',
    'KEA PGCET 2026 Application Last Date (TODAY) LIVE; Register at cetonline.karnataka.gov.in',
    'The Karnataka Examinations Authority (KEA) will close the PGCET 2026 registration window today, April 20. Candidates who are yet to fill out the application form for MBA, MCA, M.E., M.Tech, and M.Arch programs must submit their forms before the deadline. Make sure to double-check all details, upload the required documents, and complete the online fee payment. KEA will not accept any registrations after the portal closes.',
    'https://images.unsplash.com/photo-1576491192842-73def8850656?w=800&auto=format&fit=crop&q=80',
    2100,
    'Abhishek Dhawan',
    '2026-04-20',
    true,
    0,
    0
);
