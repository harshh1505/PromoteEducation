-- ============================================================
-- BRAINSTORMING TEST SYSTEM TABLES
-- ============================================================

-- 1. QUESTIONS TABLE
create table if not exists brainstorm_questions (
    id uuid primary key default gen_random_uuid(),
    category text not null, -- Interest, Aptitude, Personality
    subcategory text,       -- Realistic, Investigative, Artistic, etc.
    question_text text not null,
    branch_logic jsonb,     -- Optional branching rules
    sort_order integer default 0,
    created_at timestamptz default now()
);

-- 2. QUESTION OPTIONS TABLE
create table if not exists brainstorm_options (
    id uuid primary key default gen_random_uuid(),
    question_id uuid references brainstorm_questions(id) on delete cascade,
    option_text text not null,
    trait_weights jsonb not null, -- e.g., {"investigative": 10, "analytical": 5}
    next_question_id uuid references brainstorm_questions(id), -- For dynamic branching
    sort_order integer default 0
);

-- 3. USER SESSIONS (To resume test)
create table if not exists brainstorm_sessions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    status text default 'in_progress', -- in_progress, completed
    current_step integer default 1,
    metadata jsonb default '{}', -- For storing session state
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- 4. USER RESPONSES
create table if not exists brainstorm_responses (
    id uuid primary key default gen_random_uuid(),
    session_id uuid references brainstorm_sessions(id) on delete cascade,
    question_id uuid, -- Reference removed for fallback flexibility
    option_id uuid,   -- Reference removed for fallback flexibility
    trait_weights jsonb, -- Snapshot of weights at the time
    created_at timestamptz default now()
);


-- 5. USER PROFILES (Final Results)
create table if not exists brainstorm_profiles (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id) on delete cascade,
    session_id uuid references brainstorm_sessions(id) on delete cascade,
    profile_json jsonb not null, -- The structured profile builder output
    ai_interpretation text,      -- LLM generated report
    created_at timestamptz default now()
);

-- Enable RLS
alter table brainstorm_questions enable row level security;
alter table brainstorm_options   enable row level security;
alter table brainstorm_sessions  enable row level security;
alter table brainstorm_responses enable row level security;
alter table brainstorm_profiles  enable row level security;

-- Policies
create policy "Public read: Brainstorm Questions" on brainstorm_questions for select using (true);
create policy "Public read: Brainstorm Options"   on brainstorm_options   for select using (true);
create policy "Users can manage own sessions"    on brainstorm_sessions  for all using (auth.uid() = user_id);
create policy "Users can manage own responses"   on brainstorm_responses for all using (
    exists (select 1 from brainstorm_sessions where id = session_id and user_id = auth.uid())
);
create policy "Users can view own profiles"      on brainstorm_profiles  for select using (auth.uid() = user_id);





