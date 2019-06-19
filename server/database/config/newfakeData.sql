INSERT INTO profession (name) VALUES
  ('node.js developer'), ('javascript developer'), ('full-stack developer'),
  ('front-end developer'), ('back-end developer'), ('physician'),
  ('pharmacist'), ('surveyor'), ('psychologist');

INSERT INTO member (username, full_name, email, pass, bio, address, phone, avatar, profession_id) VALUES
  ('Fatmasiam', 'Fatma Siam', 'f.o.siam@gmail.com', '$2y$12$YHVYRLuVyRWHDQNj8tylaeRa64rl3Lr0GcAOyy3/14kATxvKQCWcG', 'A NodeJS Developer, who is driven to achieve my clients'' goals. My experience with writing clean, easy-to-understand, easy-to-maintain, and well-commented code in a timely manner translates to positive outcomes for your project. I am also highly experienced in many modern technologies, including front-end skills. If you need a NodeJS Developer who is enthusiastic to take on your project - no matter how big or small - contact me so we can discuss your needs', 'Palestine - gaza strip', '+9705999999', 'https://avatars3.githubusercontent.com/u/37935654?s=460&v=4', 1),
  ('Angham116', 'Angham Aabed', 'test@test.com', '$2y$12$YHVYRLuVyRWHDQNj8tylaeRa64rl3Lr0GcAOyy3/14kATxvKQCWcG', 'Department Chair, Applied Behavior Analysis Online Program at The Chicago School of Professional Psychology', 'Pawleys Island, South Carolina', '+00000000000', 'https://avatars1.githubusercontent.com/u/26022027?s=400&v=4', 9);

INSERT INTO offer (title, position, description, member_id) VALUES
  ('Ui Application For Website', 'Front End Developer', 'We are looking for a Front End Web Developer who is motivated to combine the art of UX design with the art of programming, and help bring to life elements and pages in terms of both how they look and how they function. The Front End developer will be embedded with the E-Commerce team and will serve as the go-to person responsible for translating mock-ups into website pages and functionality, with mobile-first, conversion optimization and user-centric designing in mind', (SELECT id FROM member OFFSET 0 LIMIT 1)),
  ('Small Shop seeks workers', 'Back End Developer', 'We are looking to hire a Marketing Manager who will be in charge of overseeing the promotion of our companys brands.  As a successful hire, you will be  responsible  for developing pricing  strategies identify identifying new customers, supporting lead', (SELECT id FROM member OFFSET 0 LIMIT 1)),
  ('Voice artist for short video', 'Vice President of Sales', 'We are looking to hire a Marketing Manager who will be in charge of overseeing the promotion of our companys brands.  As a successful hire, you will be  responsible  for developing pricing  strategies identify identifying new customers, supporting lead', (SELECT id FROM member OFFSET 0 LIMIT 1)),
  ('Buisness setup plan', 'Accountant', 'Prepare balance sheets, profit and loss statements and other financial reports. Responsibilities also include analyzing trends, costs, revenues,  financial commitments and obligations incurred to predict future revenues and expenses. Reports', (SELECT id FROM member OFFSET 1 LIMIT 1)),
  ('Small Shop seeks workers', 'Database Adminstration', 'We are looking to hire a Marketing Manager who will be in charge of overseeing the promotion of our companys brands.  As a successful hire, you will be  responsible  for developing pricing  strategies identify identifying new customers, supporting lead',  (SELECT id FROM member OFFSET 1 LIMIT 1));

INSERT INTO skill (name) VALUES 
  ('react.js'),
  ('java'),
  ('javascript');

INSERT INTO offer_type (name) VALUES 
  ('full-time'),
  ('fixed-price');