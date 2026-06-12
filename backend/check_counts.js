import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cnfmhdlkdjgnaqhngpin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZm1oZGxrZGpnbmFxaG5ncGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU2NTcxMywiZXhwIjoyMDkyMTQxNzEzfQ.MxNPt0jgaKTxtBdGNbw2ebaF0BhttNRqx3vcRWkQkEU'
);

async function check() {
  const { data: courses } = await supabase.from('courses').select('count', { count: 'exact' });
  const { data: masterCourses } = await supabase.from('master_courses').select('count', { count: 'exact' });
  const { data: specs } = await supabase.from('course_specializations').select('count', { count: 'exact' });

  console.log('Courses count:', courses);
  console.log('Master Courses count:', masterCourses);
  console.log('Specializations count:', specs);

  // If there's any data, let's print a few rows
  if (masterCourses && masterCourses.length > 0) {
    const { data: mc } = await supabase.from('master_courses').select('*').limit(5);
    console.log('Sample Master Courses:', mc);
  }
  if (specs && specs.length > 0) {
    const { data: sp } = await supabase.from('course_specializations').select('*').limit(5);
    console.log('Sample Specializations:', sp);
  }
}

check();
