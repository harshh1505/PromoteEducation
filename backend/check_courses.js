import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cnfmhdlkdjgnaqhngpin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZm1oZGxrZGpnbmFxaG5ncGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU2NTcxMywiZXhwIjoyMDkyMTQxNzEzfQ.MxNPt0jgaKTxtBdGNbw2ebaF0BhttNRqx3vcRWkQkEU'
);

async function check() {
  const { data: courses, error } = await supabase
    .from('courses')
    .select('degree_slug, degree, course_name, slug')
    .ilike('course_name', '%computer%');
  
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  console.log('Computer Science related courses:');
  console.log(JSON.stringify(courses, null, 2));
}

check();
