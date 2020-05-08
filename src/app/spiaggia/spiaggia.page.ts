import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Spiaggia } from '../model/spiaggia';
import { Ombrellone } from '../model/ombrellone';
import { Router, NavigationExtras } from '@angular/router';
import { SpiaggeService } from '../services/spiagge.service';

@Component({
  selector: 'app-spiaggia',
  templateUrl: './spiaggia.page.html',
  styleUrls: ['./spiaggia.page.scss'],
})
export class SpiaggiaPage implements OnInit {

	spiaggia : Spiaggia;
	ombrelloni : Array<Ombrellone>;

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private spiaggiaService: SpiaggeService,
		private navController: NavController,
		private alertCtrl: AlertController

	) { }

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.spiaggia = this.router.getCurrentNavigation().extras.state.spiaggia;
				this.spiaggiaService.getOmbrelloni().subscribe( response => {
					this.ombrelloni = response;
				});
      }
    });
	}

	comeBack(){
		this.navController.back();
	}

	goToReservation(){

	}

	openDialogOmbrellone(){
		this.presentAlertOmbrellone();
	}

	async presentAlertOmbrellone() {
    const alert = await this.alertCtrl.create({
      header: 'Inserisci numero di ombrellone',
      inputs: [
        {
          name: 'fila',
					type: 'text',
					placeholder: 'Fila'
				},
				{
          name: 'lettera',
          type: 'text',
          placeholder: 'Lettera'
				},
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
						const ombrellone: Ombrellone = data;
						ombrellone.codice = data.fila + data.lettera;
						if(this.checkIfExist(ombrellone.codice)){
							this.goToOmbrellone(ombrellone)
						} else {
							this.presentAlertError()
						}
          }
        }
      ]
    });

    await alert.present();
	}

	async presentAlertError(){
		const alert = await this.alertCtrl.create({
			mode: 'ios',
      header: 'Errore',
      message: 'Ombrellone inesistenti, riprovare',
      buttons: [
				{
          text: 'Chiudi',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Riprova',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
						this.presentAlertOmbrellone();
          }
        }
      ]
		});
		await alert.present();
	}

	checkIfExist(codice){
		return this.ombrelloni.find( ombrell => ombrell.codice === codice);
	}

	goToOmbrellone(ombrellone){
		const ombrelloneData: NavigationExtras = {
      state : {
        ombrellone
      }
    }
    this.router.navigate(['/ombrellone'], ombrelloneData);

	}


	goToPrenotazioneOmbrellone(){
		this.navController.navigateRoot('/')
	}

}
