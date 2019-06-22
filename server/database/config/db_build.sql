BEGIN;

DROP TABLE IF EXISTS member, offer, application, skill, review, profession, 
                    education, experience, offer_type, offer_offer_type, 
                    offer_skill, member_skill, filter, saved_offer, 
                    notification,hired_member CASCADE;

CREATE TABLE profession (
  id SERIAL PRIMARY KEY,
  name VARCHAR UNIQUE
);

CREATE TABLE member (
  id SERIAL  PRIMARY KEY,
  username VARCHAR NOT NULL UNIQUE,
  full_name VARCHAR,
  email VARCHAR,
  pass VARCHAR,
  bio TEXT,
  address VARCHAR,
  phone VARCHAR,
  avatar TEXT,
  profession_id INTEGER REFERENCES profession(id)
);

CREATE TABLE offer (
  id SERIAL  PRIMARY KEY,
  title VARCHAR,
  position VARCHAR,
  description TEXT,
  status VARCHAR DEFAULT 'active',
  member_id INTEGER REFERENCES member(id)
);

CREATE TABLE application (
  offer_id INTEGER REFERENCES offer(id) ON DELETE CASCADE,
  member_id INTEGER REFERENCES member(id),
  proposal TEXT,
  PRIMARY KEY(offer_id, member_id)
);

CREATE TABLE skill (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE review (
  id SERIAL PRIMARY KEY,
  rate INTEGER,
  description VARCHAR,
  member_id INTEGER REFERENCES member(id),
  offer_id INTEGER REFERENCES offer(id) ON DELETE CASCADE
);



CREATE TABLE education (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  date TIMESTAMP,
  university VARCHAR,
  description VARCHAR,
  member_id INTEGER REFERENCES member(id)
);

CREATE TABLE experience (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  end_date TIMESTAMP,
  start_date TIMESTAMP,
  location VARCHAR,
  description VARCHAR,
  member_id INTEGER REFERENCES member(id)
);

CREATE TABLE offer_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE offer_offer_type (
  offer_type_id INTEGER REFERENCES offer_type(id),
  offer_id INTEGER REFERENCES offer(id) ON DELETE CASCADE
);

CREATE TABLE offer_skill (
  skill_id INTEGER REFERENCES skill(id),
  offer_id INTEGER REFERENCES offer(id) ON DELETE CASCADE
);

CREATE TABLE member_skill (
  member_id INTEGER REFERENCES member(id),
  skill_id INTEGER REFERENCES skill(id)
);

CREATE TABLE filter (
  member_id INTEGER UNIQUE REFERENCES member(id),
  skills VARCHAR[],
  offer_type VARCHAR[]
);

CREATE TABLE saved_offer (
  member_id INTEGER REFERENCES member(id),
  offer_id INTEGER REFERENCES offer(id) ON DELETE CASCADE
);

CREATE TABLE notification (
  id SERIAL PRIMARY KEY,
  title VARCHAR,
  msg VARCHAR,
  url VARCHAR,
  seen BOOLEAN,
  tag VARCHAR,
  member_id INTEGER REFERENCES member(id)
);

CREATE TABLE hired_member (
  offer_id INTEGER REFERENCES offer(id) ON DELETE CASCADE,
  member_id INTEGER REFERENCES member(id),
  status TEXT DEFAULT 'pending',
  PRIMARY KEY(offer_id, member_id) 
);

COMMIT;
