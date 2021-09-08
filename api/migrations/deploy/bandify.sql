-- Deploy bandify:bandify to pg

BEGIN;

CREATE TABLE member (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL UNIQUE,
    birthdate DATE NOT NULL,
    user_password text NOT NULL,
    user_description text,
    profil_image text,
    createdAt Timestamptz default now(),
    updatedAt Timestamptz
);

CREATE TABLE region (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	region_name text NOT NULL UNIQUE,
    code int NOT NULL,
	createdAt Timestamptz default now(),
    updatedAt Timestamptz
);

CREATE TABLE department (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	department_name text NOT NULL UNIQUE,
    code INT NOT NULL,
	createdAt Timestamptz default now(),
    updatedAt Timestamptz,
	region_id int references region(id)
);


CREATE TABLE city (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	city_name text NOT NULL UNIQUE,
	zipcode INT NOT NULL,
    createdAt Timestamptz default now(),
    updatedAt Timestamptz,
    department_id int references department(id)
);

CREATE TABLE music_style (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	music_name text NOT NULL UNIQUE,
	createdAt Timestamptz default now(),
    updatedAt Timestamptz
);

CREATE TABLE instrument (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	instrument_name text NOT NULL,
	createdAt Timestamptz default now(),
    updatedAt Timestamptz
);

CREATE TABLE level (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	level_name text NOT NULL,
	createdAt Timestamptz default now(),
    updatedAt Timestamptz
);

CREATE TABLE message (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	content text NOT NULL,
    status BOOLEAN NOT NULL,
    createdAt Timestamptz default now(),
    updatedAt Timestamptz,
    sender_id INT REFERENCES member(id),
    reicever_id INT REFERENCES member(id)  
);

CREATE TABLE invitation (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	status INT NOT NULL,
    createdAt Timestamptz default now(),
    updatedAt Timestamptz,
    from INT REFERENCES member(id),
    to INT REFERENCES member(id)
);

CREATE TABLE user_has_instrument_level (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    instrument_id INT REFERENCES instrument(id),
    level_id INT REFERENCES level(id),
    member_id INT REFERENCES member(id),
	createdAt Timestamptz default now(),
    updatedAt Timestamptz
);

CREATE TABLE appreciate_music_style (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id INT REFERENCES member(id),
    music_style_id INT REFERENCES music_style(id),
	createdAt Timestamptz default now(),
    updatedAt Timestamptz
);

ALTER TABLE "member"
add COLUMN "city_id" INT REFERENCES city(id);

COMMIT;