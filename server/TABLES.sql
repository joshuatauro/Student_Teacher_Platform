CREATE TABLE users (
  id VARCHAR PRIMARY KEY default uuid_generate_v4(),
  name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  branch VARCHAR,
  semester VARCHAR,
  hashed_password VARCHAR NOT NULL,
  site_joined TIMESTAMP NOT NULL,
  about VARCHAR ,
  year_of_passing VARCHAR,
  profile_url VARCHAR,
  priority VARCHAR NOT NULL DEFAULT 0,
  saved_posts TEXT[],
);

CREATE TABLE questions (
  id VARCHAR  PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  title VARCHAR,
  body VARCHAR,
  upvoted_by TEXT[] DEFAULT array[]::VARCHAR[],
  downvoted_by TEXT[] DEFAULT array[]::VARCHAR[],
  created_at TIMESTAMP NOT NULL,
  branch VARCHAR NOT NULL,
  sub_flair VARCHAR,
  is_pinned BOOLEAN DEFAULT 'f',
  img_url VARCHAR,
  search_helper TSVECTOR NOT NULL
);

CREATE TABLE answers (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  q_id VARCHAR REFERENCES questions(id) ON DELETE CASCADE,
  body VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  upvoted_by TEXT[] DEFAULT array[]::VARCHAR[],
  downvoted_by TEXT[] DEFAULT array[]::VARCHAR[],
  is_verified INT DEFAULT 0
);

CREATE TABLE comments (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  q_id VARCHAR REFERENCES questions(id) ON DELETE CASCADE,
  user_id VARCHAR REFERENCES users(id) ON DELETE SET NULL,
  a_id VARCHAR REFERENCES answers(id) ON DELETE CASCADE,
  body VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);