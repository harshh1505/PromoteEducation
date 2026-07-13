const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'frontend/.env.local' });

console.log('Normalized Content Generator (Gemini Version) Script started');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Invalid JSON from Gemini');
  }
}

async function getCollegeCourses(collegeId) {
  const { data: courses, error } = await supabase
    .from('courses')
    .select('fees, duration, entrance_exam, avg_salary, course_catalog(name, degree, level)')
    .eq('college_id', collegeId);

  if (error || !courses) {
    return [];
  }

  return courses.map(c => ({
    name: c.course_catalog?.name || 'Unknown Course',
    degree: c.course_catalog?.degree || 'UG/PG',
    level: c.course_catalog?.level || 'UG',
    duration: c.duration || '4 Years',
    fees: c.fees ? `₹${c.fees}` : 'N/A',
    entrance_exam: c.entrance_exam || 'Merit-based'
  }));
}

async function callGeminiWithRetry(prompt, collegeName) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
  });

  let attempts = 0;
  const maxAttempts = 5;
  while (attempts < maxAttempts) {
    try {
      attempts++;
      const result = await Promise.race([
        model.generateContent(prompt),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), 45000)
        )
      ]);
      const text = result.response.text();
      return safeParse(text);
    } catch (err) {
      const isRateLimit = err.message.includes('429') || 
                          err.message.includes('quota') || 
                          err.message.includes('Quota') || 
                          err.message.includes('Requests') ||
                          err.message.includes('limit');
      if (isRateLimit && attempts < maxAttempts) {
        console.log(`  ⚠️ Gemini Rate limit hit (429) on attempt ${attempts}/${maxAttempts}. Waiting 45 seconds to retry...`);
        await delay(45000);
      } else {
        console.error(`  ❌ Gemini Call Failure for ${collegeName}:`, err.message);
        throw err;
      }
    }
  }
}

