INSERT INTO profession (name) VALUES
  ('node.js developer'), ('javascript developer'), ('full-stack developer'),
  ('front-end developer'), ('back-end developer'), ('physician'),
  ('pharmacist'), ('surveyor'), ('psychologist');

INSERT INTO member (username, full_name, email, pass, bio, address, phone, avatar, profession_id) VALUES
  ('ashatat', 'Ahmed Shatat', 'a.shatat@hotmail.com', '$2y$12$YHVYRLuVyRWHDQNj8tylaeRa64rl3Lr0GcAOyy3/14kATxvKQCWcG', 'A NodeJS Developer, who is driven to achieve my clients'' goals. My experience with writing clean, easy-to-understand, easy-to-maintain, and well-commented code in a timely manner translates to positive outcomes for your project. I am also highly experienced in many modern technologies, including front-end skills. If you need a NodeJS Developer who is enthusiastic to take on your project - no matter how big or small - contact me so we can discuss your needs', 'Palestine - gaza strip', '+970599946544', 'https://avatars1.githubusercontent.com/u/18149438?s=460&v=4', 1),
  ('susan', 'susan flynn', 'test@test.com', '$2y$12$YHVYRLuVyRWHDQNj8tylaeRa64rl3Lr0GcAOyy3/14kATxvKQCWcG', 'Department Chair, Applied Behavior Analysis Online Program at The Chicago School of Professional Psychology', 'Pawleys Island, South Carolina', '+00000000000', 'https://media.licdn.com/dms/image/C4E03AQHYhdkypt7-NQ/profile-displayphoto-shrink_800_800/0?e=1565222400&v=beta&t=F_cWllIFb3MNTCwQoaqOpu4bbB5KnT7ZshgzuOaycFM', 9),
  ('test', 'test user', 'test@test.com', '$2y$12$YHVYRLuVyRWHDQNj8tylaeRa64rl3Lr0GcAOyy3/14kATxvKQCWcG', null, null, null, null, null);

INSERT INTO offer (title, position, description, status, member_id) VALUES
  ('Ui Application For Website', 'Front End Developer', 'We are looking for a Front End Web Developer who is motivated to combine the art of UX design with the art of programming, and help bring to life elements and pages in terms of both how they look and how they function. The Front End developer will be embedded with the E-Commerce team and will serve as the go-to person responsible for translating mock-ups into website pages and functionality, with mobile-first, conversion optimization and user-centric designing in mind', 'active', (SELECT id FROM member LIMIT 1)),
  ('Small Shop seeks workers', 'Front End Developer', 'We are looking to hire a Marketing Manager who will be in charge of overseeing the promotion of our companys brands.  As a successful hire, you will be  responsible  for developing pricing  strategies identify identifying new customers, supporting lead', 'completed', (SELECT id FROM member LIMIT 1)),
  ('Voice artist for short video', 'Vice President of Sales', 'We are looking to hire a Marketing Manager who will be in charge of overseeing the promotion of our companys brands.  As a successful hire, you will be  responsible  for developing pricing  strategies identify identifying new customers, supporting lead', 'completed', (SELECT id FROM member LIMIT 1)),
  ('Buisness setup plan', 'Accountant', 'Prepare balance sheets, profit and loss statements and other financial reports. Responsibilities also include analyzing trends, costs, revenues,  financial commitments and obligations incurred to predict future revenues and expenses. Reports', 'finished', (SELECT id FROM member OFFSET 1 LIMIT 1)),
  ('Small Shop seeks workers', 'Database Adminstration', 'We are looking to hire a Marketing Manager who will be in charge of overseeing the promotion of our companys brands.  As a successful hire, you will be  responsible  for developing pricing  strategies identify identifying new customers, supporting lead', 'pending', (SELECT id FROM member LIMIT 1)),
  ('Small Shop seeks workers', 'Marketing Manager', 'We are looking to hire a Marketing Manager who will be in charge of overseeing the promotion of our companys brands.  As a successful hire, you will be  responsible  for developing pricing  strategies identify identifying new customers, supporting lead', 'active', (SELECT id FROM member LIMIT 1));

INSERT INTO application (offer_id, member_id, proposal) VALUES
  (1, (SELECT id FROM member LIMIT 1 OFFSET 2),'In my former Full stack role, I exercise a calculated and methodical approach to problem solving. While I am independently motivated, I appreciate collective efforts and collaborate productively within group settings. Moreover, I am competent in javascript and SQL with proficiency in ASP.'),
  (1, (SELECT id FROM member LIMIT 1 OFFSET 1),'I am passion about Front End Development. I have a lot of experience working with small teams to develop a good websites interfaces');

INSERT INTO skill (name) VALUES 
  ('react.js'),
  ('java'),
  ('javascript');

