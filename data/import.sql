BEGIN;

CREATE TABLE member (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	firstname text NOT NULL,
    lastname text NOT NULL,
    genre text NOT NULL,
    email text NOT NULL,
    age int NOT NULL,
    password text NOT NULL,
    description text NOT NULL,
    profil_image text NOT NULL,
    rating int,
    created_at Timestamptz,
    updated_at Timestamptz
);

CREATE TABLE department (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name text NOT NULL UNIQUE,
    code INT NOT NULL
);

CREATE TABLE region (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name text NOT NULL UNIQUE,
    department_id int references department(id)
);


CREATE TABLE city (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name text NOT NULL UNIQUE,
	zipcode INT NOT NULL,
    created_at timestamptz,
    updated_at Timestamptz,
    region_id int references region(id)
);



CREATE TABLE music_style (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name text NOT NULL UNIQUE,
	created_at Timestamptz NOT NULL,
    updated_at Timestamptz NOT NULL
);

CREATE TABLE instrument (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name text NOT NULL,
	created_at Timestamptz NOT NULL,
	updated_at Timestamptz NOT NULL
);

CREATE TABLE level (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	name text NOT NULL,
	created_at Timestamptz NOT NULL,
	updated_at Timestamptz NOT NULL
);

CREATE TABLE message (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	content text NOT NULL,
    statut BOOLEAN NOT NULL,
    created_at Timestamptz NOT NULL,
	updated_at Timestamptz NOT NULL,
    sender_id INT REFERENCES member(id),
    reicever_id INT REFERENCES member(id)  
);

CREATE TABLE invitation (
	id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	response BOOLEAN NOT NULL,
    pending BOOLEAN NOT NULL,
    created_at Timestamptz NOT NULL,
	updated_at Timestamptz NOT NULL,
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

