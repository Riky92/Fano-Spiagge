import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Carta } from '../model/carta';
import { CarteService } from '../services/carte.service';

@Injectable({
  providedIn: 'root'
})
export class CarteProvider implements OnDestroy{

	carte = new BehaviorSubject([]);

	ordiniList;

	subscription;

	constructor(
		private carteService: CarteService
	){
		this.loadCarte();
	}

	loadCarte(){
		this.subscription = this.carteService.getCarte().subscribe( response => {
			const carteData : Carta[] = response.map(e => {
        return {
					id: e.payload.doc.id,
					user: e.payload.doc.data()['user'],
					number: e.payload.doc.data()['number'],
					exp_year: e.payload.doc.data()['exp_year'],
					exp_month: e.payload.doc.data()['exp_month'],
					cvc: e.payload.doc.data()['cvc']
				};
			});
			this.carte.next(carteData);
		});
	}

	getCarte(): Observable<Carta[]> {
    return this.carte.asObservable();
	}

	getCarteByUser(user, type) {
		if( type === 'text') {
			return this.carteService.getCarteByUserName(user.email);
		} else {
			return this.carteService.getCarteByUserCellulare(user.cellulare);
		}

	}

	addCarta(carta: Carta){
		this.carteService.addCarta(carta);
	}

	updateOrdine(carta: Carta) {
		const record = {};
    record['user'] = carta.user;
		record['number'] = carta.number;
		record['exp_year'] = carta.exp_year;
		record['exp_month'] = carta.exp_month;
		record['cvc'] = carta.cvc;
    this.carteService.updateCarta(carta.id, record);
	}

	removeOrdine(id) {
    this.carteService.deleteCarta(id)
	}

	ngOnDestroy(){
		this.carte.unsubscribe();
	}


}