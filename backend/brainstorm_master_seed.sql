-- ============================================================
-- BRAINSTORM MASTER SEED (60 QUESTIONS)
-- Covers: Interest (RIASEC), Aptitude, and Personality
-- ============================================================

-- 1. CLEAN SLATE
TRUNCATE brainstorm_responses CASCADE;
TRUNCATE brainstorm_profiles CASCADE;
TRUNCATE brainstorm_sessions CASCADE;
DELETE FROM brainstorm_options;
DELETE FROM brainstorm_questions;

-- 2. INTEREST QUESTIONS (30 Total - 5 per Trait)
WITH q_data AS (
  SELECT * FROM (VALUES
    ('interest', 'realistic', 'You enjoy working with heavy machinery or precision tools.', ARRAY['realistic']),
    ('interest', 'realistic', 'You find it satisfying to fix mechanical problems or appliances.', ARRAY['realistic']),
    ('interest', 'realistic', 'You prefer outdoor physical work over sitting in an office.', ARRAY['realistic']),
    ('interest', 'realistic', 'You enjoy assembling furniture or building structures from scratch.', ARRAY['realistic']),
    ('interest', 'realistic', 'You like understanding how engines and circuits function.', ARRAY['realistic']),
    
    ('interest', 'investigative', 'You enjoy solving complex scientific mysteries or riddles.', ARRAY['investigative']),
    ('interest', 'investigative', 'You find it interesting to conduct deep research on a specific topic.', ARRAY['investigative']),
    ('interest', 'investigative', 'You like performing experiments to see how things react.', ARRAY['investigative']),
    ('interest', 'investigative', 'You prefer analyzing data to draw logical conclusions.', ARRAY['investigative']),
    ('interest', 'investigative', 'You enjoy reading about new technological or scientific breakthroughs.', ARRAY['investigative']),
    
    ('interest', 'artistic', 'You enjoy creating original art, music, or designs.', ARRAY['artistic', 'creativity']),
    ('interest', 'artistic', 'You find it fulfilling to write stories, poems, or blog posts.', ARRAY['artistic', 'creativity']),
    ('interest', 'artistic', 'You prefer working in environments where you can express yourself freely.', ARRAY['artistic']),
    ('interest', 'artistic', 'You like to use your imagination to solve problems.', ARRAY['artistic', 'creativity']),
    ('interest', 'artistic', 'You enjoy visiting galleries, theaters, or music concerts.', ARRAY['artistic']),
    
    ('interest', 'social', 'You find joy in helping others overcome their personal challenges.', ARRAY['social']),
    ('interest', 'social', 'You enjoy teaching or mentoring someone to learn a new skill.', ARRAY['social']),
    ('interest', 'social', 'You like working in teams to achieve a common community goal.', ARRAY['social']),
    ('interest', 'social', 'You are good at listening and providing emotional support.', ARRAY['social']),
    ('interest', 'social', 'You enjoy participating in volunteer or charity work.', ARRAY['social']),
    
    ('interest', 'enterprising', 'You enjoy leading a group toward a difficult target.', ARRAY['enterprising', 'leadership']),
    ('interest', 'enterprising', 'You like the challenge of persuading someone to see your point of view.', ARRAY['enterprising']),
    ('interest', 'enterprising', 'You are interested in starting your own business or side venture.', ARRAY['enterprising', 'risk']),
    ('interest', 'enterprising', 'You enjoy managing projects and making high-level decisions.', ARRAY['enterprising', 'leadership']),
    ('interest', 'enterprising', 'You like competing in high-stakes environments.', ARRAY['enterprising', 'risk']),
    
    ('interest', 'conventional', 'You find it satisfying to organize large amounts of data or files.', ARRAY['conventional']),
    ('interest', 'conventional', 'You prefer following a clear, structured schedule every day.', ARRAY['conventional', 'discipline']),
    ('interest', 'conventional', 'You are very good at noticing small errors in documents or numbers.', ARRAY['conventional']),
    ('interest', 'conventional', 'You enjoy managing budgets and tracking expenses precisely.', ARRAY['conventional']),
    ('interest', 'conventional', 'You like environments with well-defined rules and procedures.', ARRAY['conventional'])
  ) t(cat, sub, txt, traits)
),
inserted_q AS (
  INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order)
  SELECT cat, sub, txt, traits, row_number() OVER () FROM q_data
  RETURNING id, subcategory
)
INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT id, opt_text, jsonb_build_object(subcategory, weight), ord
FROM inserted_q, LATERAL (VALUES ('Strongly Agree', 3, 1), ('Agree', 2, 2), ('Neutral', 0, 3), ('Disagree', 0, 4)) o(opt_text, weight, ord);

-- 3. APTITUDE QUESTIONS (20 Total)
DO $$
DECLARE
    q_id UUID;
