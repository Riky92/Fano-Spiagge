import { Component, OnInit } from '@angular/core';
import { OrdiniProvider } from '../providers/ordini.provider';
import { Ordine } from '../model/ordine';
import { AlertController, NavController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { Storage} from '@ionic/storage';

import { UsersProvider } from '../providers/users.provider';
import { User } from '../model/user';
@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.page.html',
  styleUrls: ['./ordini.page.scss'],
})
export class OrdiniPage implements OnInit {

	ordini: Ordine[] = [];

	user: User;

  constructor(
		private ordiniProvider: OrdiniProvider,
		private router: Router,
		private storage: Storage,
		private alertCtrl: AlertController,
		private navController: NavController) { }

  ngOnInit() {
		this.storage.get('user').then( result => {
			if (result != null) {
				this.user = JSON.parse(result);
				console.log('user: ', this.user);
				let type = '';
				if( this.user.cellulare != null){
					type = 'phone'
				} else if( this.user.email != null){
					type = 'text';
				}
				this.getOrdini(type);
			}
			}).catch(e => {
				this.presentAlertUserNotConnected();
				console.log('error: '+ e);
		});

	}

	async presentAlertUserNotConnected() {
    const alert = await this.alertCtrl.create({
			header: 'Attenzione',
			message: 'Utente non loggato. Loggati o crea un account per poter completare l\'ordine',
      buttons: [
        {
          text: 'Non ora',
          cssClass: 'secondary',
          handler: () => {
						this.navController.back();
          }
        }, {
          text: 'Ok',
          handler: () => {
						this.navController.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
	}

	getOrdini(type){
		this.ordiniProvider.getOrdiniByUser(this.user, type).subscribe( responseOrdini => {
			console.log('responseOrdini: ', responseOrdini);
			// this.ordini = responseOrdini.filter( ordine => ordine.user.cellulare === this.user.cellulare);
			// console.log('ordini: ', this.ordini);
			this.ordini = this.getOrdiniData(responseOrdini);
		});
	}

	getOrdiniData(ordiniData): Ordine[]{
		return ordiniData.map(e => {
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
