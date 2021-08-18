-- Deploy bandify:bandify to pg

BEGIN;

DROP TABLE IF EXISTS "member", "region", "department", "city", "music_style", "instrument", "level", "message", "invitation", "user_has_instrument_level", "appreciate_music_style";

CREATE TABLE member (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL UNIQUE,
    birthdate DATE,
    user_password text NOT NULL,
    user_description text NOT NULL,
    profil_image text NOT NULL,
    "createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
);

CREATE TABLE region (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	region_name text NOT NULL UNIQUE,
    code int NOT NULL,
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
);

CREATE TABLE department (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	department_name text NOT NULL UNIQUE,
    code INT NOT NULL,
    region_id int references region(id),
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
);


CREATE TABLE city (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	city_name text NOT NULL UNIQUE,
	zipcode INT NOT NULL,
    department_id int references department(id),
    "createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
    
);



CREATE TABLE music_style (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	music_name text NOT NULL UNIQUE,
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
);

CREATE TABLE instrument (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	instrument_name text NOT NULL,
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
);

CREATE TABLE level (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	level_name text NOT NULL,
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
);

CREATE TABLE message (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	content text NOT NULL,
    status BOOLEAN NOT NULL,
    sender_id INT REFERENCES member(id),
    reicever_id INT REFERENCES member(id),
    "createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
     
);

CREATE TABLE invitation (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	status INT NOT NULL,
    request_user_id INT REFERENCES member(id),
    response_user_id INT REFERENCES member(id),
    "createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
 
);

CREATE TABLE user_has_instrument_level (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    instrument_id INT REFERENCES instrument(id),
    level_id INT REFERENCES level(id),
    member_id INT REFERENCES member(id),
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
);

CREATE TABLE appreciate_music_style (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    member_id INT REFERENCES member(id),
    music_style_id INT REFERENCES music_style(id),
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz
);

COMMIT;