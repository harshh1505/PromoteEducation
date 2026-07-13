const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'frontend/.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seed() {
  console.log('Seeding course catalog...');
  const catalog = [
    { name: 'B.Tech Computer Science and Engineering', slug: 'btech-cse', degree: 'B.Tech', level: 'UG', career_domain: 'Software Engineering' },
    { name: 'B.Tech Electrical Engineering', slug: 'btech-electrical', degree: 'B.Tech', level: 'UG', career_domain: 'Electrical Engineering' },
    { name: 'B.Tech Mechanical Engineering', slug: 'btech-mechanical', degree: 'B.Tech', level: 'UG', career_domain: 'Mechanical Engineering' },
    { name: 'B.Tech Civil Engineering', slug: 'btech-civil', degree: 'B.Tech', level: 'UG', career_domain: 'Civil Engineering' },
    { name: 'B.Tech Chemical Engineering', slug: 'btech-chemical', degree: 'B.Tech', level: 'UG', career_domain: 'Chemical Engineering' },
    { name: 'M.Tech Computer Science & Engineering', slug: 'mtech-cse', degree: 'M.Tech', level: 'PG', career_domain: 'Engineering Research' },
    { name: 'MBA', slug: 'mba', degree: 'MBA', level: 'PG', career_domain: 'Management' },
    { name: 'M.Sc. Physics', slug: 'msc-physics', degree: 'M.Sc.', level: 'PG', career_domain: 'Academic & Research' },
    { name: 'Ph.D. Engineering', slug: 'phd-engineering', degree: 'Ph.D.', level: 'Doctoral', career_domain: 'Academic & Research' }
  ];

  const { data: catalogData, error: catalogError } = await supabase
    .from('course_catalog')
    .upsert(catalog, { onConflict: 'slug' })
    .select();

  if (catalogError) {
    console.error('Error seeding catalog:', catalogError);
    return;
  }
  console.log('Catalog seeded successfully. Rows:', catalogData.length);

  // Get IIT Delhi ID
  const { data: college, error: collegeError } = await supabase
    .from('colleges')
    .select('id')
    .eq('slug', 'indian-institute-of-technology-delhi-2')
    .single();

  if (collegeError || !college) {
    console.error('Error fetching IIT Delhi:', collegeError);
    return;
  }
  console.log('IIT Delhi College ID:', college.id);

  // Map slugs to IDs
  const slugToId = {};
  catalogData.forEach(item => {
    slugToId[item.slug] = item.id;
  });

  console.log('Seeding courses for IIT Delhi...');
  const courses = [
    { college_id: college.id, course_catalog_id: slugToId['btech-cse'], duration: '4 Years', fees: 105000, entrance_exam: 'JEE Advanced', eligibility: 'Class 12 with 75%+', seats: 120, avg_salary: '35 LPA', is_popular: true },
    { college_id: college.id, course_catalog_id: slugToId['btech-electrical'], duration: '4 Years', fees: 105000, entrance_exam: 'JEE Advanced', eligibility: 'Class 12 with 75%+', seats: 120, avg_salary: '28 LPA', is_popular: false },
    { college_id: college.id, course_catalog_id: slugToId['btech-mechanical'], duration: '4 Years', fees: 105000, entrance_exam: 'JEE Advanced', eligibility: 'Class 12 with 75%+', seats: 120, avg_salary: '22 LPA', is_popular: false },
    { college_id: college.id, course_catalog_id: slugToId['btech-civil'], duration: '4 Years', fees: 105000, entrance_exam: 'JEE Advanced', eligibility: 'Class 12 with 75%+', seats: 120, avg_salary: '18 LPA', is_popular: false },
    { college_id: college.id, course_catalog_id: slugToId['btech-chemical'], duration: '4 Years', fees: 105000, entrance_exam: 'JEE Advanced', eligibility: 'Class 12 with 75%+', seats: 120, avg_salary: '20 LPA', is_popular: false },
    { college_id: college.id, course_catalog_id: slugToId['mtech-cse'], duration: '2 Years', fees: 18000, entrance_exam: 'GATE', eligibility: 'B.Tech / B.E.', seats: 200, avg_salary: '18 LPA', is_popular: false },
    { college_id: college.id, course_catalog_id: slugToId['mba'], duration: '2 Years', fees: 450000, entrance_exam: 'CAT', eligibility: 'Bachelor\'s Degree', seats: 90, avg_salary: '24 LPA', is_popular: false }
  ];

  const { data: coursesData, error: coursesError } = await supabase
    .from('courses')
    .upsert(courses, { onConflict: 'college_id,course_catalog_id' })
    .select();

  if (coursesError) {
    console.error('Error seeding courses:', coursesError);
    return;
  }
  console.log('Courses seeded successfully. Rows:', coursesData.length);
}

seed();
