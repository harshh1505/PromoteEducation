import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cnfmhdlkdjgnaqhngpin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZm1oZGxrZGpnbmFxaG5ncGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU2NTcxMywiZXhwIjoyMDkyMTQxNzEzfQ.MxNPt0jgaKTxtBdGNbw2ebaF0BhttNRqx3vcRWkQkEU'
);

async function checkTables() {
  const { data, error } = await supabase.rpc('get_table_names'); // if exists
  if (error) {
    // try direct query to pg_catalog or information_schema if allowed
    const { data: d2, error: e2 } = await supabase.from('colleges').select('id').limit(1);
    console.log('Colleges query works:', !e2);
  } else {
    console.log('Tables:', data);
  }
}
checkTables();
