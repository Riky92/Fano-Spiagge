export interface Spiaggia{
	id: string,
	title: string;
	descrizione: string;
	address: Array<any>;
	distance?: number;
	tipo: string;
	ombrelloni: Array<any>;
	via: string;
	serviziOfferti: Array<any>;
	serviziBar: Array<any>;
	tariffe: Array<any>;
}
