const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: 'frontend/.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Map slugs from old seed file to actual database slugs
const collegeSlugMap = {
  'iit-bombay': 'indian-institute-of-technology-bombay',
  'iit-delhi': 'indian-institute-of-technology-delhi',
  'iit-madras': 'indian-institute-of-technology-madras',
  'iit-kanpur': 'indian-institute-of-technology-kanpur',
  'iit-kharagpur': 'indian-institute-of-technology-kharagpur',
  'iit-roorkee': 'indian-institute-of-technology-roorkee',
  'nit-trichy': 'national-institute-of-technology-tiruchirappalli',
  'nit-warangal': 'national-institute-of-technology-warangal',
  'nit-surathkal': 'national-institute-of-technology-karnataka-surathkal',
  'nit-rourkela': 'national-institute-of-technology-rourkela',
  'nit-calicut': 'national-institute-of-technology-calicut',
  'iim-ahmedabad': 'indian-institute-of-management-ahmedabad',
  'iim-bangalore': 'indian-institute-of-management-bangalore',
  'iim-calcutta': 'indian-institute-of-management-calcutta',
  'iim-lucknow': 'indian-institute-of-management-lucknow',
  'iim-kozhikode': 'indian-institute-of-management-kozhikode',
  'bits-pilani': 'birla-institute-of-technology-and-science-pilani',
  'aiims-delhi': 'all-india-institute-of-medical-sciences-delhi',
  'aiims-kalyani': 'all-india-institute-of-medical-sciences-kalyani',
  'aiims-bhopal': 'all-india-institute-of-medical-sciences-bhopal',
  'vit-vellore': 'vellore-institute-of-technology',
  'medical-college-kolkata': 'medical-college-and-hospital-kolkata',
  'ipgmer-kolkata': 'institute-of-postgraduate-medical-education-and-research-kolkata',
  'nlsiu-bangalore': 'national-law-school-of-india-university',
  'nlu-delhi': 'national-law-university-delhi'
};

