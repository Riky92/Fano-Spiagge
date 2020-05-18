import { Component, OnInit } from '@angular/core';
import { OrdiniProvider } from '../providers/ordini.provider';
import { Ordine } from '../model/ordine';
import { NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.page.html',
  styleUrls: ['./ordini.page.scss'],
})
export class OrdiniPage implements OnInit {

	ordini: Ordine[] = [];

  constructor(
		private ordiniProvider: OrdiniProvider,
		private router: Router,
		private navController: NavController) { }

  ngOnInit() {
		this.getOrdini();
	}

	getOrdini(){
		this.ordiniProvider.getOrdini().subscribe( responseOrdini => {
			this.ordini = responseOrdini;
		});
	}

	goToOrdineDetail(ordine){
		const ordineData: NavigationExtras = {
      state : {
				ordine
      }
    }
    this.router.navigate(['/ordine-detail'], ordineData);

	}

	navigateToSpiagge(){
		this.navController.navigateRoot('/tab1');
	}

	navigateToPrenotazioni(){
		this.navController.navigateRoot('/prenotazioni');
	}

	navigateToOrdini(){
		this.navController.navigateRoot('/ordini');
	}

}
