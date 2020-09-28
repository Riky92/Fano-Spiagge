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
				this.getOrdini();
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

	getOrdini(){
		this.ordiniProvider.getOrdini().subscribe( responseOrdini => {
			console.log('responseOrdini: ', responseOrdini);
			this.ordini = responseOrdini.filter( ordine => ordine.user.cellulare === this.user.cellulare);
			console.log('ordini: ', this.ordini);
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