// Map old seed course names to canonical names and catalog slugs
const courseNameMap = {
  'B.Tech (CSE)': { name: 'B.Tech Computer Science and Engineering', slug: 'btech-cse', degree: 'B.Tech', level: 'UG', career_domain: 'Software Engineering' },
  'B.Tech (Electrical)': { name: 'B.Tech Electrical Engineering', slug: 'btech-electrical', degree: 'B.Tech', level: 'UG', career_domain: 'Electrical Engineering' },
  'B.Tech (Mechanical)': { name: 'B.Tech Mechanical Engineering', slug: 'btech-mechanical', degree: 'B.Tech', level: 'UG', career_domain: 'Mechanical Engineering' },
  'B.Tech (Civil)': { name: 'B.Tech Civil Engineering', slug: 'btech-civil', degree: 'B.Tech', level: 'UG', career_domain: 'Civil Engineering' },
  'B.Tech (Chemical)': { name: 'B.Tech Chemical Engineering', slug: 'btech-chemical', degree: 'B.Tech', level: 'UG', career_domain: 'Chemical Engineering' },
  'B.Tech (Electronics)': { name: 'B.Tech Electronics & Communication Engineering', slug: 'btech-ece', degree: 'B.Tech', level: 'UG', career_domain: 'Electronics & Communication' },
  'B.E. (CSE)': { name: 'B.E. Computer Science and Engineering', slug: 'be-cse', degree: 'B.E.', level: 'UG', career_domain: 'Software Engineering' },
  'B.E. (Electrical & Electronics)': { name: 'B.E. Electrical & Electronics Engineering', slug: 'be-eee', degree: 'B.E.', level: 'UG', career_domain: 'Electrical Engineering' },
  'B.E. (Mechanical)': { name: 'B.E. Mechanical Engineering', slug: 'be-mechanical', degree: 'B.E.', level: 'UG', career_domain: 'Mechanical Engineering' },
  'B.S. Research': { name: 'B.S. Research', slug: 'bs-research', degree: 'B.S.', level: 'UG', career_domain: 'Research' },
  'B.Arch.': { name: 'Bachelor of Architecture', slug: 'barch', degree: 'B.Arch', level: 'UG', career_domain: 'Architecture' },
  'B.Sc. Nursing': { name: 'B.Sc. Nursing', slug: 'bsc-nursing', degree: 'B.Sc.', level: 'UG', career_domain: 'Nursing' },
  'B.Sc. Nursing (Hons.)': { name: 'B.Sc. Nursing (Hons.)', slug: 'bsc-nursing-hons', degree: 'B.Sc.', level: 'UG', career_domain: 'Nursing' },
  'MBBS': { name: 'Bachelor of Medicine and Bachelor of Surgery', slug: 'mbbs', degree: 'MBBS', level: 'UG', career_domain: 'Medical Sciences' },
  'B.A. LL.B. (Hons.)': { name: 'B.A. LL.B. (Hons.)', slug: 'ba-llb-hons', degree: 'B.A. LL.B.', level: 'UG', career_domain: 'Law' },
  'M.Tech': { name: 'Master of Technology', slug: 'mtech', degree: 'M.Tech', level: 'PG', career_domain: 'Engineering Research' },
  'MBA': { name: 'Master of Business Administration', slug: 'mba', degree: 'MBA', level: 'PG', career_domain: 'Management' },
  'MBA (SJMSOM)': { name: 'MBA (SJMSOM)', slug: 'mba-sjmsom', degree: 'MBA', level: 'PG', career_domain: 'Management' },
  'MBA (DMS)': { name: 'MBA (DMS)', slug: 'mba-dms', degree: 'MBA', level: 'PG', career_domain: 'Management' },
  'MBA (PGP)': { name: 'MBA (PGP)', slug: 'mba-pgp', degree: 'MBA', level: 'PG', career_domain: 'Management' },
  'MBA (PGPX – Executive)': { name: 'MBA (PGPX – Executive)', slug: 'mba-pgpx', degree: 'MBA', level: 'PG', career_domain: 'Management' },
  'MBA (EPGP – Executive)': { name: 'MBA (EPGP – Executive)', slug: 'mba-epgp', degree: 'MBA', level: 'PG', career_domain: 'Management' },
  'MBA (WMP – Executive)': { name: 'MBA (WMP – Executive)', slug: 'mba-wmp', degree: 'MBA', level: 'PG', career_domain: 'Management' },
  'MBA (MBAEx – Executive)': { name: 'MBA (MBAEx – Executive)', slug: 'mba-mbaex', degree: 'MBA', level: 'PG', career_domain: 'Management' },
  'MBA (VGSOM)': { name: 'MBA (VGSOM)', slug: 'mba-vgsom', degree: 'MBA', level: 'PG', career_domain: 'Management' },
  'M.Sc.': { name: 'Master of Science', slug: 'msc', degree: 'M.Sc.', level: 'PG', career_domain: 'Sciences' },
  'M.Sc. (Hons.)': { name: 'M.Sc. (Hons.)', slug: 'msc-hons', degree: 'M.Sc.', level: 'PG', career_domain: 'Sciences' },
  'MD / MS': { name: 'MD / MS', slug: 'md-ms', degree: 'MD / MS', level: 'PG', career_domain: 'Medical Specialities' },
  'DM / M.Ch.': { name: 'DM / M.Ch.', slug: 'dm-mch', degree: 'DM / M.Ch.', level: 'PG', career_domain: 'Medical Super-Specialities' },
  'LL.M.': { name: 'Master of Laws', slug: 'llm', degree: 'LL.M.', level: 'PG', career_domain: 'Law' },
  'Ph.D.': { name: 'Doctor of Philosophy', slug: 'phd', degree: 'Ph.D.', level: 'Doctoral', career_domain: 'Academic Research' },
  'Ph.D. (FPM)': { name: 'Doctor of Philosophy (FPM)', slug: 'phd-fpm', degree: 'Ph.D.', level: 'Doctoral', career_domain: 'Management Research' }
};

