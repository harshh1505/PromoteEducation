const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'frontend/.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function getBaseSlug(slug) {
  // 1. Remove trailing numbers: e.g. -2, -3
  let base = slug.replace(/-\d+$/, '');
  
  // 2. Remove common department/school prefixes
  const prefixes = [
    'department-of-management-studies-',
    'department-of-management-',
    'school-of-management-',
    'vinod-gupta-school-of-management-',
    'kiit-school-of-management-',
    'department-of-pharmacy-',
    'department-of-architecture-',
    'school-of-planning-and-architecture-',
    'department-of-business-',
    'institute-of-business-'
  ];
  
  for (const prefix of prefixes) {
    if (base.startsWith(prefix)) {
      base = base.substring(prefix.length);
    }
  }

  // 3. Remove common department/school suffixes
  const suffixes = [
    '-sjmsom',
    '-dms',
    '-vgsom',
    '-som',
    '-mba',
    '-pharmacy',
    '-arch'
  ];

  for (const suffix of suffixes) {
    if (base.endsWith(suffix)) {
      base = base.substring(0, base.length - suffix.length);
    }
  }
  
  return base;
}

async function run() {
  const { data: colleges, error } = await supabase.from('colleges').select('id, name, slug');
  if (error) {
    console.error(error);
    return;
  }

  const groups = {};
  colleges.forEach(c => {
    const base = getBaseSlug(c.slug);
    if (!groups[base]) {
      groups[base] = [];
    }
    groups[base].push(c);
  });

  console.log('--- DUPLICATE GROUPS FOUND ---');
  let count = 0;
  for (const [base, items] of Object.entries(groups)) {
    if (items.length > 1) {
      count++;
      console.log(`\nGroup ${count}: Base Slug [${base}]`);
      items.forEach(item => {
        console.log(`  - Name: "${item.name}" | Slug: "${item.slug}" | ID: ${item.id}`);
      });
    }
  }
}

run();
