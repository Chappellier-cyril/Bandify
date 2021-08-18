BEGIN;

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