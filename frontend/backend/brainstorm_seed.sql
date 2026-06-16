-- SEED DATA FOR BRAINSTORMING TEST

-- INTEREST QUESTIONS (RIASEC)
-- R: Realistic, I: Investigative, A: Artistic, S: Social, E: Enterprising, C: Conventional

-- Q1: Artistic vs Investigative
DO $$
DECLARE
    v_q1_id UUID;
    v_q2_id UUID;
    v_q3_id UUID;
BEGIN
    INSERT INTO brainstorm_questions (category, subcategory, question_text, sort_order)
    VALUES ('Interest', 'RIASEC', 'When solving a complex puzzle, do you prefer following a step-by-step manual or trying your own creative approach?', 1)
    RETURNING id INTO v_q1_id;

    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES
    (v_q1_id, 'Step-by-step manual (Structured)', '{"Investigative": 10, "Conventional": 5}', 1),
    (v_q1_id, 'My own creative approach (Abstract)', '{"Artistic": 10, "Investigative": 2}', 2);

    -- Q2: Social vs Enterprising
    INSERT INTO brainstorm_questions (category, subcategory, question_text, sort_order)
    VALUES ('Interest', 'RIASEC', 'In a group project, would you rather manage the deadlines and budget, or help teammates resolve conflicts and stay motivated?', 2)
    RETURNING id INTO v_q2_id;

    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES
    (v_q2_id, 'Manage deadlines and budget (Business)', '{"Enterprising": 10, "Conventional": 5}', 1),
    (v_q2_id, 'Help teammates and motivate (Human-centric)', '{"Social": 10, "Artistic": 2}', 2);

    -- Q3: Realistic vs Investigative
    INSERT INTO brainstorm_questions (category, subcategory, question_text, sort_order)
    VALUES ('Interest', 'RIASEC', 'Do you prefer working with your hands to build physical things, or working with data to analyze abstract theories?', 3)
    RETURNING id INTO v_q3_id;

    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES
    (v_q3_id, 'Build physical things (Practical)', '{"Realistic": 10, "Conventional": 3}', 1),
    (v_q3_id, 'Analyze abstract theories (Theoretical)', '{"Investigative": 10, "Artistic": 2}', 2);

    -- APTITUDE QUESTIONS
    -- Logic/Quantitative
    INSERT INTO brainstorm_questions (category, subcategory, question_text, sort_order)
    VALUES ('Aptitude', 'Logical', 'If all A are B, and some B are C, can we conclude that some A are C?', 4)
    RETURNING id INTO v_q1_id;

    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES
    (v_q1_id, 'Yes, definitely', '{"Logical": 0}', 1), -- Wrong answer
    (v_q1_id, 'No, not necessarily', '{"Logical": 10, "Analytical": 5}', 2), -- Right answer
    (v_q1_id, 'Depends on the value of B', '{"Logical": 5}', 3);

    -- PERSONALITY QUESTIONS
    INSERT INTO brainstorm_questions (category, subcategory, question_text, sort_order)
    VALUES ('Personality', 'Risk', 'When making a financial decision, do you prioritize safety and small returns, or high-risk for high potential growth?', 5)
    RETURNING id INTO v_q1_id;

    INSERT INTO brainstorm_options (question_id, option_text, trait_weights, sort_order) VALUES
    (v_q1_id, 'Safety and consistency', '{"RiskAppetite": -5, "Stability": 10}', 1),
    (v_q1_id, 'High-risk, High-growth', '{"RiskAppetite": 10, "Entrepreneurial": 8}', 2);

END $$;
