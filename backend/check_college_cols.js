import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cnfmhdlkdjgnaqhngpin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZm1oZGxrZGpnbmFxaG5ncGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU2NTcxMywiZXhwIjoyMDkyMTQxNzEzfQ.MxNPt0jgaKTxtBdGNbw2ebaF0BhttNRqx3vcRWkQkEU'
);

async function inspectColleges() {
  const { data, error } = await supabase.from('colleges').select('*').limit(1);
  if (error) {
    console.error('Error fetching colleges:', error);
  } else if (data && data.length > 0) {
    console.log('Columns in colleges table:', Object.keys(data[0]));
    console.log('Sample row:', data[0]);
  } else {
    console.log('No data found in colleges table.');
  }
}

inspectColleges();
