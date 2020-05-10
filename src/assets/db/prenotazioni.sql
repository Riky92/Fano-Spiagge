CREATE TABLE IF NOT EXISTS prenotazioni(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
		spiaggia TEXT,
		ombrellone TEXT
    dataPrenotazione TEXT,
    nlettini NUMBER,
		nsdraie NUMBER,
		prezzo NUMBER,
		user TEXT
);
