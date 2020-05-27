import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { CarrelloOrdine} from '../model/carrello';
import { Ordine} from '../model/ordine';
import { Prenotazione} from '../model/prenotazione';
import { PrenotazioniProvider } from '../providers/prenotazioni.provider';
import { Spiaggia } from '../model/spiaggia';
import { OrdiniProvider } from '../providers/ordini.provider';

@Component({
  selector: 'app-ordine',
  templateUrl: './ordine.page.html',
  styleUrls: ['./ordine.page.scss'],
})
export class OrdinePage implements OnInit, OnDestroy {

	carrello

	minOrdineValue= 10;

	ordineInEdit = false;

	subscription;

	spiaggia: Spiaggia;

	prenotazioni: Prenotazione[] =  [];

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private navController: NavController,
		private alertCtrl: AlertController,
		private prenotazioniProvider: PrenotazioniProvider,
		private ordiniProvider: OrdiniProvider

	) { }

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.carrello = this.router.getCurrentNavigation().extras.state.carrello;
				this.spiaggia =  this.router.getCurrentNavigation().extras.state.spiaggia;
				this.subscription = this.prenotazioniProvider.getPrenotazioni().subscribe( responsePrenotazioni => {
					this.prenotazioni = responsePrenotazioni;
				});
			}
		});
	}


	getRowPrezzoCarrello(carrelloItem){
		return carrelloItem.prezzo * carrelloItem.nSelected;
	}

	getTotale(){
		let total = 0;
		this.carrello.forEach( item => {
			total += item.prezzo * item.nSelected;
		});
		return total;
	}


	svuotaCarrello(){
		this.presentAlertConfirm();
	}

	isNSelectedZero(carrelloItem){

		return carrelloItem.nSelected === 0;
	}
	addItem(carrelloItem){
		carrelloItem.nSelected++;
	}

	removeItem(carrelloItem){
		carrelloItem.nSelected--;
		if( carrelloItem.nSelected === 0){
			this.carrello = this.carrello.filter( itemCarrello => itemCarrello.cod !== carrelloItem.cod);
		}
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
						this.navController.back();
          }
        }
      ]
    });

    await alert.present();
	}


	comeBack(){
		this.navController.back();
	}

	getMancante(){
		return (this.minOrdineValue - this.getTotale()).
		toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).toString();
	}

	ordineDisabled(){
		return this.getTotale() < this.minOrdineValue;
	}

	isPrenotazioneGiornalieraGiàFatta(today){
		return this.prenotazioni.find( prenot => prenot.dataPrenotazione === today && prenot.user === 'mencuccir');
	}

	getSpiaggiaPrenotazione(today){
		return this.prenotazioni.find( prenot => prenot.dataPrenotazione === today && prenot.user === 'mencuccir');
	}

	async presentAlertOrdine(type) {
    const alert = await this.alertCtrl.create({
			header: 'Errore ordine',
			message: type === 1 ? 'Nessuna prenotazione attiva. Effettua una prenotazione in una spiaggia per poter effettuare l\'ordinare.':
			'Hai l\'ombrellone in un\'altra spiaggia.',
      buttons: [
         {
          text: 'Vai alle spiagge',
          handler: () => {
						this.navController.navigateRoot('/tab1');
          }
        }
      ]
    });

    await alert.present();
	}

	async presentConfirmOrdine() {
    const alert = await this.alertCtrl.create({
			header: 'Ordine effettuato',
			message: 'Grazie per aver ordinato. Invieremo il tuo ordine il prima possibile ',
      buttons: [
         {
          text: 'Ok',
          handler: () => {
						this.navController.navigateRoot('/ordini');
          }
        }
      ]
    });

    await alert.present();
	}

	ordina(){
		const carrelloOrdine: CarrelloOrdine[] = [];
		const today = new Date().toLocaleDateString();
		const prenotazione = this.getSpiaggiaPrenotazione(today);
		console.log('prenotazione: ', prenotazione);
		if( !this.isPrenotazioneGiornalieraGiàFatta(today)){
			this.presentAlertOrdine(1);
		} else if(prenotazione.codSpiaggia !== this.spiaggia.id){
			this.presentAlertOrdine(2);
		} else {
			this.carrello.forEach( item => {
				carrelloOrdine.push({
					cod: item.cod,
					desc: item.desc,
					nSelected: item.nSelected,
					prezzo: this.getRowPrezzoCarrello(item)
				});
			});
			const ordine : Ordine = {
				codPrenotazione: prenotazione.id,
				codSpiaggia: prenotazione.codSpiaggia,
				descSpiaggia: prenotazione.descSpiaggia,
				ombrellone: prenotazione.ombrellone,
				stato: {cod: 'nuovo', descrizione: 'Spedito'},
				timestamp: new Date(),
				carrello: carrelloOrdine,
				totale: this.getTotale(),
				user: 'mencuccir'
			};
			this.ordiniProvider.addOrdine(ordine);
			this.presentConfirmOrdine();
		}
	}

	ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }




}