async function run() {
  const filePath = path.join(__dirname, 'seed_courses.sql');
  const sql = fs.readFileSync(filePath, 'utf8');

  // Regex to extract insert values:
  // e.g. SELECT id, 'B.Tech (CSE)',              200000, '4 Years', 'JEE Advanced'  FROM colleges WHERE slug='iit-bombay'
  const lineRegex = /SELECT\s+id,\s*'([^']+)',\s*([\d.]+),\s*'([^']*)',\s*'([^']*)'\s+FROM\s+colleges\s+WHERE\s+slug\s*=\s*'([^']+)'/i;

  const lines = sql.split('\n');
  const parsedItems = [];

  for (const line of lines) {
    const match = line.match(lineRegex);
    if (match) {
      const [_, name, fees, duration, entrance_exam, slug] = match;
      parsedItems.push({
        rawName: name,
        fees: parseFloat(fees),
        duration,
        entrance_exam,
        rawSlug: slug,
        actualSlug: collegeSlugMap[slug] || slug
      });
    }
  }

  console.log(`Parsed ${parsedItems.length} course entries from seed_courses.sql`);

  // 1. Unique catalog courses to insert
  const catalogSet = new Map();
  for (const item of parsedItems) {
    const mapped = courseNameMap[item.rawName];
    if (mapped) {
      catalogSet.set(mapped.slug, mapped);
    } else {
      console.warn(`Unmapped course name: ${item.rawName}`);
    }
  }

  const catalogList = Array.from(catalogSet.values());
  console.log(`Inserting ${catalogList.length} items into course_catalog...`);

  const { data: catalogData, error: catalogError } = await supabase
    .from('course_catalog')
    .upsert(catalogList, { onConflict: 'slug' })
    .select();

  if (catalogError) {
    console.error('Error seeding catalog:', catalogError);
    return;
  }
  console.log('Seeded course catalog.');

  const slugToCatalogId = {};
  catalogData.forEach(c => {
    slugToCatalogId[c.slug] = c.id;
  });

  // 2. Fetch colleges to map slugs to UUIDs
  const uniqueCollegeSlugs = Array.from(new Set(parsedItems.map(p => p.actualSlug)));
  const { data: colleges, error: collegesError } = await supabase
    .from('colleges')
    .select('id, slug')
    .in('slug', uniqueCollegeSlugs);

  if (collegesError) {
    console.error('Error fetching colleges:', collegesError);
    return;
  }

  const slugToCollegeId = {};
  colleges.forEach(c => {
    slugToCollegeId[c.slug] = c.id;
  });

  // 3. Prepare courses list
  const coursesToInsert = [];
  for (const item of parsedItems) {
    const collegeId = slugToCollegeId[item.actualSlug];
    const catalogMapped = courseNameMap[item.rawName];
    
    if (!collegeId) {
      console.warn(`College not found in database for slug: ${item.actualSlug}`);
      continue;
    }
    if (!catalogMapped) {
      continue;
    }

    const catalogId = slugToCatalogId[catalogMapped.slug];
    if (!catalogId) {
      continue;
    }

    coursesToInsert.push({
      college_id: collegeId,
      course_catalog_id: catalogId,
      duration: item.duration,
      fees: item.fees,
      entrance_exam: item.entrance_exam,
      eligibility: catalogMapped.level === 'UG' ? 'Class 12' : (catalogMapped.level === 'PG' ? 'Graduation' : 'Post Graduation'),
      is_popular: catalogMapped.slug === 'btech-cse' || catalogMapped.slug === 'mba' || catalogMapped.slug === 'mbbs'
    });
  }

  console.log(`Upserting ${coursesToInsert.length} offerings into courses...`);
  const { data: insertedCourses, error: coursesError } = await supabase
    .from('courses')
    .upsert(coursesToInsert, { onConflict: 'college_id,course_catalog_id' })
    .select();

  if (coursesError) {
    console.error('Error inserting courses:', coursesError);
    return;
  }

  console.log(`Successfully seeded ${insertedCourses.length} college course offerings!`);
}

run();
