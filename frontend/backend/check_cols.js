import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cnfmhdlkdjgnaqhngpin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZm1oZGxrZGpnbmFxaG5ncGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU2NTcxMywiZXhwIjoyMDkyMTQxNzEzfQ.MxNPt0jgaKTxtBdGNbw2ebaF0BhttNRqx3vcRWkQkEU'
);

async function checkColumns() {
  const r1 = await supabase.from('courses').select('degree').limit(1);
  console.log('degree result:', r1.error ? r1.error.message : 'Success');
  
  const r2 = await supabase.from('courses').select('college_id').limit(1);
  console.log('college_id result:', r2.error ? r2.error.message : 'Success');
}

checkColumns();
