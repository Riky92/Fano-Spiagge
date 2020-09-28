import {CarrelloOrdine  } from './carrello';
import { Stato } from './stato-ordine';
import { User } from './user';

export interface Ordine{
	ombrellone: string;
	codSpiaggia: string;
	descSpiaggia: string;
	day: string;
	timestamp: Date;
	stato: Stato;
	carrello: Array<CarrelloOrdine>;
	totale: number;
	user: User;
}