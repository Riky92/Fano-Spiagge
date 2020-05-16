import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Ombrellone } from '../model/ombrellone';
import { Router, NavigationExtras } from '@angular/router';
import { Spiaggia } from '../model/spiaggia';
import { CarrelloDialogComponent} from './carrello-dialog/carrello-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-bar',
  templateUrl: './bar.page.html',
  styleUrls: ['./bar.page.scss'],
})
export class BarPage implements OnInit {

	spiaggia: Spiaggia

	carrelloFilter = [];

	carrello = []

	minOrdineValue = 10

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private navController: NavController
	) { }

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.spiaggia = this.router.getCurrentNavigation().extras.state.spiaggia;
			}
		});
	}

	openSection(section){
		section.active = !section.active;
		// this.spiaggia.serviziBar.forEach( sectionBar => {
		// 	if(sectionBar.cod === section.cod){
		// 		sectionBar.active = true;
		// 	} else {
		// 		sectionBar.active = false;
		// 	}
		// });
	}

	comeBack(){
		this.navController.back();
	}

	isNSelectedZero(item){
		return item.nSelected === 0;
	}

	addItem(item){
		item.nSelected++;
		if( item.nSelected === 1){
			this.carrello.push(item);
		}
	}

	removeItem(item){
		item.nSelected--;
		if( item.nSelected === 0){
			this.carrello = this.carrello.filter( itemCarrello => itemCarrello.cod !== item.cod);
		}
	}


	openCarrello(){
		this.dialog.open(CarrelloDialogComponent, {
			data: this.carrello,
			width: '400px'
		})
	}

	goToOrdine(){

	}

	getTotale(){
		let total = 0;
		this.carrello.forEach( item => {
			total += item.prezzo * item.nSelected;
		});
		return total;
	}

	getMancante(){
		return (this.minOrdineValue - this.getTotale()).
		toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).toString();
	}

	getLabelCarrello(){
		if( this.getTotale() < this.minOrdineValue){
			return 'Ancora ' + this.getMancante() + ' € per poter ordinare'
		} else {
			return 'Vai al checkout'
		}
	}

	ordineDisabled(){
		return this.getTotale() < this.minOrdineValue;
	}

}
