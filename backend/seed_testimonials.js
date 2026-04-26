import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const sql = `
    CREATE TABLE IF NOT EXISTS testimonials (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      student_name text NOT NULL,
      initials text,
      college_name text,
      course text,
      year smallint,
      rating numeric(2,1) DEFAULT 5.0,
      review_text text NOT NULL,
      verified boolean DEFAULT true,
      pros text[],
      cons text[],
      created_at timestamptz DEFAULT now()
    );

    TRUNCATE TABLE testimonials;

    INSERT INTO testimonials 
    (student_name, initials, college_name, course, year, rating, review_text, verified, pros, cons)
    VALUES
    ('Khusbu Naha', 'KN', 'IEM College', NULL, 2024, 5, 'Promote Education is one of the most reliable and student-focused consultancies. I got my IEM College admission from here. Really thankful to Ritesh sir, Aman sir & Somnath sir.', true, ARRAY['Reliable guidance', 'Supportive mentors'], NULL),
    ('Devpriya Mukherjee', 'DM', 'IEM Salt Lake', 'CSE', 2024, 5, 'Was guided very well throughout the admission process in IEM Salt Lake CSE branch.', true, ARRAY['Smooth guidance'], NULL),
    ('Aditya Halder', 'AH', 'Unknown', NULL, 2024, 5, 'Got my dream college through them. Special thanks to Somnath sir for his gentle and helpful behavior.', true, ARRAY['Supportive staff'], NULL),
    ('Neha Kashyap', 'NK', 'Unknown', NULL, 2024, 5, 'Thank you Promote Education for your services. Many students get the chance to enter their dream college.', true, ARRAY['Helpful service'], NULL),
    ('Divya Prakash', 'DP', 'Unknown', NULL, 2024, 5, '200% trustworthy. Very good service.', true, ARRAY['Highly trustworthy'], NULL),
    ('Souvik Maji', 'SM', 'DSU', NULL, 2024, 5, 'Very good experience. Got a chance in DSU. Grateful to them.', true, ARRAY['Good opportunities'], NULL),
    ('Sanjay Guha Thakurta', 'SGT', 'Unknown', NULL, 2024, 5, 'Fantastic experience. They guided my son’s admission and have strong connections with top colleges in India.', true, ARRAY['Strong network', 'Great guidance'], NULL),
    ('Swarup Chakraborty', 'SC', 'Unknown', NULL, 2024, 5, 'Helped my daughter choose the right institution and career path. Very trustworthy organization.', true, ARRAY['Trustworthy', 'Responsive'], NULL),
    ('Nishita Gupta', 'NG', 'Welingkar Institute of Management Bangalore', NULL, 2024, 5, 'Grateful for outstanding support during my admission process. Highly recommend their services.', true, ARRAY['Professional support'], NULL),
    ('Nibedita Biswas', 'NB', 'IEM', 'BTech CSBS', 2024, 5, 'Highly recommend their services. My son got his desired stream with their help.', true, ARRAY['Helps achieve desired stream'], NULL),
    ('Priyadarshini Das', 'PD', 'IEM Newtown', 'CSE Cyber Security', 2024, 5, 'Joined IEM Newtown CSE Cyber Security. Aman sir was very helpful. Very grateful.', true, ARRAY['Helpful mentors'], NULL),
    ('Suparnita Huduk', 'SH', 'Unknown', 'BTech', 2024, 5, 'Promote Education Pvt. Ltd. made my B.Tech admission process smooth and stress-free. Very professional guidance.', true, ARRAY['Smooth process', 'Professional'], NULL),
    ('Adrija Biswas', 'AB', 'Unknown', NULL, 2024, 5, 'Good service and smooth admission process.', true, ARRAY['Smooth process'], NULL),
    ('Kamal Shah', 'KS', 'Unknown', NULL, 2024, 5, 'Very nice experience, good guidance.', true, ARRAY['Good guidance'], NULL),
    ('Sagnik Das', 'SD', 'IEM Salt Lake', 'BTech ECE', 2024, 5, 'Joined IEM Salt Lake ECE branch. Aman sir was very helpful and well behaved.', true, ARRAY['Helpful staff'], NULL),
    ('Bijoy Roy', 'BR', 'IEM', NULL, 2024, 5, 'Got admission in IEM. The process was very smooth.', true, ARRAY['Smooth process'], NULL),
    ('Dhruba Roy', 'DR', 'IEM Salt Lake', 'BTech IT', 2024, 5, 'Got admitted in IEM Salt Lake IT. The process was smooth and team was helpful.', true, ARRAY['Helpful team'], NULL),
    ('Usnish Ghosh', 'UG', 'Unknown', 'CSE', 2024, 5, 'My admission process was very smooth and hassle-free. Highly recommend.', true, ARRAY['Hassle-free process'], NULL),
    ('Divy Kumar Singh', 'DKS', 'Unknown', NULL, 2024, 5, 'It was an amazing experience. Their free consulting session helped me take important education decisions.', true, ARRAY['Free consultation', 'Supportive'], NULL);
  `;

  // We can use RPC if it exists, or just tell the user to run it if RPC fails.
  const { error } = await supabase.rpc('exec_sql', { sql_string: sql });
  if (error) {
    console.log('RPC failed. Writing to seed.sql for manual execution.');
    import('fs').then(fs => fs.appendFileSync('seed.sql', '\n\n' + sql));
  } else {
    console.log('Successfully created and seeded testimonials table.');
  }
}
run();
