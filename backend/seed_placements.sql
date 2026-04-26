-- =============================================================
-- SEED: placements
-- Schema: id, college_id (FK), avg_package (LPA),
--         highest_package (LPA), recruiters (text[])
-- Run AFTER seed_colleges.sql
-- NOTE: Uses INSERT … SELECT pattern; safe to re-run if table empty.
-- =============================================================

INSERT INTO placements (college_id, avg_package, highest_package, recruiters)

SELECT id, 23.5,  100,  ARRAY['Google','Microsoft','Amazon','Goldman Sachs','McKinsey','Adobe','Qualcomm','Apple','DE Shaw','Uber'] FROM colleges WHERE slug='iit-bombay'    UNION ALL
SELECT id, 20.5,   95,  ARRAY['Google','Microsoft','Tower Research','Graviton','Intel','Adobe','American Express','BCG','Bain']    FROM colleges WHERE slug='iit-delhi'      UNION ALL
SELECT id, 18.9,   87,  ARRAY['Google','Microsoft','Samsung','Qualcomm','Flipkart','PayTM','Cognizant','TCS','DE Shaw']           FROM colleges WHERE slug='iit-madras'     UNION ALL
SELECT id, 17.6,   82,  ARRAY['Google','Apple','Oracle','Cisco','Nvidia','Morgan Stanley','Goldman Sachs','D.E. Shaw']           FROM colleges WHERE slug='iit-kanpur'     UNION ALL
SELECT id, 16.8,   2.5, ARRAY['Microsoft','Google','Tower Research','Amazon','Tata Group','Schlumberger','ITC','L&T']            FROM colleges WHERE slug='iit-kharagpur'  UNION ALL
SELECT id, 15.7,   76,  ARRAY['Google','Microsoft','Amazon','Ola','Paytm','Samsung','Siemens','Reliance']                        FROM colleges WHERE slug='iit-roorkee'    UNION ALL
SELECT id, 10.5,   52,  ARRAY['TCS','Infosys','Wipro','Amazon','Zoho','Cognizant','HCL','IBM','Accenture']                      FROM colleges WHERE slug='nit-trichy'     UNION ALL
SELECT id, 10.2,   43,  ARRAY['Microsoft','Amazon','Google','Qualcomm','TCS','Infosys','Samsung','Deloitte']                     FROM colleges WHERE slug='nit-warangal'   UNION ALL
SELECT id,  9.8,   40,  ARRAY['Infosys','TCS','Wipro','Amazon','Flipkart','ISRO','L&T']                                         FROM colleges WHERE slug='nit-surathkal'  UNION ALL
SELECT id,  9.6,   35,  ARRAY['SAIL','Tata Steel','Amazon','TCS','Infosys','Wipro','HCL']                                       FROM colleges WHERE slug='nit-rourkela'   UNION ALL
SELECT id,  9.0,   30,  ARRAY['TCS','Infosys','Wipro','Amazon','UST Global','KPIT','Bosch']                                     FROM colleges WHERE slug='nit-calicut'    UNION ALL
SELECT id, 33.0,  100,  ARRAY['McKinsey','BCG','Bain','Goldman Sachs','JP Morgan','Amazon','Google','Flipkart','Accenture Strategy'] FROM colleges WHERE slug='iim-ahmedabad' UNION ALL
SELECT id, 30.2,   95,  ARRAY['McKinsey','BCG','Bain','Goldman Sachs','Sequoia','Avendus','Amazon','Google']                    FROM colleges WHERE slug='iim-bangalore'  UNION ALL
SELECT id, 29.5,   90,  ARRAY['BCG','McKinsey','Bain','Morgan Stanley','Deutsche Bank','Amazon','Flipkart']                      FROM colleges WHERE slug='iim-calcutta'   UNION ALL
SELECT id, 27.6,   75,  ARRAY['McKinsey','Bain','BCG','Amazon','Flipkart','Axis Bank','ICICI Bank','Deloitte']                   FROM colleges WHERE slug='iim-lucknow'    UNION ALL
SELECT id, 22.8,   60,  ARRAY['Amazon','Flipkart','Deloitte','KPMG','EY','Axis Bank','HDFC Bank']                               FROM colleges WHERE slug='iim-kozhikode'  UNION ALL
SELECT id, 25.0,   70,  ARRAY['McKinsey','BCG','Amazon','Flipkart','Deloitte','KPMG','HDFC Bank','Axis Bank']                   FROM colleges WHERE slug='iim-indore'     UNION ALL
SELECT id, 16.5,  162,  ARRAY['Microsoft','Google','Oracle','Goldman Sachs','Qualcomm','Samsung','Cisco','American Express']     FROM colleges WHERE slug='bits-pilani'    UNION ALL
SELECT id, 14.2,   80,  ARRAY['Microsoft','Google','Amazon','Flipkart','Samsung','Qualcomm','Cisco']                            FROM colleges WHERE slug='bits-hyderabad' UNION ALL
SELECT id, 13.8,   75,  ARRAY['Microsoft','Amazon','Adobe','Qualcomm','Siemens','TCS','Infosys']                                FROM colleges WHERE slug='bits-goa'       UNION ALL
SELECT id, 12.0,   25,  ARRAY['AIIMS Hospitals','Max Healthcare','Fortis','Apollo Hospitals','WHO','ICMR']                      FROM colleges WHERE slug='aiims-delhi'    UNION ALL
SELECT id, 10.0,   18,  ARRAY['AIIMS Network','State Government Hospitals','Apollo','Fortis','Medica']                          FROM colleges WHERE slug='aiims-kalyani'  UNION ALL
SELECT id,  9.5,   15,  ARRAY['AIIMS Network','MP State Health Services','Apollo','Fortis','Bansal Hospital']                   FROM colleges WHERE slug='aiims-bhopal'   UNION ALL
SELECT id,  9.0,   14,  ARRAY['AIIMS Network','Rajasthan State Health Services','Fortis','Medanta']                             FROM colleges WHERE slug='aiims-jodhpur'  UNION ALL
SELECT id,  8.5,   52,  ARRAY['TCS','Wipro','Infosys','Amazon','Zoho','Samsung','Siemens','Cognizant','Capgemini']              FROM colleges WHERE slug='vit-vellore'    UNION ALL
SELECT id,  7.8,   40,  ARRAY['Infosys','TCS','Wipro','Capgemini','Accenture','L&T Infotech','Mindtree']                        FROM colleges WHERE slug='manipal-mit'    UNION ALL
SELECT id,  6.5,   44,  ARRAY['TCS','Infosys','Wipro','Amazon','CTS','HCL','IBM','Tech Mahindra']                               FROM colleges WHERE slug='srm-kattankulathur' UNION ALL
SELECT id, 11.5,   22,  ARRAY['AIIMS','Max Healthcare','Fortis','Safdarjung Hospital','WHO']                                    FROM colleges WHERE slug='mamc-delhi'     UNION ALL
SELECT id, 10.2,   18,  ARRAY['KEM Hospital','Sir JJ Hospital','Tata Memorial','Breach Candy','Apollo']                         FROM colleges WHERE slug='grant-medical-mumbai' UNION ALL
SELECT id,  9.8,   16,  ARRAY['AIIMS Network','State Health Services','Apollo','Fortis','Medanta']                              FROM colleges WHERE slug='medical-college-kolkata' UNION ALL
SELECT id, 11.0,   20,  ARRAY['SSKM Hospital','Apollo','Fortis','State Health Services','WHO','ICMR']                           FROM colleges WHERE slug='ipgmer-kolkata' UNION ALL
SELECT id, 18.0,   60,  ARRAY['AZB & Partners','Cyril Amarchand Mangaldas','Trilegal','Khaitan & Co','Shardul Amarchand','Linklaters'] FROM colleges WHERE slug='nlsiu-bangalore' UNION ALL
SELECT id, 15.5,   45,  ARRAY['AZB & Partners','Cyril Amarchand Mangaldas','JSA','Khaitan & Co','Luthra & Luthra']              FROM colleges WHERE slug='nalsar-hyderabad' UNION ALL
SELECT id, 17.2,   52,  ARRAY['AZB & Partners','Cyril Amarchand Mangaldas','JSA','Khaitan & Co','J Sagar Associates']           FROM colleges WHERE slug='nlu-delhi';