create or replace function calculate_brainstorm_scores(p_session_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
    v_scores jsonb;
    v_max numeric;
begin
    -- Aggregate raw scores
    with raw as (
        select 
            lower(key) as trait,
            sum((value)::numeric) as total
        from brainstorm_responses,
        jsonb_each(trait_weights)
        where session_id = p_session_id
        group by lower(key)
    ),
    max_val as (
        select max(total) as max_score from raw
    )
    select jsonb_object_agg(
        trait,
        round((total / nullif((select max_score from max_val),0)) * 100, 2)
    )
    into v_scores
    from raw;

    return coalesce(v_scores, '{}'::jsonb);
end;
$$;

create or replace function build_brainstorm_profile(p_session_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
    v_scores jsonb;
begin
    v_scores := calculate_brainstorm_scores(p_session_id);

    return jsonb_build_object(

        -- Interest (RIASEC)
        'interest_profile', jsonb_build_object(
            'realistic', coalesce((v_scores->>'realistic')::numeric, 0),
            'investigative', coalesce((v_scores->>'investigative')::numeric, 0),
            'artistic', coalesce((v_scores->>'artistic')::numeric, 0),
            'social', coalesce((v_scores->>'social')::numeric, 0),
            'enterprising', coalesce((v_scores->>'enterprising')::numeric, 0),
            'conventional', coalesce((v_scores->>'conventional')::numeric, 0)
        ),

        -- Aptitude
        'aptitude_profile', jsonb_build_object(
            'logical', coalesce((v_scores->>'logical')::numeric, 0),
            'quantitative', coalesce((v_scores->>'quantitative')::numeric, 0),
            'verbal', coalesce((v_scores->>'verbal')::numeric, 0)
        ),

        -- Personality
        'personality_profile', jsonb_build_object(
            'leadership', coalesce((v_scores->>'leadership')::numeric, 0),
            'creativity', coalesce((v_scores->>'creativity')::numeric, 0),
            'risk', coalesce((v_scores->>'risk')::numeric, 0),
            'discipline', coalesce((v_scores->>'discipline')::numeric, 0),
            'analytical', coalesce((v_scores->>'analytical')::numeric, 0)
        ),

        -- Top 3 traits
        'dominant_traits', (
            select jsonb_agg(trait)
            from (
                select key as trait
                from jsonb_each(v_scores)
                order by value::numeric desc
                limit 3
            ) t
        ),

        -- Confidence score (real)
        'confidence_score', (
            select round(avg(value::numeric),2)
            from jsonb_each(v_scores)
        ),

        -- Raw scores (VERY useful for debugging + AI)
        'raw_scores', v_scores
    );
end;
$$;





WITH q AS (
  INSERT INTO brainstorm_questions (category, subcategory, question_text, sort_order)
  SELECT 'interest', 'RIASEC', question_text, row_number() over ()
  FROM (VALUES
    ('You enjoy working with tools or machines'),
    ('You like solving scientific problems'),
    ('You enjoy painting, writing, or design'),
    ('You like helping people directly'),
    ('You enjoy leading projects or teams'),
    ('You prefer organizing data and systems'),
    ('You enjoy outdoor physical activities'),
    ('You like research and analysis'),
    ('You enjoy creative storytelling'),
    ('You like teaching others'),
    ('You enjoy starting new ventures'),
    ('You like working with numbers and records'),
    ('You enjoy fixing things'),
    ('You like conducting experiments'),
    ('You enjoy visual creativity'),
    ('You enjoy counseling people'),
    ('You like managing teams'),
    ('You prefer structured office work'),
    ('You enjoy hands-on technical work'),
    ('You like deep thinking problems'),
    ('You enjoy music or art'),
    ('You like community service'),
    ('You enjoy sales or persuasion'),
    ('You like accounting or documentation'),
    ('You enjoy mechanical systems'),
    ('You like data-driven research'),
    ('You enjoy designing visuals'),
    ('You like mentoring people'),
    ('You enjoy entrepreneurship'),
    ('You like organizing workflows')
  ) t(question_text)
  RETURNING id, question_text
)

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT id,
       opt_text,
       weights,
       ord
FROM q,
LATERAL (
  VALUES
    ('Strongly Agree', '{"realistic":2,"investigative":2,"artistic":2,"social":2,"enterprising":2,"conventional":2}'::jsonb,1),
    ('Agree',          '{"realistic":1,"investigative":1,"artistic":1,"social":1,"enterprising":1,"conventional":1}'::jsonb,2),
    ('Neutral',        '{}'::jsonb,3),
    ('Disagree',       '{}'::jsonb,4)
) o(opt_text, weights, ord);

WITH q AS (
  INSERT INTO brainstorm_questions (category, subcategory, question_text, sort_order)
  SELECT 'aptitude', subcategory, question_text, row_number() over ()
  FROM (VALUES

-- LOGICAL
('logical','Find next: 2, 6, 12, 20, ?'),
('logical','Odd one: Dog, Cat, Tiger, Car'),
('logical','If A=1, B=2, DOG=?'),
('logical','Mirror of LEFT is?'),
('logical','Pattern: AB, BC, CD, ?'),
('logical','Next: 5,10,20,40,?'),
('logical','Which doesn’t belong: Square, Circle, Triangle, Banana'),
('logical','Coding: CAT=24, DOG=?'),
('logical','Find missing: 3, 9, 27, ?'),
('logical','Series: 1,1,2,3,5,?'),

-- QUANT
('quantitative','20% of 150 = ?'),
('quantitative','If 10x = 100, x = ?'),
('quantitative','Profit on ₹200 at 10% = ?'),
('quantitative','Half of 480 = ?'),
('quantitative','Speed doubles, time becomes?'),
('quantitative','25% of 80 = ?'),
('quantitative','Simple interest on ₹1000 at 10% = ?'),
('quantitative','Square of 15 = ?'),
('quantitative','If price increases 10%, new price?'),
('quantitative','Ratio 2:4 equals?'),

-- VERBAL
('verbal','Synonym of Analyze'),
('verbal','Antonym of Expand'),
('verbal','Correct spelling'),
('verbal','Fill blank: He ___ going'),
('verbal','Meaning of "abstract"'),
('verbal','Choose correct sentence'),
('verbal','Synonym of Rapid'),
('verbal','Antonym of Complex'),
('verbal','Meaning of "infer"'),
('verbal','Choose correct grammar')
  ) t(subcategory, question_text)
  RETURNING id, subcategory
)

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT id,
       opt,
       weights,
       ord
FROM q,
LATERAL (
  VALUES
    ('Option A','{"logical":2,"quantitative":2,"verbal":2}'::jsonb,1),
    ('Option B','{}'::jsonb,2),
    ('Option C','{}'::jsonb,3),
    ('Option D','{}'::jsonb,4)
) o(opt, weights, ord);


create table if not exists career_mappings (
    id uuid primary key default gen_random_uuid(),
    career text not null,
    trait text not null,
    weight numeric not null, -- importance of trait for this career
    created_at timestamptz default now()
);


insert into career_mappings (career, trait, weight) values

-- SOFTWARE / TECH
('Software Development','analytical',5),
('Software Development','logical',5),
('Software Development','investigative',4),

('Cybersecurity','analytical',5),
('Cybersecurity','investigative',5),
('Cybersecurity','logical',4),

('AI Research','investigative',5),
('AI Research','analytical',5),
('AI Research','quantitative',5),

('Cloud Computing','analytical',4),
('Cloud Computing','logical',5),
('Cloud Computing','investigative',3),

-- CORE ENGINEERING
('Mechanical Engineering','realistic',5),
('Mechanical Engineering','analytical',4),

('Electrical Engineering','investigative',5),
('Electrical Engineering','analytical',5),

('Civil Engineering','realistic',5),
('Civil Engineering','conventional',3),

-- HEALTHCARE
('Nursing','social',5),
('Nursing','discipline',5),

('Pharmacy','investigative',5),
('Pharmacy','analytical',4),

('Physiotherapy','social',5),
('Physiotherapy','realistic',3),

('Psychology','social',5),
('Psychology','analytical',4),

-- CREATIVE
('Animation','artistic',5),
('Animation','creativity',5),

('Film Making','artistic',5),
('Film Making','creativity',5),
('Film Making','enterprising',3),

('Fashion Design','artistic',5),
('Fashion Design','creativity',5),

('Content Creation','creativity',5),
('Content Creation','social',4),

-- BUSINESS & MANAGEMENT
('Entrepreneurship','enterprising',5),
('Entrepreneurship','risk',5),
('Entrepreneurship','leadership',5),

('Human Resource','social',5),
('Human Resource','leadership',4),

('Operations Management','conventional',5),
('Operations Management','analytical',4),

('Supply Chain','conventional',5),
('Supply Chain','analytical',4),

-- FINANCE ADVANCED
('Investment Banking','analytical',5),
('Investment Banking','risk',4),

('Chartered Accountant','conventional',5),
('Chartered Accountant','analytical',5),

('Actuarial Science','quantitative',5),
('Actuarial Science','analytical',5),

-- LAW SPECIALIZATIONS
('Corporate Law','verbal',5),
('Corporate Law','analytical',5),

('Criminal Law','verbal',5),
('Criminal Law','social',4),

-- PUBLIC SECTOR
('Defense Services','realistic',5),
('Defense Services','discipline',5),

('Public Policy','analytical',5),
('Public Policy','social',4),

('International Relations','social',5),
('International Relations','analytical',4),

-- EDUCATION
('Teaching','social',5),
('Teaching','verbal',4),

('Academia Research','investigative',5),
('Academia Research','analytical',5),

-- TECH + BUSINESS HYBRID
('Product Management','leadership',5),
('Product Management','analytical',4),
('Product Management','enterprising',4),

('Business Analytics','analytical',5),
('Business Analytics','quantitative',5),

('Digital Marketing','creativity',5),
('Digital Marketing','enterprising',4),

-- MEDIA + COMMUNICATION
('Journalism','verbal',5),
('Journalism','social',4),

('Public Relations','social',5),
('Public Relations','enterprising',4),

-- EMERGING FIELDS
('Blockchain Development','analytical',5),
('Blockchain Development','logical',5),

('Game Development','creativity',5),
('Game Development','logical',4),

('UI/UX Design','creativity',5),
('UI/UX Design','analytical',4),

('Sustainability & Environment','investigative',5),
('Sustainability & Environment','social',4);


create or replace function get_career_recommendations(p_session_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
    v_scores jsonb;
    v_result jsonb;
begin
    -- Step 1: Get user trait scores
    v_scores := calculate_brainstorm_scores(p_session_id);

    -- Step 2: Convert JSON → table
    with trait_scores as (
        select 
            key as trait, 
            value::numeric as score
        from jsonb_each(v_scores)
    ),

    -- Step 3: Match with career mappings
    career_scores as (
        select 
            cm.career,
            sum(ts.score * cm.weight) as total_score
        from career_mappings cm
        join trait_scores ts 
            on lower(cm.trait) = lower(ts.trait)
        group by cm.career
    ),

    -- Step 4: Rank careers
    ranked as (
        select 
            career,
            total_score,
            rank() over (order by total_score desc) as rnk
        from career_scores
    )

    -- Step 5: Return top 5
    select jsonb_agg(
        jsonb_build_object(
            'career', career,
            'score', round(total_score, 2)
        )
    )
    into v_result
    from ranked
    where rnk <= 5;

    return coalesce(v_result, '[]'::jsonb);
end;
$$;



create table if not exists career_courses (
    id uuid primary key default gen_random_uuid(),
    career text not null,
    course text not null,
    priority int default 1
);


insert into career_courses (career, course, priority) values

-- TECH
('Software Development','B.Tech Computer Science',1),
('Software Development','BCA',2),

('AI Research','B.Tech AI/ML',1),
('AI Research','B.Sc Data Science',2),

('Cybersecurity','B.Tech Cybersecurity',1),

-- ENGINEERING
('Mechanical Engineering','B.Tech Mechanical',1),
('Electrical Engineering','B.Tech Electrical',1),
('Civil Engineering','B.Tech Civil',1),

-- HEALTH
('Nursing','B.Sc Nursing',1),
('Pharmacy','B.Pharm',1),
('Psychology','BA Psychology',1),

-- BUSINESS
('Entrepreneurship','BBA Entrepreneurship',1),
('Business Analytics','BBA Analytics',1),

-- FINANCE
('Chartered Accountant','CA',1),
('Investment Banking','BBA Finance',1),

-- LAW
('Corporate Law','LLB',1),

-- CREATIVE
('UI/UX Design','B.Des UX',1),
('Animation','B.Sc Animation',1),
('Film Making','BA Film Studies',1),

-- PUBLIC
('Civil Services','BA Political Science',1),

-- MEDIA
('Journalism','BJMC',1),
('Digital Marketing','BBA Marketing',1);


create or replace function get_full_recommendation(p_session_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
    v_careers jsonb;
begin
    -- Step 1: Get careers
    v_careers := get_career_recommendations(p_session_id);

    -- Step 2: Attach courses
    return (
        select jsonb_agg(
            jsonb_build_object(
                'career', c->>'career',
                'score', c->>'score',
                'courses', (
                    select jsonb_agg(course)
                    from career_courses
                    where career = c->>'career'
                )
            )
        )
        from jsonb_array_elements(v_careers) c
    );
end;
$$;


create or replace function get_full_recommendation(p_session_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
    v_careers jsonb;
begin
    -- Step 1: Get careers
    v_careers := get_career_recommendations(p_session_id);

    -- Step 2: Attach courses
    return (
        select jsonb_agg(
            jsonb_build_object(
                'career', c->>'career',
                'score', c->>'score',
                'courses', (
                    select jsonb_agg(course)
                    from career_courses
                    where career = c->>'career'
                )
            )
        )
        from jsonb_array_elements(v_careers) c
    );
end;
$$;



-- ============================================================
-- FINALIZE SESSION ORCHESTRATOR
-- Marks session complete, returns profile + recommendations
-- as a single object ready for the LLM API call.
--
-- Hardening:
--   1. Fails early if session_id is invalid
--   2. Idempotent — returns cached result if already completed
--   3. Persists recommendations so results page can reload without LLM
-- ============================================================

-- Add recommendations column if not already present
alter table brainstorm_profiles
    add column if not exists recommendations jsonb;

create or replace function finalize_brainstorm_session(p_session_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
    v_profile         jsonb;
    v_recommendations jsonb;
    v_user_id         uuid;
    v_status          text;
begin
    -- ── 0. Load session — fail early if not found ─────────────────────────────
    select user_id, status
    into   v_user_id, v_status
    from   brainstorm_sessions
    where  id = p_session_id;

    if not found then
        raise exception 'finalize_brainstorm_session: session_id % does not exist', p_session_id;
    end if;

    -- ── 1. Idempotency guard — already finalized? return cached result ─────────
    if v_status = 'completed' then
        select profile_json, recommendations
        into   v_profile, v_recommendations
        from   brainstorm_profiles
        where  session_id = p_session_id;

        return jsonb_build_object(
            'profile',         v_profile,
            'recommendations', v_recommendations,
            'cached',          true
        );
    end if;

    -- ── 2. Build structured profile (scoring + normalization) ──────────────────
    v_profile := build_brainstorm_profile(p_session_id);

    -- ── 3. Build career recommendations + courses ──────────────────────────────
    v_recommendations := get_full_recommendation(p_session_id);

    -- ── 4. Mark session completed ──────────────────────────────────────────────
    update brainstorm_sessions
    set    status = 'completed', updated_at = now()
    where  id = p_session_id;

    -- ── 5. Upsert profile row (user_id + recommendations persisted) ────────────
    insert into brainstorm_profiles (user_id, session_id, profile_json, recommendations)
    values (v_user_id, p_session_id, v_profile, v_recommendations)
    on conflict (session_id) do update
        set profile_json    = excluded.profile_json,
            user_id         = excluded.user_id,
            recommendations = excluded.recommendations;

    -- ── 6. Return full payload ─────────────────────────────────────────────────
    return jsonb_build_object(
        'profile',         v_profile,
        'recommendations', v_recommendations,
        'cached',          false
    );
end;
$$;

-- Unique index on session_id so the ON CONFLICT upsert above works.
-- Note: ADD CONSTRAINT IF NOT EXISTS is not valid PostgreSQL syntax for constraints,
-- so we use CREATE UNIQUE INDEX IF NOT EXISTS instead (functionally identical).
create unique index if not exists brainstorm_profiles_session_id_key
    on brainstorm_profiles (session_id);

-- ── RLS for brainstorm_profiles ──────────────────────────────────────────────
-- The interpret API route runs with SUPABASE_SERVICE_ROLE_KEY which bypasses
-- RLS entirely, so the UPDATE for ai_interpretation always succeeds.
-- The policy below only controls client-side reads (users see only their own rows).
-- We intentionally do NOT add a client UPDATE policy — all writes go through
-- the secure server-side API route.
drop policy if exists "Users can update own profile interpretation" on brainstorm_profiles;
drop policy if exists "Users can view own profiles" on brainstorm_profiles;

create policy "Users can view own profiles"
    on brainstorm_profiles for select
    using (
        auth.uid() = user_id          -- logged-in user sees their own
        or user_id is null            -- allow anonymous sessions (guest users)
    );


create or replace function get_college_recommendations(p_session_id uuid)
returns jsonb
language plpgsql
security definer
as $$
declare
    v_recommendations jsonb;
begin
    -- Step 1: get career recommendations
    v_recommendations := get_full_recommendation(p_session_id);

    return (
        with rec as (
            select 
                (c->>'career') as career,
                (c->>'score')::numeric as career_score
            from jsonb_array_elements(v_recommendations) c
        ),

        matched as (
            select 
                col.id,
                col.name,
                col.location,
                col.rating,
                col.nirf_rank,
                col.avg_package,
                col.total_fee,
                col.stream,

                crs.name as course_name,
                crs.fees as course_fee,
                crs.avg_salary,

                rec.career,
                rec.career_score

            from rec
            join courses crs 
                on lower(crs.career) = lower(rec.career)
            join colleges col 
                on col.id = crs.college_id
            where col.is_active = true
        ),

        scored as (
            select *,
                
                -- ROI score (safe handling text fields)
                (
                    coalesce(avg_package,0) / nullif(course_fee,0)
                ) as roi_score,

                -- ranking score (lower rank = better)
                case 
                    when nirf_rank is not null then (100.0 / nirf_rank)
                    else 0
                end as rank_score

            from matched
        ),

        final as (
            select *,
                (
                    coalesce(career_score,0) * 0.4 +
                    coalesce(rating,0) * 10 * 0.2 +
                    coalesce(roi_score,0) * 0.2 +
                    coalesce(rank_score,0) * 0.2
                ) as final_score
            from scored
        )

        select jsonb_agg(
            jsonb_build_object(
                'college', name,
                'location', location,
                'course', course_name,
                'career', career,
                'rating', rating,
                'nirf_rank', nirf_rank,
                'avg_package', avg_package,
                'fees', course_fee,
                'score', round(final_score,2)
            )
        )
        from (
            select * from final
            order by final_score desc
            limit 10
        ) t
    );
end;
$$;