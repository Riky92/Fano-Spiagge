import {CarrelloOrdine  } from './carrello';

export interface Ordine{
	codPrenotazione: string;
	ombrellone: string;
	codSpiaggia: string;
	descSpiaggia: string;
	timestamp: Date;
	carrello: Array<CarrelloOrdine>;
	totale: number;
	user: string;
}