import { Component, OnInit } from '@angular/core';
import { Ordine } from '../model/ordine';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Ombrellone } from '../model/ombrellone';
import { Router, NavigationExtras } from '@angular/router';
import { OrdiniProvider } from '../providers/ordini.provider';
import { Prenotazione} from '../model/prenotazione';
import { PrenotazioniProvider } from '../providers/prenotazioni.provider';

@Component({
  selector: 'app-ordine-detail',
  templateUrl: './ordine-detail.page.html',
  styleUrls: ['./ordine-detail.page.scss'],
})
export class OrdineDetailPage implements OnInit {

	ordine: Ordine;

	prenotazioni: Prenotazione[] =  [];

	subscription;

  constructor(
		private route: ActivatedRoute,
		private navController: NavController,
		private router: Router,
		private alertCtrl: AlertController,
		private ordiniProvider: OrdiniProvider,
		private prenotazioniProvider: PrenotazioniProvider
	) { }

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.ordine = this.router.getCurrentNavigation().extras.state.ordine;
				this.subscription = this.prenotazioniProvider.getPrenotazioni().subscribe( responsePrenotazioni => {
					this.prenotazioni = responsePrenotazioni;
				});
			}
		});
	}

	comeBack(){
		this.navController.back();
	}

	getRowPrezzoCarrello(carrelloItem){
		return carrelloItem.prezzo * carrelloItem.nSelected;
	}

	getSpiaggiaPrenotazione(today){
		return this.prenotazioni.find( prenot => prenot.dataPrenotazione === today && prenot.user === 'mencuccir');
	}

	getTotale(){
		let total = 0;
		this.ordine.carrello.forEach( item => {
			total += item.prezzo * item.nSelected;
		});
		return total;
	}

	ordina(){
		const today = new Date().toLocaleDateString();
		const prenotazione = this.getSpiaggiaPrenotazione(today);
		if( !this.isPrenotazioneGiornalieraGiàFatta(today)){
			this.presentAlertOrdine(1);
		} else if(prenotazione.codSpiaggia !== this.ordine.codSpiaggia){
			this.presentAlertOrdine(2);
		} else {
			this.ordine.timestamp = new Date();
			this.ordiniProvider.addOrdine(this.ordine);
			this.presentConfirmOrdine();
		}
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

	isPrenotazioneGiornalieraGiàFatta(today){
		return this.prenotazioni.find( prenot => prenot.dataPrenotazione === today && prenot.user === 'mencuccir');
	}

}
