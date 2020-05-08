CREATE TABLE IF NOT EXISTS giorno(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataGiorno TEXT,
    nPostiLiberiMattino TEXT,
		nPostiLiberiPomeriggio TEXT
);

INSERT or IGNORE INTO giorno(id, dataGiorno, nPostiLiberiMattino, nPostiLiberiPomeriggio) VALUES (1, '', 'Yummy');
INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (2, 'Jonas Brothers', 'What A Man Gotta Do');
INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (3, 'Life Is Good', 'Future');
INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (4, 'Lauv', 'Tattoos Together');
INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (5, 'Heavy Steppers', 'Whateva');
INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (6, 'DigDat 2020', 'Ei8ht Mile');
INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (7, 'Blackbear', 'me & ur ghost');
INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (8, 'Hailee Steinfeld', 'Wrong Direction');