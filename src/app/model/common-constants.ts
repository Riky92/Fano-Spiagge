
export enum MomentoGiornata{
	mattino = 'mattino',
	pomeriggio = 'pomeriggio'
}

export enum TariffeEnum{
	lettino1 = 'lettino1',
	lettino1_sdraio1 = 'lettino1_sdraio1',
	lettino2= 'lettino2',
	lettino2_sdraio1 = 'lettino2_sdraio1',
	sdraio1= 'sdraio1',
	sdraio2= 'sdraio2',
	lettino1_sdraio2='lettino1_sdraio2',
	lettino2_sdraio2='lettino2_sdraio2'
}

export enum OmbrelloneEnum{
	ombrellone= 'ombrellone',
	gazebo= 'gazebo'
}

export enum PagamentoEnum{
	visa='visa',
	paypal='paypal',
	contanti='contanti'
}

// {"cod": "1_lettino", "desc": "1 lettino", "prezzo": "15 €"},
// {"cod": "1_lettino_sdraio", "desc": "1 lettino e 1 sdraio", "prezzo": "20 €"},
// {"cod": "2_lettino", "desc": "2 lettini", "prezzo": "25 €"},
// {"cod": "2_lettino_sdraio", "desc": "2 lettini e 2 sdraie", "prezzo": "30 €"}