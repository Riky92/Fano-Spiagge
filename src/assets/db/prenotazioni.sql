DROP TABLE prenotazioni;

CREATE TABLE IF NOT EXISTS prenotazioni(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
		codSpiaggia TEXT,
		descSpiaggia TEXT,
		ombrellone TEXT
    dataPrenotazione TEXT,
    nlettini NUMBER,
		nsdraie NUMBER,
		prezzo NUMBER,
		user TEXT
);

INSERT INTO prenotazioni (id, codSpiaggia, descSpiaggia, ombrellone, dataPrenotazione, nlettini, nsdraie, prezzo, user) VALUES (1,'bagni-arzilla','Bagni Cafè Arzilla', '7B', '11/05/2020', 1, 1, 20, 'mencuccir');
INSERT INTO prenotazioni (id, codSpiaggia, descSpiaggia, ombrellone, dataPrenotazione, nlettini, nsdraie, prezzo, user) VALUES (2,'bagni-arzilla','Bagni Cafè Arzilla', '2B', '12/05/2020', 1, 1, 20, 'mencuccig');
INSERT INTO prenotazioni (id, codSpiaggia, descSpiaggia, ombrellone, dataPrenotazione, nlettini, nsdraie, prezzo, user) VALUES (3,'bagni-carlo','Bagni Carlo', '1A', '13/05/2020', 1, 0, 15, 'mencuccir');
INSERT INTO prenotazioni (id, codSpiaggia, descSpiaggia, ombrellone, dataPrenotazione, nlettini, nsdraie, prezzo, user) VALUES (4,'bagni-gabriele','Bagni Gabriele', '10A', '14/05/2020', 1, 1, 20, 'mencuccig');
INSERT INTO prenotazioni (id, codSpiaggia, descSpiaggia, ombrellone, dataPrenotazione, nlettini, nsdraie, prezzo, user) VALUES (5,'bagni-maurizio','Bagni Maurizio', '7C', '15/05/2020', 1, 1, 20, 'mencuccir');
INSERT INTO prenotazioni (id, codSpiaggia, descSpiaggia, ombrellone, dataPrenotazione, nlettini, nsdraie, prezzo, user) VALUES (6,'bagni-peppe','Bagni Peppe', '3B', '16/05/2020', 1, 1, 20, 'mencuccig');
INSERT INTO prenotazioni (id, codSpiaggia, descSpiaggia, ombrellone, dataPrenotazione, nlettini, nsdraie, prezzo, user) VALUES (7,'bagni-arzilla','Bagni Cafè Arzilla', '9C', '17/05/2020', 1, 1, 20, 'mencuccir');