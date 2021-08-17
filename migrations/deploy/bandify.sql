-- Deploy bandify:bandify to pg

BEGIN;

CREATE TABLE member (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL UNIQUE,
    birthdate DATE,
    user_password text NOT NULL,
    user_description text NOT NULL,
    profil_image text NOT NULL,
    created_at Timestamptz,
    updated_at Timestamptz
);

CREATE TABLE department (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	department_name text NOT NULL UNIQUE,
    code INT NOT NULL
);

CREATE TABLE region (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	region_name text NOT NULL UNIQUE,
    code int NOT NULL,
    department_id int references department(id)
);


CREATE TABLE city (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	city_name text NOT NULL UNIQUE,
	zipcode INT NOT NULL,
    created_at timestamptz,
    updated_at Timestamptz,
    region_id int references region(id)
);



CREATE TABLE music_style (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	music_name text NOT NULL UNIQUE,
	created_at timestamptz,
    updated_at timestamptz
);

CREATE TABLE instrument (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	instrument_name text NOT NULL,
	created_at timestamptz,
	updated_at timestamptz
);

CREATE TABLE level (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	level_name text NOT NULL,
	created_at timestamptz,
	updated_at timestamptz
);

CREATE TABLE message (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	content text NOT NULL,
    statut BOOLEAN NOT NULL,
    created_at timestamptz,
	updated_at timestamptz,
    sender_id INT REFERENCES member(id),
    reicever_id INT REFERENCES member(id)  
);

CREATE TABLE invitation (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	statut INT NOT NULL,
    created_at Timestamptz,
	updated_at Timestamptz,
    request_user_id INT REFERENCES member(id),
    response_user_id INT REFERENCES member(id)
);

CREATE TABLE user_has_instrument_level (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    instrument_id INT REFERENCES instrument(id),
    level_id INT REFERENCES level(id),
    member_id INT REFERENCES member(id)
);

CREATE TABLE appreciate_music_style (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id INT REFERENCES member(id),
    music_style_id INT REFERENCES music_style(id)
);

COMMIT;


COMMIT;
