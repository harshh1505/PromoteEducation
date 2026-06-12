import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://cnfmhdlkdjgnaqhngpin.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNuZm1oZGxrZGpnbmFxaG5ncGluIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjU2NTcxMywiZXhwIjoyMDkyMTQxNzEzfQ.MxNPt0jgaKTxtBdGNbw2ebaF0BhttNRqx3vcRWkQkEU'
);

const MASTER_COURSES_DATA = [
  {
    name: 'Bachelor of Technology',
    slug: 'btech',
    level: 'UG',
    duration_years: 4.0,
    description: 'A comprehensive undergraduate engineering degree focusing on technical and practical skills across various disciplines like Computer Science, Mechanical, and Civil Engineering.',
    stream: 'Engineering',
    specs: [
      { name: 'Computer Science Engineering', slug: 'computer-science-engineering', career: 'Software Engineer, Data Scientist, Web Developer, AI Engineer' },
      { name: 'Mechanical Engineering', slug: 'mechanical-engineering', career: 'Mechanical Design Engineer, Automotive Engineer, Aerospace Engineer' },
      { name: 'Civil Engineering', slug: 'civil-engineering', career: 'Structural Engineer, Site Engineer, Transportation Planner' },
      { name: 'Electrical Engineering', slug: 'electrical-engineering', career: 'Power Systems Engineer, Electrical Design Engineer, Controls Engineer' },
      { name: 'Chemical Engineering', slug: 'chemical-engineering', career: 'Process Engineer, Chemical Plant Manager, Petroleum Engineer' },
      { name: 'Electronics & Communication Engineering', slug: 'electronics-communication-engineering', career: 'Embedded Systems Engineer, Telecom Engineer, Network Administrator' }
    ]
  },
  {
    name: 'Master of Business Administration',
    slug: 'mba',
    level: 'PG',
    duration_years: 2.0,
    description: 'A premier postgraduate degree in business management focusing on leadership, finance, marketing, and strategic operations.',
    stream: 'Management',
    specs: [
      { name: 'Finance', slug: 'finance', career: 'Investment Banker, Financial Analyst, Portfolio Manager' },
      { name: 'Marketing', slug: 'marketing', career: 'Brand Manager, Digital Marketer, Market Research Analyst' },
      { name: 'Human Resources', slug: 'human-resources', career: 'HR Manager, Talent Acquisition Specialist, Training Coordinator' },
      { name: 'Information Technology', slug: 'information-technology', career: 'IT Project Manager, Systems Analyst, Business Consultant' },
      { name: 'Operations Management', slug: 'operations-management', career: 'Supply Chain Manager, Operations Analyst, Logistics Coordinator' }
    ]
  },
  {
    name: 'Bachelor of Medicine and Bachelor of Surgery',
    slug: 'mbbs',
    level: 'UG',
    duration_years: 5.5,
    description: 'The premier undergraduate medical degree required to become a certified medical doctor.',
    stream: 'Medical',
    specs: [
      { name: 'General Medicine', slug: 'general-medicine', career: 'General Physician, Medical Officer, Clinical Researcher' }
    ]
  },
  {
    name: 'Bachelor of Computer Applications',
    slug: 'bca',
    level: 'UG',
    duration_years: 3.0,
    description: 'An undergraduate degree focusing on software development, programming languages, and computing technologies.',
    stream: 'Computer Applications',
    specs: [
      { name: 'Software Development', slug: 'software-development', career: 'Software Developer, UI/UX Designer, Database Administrator' },
      { name: 'Data Science & Analytics', slug: 'data-science-analytics', career: 'Data Analyst, Business Intelligence Analyst' }
    ]
  }
];

async function seed() {
  console.log('Starting seeding of master courses, specializations, and courses...');
  
  // Clear tables first just in case
  await supabase.from('course_specializations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('master_courses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('courses').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  for (const mc of MASTER_COURSES_DATA) {
    // 1. Insert master_course
    const { data: mcRow, error: mcErr } = await supabase
      .from('master_courses')
      .insert({
        name: mc.name,
        slug: mc.slug,
        level: mc.level,
        duration_years: mc.duration_years,
        description: mc.description
      })
      .select()
      .single();

    if (mcErr) {
      console.error(`Error inserting master course ${mc.name}:`, mcErr);
      continue;
    }

    console.log(`Inserted master course: ${mcRow.name} (${mcRow.id})`);

    // 2. Insert specializations and courses
    for (const spec of mc.specs) {
      const { data: specRow, error: specErr } = await supabase
        .from('course_specializations')
        .insert({
          master_course_id: mcRow.id,
          name: spec.name,
          slug: spec.slug,
          career_domain: spec.career
        })
        .select()
        .single();

      if (specErr) {
        console.error(`Error inserting specialization ${spec.name}:`, specErr);
      } else {
        console.log(`  Inserted specialization: ${specRow.name}`);
      }

      // Also insert into generic courses table
      const courseSlug = `${mc.slug}-${spec.slug}`;
      const { error: courseErr } = await supabase
        .from('courses')
        .insert({
          level: mc.level,
          category: mc.stream,
          degree: mc.slug.toUpperCase(),
          course_name: spec.name,
          duration_years: mc.duration_years,
          career_domain: spec.career,
          slug: courseSlug
        });

      if (courseErr) {
        console.error(`  Error inserting course ${mc.slug.toUpperCase()} in ${spec.name}:`, courseErr);
      } else {
        console.log(`  Inserted course: ${mc.slug.toUpperCase()} in ${spec.name} (slug: ${courseSlug})`);
      }
    }
  }

  console.log('Seeding completed!');
}

seed();
