const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'frontend/.env.local' });

console.log('Seed All College Courses Script started');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Define standard course catalog templates per stream
const catalogTemplates = {
  'Engineering': [
    { name: 'B.Tech Computer Science and Engineering', slug: 'btech-cse', degree: 'B.Tech', level: 'UG', career_domain: 'Software Engineering', duration: '4 Years', exam: 'JEE Main' },
    { name: 'B.Tech Electrical Engineering', slug: 'btech-electrical', degree: 'B.Tech', level: 'UG', career_domain: 'Electrical Engineering', duration: '4 Years', exam: 'JEE Main' },
    { name: 'B.Tech Mechanical Engineering', slug: 'btech-mechanical', degree: 'B.Tech', level: 'UG', career_domain: 'Mechanical Engineering', duration: '4 Years', exam: 'JEE Main' },
    { name: 'B.Tech Civil Engineering', slug: 'btech-civil', degree: 'B.Tech', level: 'UG', career_domain: 'Civil Engineering', duration: '4 Years', exam: 'JEE Main' },
    { name: 'B.Tech Electronics & Communication Engineering', slug: 'btech-ece', degree: 'B.Tech', level: 'UG', career_domain: 'Electronics & Communication', duration: '4 Years', exam: 'JEE Main' },
    { name: 'Master of Technology', slug: 'mtech', degree: 'M.Tech', level: 'PG', career_domain: 'Engineering Research', duration: '2 Years', exam: 'GATE' }
  ],
  'Management': [
    { name: 'Master of Business Administration', slug: 'mba', degree: 'MBA', level: 'PG', career_domain: 'Management', duration: '2 Years', exam: 'CAT' }
  ],
  'Medical': [
    { name: 'Bachelor of Medicine and Bachelor of Surgery', slug: 'mbbs', degree: 'MBBS', level: 'UG', career_domain: 'Medical Sciences', duration: '5.5 Years', exam: 'NEET UG' },
    { name: 'B.Sc. Nursing', slug: 'bsc-nursing', degree: 'B.Sc.', level: 'UG', career_domain: 'Nursing', duration: '4 Years', exam: 'NEET UG / State CET' },
    { name: 'MD / MS', slug: 'md-ms', degree: 'MD / MS', level: 'PG', career_domain: 'Medical Specialities', duration: '3 Years', exam: 'INI CET / NEET PG' }
  ],
  'Law': [
    { name: 'B.A. LL.B. (Hons.)', slug: 'ba-llb-hons', degree: 'B.A. LL.B.', level: 'UG', career_domain: 'Law', duration: '5 Years', exam: 'CLAT' },
    { name: 'Master of Laws', slug: 'llm', degree: 'LL.M.', level: 'PG', career_domain: 'Law', duration: '1 Year', exam: 'CLAT PG' }
  ],
  'Pharmacy': [
    { name: 'Bachelor of Pharmacy', slug: 'bpharm', degree: 'B.Pharm', level: 'UG', career_domain: 'Pharmaceutical Sciences', duration: '4 Years', exam: 'GPAT / State CET' },
    { name: 'Master of Pharmacy', slug: 'mpharm', degree: 'M.Pharm', level: 'PG', career_domain: 'Pharmaceutical Research', duration: '2 Years', exam: 'GPAT' }
  ],
  'Architecture': [
    { name: 'Bachelor of Architecture', slug: 'barch', degree: 'B.Arch', level: 'UG', career_domain: 'Architecture', duration: '5 Years', exam: 'NATA' },
    { name: 'Master of Architecture', slug: 'march', degree: 'M.Arch', level: 'PG', career_domain: 'Architecture Research', duration: '2 Years', exam: 'GATE / NATA' }
  ]
};

function parseFeeText(text) {
  if (!text) return null;
  const firstPart = text.split('-')[0].trim();
  const clean = firstPart.replace(/[^\d.]/g, '');
  const num = parseFloat(clean);
  if (isNaN(num)) return null;
  if (firstPart.toLowerCase().includes('lakh')) {
    return num * 100000;
  }
  return num;
}

async function run() {
  console.log('1. Seeding entire Course Catalog...');
  const catalogList = [];
  const allTemplates = Object.values(catalogTemplates).flat();
  
  allTemplates.forEach(t => {
    catalogList.push({
      name: t.name,
      slug: t.slug,
      degree: t.degree,
      level: t.level,
      career_domain: t.career_domain
    });
  });

  const { data: catalogData, error: catalogError } = await supabase
    .from('course_catalog')
    .upsert(catalogList, { onConflict: 'slug' })
    .select();

  if (catalogError) {
    console.error('Error seeding course catalog:', catalogError);
    return;
  }
  console.log(`Successfully seeded ${catalogData.length} items in course_catalog.`);

  const slugToCatalogId = {};
  catalogData.forEach(c => {
    slugToCatalogId[c.slug] = c.id;
  });

  console.log('2. Fetching all colleges from Supabase...');
  const { data: colleges, error: collegesError } = await supabase
    .from('colleges')
    .select('id, name, stream, total_fee, entrance_exam, avg_ctc');

  if (collegesError) {
    console.error('Error fetching colleges:', collegesError);
    return;
  }
  console.log(`Found ${colleges.length} colleges.`);

  console.log('3. Preparing course offerings per college...');
  const offerings = [];

  for (const col of colleges) {
    const templates = catalogTemplates[col.stream];
    if (!templates) {
      // Stream is empty or unmapped, skip
      continue;
    }

    const feeVal = parseFeeText(col.total_fee);
    const examText = col.entrance_exam || '';
    
    for (const t of templates) {
      const catalogId = slugToCatalogId[t.slug];
      if (!catalogId) continue;

      // Determine course fee (PG is generally cheaper or specialized)
      let courseFee = feeVal;
      if (t.level === 'PG' && feeVal) {
        courseFee = feeVal * 0.7; // Fallback to 70% of total fee for PG programs
      }

      // Determine entrance exam based on college values
      let exam = t.exam;
      if (t.degree === 'B.Tech' && examText.includes('JEE')) {
        exam = examText.includes('Advanced') ? 'JEE Advanced' : 'JEE Main';
      } else if (t.degree === 'MBBS' && examText.includes('NEET')) {
        exam = 'NEET UG';
      } else if (t.degree === 'MBA' && examText.includes('CAT')) {
        exam = 'CAT';
      }

      offerings.push({
        college_id: col.id,
        course_catalog_id: catalogId,
        duration: t.duration,
        fees: courseFee,
        entrance_exam: exam,
        eligibility: t.level === 'UG' ? 'Class 12' : 'Graduation',
        avg_salary: col.avg_ctc ? `${col.avg_ctc}` : null,
        is_popular: t.slug === 'btech-cse' || t.slug === 'mba' || t.slug === 'mbbs'
      });
    }
  }

  console.log(`Upserting ${offerings.length} course offerings in batches of 200...`);
  const batchSize = 200;
  for (let i = 0; i < offerings.length; i += batchSize) {
    const batch = offerings.slice(i, i + batchSize);
    const { error: upsertError } = await supabase
      .from('courses')
      .upsert(batch, { onConflict: 'college_id,course_catalog_id' });
    
    if (upsertError) {
      console.error(`Error upserting batch at index ${i}:`, upsertError.message);
    } else {
      console.log(`Upserted batch ${i / batchSize + 1}/${Math.ceil(offerings.length / batchSize)}`);
    }
  }

  console.log('🎉 Seeding and mapping of all college courses complete!');
}

run();
