-- ============================================================
-- PROMOTE EDUCATION: MASTER CLEAN SLATE SCHEMA
-- ============================================================

-- 0. EXTENSIONS
create extension if not exists "pgcrypto";   -- For gen_random_uuid()
create extension if not exists pg_trgm;      -- For fuzzy search

-- 0.1 CUSTOM TYPES
DO $$ BEGIN
    CREATE TYPE college_type AS ENUM ('government', 'private', 'deemed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. AUTH / PROFILES (User management)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- AUTH POLICIES
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Trigger for new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

-- Re-create trigger safely
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. COLLEGES (Master Table)
drop table if exists colleges cascade;
create table colleges (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text unique,
  name                  text not null,
  short_name            text,
  location              text not null,
  state                 text not null,
  stream                text,
  ranking               integer,              -- New ranking field
  type                  college_type default 'private', -- New type field
  avg_ctc               text,                 -- New CTC field (Text)
  total_fee             text,                 -- New Fee field (Text)
  verified              boolean default false, -- New verified field
  ownership             text,
  affiliation           text,
  established           smallint,
  description           text,
  nirf_rank             smallint,
  naac_grade            text,
  naac_cgpa             numeric(3,2),
  campus_size           text,
  total_students        int,
  faculty_count         int,
  phd_scholars          int,
  international_students int,
  research_publications  int,
  avg_package           numeric(6,2),
  highest_package       numeric(7,2),
  placement_rate        numeric(5,2),
  total_offers          int,
  companies_visited     int,
  entrance_exam         text,
  rating                numeric(2,1) default 4.5,
  review_count          int default 0,
  video_url             text,
  facilities            text[],
  official_website      text,
  contact_email         text,
  meta_title            text,
  meta_description      text,
  is_active             boolean not null default true,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- 3. COURSES
create table if not exists courses (
  id            uuid primary key default gen_random_uuid(),
  college_id    uuid not null references colleges (id) on delete cascade,
  name          text not null,
  level         text not null default 'UG',
  fees          int not null,
  duration      text not null,
  eligibility   text,
  is_popular    boolean not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- 4. PLACEMENTS
create table if not exists placements (
  id                  uuid primary key default gen_random_uuid(),
  college_id          uuid not null references colleges (id) on delete cascade,
  year                smallint not null,
  avg_package         numeric(6,2) not null,
  highest_package     numeric(7,2),
  placement_rate      numeric(5,2),
  total_offers        int,
  companies_visited   int,
  recruiters          text[] not null default '{}',
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (college_id, year)
);

-- 5. CUTOFFS
create table if not exists cutoffs (
  id              uuid primary key default gen_random_uuid(),
  college_id      uuid not null references colleges (id) on delete cascade,
  branch          text not null,
  category        text not null,
  gender          text not null default 'Gender-Neutral',
  opening_rank    int not null,
  closing_rank    int not null,
  year            smallint not null,
  round           smallint default 6,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- 6. REVIEWS
create table if not exists reviews (
  id           uuid primary key default gen_random_uuid(),
  college_id   uuid not null references colleges (id) on delete cascade,
  user_name    text not null,
  rating       numeric(2,1) not null check (rating between 1 and 5),
  comment      text not null,
  user_tag     text,
  is_verified  boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- 7. FAQS
create table if not exists faqs (
  id          uuid primary key default gen_random_uuid(),
  college_id  uuid not null references colleges (id) on delete cascade,
  question    text not null,
  answer      text not null,
  sort_order  smallint not null default 100,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 8. RANKINGS
create table if not exists rankings (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),
  name        text not null,
  location    text not null,
  state       text not null,
  ranking     integer,
  stream      text not null,
  type        college_type default 'private',
  avg_ctc     text,
  total_fee   text,
  verified    boolean default false
);

-- 9. GALLERY
create table if not exists gallery (
  id          uuid primary key default gen_random_uuid(),
  college_id  uuid not null references colleges (id) on delete cascade,
  image_url   text not null,
  caption     text,
  category    text not null default 'Campus',
  sort_order  smallint not null default 100,
  created_at  timestamptz not null default now()
);

-- 8. SCHOLARSHIPS
create table if not exists scholarships (
  id           uuid primary key default gen_random_uuid(),
  college_id   uuid not null references colleges (id) on delete cascade,
  name         text not null,
  amount       text,
  eligibility  text,
  created_at   timestamptz not null default now()
);

-- 11. IMPORTANT DATES
create table if not exists important_dates (
  id           uuid primary key default gen_random_uuid(),
  college_id   uuid not null references colleges (id) on delete cascade,
  event_name   text not null,
  event_date   date not null,
  created_at   timestamptz not null default now()
);

-- 12. RELATED COLLEGES
create table if not exists related_colleges (
  id          uuid primary key default gen_random_uuid(),
  college_id  uuid not null references colleges (id) on delete cascade,
  related_id  uuid not null references colleges (id) on delete cascade,
  unique(college_id, related_id)
);

-- 13. ARTICLES (Clean Definition)
create table if not exists articles (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  excerpt       text,
  content       text,
  image_url     text,
  category      text not null,
  sub_category  text,
  read_time     text,
  author        text default 'Promote Education Team',
  is_published  boolean default true,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ============================================================
-- GLOBAL TRIGGERS & RLS
-- ============================================================

-- Function to update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Attach triggers to all tables
create trigger colleges_updated_at before update on colleges for each row execute function update_updated_at();
create trigger courses_updated_at before update on courses for each row execute function update_updated_at();
create trigger placements_updated_at before update on placements for each row execute function update_updated_at();
create trigger cutoffs_updated_at before update on cutoffs for each row execute function update_updated_at();
create trigger reviews_updated_at before update on reviews for each row execute function update_updated_at();
create trigger faqs_updated_at before update on faqs for each row execute function update_updated_at();
create trigger rankings_updated_at before update on rankings for each row execute function update_updated_at();
create trigger articles_updated_at before update on articles for each row execute function update_updated_at();

-- ENABLE RLS
alter table colleges   enable row level security;
alter table courses    enable row level security;
alter table placements enable row level security;
alter table cutoffs    enable row level security;
alter table reviews    enable row level security;
alter table faqs       enable row level security;
alter table rankings   enable row level security;
alter table gallery    enable row level security;
alter table scholarships enable row level security;
alter table important_dates enable row level security;
alter table related_colleges enable row level security;
alter table articles   enable row level security;

-- Public read policies (All tables)
create policy "Public read: Colleges" on colleges for select using (true);
create policy "Public read: Courses" on courses for select using (true);
create policy "Public read: Placements" on placements for select using (true);
create policy "Public read: Cutoffs" on cutoffs for select using (true);
create policy "Public read: Reviews" on reviews for select using (true);
create policy "Public can post reviews" on reviews for insert with check (true);
create policy "Public read: FAQs" on faqs for select using (true);
create policy "Public can post FAQs" on faqs for insert with check (true);
create policy "Public read: Rankings" on rankings for select using (true);
create policy "Public read: Gallery" on gallery for select using (true);
create policy "Public read: Scholarships" on scholarships for select using (true);
create policy "Public read: Dates" on important_dates for select using (true);
create policy "Public read: Related" on related_colleges for select using (true);
create policy "Public read: Articles" on articles for select using (true);

-- Indexing for performance
create index if not exists idx_colleges_slug on colleges(slug);
create index if not exists idx_courses_college on courses(college_id);
create index if not exists idx_placements_college on placements(college_id);
create index if not exists idx_cutoffs_college on cutoffs(college_id);
create index if not exists idx_reviews_college on reviews(college_id);
create index if not exists idx_articles_slug on articles(slug);

-- SYNC TRIGGER: Auto-update colleges summary from placements
create or replace function sync_college_placement_summary()
returns trigger language plpgsql as $$
declare
  latest_year smallint;
begin
  select max(year) into latest_year
  from placements
  where college_id = new.college_id;

  if new.year = latest_year then
    update colleges set
      avg_package       = new.avg_package,
      highest_package   = new.highest_package,
      placement_rate    = new.placement_rate,
      total_offers      = new.total_offers,
      companies_visited = new.companies_visited,
      updated_at        = now()
    where id = new.college_id;
  end if;

  return new;
end;
$$;

create trigger placements_sync_college
  after insert or update on placements
  for each row execute function sync_college_placement_summary();

-- SYNC TRIGGER: Auto-update colleges rating/count from reviews
create or replace function sync_college_reviews()
returns trigger language plpgsql as $$
begin
  update colleges set
    rating = (select round(avg(rating)::numeric, 1) from reviews where college_id = coalesce(new.college_id, old.college_id)),
    review_count = (select count(*) from reviews where college_id = coalesce(new.college_id, old.college_id)),
    updated_at = now()
  where id = coalesce(new.college_id, old.college_id);
  return new;
end;
$$;

create trigger reviews_sync_college
  after insert or update or delete on reviews
  for each row execute function sync_college_reviews();