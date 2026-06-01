-- Drop existing blogs table if it exists
DROP TABLE IF EXISTS blogs;

-- Create blogs table
CREATE TABLE blogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    image_url TEXT,
    category TEXT DEFAULT 'Education',
    read_time TEXT DEFAULT '5 min read',
    author TEXT DEFAULT 'Promote Education Editorial',
    is_live BOOLEAN DEFAULT true,
    views INTEGER DEFAULT 0,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create public read policy
CREATE POLICY "Allow public read access to blogs" ON blogs
    FOR SELECT USING (true);

-- Create RPC function to increment views securely
CREATE OR REPLACE FUNCTION increment_blog_views(blog_slug TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE blogs
    SET views = views + 1
    WHERE slug = blog_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Seed initial high-quality blog posts
INSERT INTO blogs (slug, title, summary, content, image_url, category, read_time, author, is_live, views)
VALUES
(
    'top-engineering-colleges-india-2026',
    'Top Engineering Colleges in India for 2026: NIRF Rankings & Key Factors',
    'Choosing the right engineering college can be overwhelming. We break down the top engineering institutions in India for the 2026 academic season, highlighting NIRF rankings, direct admission processes, average packages, and campus life.',
    'Selecting the right engineering college is one of the most critical decisions in a student''s academic journey. With hundreds of institutions offering various B.Tech and B.E. programs, finding the perfect fit requires analyzing multiple variables. In this guide, we dive deep into the top engineering colleges in India for 2026, comparing their NIRF rankings, infrastructure, placements, and campus experiences.

First, let''s discuss the role of NIRF (National Institutional Ranking Framework) rankings. While NIRF rankings provide a solid benchmark for teaching resources and research outputs, they shouldn''t be your sole decision parameter. Often, newer IITs or private universities with outstanding placement cells and modern curriculums might suit your career goals better than a high-ranked but research-heavy university.

Second, the admission routes. Most top-tier colleges like IITs, NITs, and IIITs admit students purely through JEE Main and JEE Advanced. However, premium private colleges like BITS Pilani, VIT, SRM, and Manipal hold their own exams (BITSAT, VITEEE, SRMJEEE, MET). Additionally, many reputed private colleges offer direct admission pathways through management quotas or merit seats. Understanding these alternative entry points is crucial if you miss the cutoff for JEE-based admissions.

Lastly, placement statistics vs. media reports. Always look at the median packages rather than the highest package, which is often an outlier. Look at which branches (CS, IT, Electronics, Mechanical) perform best and check the percentage of students placed. If you need assistance choosing the right college and stream based on your budget and rank, contact our academic advisors for a free personalized roadmap.',
    'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?w=800&auto=format&fit=crop&q=80',
    'Admissions',
    '6 min read',
    'Ritesh Kumar',
    true,
    840
),
(
    'ultimate-neet-2026-preparation-guide',
    'Ultimate NEET 2026 Preparation Guide: Study Plan, Core Syllabus & Tips',
    'Cracking NEET requires more than hard work; it demands strategic planning and consistency. Our medical mentors outline the ultimate NEET 2026 prep strategy, including high-yield chapters, mock tests, and timing.',
    'The National Eligibility cum Entrance Test (NEET) is the single gateway to medical (MBBS and BDS) seats in India. As competition scales up every year, qualifying with a score that secures a government medical college requires a targeted and disciplined plan. In this ultimate preparation guide for NEET 2026, we outline the roadmap to score 650+ points.

Physics is often the dealbreaker for medical students. While Biology is highly scoring and Chemistry is logical, Physics requires conceptual clarity and massive question practice. Focus heavily on Mechanics, Electrodynamics, and Modern Physics. Create a formula book and revise it daily. Practice at least 50 numerical questions every day.

For Chemistry, divide your strategy into three parts: Physical, Organic, and Inorganic. Physical Chemistry requires numerical practice similar to Physics. Organic Chemistry is about understanding mechanism pathways and name reactions. Inorganic Chemistry, on the other hand, requires multiple revisions of the NCERT textbook, especially coordination compounds and p-block elements.

Biology holds 50% of the weightage. NCERT is your bible. Read every line, diagram, footnote, and summary. Focus on Human Physiology, Genetics, and Plant Physiology. Make short notes or flashcards for complex scientific names and classification groups.

Finally, mock tests are where you build exam temperament. Start taking chapter-wise tests from day one, progress to part-syllabus tests, and finish with full-length mock papers under strict exam conditions (2 PM to 5:20 PM). Analyze every mistake, maintain an error log, and ensure you do not repeat them. If you need help understanding cutoffs, college choices, or study structures, check our Cutoffs analyzer or book a consultation.',
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80',
    'Preparation',
    '8 min read',
    'Aman Sharma',
    true,
    1150
),
(
    'choosing-right-college-beyond-nirf',
    'Choosing the Right College: Factors Beyond NIRF Rankings',
    'Is a higher-ranked college always the best choice? We explore factors like geographical location, student support, industry connection, and alumni network that define your post-college success.',
    'Every year, lakhs of students search for the "best colleges" and blindly rely on the National Institutional Ranking Framework (NIRF) rankings. However, choosing a college is a multi-dimensional decision. What works for a research scholar might not work for an entrepreneur or a corporate professional. Let''s explore crucial factors you must examine beyond just rankings.

First, location and industry linkages. A college located in a major tech hub like Bangalore, Hyderabad, Pune, or Delhi-NCR offers massive advantages. Being close to multinational offices means regular industry visits, local internships, guest lectures by industry experts, and easier access to walk-in interviews. A top-50 college in a remote area might offer fewer internship and networking opportunities than a top-100 college in Bangalore.

Second, the alumni network. A strong, active alumni network is an invaluable asset. Alumni help with mentorship, internship referrals, and career advice. Look at the colleges whose alumni are leading companies, launching startups, or holding senior positions in your target sector. Join college community groups on LinkedIn to gauge how active and helpful the alumni base is.

Third, campus culture and student societies. Your college education extends beyond the classroom. Active technical clubs, coding groups, drama societies, sports teams, and entrepreneurial cells build soft skills, leadership, and teamwork. A college with a vibrant, collaborative peer group will push you to grow, learn new skills, and explore different career avenues.

Lastly, financial investment and ROI (Return on Investment). Weigh the total expense (tuition fees, hostel, food, travel) against the median package of the campus. If a college has a very high fee structure but moderate average placements, the return on investment might take years to break even. Assess if there are merit scholarships or student loan options that can ease the financial burden. Try our Loan Calculator tool to plan your finances effectively before making a final decision.',
    'https://images.unsplash.com/photo-1523050335102-c89b1811b128?w=800&auto=format&fit=crop&q=80',
    'Guide',
    '5 min read',
    'Somnath Banerjee',
    true,
    980
);