async function run() {
  console.log('📡 Fetching colleges requiring content update...');

  // Fetch colleges that haven't been updated to content_version 2
  const { data: colleges, error } = await supabase
    .from('colleges')
    .select('*')
    .neq('content_version', 2)
    .order('id', { ascending: true })
    .limit(10); // Batch limit

  if (error) {
    console.error('Supabase fetch error:', error);
    return;
  }

  if (!colleges || colleges.length === 0) {
    console.log('All colleges already updated to content_version 2!');
    return;
  }

  console.log(`Found ${colleges.length} colleges in this batch to process`);

  for (const college of colleges) {
    console.log(`\n==================================================`);
    console.log(`Processing: ${college.name} (Slug: ${college.slug})`);

    const coursesList = await getCollegeCourses(college.id);
    if (coursesList.length === 0) {
      console.log(`⚠️ Skip: No courses found in the DB for ${college.name}`);
      continue;
    }

    console.log(`Found ${coursesList.length} courses. Starting multi-step AI generation...`);

    try {
      // 1. Why Choose
      console.log('  -> Generating "Why Choose"...');
      const whyChoosePrompt = `
You are a senior education content writer. Generate a highly detailed, 2-3 paragraph explanation of why a student should choose "${college.name}" located in "${college.location}, ${college.state}" for their studies.
Stream: ${college.stream}
Ownership: ${college.ownership || 'Government'}
NIRF Rank: ${college.nirf_rank || 'N/A'}
Offered courses: ${coursesList.map(c => c.name).join(', ')}

Return the output in a JSON object with a single key "why_choose".
{
  "why_choose": "..."
}
`;
      const resWhyChoose = await callGeminiWithRetry(whyChoosePrompt, college.name);
      await delay(2000);

      // 2. Admission Process & Selection Steps
      console.log('  -> Generating "Admission Process & Selection Steps"...');
      const admissionPrompt = `
You are a senior education content writer. Generate a detailed explanation of the admission process and the exact sequential steps to get selected at "${college.name}".
Tailor this strictly to the entrance exams of the offered courses:
${coursesList.map(c => `- ${c.name} (Degree: ${c.degree}, Exam: ${c.entrance_exam})`).join('\n')}

Return the output in a JSON object with keys "admission" and "selection_steps".
{
  "admission": "...",
  "selection_steps": [
    { "title": "Step 1: ...", "description": "..." },
    { "title": "Step 2: ...", "description": "..." }
  ]
}
`;
      const resAdmission = await callGeminiWithRetry(admissionPrompt, college.name);
      await delay(2000);

      // 3. Courses Summary & Rankings
      console.log('  -> Generating "Courses & Fees Summary & Rankings"...');
      const coursesRankPrompt = `
You are a senior education content writer. Generate a summary of the courses and fee structure at "${college.name}". Also include any notable ranking details (e.g. NIRF, Outlook, etc.).
NIRF Rank: ${college.nirf_rank || 'N/A'}
Offered courses:
${coursesList.map(c => `- ${c.name} (${c.degree}, Duration: ${c.duration}, Fees: ${c.fees})`).join('\n')}

Return the output in a JSON object with keys "courses_summary" and "rankings".
{
  "courses_summary": "...",
  "rankings": [
    { "source": "NIRF", "rank": "${college.nirf_rank || 'N/A'}", "year": "2025" }
  ]
}
`;
      const resCoursesRank = await callGeminiWithRetry(coursesRankPrompt, college.name);
      await delay(2000);

      // 4. Placements
      console.log('  -> Generating "Placements"...');
      const placementsPrompt = `
You are a senior education placement consultant. Generate a highly detailed description of placements, salary statistics, and top recruiting sectors at "${college.name}".
Average Package: ${college.avg_package ? college.avg_package + ' LPA' : 'N/A'}
Highest Package: ${college.highest_package ? college.highest_package + ' LPA' : 'N/A'}
Typical recruiters for this type of college: ${college.facilities ? college.facilities.slice(0, 5).join(', ') : 'N/A'}

Return the output in a JSON object with a single key "placements_description".
{
  "placements_description": "..."
}
`;
      const resPlacements = await callGeminiWithRetry(placementsPrompt, college.name);
      await delay(2000);

      // 5. Campus Life
      console.log('  -> Generating "Campus Life"...');
      const campusLifePrompt = `
You are a senior education writer. Generate a detailed description of the campus life, hostels, facilities, student clubs, and overall student environment at "${college.name}".
Location: ${college.location}, ${college.state}
Facilities available: ${college.facilities ? college.facilities.join(', ') : 'None listed'}

Return the output in a JSON object with a single key "campus_life".
{
  "campus_life": "..."
}
`;
      const resCampusLife = await callGeminiWithRetry(campusLifePrompt, college.name);
      await delay(2000);

      // 6. FAQs
      console.log('  -> Generating "FAQs"...');
      const faqsPrompt = `
You are an education consultant. Generate 3-4 highly practical, detailed FAQs with detailed answers for "${college.name}".
Offered courses: ${coursesList.map(c => c.name).join(', ')}

Return the output in a JSON object with a single key "faqs".
{
  "faqs": [
    { "question": "...", "answer": "..." }
  ]
}
`;
      const resFaqs = await callGeminiWithRetry(faqsPrompt, college.name);

      // E. Merge and save to database
      const mergedContent = {
        ...(college.content || {}),
        why_choose: resWhyChoose.why_choose,
        admission: resAdmission.admission,
        selection_steps: resAdmission.selection_steps,
        courses_summary: resCoursesRank.courses_summary,
        rankings: resCoursesRank.rankings,
        placements_description: resPlacements.placements_description,
        campus_life: resCampusLife.campus_life,
        faqs: resFaqs.faqs
      };

      const { error: updateError } = await supabase
        .from('colleges')
        .update({
          content: mergedContent,
          faqs: resFaqs.faqs,
          content_version: 2,
          content_updated_at: new Date()
        })
        .eq('id', college.id);

      if (updateError) {
        console.error(`❌ Update failed for ${college.name}:`, updateError.message);
      } else {
        console.log(`✅ Success: All sections updated and saved for ${college.name}`);
      }

      await delay(3000); // Wait between colleges
    } catch (err) {
      console.error(`❌ Failed processing college ${college.name}:`, err.message);
      await delay(5000);
    }
  }

  console.log('\n🎉 Batch process complete!');
}

run();