INSERT INTO review (offer_id, member_id, rate, description) VALUES 
  (1, (SELECT id FROM member LIMIT 1 OFFSET 1),4 , 'Great to work with we had intresting design and he worked had to get it the way we needed it.'),
  (2, (SELECT id FROM member LIMIT 1 OFFSET 2),4.5 , 'very good work with only minor supervision - top rate');

INSERT INTO education (title, date, university, description, member_id) VALUES
  ('Certified Computer Professional2002', '2016-12-17 07:37:16-08', 'Brunel University', 'Institute for the Certification of Computing Professionals', (SELECT id FROM member LIMIT 1 OFFSET 1)),
  ('Bachelor of Science in Computer and Information Systems', '2013-06-22 19:10:25-07', 'Imperial College London', 'An education team lead acts as a liaison between different school departments to keep things running smoothly', (SELECT id FROM member LIMIT 1 OFFSET 2));

INSERT INTO experience (title, start_date, end_date, location, description, member_id) VALUES
  ('Assistant Director', '2013-06-22 19:10:25-07', '2018-08-14 05:10:40-15', 'Brunel University','The assistant director at an educational institution oversees academic, cultural, and recreational matters at the school.', (SELECT id FROM member LIMIT 1 OFFSET 1)),
  ('Director', '2013-06-22 19:10:25-07', '2018-08-14 05:10:40-15', 'Imperial College London','An education director supervises school curriculums and teaching standards', (SELECT id FROM member LIMIT 1 OFFSET 2));

INSERT INTO offer_type (name) VALUES 
  ('full-time'),
  ('fixed-price');

INSERT INTO offer_offer_type (offer_type_id, offer_id) VALUES 
  ((SELECT id FROM offer_type LIMIT 1 OFFSET 1), (SELECT id FROM offer LIMIT 1 OFFSET 1)),
  ((SELECT id FROM offer_type LIMIT 1 OFFSET 2), (SELECT id FROM offer LIMIT 1 OFFSET 1)),
  ((SELECT id FROM offer_type LIMIT 1 OFFSET 2), (SELECT id FROM offer LIMIT 1 OFFSET 2));

INSERT INTO offer_skill (skill_id, offer_id) VALUES 
  ((SELECT id FROM skill LIMIT 1 OFFSET 1), (SELECT id FROM offer LIMIT 1 OFFSET 1)),
  ((SELECT id FROM skill LIMIT 1 OFFSET 2), (SELECT id FROM offer LIMIT 1 OFFSET 1)),
  ((SELECT id FROM skill LIMIT 1 OFFSET 2), (SELECT id FROM offer LIMIT 1 OFFSET 2)),
  ((SELECT id FROM skill LIMIT 1 OFFSET 3), (SELECT id FROM offer LIMIT 1 OFFSET 2));

INSERT INTO member_skill (skill_id, member_id) VALUES 
  ((SELECT id FROM skill LIMIT 1 OFFSET 1), (SELECT id FROM member LIMIT 1 OFFSET 1)),
  ((SELECT id FROM skill LIMIT 1 OFFSET 2), (SELECT id FROM member LIMIT 1 OFFSET 1)),
  ((SELECT id FROM skill LIMIT 1 OFFSET 2), (SELECT id FROM member LIMIT 1 OFFSET 2)),
  ((SELECT id FROM skill LIMIT 1 OFFSET 3), (SELECT id FROM member LIMIT 1 OFFSET 2));

INSERT INTO filter (member_id, skills, offer_type) VALUES 
  ((SELECT id FROM member LIMIT 1 OFFSET 1), 'react js', 'fixed-price'),
  ((SELECT id FROM member LIMIT 1 OFFSET 1), 'posgresql', 'full-time'),
  ((SELECT id FROM member LIMIT 1 OFFSET 2), 'java', 'fixed-price'),
  ((SELECT id FROM member LIMIT 1 OFFSET 2), 'python', 'part-time');

INSERT INTO saved_offer (offet_id, member_id) VALUES 
  ((SELECT id FROM offer LIMIT 1 OFFSET 1), (SELECT id FROM member LIMIT 1 OFFSET 1)),
  ((SELECT id FROM offer LIMIT 1 OFFSET 2), (SELECT id FROM member LIMIT 1 OFFSET 2));

INSERT INTO notification (title, msg, url, seen, tag, member_id) VALUES 
  (null, null, null, null, null, null);

INSERT INTO hired_member (offer_id, member_id, status) VALUES 
  ((SELECT id FROM offer LIMIT 1 OFFSET 4), (SELECT id FROM member LIMIT 1 OFFSET 1), 'pending'),
  ((SELECT id FROM offer LIMIT 1 OFFSET 1), (SELECT id FROM member LIMIT 1 OFFSET 1), 'completed'),
  ((SELECT id FROM offer LIMIT 1 OFFSET 2), (SELECT id FROM member LIMIT 1 OFFSET 2), 'completed');
