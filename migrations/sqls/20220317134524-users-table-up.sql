CREATE TABLE users (
  ID              SERIAL PRIMARY KEY,
  username        VARCHAR(250) NOT NULL,
  firstname       VARCHAR(250) NOT NULL,
  lastname        VARCHAR(250) NOT NULL,
  password_digest VARCHAR(255) NOT NULL
);