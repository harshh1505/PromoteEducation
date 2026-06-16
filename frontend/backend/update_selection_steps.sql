-- Update all colleges with the dynamic selection steps content in the 'content' JSONB column
UPDATE colleges
SET content = COALESCE(content, '{}'::jsonb) || jsonb_build_object(
  'selection_steps', jsonb_build_array(
    jsonb_build_object('step', 'EXAMINATION', 'desc', 'Qualify ' || COALESCE(entrance_exam, 'the relevant national entrance exam') || ' with a strong score/rank.'),
    jsonb_build_object('step', 'REGISTRATION', 'desc', 'Register on the official counselling portal (MCC / State authority) within the deadline.'),
    jsonb_build_object('step', 'CHOICE FILLING', 'desc', 'Select ' || COALESCE(short_name, name) || ' as your preferred institution during the choice-filling window.'),
    jsonb_build_object('step', 'SEAT ALLOTMENT', 'desc', 'Based on rank, category, and availability, seats are allotted in rounds. Accept and report to the institution.')
  )
);
