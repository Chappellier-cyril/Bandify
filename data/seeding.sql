BEGIN;

INSERT INTO region ("region_name", "code") VALUES
('Occitanie', 123),
('Nouvelle-Aquitaine', 456),
('Auverge-Rhône-Alpes', 745),
('Ile-de-France', 789);

INSERT INTO department("department_name", "code") VALUES
('Tarn' , 81),
('Ains', 01),
('Seine-saint-denis', 93),
('Nord', 59),
('Gers', 32);

INSERT INTO city ("city_name", "zipcode") VALUES
    ('Paris', 75),
    ('Marseille', 13),
    ('Narbonne', 11);

INSERT INTO instrument ("instrument_name")VALUES
('Guitare'),
('Basse'),
('Piano'),
('Basse'),
('Triangle');

INSERT INTO music_style ("music_name") VALUES
('Rock'),
('Jazz'),
('Electro'),
('Alternative'),
('Hip-Hop'),
('Metal'),
('Country'),
('Gospel'),
('Salsa'),
('Indie');

INSERT INTO level ("level_name") VALUES
('Débutant'),
('Intermédiaire'),
('Avancé');


COMMIT;