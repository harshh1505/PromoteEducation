const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
require('dotenv').config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkMigration() {
  console.log('Checking Supabase Course CMS schema status...\n');

  // Check new courses table
  const { data: courses, error: courseErr } = await supabase
    .from('courses')
    .select('id, slug, course_name, short_name, category')
    .limit(5);

  if (courseErr) {
    console.error('❌ courses table error:', courseErr.message);
    console.log('\nPlease execute backend/courses_cms_schema.sql in your Supabase SQL Editor:');
    console.log('https://supabase.com/dashboard/project/cnfmhdlkdjgnaqhngpin/sql');
    return false;
  }

  // Check if it's the NEW schema (has slug and course_name)
  if (courses && courses.length > 0 && courses[0].slug !== undefined) {
    console.log('✅ Master courses table is ACTIVE with new schema!');
    console.log(`Found ${courses.length} courses:`, courses.map(c => `${c.short_name} (${c.slug})`).join(', '));
  } else {
    console.warn('⚠️ courses table exists but does not appear to have the new CMS columns (slug, course_name).');
    console.log('Please execute backend/courses_cms_schema.sql in the Supabase SQL Editor to apply the migration.');
    return false;
  }

  // Check child tables
  const childTables = ['course_specialisations', 'course_careers', 'course_exams', 'course_faqs'];
  for (const table of childTables) {
    const { count, error } = await supabase.from(table).select('*', { count: 'exact', head: true });
    if (error) {
      console.warn(`⚠️ Table ${table} not ready:`, error.message);
    } else {
      console.log(`✅ Table ${table} exists with ${count || 0} rows.`);
    }
  }

  return true;
}

checkMigration();
