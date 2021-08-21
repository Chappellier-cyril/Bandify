-- Deploy bandify:bandify to pg

BEGIN;

DROP TABLE IF EXISTS "member", "region", "department", "city", "music_style", "instrument", "level", "message", "invitation", "user_has_instrument_level", "appreciate_music_style";

CREATE TABLE "region" (
	"id" int GENERATED ALWAYS AS IDENTITY,
	"region_name" text NOT NULL UNIQUE,
    "code" int NOT NULL UNIQUE PRIMARY KEY,
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()
);

CREATE TABLE "department" (
	"id" int GENERATED ALWAYS AS IDENTITY,
	"department_name" text NOT NULL UNIQUE,
    "code" TEXT NOT NULL PRIMARY KEY,
    "region_code" int references "region"("code"),
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()
);

CREATE TABLE "city" (
	"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"city_name" text NOT NULL,
	"zipcode" text,
    "department_code" text references "department"("code"),
    "createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()
    
);

CREATE TABLE "member" (
	"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "email" text NOT NULL UNIQUE,
    "birthdate" DATE,
    "user_password" text NOT NULL,
    "user_description" text,
    "profil_image" text,
    "city_id" INT REFERENCES city(id),
    "createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()
);

CREATE TABLE "music_style" (
	"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"music_name" text NOT NULL UNIQUE,
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()
);

CREATE TABLE "instrument" (
	"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"instrument_name" text NOT NULL,
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()
);

CREATE TABLE "level" (
	"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"level_name" text NOT NULL,
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()
);

CREATE TABLE "message" (
	"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"content" text NOT NULL,
    "status" BOOLEAN NOT NULL,
    "sender_id" INT REFERENCES "member"("id"),
    "reicever_id" INT REFERENCES "member"("id"),
    "createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()
     
);

CREATE TABLE "invitation" (
	"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	status INT NOT NULL,
    "request_user_id" INT REFERENCES "member"("id"),
    "response_user_id" INT REFERENCES "member"("id"),
    "createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()
 
);

CREATE TABLE "user_has_instrument_level" (
    "id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "member_id" INT NOT NULL REFERENCES "member"("id") ON DELETE CASCADE,
    "instrument_id" INT NOT NULL REFERENCES "instrument"("id") ON DELETE CASCADE,
    "level_id" INT REFERENCES "level"("id") ON DELETE CASCADE,
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()

);

CREATE TABLE "appreciate_music_style" (
    "member_id" INT NOT NULL REFERENCES "member"("id"),
    "music_style_id" INT NOT NULL REFERENCES "music_style"("id"),
	"createdAt" Timestamptz NOT NULL default now(),
    "updatedAt" Timestamptz NOT NULL default now()

);

COMMIT;