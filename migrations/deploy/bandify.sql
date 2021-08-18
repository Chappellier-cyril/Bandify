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
    created_at Timestamptz default now(),
    updated_at Timestamptz
);

CREATE TABLE region (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	region_name text NOT NULL UNIQUE,
    code int NOT NULL,
	created_at Timestamptz default now(),
    updated_at Timestamptz
);

CREATE TABLE department (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	department_name text NOT NULL UNIQUE,
    code INT NOT NULL,
	created_at Timestamptz default now(),
    updated_at Timestamptz,
	region_id int references region(id)
);


CREATE TABLE city (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	city_name text NOT NULL UNIQUE,
	zipcode INT NOT NULL,
    created_at Timestamptz default now(),
    updated_at Timestamptz,
    department_id int references department(id)
);

CREATE TABLE music_style (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	music_name text NOT NULL UNIQUE,
	created_at Timestamptz default now(),
    updated_at Timestamptz
);

CREATE TABLE instrument (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	instrument_name text NOT NULL,
	created_at Timestamptz default now(),
    updated_at Timestamptz
);

CREATE TABLE level (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	level_name text NOT NULL,
	created_at Timestamptz default now(),
    updated_at Timestamptz
);

CREATE TABLE message (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	content text NOT NULL,
    status BOOLEAN NOT NULL,
    created_at Timestamptz default now(),
    updated_at Timestamptz,
    sender_id INT REFERENCES member(id),
    reicever_id INT REFERENCES member(id)  
);

CREATE TABLE invitation (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	status INT NOT NULL,
    created_at Timestamptz default now(),
    updated_at Timestamptz,
    request_user_id INT REFERENCES member(id),
    response_user_id INT REFERENCES member(id)
);

CREATE TABLE user_has_instrument_level (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    instrument_id INT REFERENCES instrument(id),
    level_id INT REFERENCES level(id),
    member_id INT REFERENCES member(id),
	created_at Timestamptz default now(),
    updated_at Timestamptz
);

CREATE TABLE appreciate_music_style (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id INT REFERENCES member(id),
    music_style_id INT REFERENCES music_style(id),
	created_at Timestamptz default now(),
    updated_at Timestamptz
);

ALTER TABLE "member"
add COLUMN "city_id" INT REFERENCES city(id);

COMMIT;