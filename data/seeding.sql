BEGIN;

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

INSERT INTO member ("firstname", "lastname", "email", "birthdate" , "user_password", "user_description", "profil_image", "city_code") VALUES
('Cyril', 'Chappellier', 'cyril-c@gmail.com','1990-01-09' , 'azerty123', 'Je recherche un groupe de metal pour faire de la guitare éléctrique', './upload/images/cyril.jpeg', '72093'),
('Jeremy', 'Marques', 'jeremy-m@gmail.com','1989-12-12' , 'azerty123', 'Guitariste confirmé, je recherche un batteur et un bassiste, pour monter un groupe de musique alternative', './upload/images/cyril-c.jpeg', '72093'),
('Arnaud', 'Ferreira', 'arnaud-m@gmail.com','1991-08-31' , 'azerty123', 'Pianiste amateur, je cherche un groupe de salsa', './upload/images/arnaud-f.jpeg', '72093'),
('Baptiste', 'Champbenoit', 'baptiste-c@gmail.com','1988-02-10' , 'azerty123', 'Dj, je cherche des samples pour composition de musique electro', './upload/images/baptiste-c.jpeg', '72093');

INSERT INTO message ("content", "status", "sender_id", "reicever_id") VALUES
('Hello', false, 1, 2),
('Good', true, 2, 3),
('Comment ça va la famille', false, 3, 2),
('Yo yo yo', true, 3, 1),
('Whatsup', false, 4, 2),
('Sampler un son', true, 3, 2);

INSERT INTO invitation ("status", "request_user_id", "response_user_id") VALUES
(2, 3, 2),
(1, 1, 2),
(0, 4, 1);

INSERT INTO user_has_instrument_level ("instrument_id", "level_id", "member_id") VALUES
(1, 3, 2),
(3, 1, 3),
(1, 1, 2);

INSERT INTO appreciate_music_style ("member_id", "music_style_id") VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

COMMIT;