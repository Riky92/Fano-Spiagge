import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Ombrellone } from '../model/ombrellone';
import { Router, NavigationExtras } from '@angular/router';
import { MomentoGiornata} from '../model/common-constants';


@Component({
  selector: 'app-ombrellone',
  templateUrl: './ombrellone.page.html',
  styleUrls: ['./ombrellone.page.scss'],
})
export class OmbrellonePage implements OnInit {

	ombrellone : Ombrellone

	calendarOneWeek = [];

	activeDay;

	disabledMattino = false;
	disabledPomeriggio = false;

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private navController: NavController,
		private alertCtrl: AlertController

	) { }

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.ombrellone = this.router.getCurrentNavigation().extras.state.ombrellone;
				console.log('ombrellone: ', this.ombrellone);
				this.initCalendar();
      }
    });
	}

	comeBack(){
		this.navController.back();
	}

	initCalendar(){
		for( let i = 0; i <= 6; i++){
			const date = new Date();
			date.setDate(date.getDate() + i);
			this.calendarOneWeek.push({
				day: date.getUTCDate(),
				dayWeek: this.getItaDaySmall(date.toString().split(' ')[0]),
				labelWeek: this.getItaDaySmall(date.toString().split(' ')[0]) + ', '
										+ date.getUTCDate() +  ' ' + this.getItaMonth(date.getUTCMonth() + 1),
				labelPrenotazione:  this.getItaDayComplete(date.toString().split(' ')[0]) + ' ' +
										+ date.getUTCDate() +  ' ' + this.getItaMonth(date.getUTCMonth() + 1),
				});
			console.log(typeof(date.getUTCMonth()))
		}

		this.activeDay = this.calendarOneWeek[0];
		console.log('caledar: ', this.calendarOneWeek);
	}

	getItaDaySmall(day){
		switch(day){
			case 'Mon' : return 'lun';
			case 'Tue' : return 'mar';
			case 'Wed' : return 'mer';
			case 'Thu' : return 'gio';
			case 'Fri' : return 'ven';
			case 'Sat' : return 'sab';
			case 'Sun' : return 'dom';
		}
	}

	getItaDayComplete(day){
		switch(day){
			case 'Mon' : return 'Lunedì';
			case 'Tue' : return 'Matedì';
			case 'Wed' : return 'Mercoledì';
			case 'Thu' : return 'Giovedì';
			case 'Fri' : return 'Venerdì';
			case 'Sat' : return 'Sabato';
			case 'Sun' : return 'Domenica';
		}
	}

	getItaMonth(month){
		switch(month){
			case 1 : return 'Gennaio';
			case 2 : return 'Febbraio';
			case 3 : return 'Marzo';
			case 4 : return 'Aprile';
			case 5 : return 'Maggio';
			case 6 : return 'Giugno';
			case 7 : return 'Luglio';
			case 8 : return 'Agosto';
			case 9 : return 'Settembre';
			case 10 : return 'Ottobre';
			case 11 : return 'Novembre';
			case 12 : return 'Dicembre';
		}
	}

	prenota(momento){
		let fasciaOraria = '';
		if( momento === MomentoGiornata.mattino){
			fasciaOraria = '6-13';
		} else if(  momento === MomentoGiornata.pomeriggio){
			fasciaOraria = '13-20';
		}
		this.presentAlertPrenotazione(fasciaOraria)
	}

	async presentAlertPrenotazione(fasciaOraria) {
    const alert = await this.alertCtrl.create({
      header: 'Desideri prenotare la fascia oraria ' + fasciaOraria + ' di ' + this.activeDay.labelPrenotazione + '?',
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
          handler: () => {

          }
        }
      ]
    });

    await alert.present();
	}
}
