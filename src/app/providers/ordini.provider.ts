import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prenotazione } from '../model/prenotazione';
import { OrdiniService } from '../services/ordini.service';
import { of} from 'rxjs'
import { Ordine } from '../model/ordine';

@Injectable({
  providedIn: 'root'
})
export class OrdiniProvider implements OnDestroy{

	ordini = new BehaviorSubject([]);

	ordiniList;

	subscription;

	constructor(
		private ordiniService: OrdiniService
	){
		this.loadOrdini();
	}

	loadOrdini(){
		this.subscription = this.ordiniService.getOrdini().subscribe( response => {
			const ordiniData : Ordine[] = response.map(e => {
        return {
					id: e.payload.doc.id,
					codSpiaggia: e.payload.doc.data()['codSpiaggia'],
          descSpiaggia: e.payload.doc.data()['descSpiaggia'],
          ombrellone: e.payload.doc.data()['ombrellone'],
					timestamp: e.payload.doc.data()['timestamp'],
					day: e.payload.doc.data()['day'],
					stato:  e.payload.doc.data()['stato'],
					carrello: e.payload.doc.data()['carrello'],
					totale: e.payload.doc.data()['totale'],
					user: e.payload.doc.data()['user'],
				};
			});
			this.ordini.next(ordiniData);
		});
	}

	getOrdini(): Observable<Ordine[]> {
    return this.ordini.asObservable();
	}

	addOrdine(ordine){
		this.ordiniService.addOrdine(ordine);
	}

	updateOrdine(ordine) {
		const record = {};
    record['codSpiaggia'] = ordine.codSpiaggia;
    record['descSpiaggia'] = ordine.descSpiaggia;
		record['ombrellone'] = ordine.ombrellone;
		record['timestamp'] = ordine.timestamp;
		record['day'] = ordine.day;
		record['carrello'] = ordine.carrello;
		record['stato'] =  ordine.stato;
		record['totale'] = ordine.totale;
		record['prezzo'] = ordine.prezzo;
		record['user'] = ordine.user;
    this.ordiniService.updateOrdine(ordine.id, record);
	}

	removeOrdine(id) {
    this.ordiniService.deleteOrdine(id)
	}

	ngOnDestroy(){
		this.ordini.unsubscribe();
	}
}
