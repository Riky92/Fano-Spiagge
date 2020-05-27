import {CarrelloOrdine  } from './carrello';
import { Stato } from './stato-ordine';

export interface Ordine{
	codPrenotazione: string;
	ombrellone: string;
	codSpiaggia: string;
	descSpiaggia: string;
	timestamp: Date;
	stato: Stato;
	carrello: Array<CarrelloOrdine>;
	totale: number;
	user: string;
}