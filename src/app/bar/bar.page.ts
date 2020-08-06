import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
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

	sectionActive = 'caffetteria';

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private alertCtrl: AlertController,
		private navController: NavController
	) { }

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.spiaggia = this.router.getCurrentNavigation().extras.state.spiaggia;
				this.carrello = [];
				this.cleanOrdine();
			}
		});
	}

	openSection(section){
		section.active = !section.active;
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
		const carrelloData: NavigationExtras = {
      state : {
				carrello: this.carrello,
				spiaggia: this.spiaggia
      }
    }
    this.router.navigate(['/ordine'], carrelloData);
	}

	isInCarrello(item){
		return item.nSelected > 0;
	}

	svuotaCarrello(){
		this.presentAlertConfirm();
	}

	async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Desideri svuotare il carrello ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Si',
          handler: () => {
						this.carrello = [];
						this.cleanOrdine();
          }
        }
      ]
    });

    await alert.present();
	}

	cleanOrdine(){
		this.spiaggia.serviziBar.forEach( sectionBar => {
			sectionBar.items.forEach( item => {
				item.nSelected = 0;
				item.selected = false;
			});
		});
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
