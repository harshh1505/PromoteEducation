import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cnfmhdlkdjgnaqhngpin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZm1oZGxrZGpnbmFxaG5ncGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU2NTcxMywiZXhwIjoyMDkyMTQxNzEzfQ.MxNPt0jgaKTxtBdGNbw2ebaF0BhttNRqx3vcRWkQkEU'
);

async function check() {
  const { data, error } = await supabase
    .from('cutoffs')
    .select('*')
    .limit(50000);
  
  if (error) console.error(error);
  console.log('Total rows returned by .limit(50000):', data ? data.length : 0);

  const pkgRows = data?.filter(r => r.college_name && r.college_name.toLowerCase().includes('pkg'));
  console.log('PKG rows in that data:', pkgRows?.length);
  if (pkgRows) {
     const cats = Array.from(new Set(pkgRows.map(d => d.category)));
     console.log('Categories for PKG in returned data:', cats);
  }

  // Count exactly
  const countReq = await supabase
    .from('cutoffs')
    .select('*', { count: 'exact', head: true });
  console.log('True total cutoffs in DB:', countReq.count, countReq.error);
}
check();
