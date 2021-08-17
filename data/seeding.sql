BEGIN;

INSERT INTO member ("firstname", "lastname", "email", "birthdate" , "user_password", "user_description", "profil_image") VALUES
('Cyril', 'Chappellier', 'cyril-c@gmail.com','1990-01-09' , 'azerty123', 'Je recherche un groupe de metal pour faire de la guitare éléctrique', './upload/images/cyril.jpeg'),
('Jeremy', 'Marques', 'jeremy-m@gmail.com','1989-12-12' , 'azerty123', 'Guitariste confirmé, je recherche un batteur et un bassiste, pour monter un groupe de musique alternative', './upload/images/cyril-c.jpeg'),
('Arnaud', 'Ferreira', 'arnaud-m@gmail.com','1991-08-31' , 'azerty123', 'Pianiste amateur, je cherche un groupe de salsa', './upload/images/arnaud-f.jpeg'),
('Baptiste', 'Champbenoit', 'baptiste-c@gmail.com','1988-02-10' , 'azerty123', 'Dj, je cherche des samples pour composition de musique electro', './upload/images/baptiste-c.jpeg');

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

INSERT INTO region ("region_name", "code") VALUES
('Occitanie', 123),
('Nouvelle-Aquitaine', 456),
('Auverge-Rhône-Alpes', 745),
('Ile-de-France', 789);

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