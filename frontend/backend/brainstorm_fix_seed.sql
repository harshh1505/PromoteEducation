-- ============================================================
-- FIX SEED DATA: Trait-specific weights + Real answer options
-- Run this in Supabase SQL Editor
-- ============================================================

-- ── STEP 1: Map each interest question to its SPECIFIC trait ─────────────────
UPDATE brainstorm_questions SET subcategory = 'realistic'
WHERE category = 'interest' AND question_text ILIKE ANY(ARRAY['%tools or machines%','%outdoor physical%','%fixing things%','%hands-on technical%','%mechanical systems%']);

UPDATE brainstorm_questions SET subcategory = 'investigative'
WHERE category = 'interest' AND question_text ILIKE ANY(ARRAY['%scientific problems%','%research and analysis%','%conducting experiments%','%deep thinking%','%data-driven research%']);

UPDATE brainstorm_questions SET subcategory = 'artistic'
WHERE category = 'interest' AND question_text ILIKE ANY(ARRAY['%painting, writing%','%creative storytelling%','%visual creativity%','%music or art%','%designing visuals%']);

UPDATE brainstorm_questions SET subcategory = 'social'
WHERE category = 'interest' AND question_text ILIKE ANY(ARRAY['%helping people%','%teaching others%','%counseling people%','%community service%','%mentoring people%']);

UPDATE brainstorm_questions SET subcategory = 'enterprising'
WHERE category = 'interest' AND question_text ILIKE ANY(ARRAY['%leading projects%','%starting new ventures%','%managing teams%','%sales or persuasion%','%entrepreneurship%']);

UPDATE brainstorm_questions SET subcategory = 'conventional'
WHERE category = 'interest' AND question_text ILIKE ANY(ARRAY['%organizing data%','%numbers and records%','%structured office%','%accounting or documentation%','%organizing workflows%']);

-- ── STEP 2: Delete ALL old options for interest questions ────────────────────
DELETE FROM brainstorm_options
WHERE question_id IN (SELECT id FROM brainstorm_questions WHERE category = 'interest');

-- ── STEP 3: Re-insert interest options with TRAIT-SPECIFIC weights ──────────
-- Now "Strongly Agree" on a realistic question ONLY boosts realistic, not all 6.
INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt_text,
  CASE WHEN o.weight > 0 THEN jsonb_build_object(q.subcategory, o.weight) ELSE '{}'::jsonb END,
  o.ord
FROM brainstorm_questions q,
LATERAL (VALUES
  ('Strongly Agree', 3, 1),
  ('Agree', 2, 2),
  ('Neutral', 0, 3),
  ('Disagree', 0, 4)
) o(opt_text, weight, ord)
WHERE q.category = 'interest';


-- ── STEP 4: Delete ALL old options for aptitude questions ────────────────────
DELETE FROM brainstorm_options
WHERE question_id IN (SELECT id FROM brainstorm_questions WHERE category = 'aptitude');

-- ── STEP 5: Re-insert aptitude options with REAL answers ────────────────────

