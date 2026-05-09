import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cnfmhdlkdjgnaqhngpin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZm1oZGxrZGpnbmFxaG5ncGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU2NTcxMywiZXhwIjoyMDkyMTQxNzEzfQ.MxNPt0jgaKTxtBdGNbw2ebaF0BhttNRqx3vcRWkQkEU'
);

async function check() {
  const { data: colleges, error: cErr } = await supabase
    .from('colleges')
    .select('name')
    .ilike('name', '%aiims%kalyani%');
  
  if (cErr) console.error('College Error:', cErr);
  else console.log('Colleges matching AIIMS Kalyani:', colleges);
  
  const { data: exams, error: eErr } = await supabase
    .from('exams')
    .select('name');

  if (eErr) console.error('Exam Error:', eErr);
  else console.log('Exams in DB:', exams);
}

check();
