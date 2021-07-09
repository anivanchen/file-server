CREATE DATABASE fileserver;

CREATE TABLE files(
    file_id SERIAL PRIMARY KEY,
    file_title VARCHAR(50) text,
    file_owner VARCHAR(50) text,
    file_type VARCHAR(25) text,
    file bytea unique
);

CREATE TABLE login(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);