-- LOGICAL
INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('30','{"logical":3}'::jsonb,1),('28','{}',2),('32','{}',3),('25','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Find next: 2, 6, 12, 20, ?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('Car','{"logical":3}'::jsonb,1),('Tiger','{}',2),('Dog','{}',3),('Cat','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Odd one: Dog, Cat, Tiger, Car';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('26','{"logical":3}'::jsonb,1),('24','{}',2),('30','{}',3),('22','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'If A=1, B=2, DOG=?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('TFEL','{"logical":3}'::jsonb,1),('LFTE','{}',2),('FTEL','{}',3),('LEFT','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Mirror of LEFT is?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('DE','{"logical":3}'::jsonb,1),('EF','{}',2),('DC','{}',3),('CE','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Pattern: AB, BC, CD, ?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('80','{"logical":3}'::jsonb,1),('60','{}',2),('100','{}',3),('50','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Next: 5,10,20,40,?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('Banana','{"logical":3}'::jsonb,1),('Circle','{}',2),('Square','{}',3),('Triangle','{}',4)) o(opt,w,ord)
WHERE q.question_text ILIKE '%doesn''t belong%';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('26','{"logical":3}'::jsonb,1),('24','{}',2),('30','{}',3),('22','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Coding: CAT=24, DOG=?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('81','{"logical":3}'::jsonb,1),('72','{}',2),('54','{}',3),('36','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Find missing: 3, 9, 27, ?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('8','{"logical":3}'::jsonb,1),('7','{}',2),('10','{}',3),('6','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Series: 1,1,2,3,5,?';

-- QUANTITATIVE
INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('30','{"quantitative":3}'::jsonb,1),('25','{}',2),('35','{}',3),('20','{}',4)) o(opt,w,ord)
WHERE q.question_text = '20% of 150 = ?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('10','{"quantitative":3}'::jsonb,1),('100','{}',2),('1000','{}',3),('1','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'If 10x = 100, x = ?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('₹20','{"quantitative":3}'::jsonb,1),('₹10','{}',2),('₹30','{}',3),('₹25','{}',4)) o(opt,w,ord)
WHERE q.question_text ILIKE '%Profit on%200%';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('240','{"quantitative":3}'::jsonb,1),('280','{}',2),('200','{}',3),('250','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Half of 480 = ?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('Half','{"quantitative":3}'::jsonb,1),('Double','{}',2),('Same','{}',3),('Triple','{}',4)) o(opt,w,ord)
WHERE q.question_text ILIKE '%Speed doubles%';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('20','{"quantitative":3}'::jsonb,1),('25','{}',2),('15','{}',3),('30','{}',4)) o(opt,w,ord)
WHERE q.question_text = '25% of 80 = ?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('₹100','{"quantitative":3}'::jsonb,1),('₹110','{}',2),('₹90','{}',3),('₹120','{}',4)) o(opt,w,ord)
WHERE q.question_text ILIKE '%Simple interest%1000%';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('225','{"quantitative":3}'::jsonb,1),('215','{}',2),('250','{}',3),('200','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Square of 15 = ?';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('₹110','{"quantitative":3}'::jsonb,1),('₹100','{}',2),('₹120','{}',3),('₹90','{}',4)) o(opt,w,ord)
WHERE q.question_text ILIKE '%price increases 10%';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('1:2','{"quantitative":3}'::jsonb,1),('2:1','{}',2),('4:2','{}',3),('1:4','{}',4)) o(opt,w,ord)
WHERE q.question_text ILIKE '%Ratio 2:4%';

-- VERBAL
INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('Examine','{"verbal":3}'::jsonb,1),('Ignore','{}',2),('Create','{}',3),('Destroy','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Synonym of Analyze';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('Contract','{"verbal":3}'::jsonb,1),('Enlarge','{}',2),('Grow','{}',3),('Increase','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Antonym of Expand';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('Accommodate','{"verbal":3}'::jsonb,1),('Accomodate','{}',2),('Acomodate','{}',3),('Acommodate','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Correct spelling';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('was','{"verbal":3}'::jsonb,1),('were','{}',2),('am','{}',3),('be','{}',4)) o(opt,w,ord)
WHERE q.question_text ILIKE '%He ___ going%';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('Theoretical','{"verbal":3}'::jsonb,1),('Concrete','{}',2),('Simple','{}',3),('Physical','{}',4)) o(opt,w,ord)
WHERE q.question_text ILIKE '%Meaning of%abstract%';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('I have gone','{"verbal":3}'::jsonb,1),('I has gone','{}',2),('I am go','{}',3),('I goes','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Choose correct sentence';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('Swift','{"verbal":3}'::jsonb,1),('Slow','{}',2),('Heavy','{}',3),('Calm','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Synonym of Rapid';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('Simple','{"verbal":3}'::jsonb,1),('Difficult','{}',2),('Hard','{}',3),('Complicated','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Antonym of Complex';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('Deduce','{"verbal":3}'::jsonb,1),('State','{}',2),('Ignore','{}',3),('Deny','{}',4)) o(opt,w,ord)
WHERE q.question_text ILIKE '%Meaning of%infer%';

INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT q.id, o.opt, o.w, o.ord FROM brainstorm_questions q,
LATERAL (VALUES ('She doesn''t like','{"verbal":3}'::jsonb,1),('She don''t like','{}',2),('She not like','{}',3),('She didn''t likes','{}',4)) o(opt,w,ord)
WHERE q.question_text = 'Choose correct grammar';

-- ── STEP 6: Clear old sessions/responses so next test uses fresh data ────────
DELETE FROM brainstorm_responses;
DELETE FROM brainstorm_profiles;
DELETE FROM brainstorm_sessions;

-- ── VERIFY ──────────────────────────────────────────────────────────────────
-- Check interest options are now trait-specific
SELECT q.question_text, q.subcategory, o.option_text, o.trait_weights
FROM brainstorm_questions q
JOIN brainstorm_options o ON o.question_id = q.id
WHERE q.category = 'interest'
ORDER BY q.sort_order, o.sort_order
LIMIT 12;

-- Check aptitude options have real text
SELECT q.question_text, o.option_text, o.trait_weights
FROM brainstorm_questions q
JOIN brainstorm_options o ON o.question_id = q.id
WHERE q.category = 'aptitude'
ORDER BY q.sort_order, o.sort_order
LIMIT 12;
