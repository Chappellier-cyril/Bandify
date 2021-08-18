BEGIN;

ALTER TABLE "member"
add COLUMN "city_id" INT REFERENCES city(id);

COMMIT;