BEGIN
    -- LOGICAL
    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'logical', 'Find next: 2, 6, 12, 20, ?', ARRAY['logical'], 31) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '30', '{"logical": 3}', 1), (q_id, '28', '{}', 2), (q_id, '32', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'logical', 'Odd one out: Dog, Tiger, Lion, Tree', ARRAY['logical'], 32) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, 'Tree', '{"logical": 3}', 1), (q_id, 'Dog', '{}', 2), (q_id, 'Tiger', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'logical', 'If A=1, B=2, then CAT = ?', ARRAY['logical'], 33) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '24', '{"logical": 3}', 1), (q_id, '20', '{}', 2), (q_id, '22', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'logical', 'Mirror image of "POT" is:', ARRAY['logical'], 34) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, 'TOP', '{"logical": 3}', 1), (q_id, 'PTO', '{}', 2), (q_id, 'OTP', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'logical', 'Complete: AB, BC, CD, ?', ARRAY['logical'], 35) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, 'DE', '{"logical": 3}', 1), (q_id, 'EF', '{}', 2), (q_id, 'DC', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'logical', 'Next in pattern: 5, 10, 20, 40, ?', ARRAY['logical'], 36) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '80', '{"logical": 3}', 1), (q_id, '60', '{}', 2), (q_id, '100', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'logical', 'Find missing: 3, 9, 27, ?', ARRAY['logical'], 37) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '81', '{"logical": 3}', 1), (q_id, '54', '{}', 2), (q_id, '72', '{}', 3);

    -- QUANTITATIVE
    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'quantitative', '20% of 150 = ?', ARRAY['quantitative'], 38) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '30', '{"quantitative": 3}', 1), (q_id, '25', '{}', 2), (q_id, '40', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'quantitative', 'If 10x = 100, x = ?', ARRAY['quantitative'], 39) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '10', '{"quantitative": 3}', 1), (q_id, '1', '{}', 2), (q_id, '100', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'quantitative', 'Half of 480 = ?', ARRAY['quantitative'], 40) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '240', '{"quantitative": 3}', 1), (q_id, '280', '{}', 2), (q_id, '200', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'quantitative', 'Square of 15 = ?', ARRAY['quantitative'], 41) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '225', '{"quantitative": 3}', 1), (q_id, '215', '{}', 2), (q_id, '250', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'quantitative', '2:4 equals?', ARRAY['quantitative'], 42) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '1:2', '{"quantitative": 3}', 1), (q_id, '2:1', '{}', 2), (q_id, '1:4', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'quantitative', 'If 5 people build a wall in 5 days, 1 person takes?', ARRAY['quantitative'], 43) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '25 days', '{"quantitative": 3}', 1), (q_id, '5 days', '{}', 2), (q_id, '1 day', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'quantitative', 'A dozen minus 3 equals?', ARRAY['quantitative'], 44) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, '9', '{"quantitative": 3}', 1), (q_id, '8', '{}', 2), (q_id, '10', '{}', 3);

    -- VERBAL
    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'verbal', 'Synonym of "Analyze":', ARRAY['verbal'], 45) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, 'Examine', '{"verbal": 3}', 1), (q_id, 'Ignore', '{}', 2), (q_id, 'Create', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'verbal', 'Antonym of "Expand":', ARRAY['verbal'], 46) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, 'Contract', '{"verbal": 3}', 1), (q_id, 'Grow', '{}', 2), (q_id, 'Enlarge', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'verbal', 'Correct spelling:', ARRAY['verbal'], 47) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, 'Achievement', '{"verbal": 3}', 1), (q_id, 'Achievment', '{}', 2), (q_id, 'Acheivement', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'verbal', 'Meaning of "abstract":', ARRAY['verbal'], 48) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, 'Theoretical', '{"verbal": 3}', 1), (q_id, 'Concrete', '{}', 2), (q_id, 'Simple', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'verbal', 'Synonym of "Rapid":', ARRAY['verbal'], 49) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, 'Swift', '{"verbal": 3}', 1), (q_id, 'Slow', '{}', 2), (q_id, 'Heavy', '{}', 3);

    INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order) VALUES ('aptitude', 'verbal', 'Deduce most nearly means:', ARRAY['verbal'], 50) RETURNING id INTO q_id;
    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES (q_id, 'Infer', '{"verbal": 3}', 1), (q_id, 'State', '{}', 2), (q_id, 'Ignore', '{}', 3);
END $$;

-- 4. PERSONALITY QUESTIONS (10 Total)
WITH p_data AS (
  SELECT * FROM (VALUES
    ('personality', 'leadership', 'You naturally take charge during group activities.', ARRAY['leadership']),
    ('personality', 'leadership', 'You feel comfortable making final decisions for a team.', ARRAY['leadership']),
    ('personality', 'risk', 'You prefer high-reward situations over safety.', ARRAY['risk']),
    ('personality', 'risk', 'You are willing to try things that might fail.', ARRAY['risk']),
    ('personality', 'creativity', 'You often find unique solutions to problems.', ARRAY['creativity']),
    ('personality', 'creativity', 'You enjoy abstract theories over practical facts.', ARRAY['creativity']),
    ('personality', 'discipline', 'You finish tasks well before deadlines.', ARRAY['discipline']),
    ('personality', 'discipline', 'You prefer to plan your entire week in advance.', ARRAY['discipline']),
    ('personality', 'analytical', 'You double-check every fact before believing it.', ARRAY['analytical']),
    ('personality', 'analytical', 'You look for patterns in complex situations.', ARRAY['analytical'])
  ) t(cat, sub, txt, traits)
),
inserted_p AS (
  INSERT INTO brainstorm_questions (category, subcategory, question_text, target_traits, sort_order)
  SELECT cat, sub, txt, traits, row_number() OVER () + 50 FROM p_data
  RETURNING id, subcategory
)
INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order)
SELECT id, opt_text, jsonb_build_object(subcategory, weight), ord
FROM inserted_p, LATERAL (VALUES ('Very True', 3, 1), ('Somewhat True', 2, 2), ('Neutral', 0, 3), ('Not True', 0, 4)) o(opt_text, weight, ord);
