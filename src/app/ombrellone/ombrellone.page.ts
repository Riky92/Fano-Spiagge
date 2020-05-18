import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController, ModalController } from '@ionic/angular';
import { Ombrellone } from '../model/ombrellone';
import { Router, NavigationExtras } from '@angular/router';
import { TariffeEnum} from '../model/common-constants';
import { SpiaggeService} from '../services/spiagge.service';
import { Tariffa } from '../model/tariffa';
import { Spiaggia } from '../model/spiaggia';
import { MatDialog} from '@angular/material/dialog';
import { PrenotazioneDialogComponent} from './prenotazione-dialog/prenotazione-dialog.component';
import { Prenotazione } from '../model/prenotazione';
import { PrenotazioniService } from '../services/prenotazioni2.service';
import { PrenotazioniProvider } from '../providers/prenotazioni.provider';


@Component({
  selector: 'app-ombrellone',
  templateUrl: './ombrellone.page.html',
  styleUrls: ['./ombrellone.page.scss'],
})
export class OmbrellonePage implements OnInit, OnDestroy {


	calendarOneWeek = [];
	activeDay;
	spiaggia: Spiaggia
	ombrelloneSelected = '';
	ombrelloni: Ombrellone[];

	prenotazioni: Prenotazione[];

	countLettini = 0;
	countSdraie = 0;

	occupatoDaMe = '';

	tariffa;

	subscription;

	user

	legenda = [
		{desc: 'Libero', cssClass: 'libero', color: 'green'},
		{desc: 'Occupato', cssClass: 'occupato', color: 'red'},
		{desc: 'Occupato da me', cssClass: 'occupatoDaMe', color: 'orange'},
		{desc: 'Selezionato', cssClass: 'selected', color: 'yellow'}
	];

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private alertCtrl: AlertController,
		private spiaggiaService: SpiaggeService,
		private prenotazioniService: PrenotazioniService,
		private prenotazioniProvider: PrenotazioniProvider,
		private navController: NavController,
		private dialog: MatDialog

	) { }

  ngOnInit() {

		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.spiaggia = this.router.getCurrentNavigation().extras.state.spiaggia;
				this.initCalendar();
				this.spiaggiaService.getOmbrelloni().subscribe( response => {
					this.ombrelloni = response;
					this.subscription = this.prenotazioniProvider.getPrenotazioni().subscribe( responsePrenotazioni => {
						this.prenotazioni = responsePrenotazioni;
						this.disegnaOmbrelloniOccupati(this.getOmbrelloniOccupatiGiornalieri());
					});
				});
      }
    });
	}

	isPrenotazioneGiornalieraGiàFatta(){
		const prenotazione = this.prenotazioni.find( prenot => prenot.dataPrenotazione === this.activeDay.labelPrenotazione && prenot.user === 'mencuccir');
		if( prenotazione){
			return prenotazione.descSpiaggia;
		} else {
			return '';
		}

	}

	comeBack(){
		this.navController.back();
	}

	changeDay(day){
		this.activeDay = day;
		this.ombrelloneSelected = '';
		this.disegnaOmbrelloniOccupati(this.getOmbrelloniOccupatiGiornalieri())
	}

	getOmbrelloniOccupatiGiornalieri(){
		const prenotazioni = this.prenotazioni.filter( prenotazione => prenotazione.codSpiaggia === this.spiaggia.id &&
												prenotazione.dataPrenotazione === this.activeDay.labelPrenotazione);
		return prenotazioni.map(prenot => {
			return {
				codice: prenot.ombrellone,
				user: prenot.user
			};
		});
	}

	disegnaOmbrelloniOccupati(ombrelloniOccupati){
		this.ombrelloni.forEach( ombrellone => {
			ombrellone.libero = true;
			ombrelloniOccupati.forEach(ombrell => {
				if( ombrellone.codice === ombrell.codice){
					ombrellone.libero = false;
					if(ombrell.user === 'mencuccir'){
						this.occupatoDaMe = ombrell.codice;
					}
				}
			});
		});
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
				labelPrenotazione: date.toLocaleDateString(),

				});
		}

		this.activeDay = this.calendarOneWeek[0];
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

	changeOmbrellone(ombrellone){
		this.ombrelloneSelected = ombrellone.codice;
	}

	disabledMinusLettini(){
		return this.countLettini === 0;
	}

	disabledPlusLettini(){
		return this.countLettini === 2;
	}

	addLettini(){
		this.countLettini ++;
	}

	removeLettini(){
		this.countLettini --;
	}

	disabledMinusSdraie(){
		return this.countSdraie === 0;
	}

	disabledPlusSdraie(){
		return this.countSdraie === 2;
	}

	addSdraie(){
		this.countSdraie ++;
	}

	removeSdraie(){
		this.countSdraie --;
	}

	showTariffa(){
		return this.countLettini > 0 || this.countSdraie > 0;
	}

	getTariffaGiornaliera(){
		let tariffaObj: Tariffa;
		if(this.countLettini === 1 && this.countSdraie === 0 ){
			tariffaObj = this.spiaggia.tariffe.find( tariffa => tariffa.cod === TariffeEnum.lettino1);
		} else if(this.countLettini === 0 && this.countSdraie === 1 ){
			tariffaObj = this.spiaggia.tariffe.find( tariffa => tariffa.cod === TariffeEnum.sdraio1);
		} else if(this.countLettini === 1 && this.countSdraie === 1 ){
			tariffaObj = this.spiaggia.tariffe.find( tariffa => tariffa.cod === TariffeEnum.lettino1_sdraio1);
		} else if(this.countLettini === 2 && this.countSdraie === 0 ){
			tariffaObj = this.spiaggia.tariffe.find( tariffa => tariffa.cod === TariffeEnum.lettino2);
		} else if(this.countLettini === 2 && this.countSdraie === 1 ){
			tariffaObj = this.spiaggia.tariffe.find( tariffa => tariffa.cod === TariffeEnum.lettino2_sdraio1);
		} else if(this.countLettini === 1 && this.countSdraie === 2 ){
			tariffaObj = this.spiaggia.tariffe.find( tariffa => tariffa.cod === TariffeEnum.lettino1_sdraio2);
		} else if(this.countLettini === 0 && this.countSdraie === 2 ){
			tariffaObj = this.spiaggia.tariffe.find( tariffa => tariffa.cod === TariffeEnum.sdraio2);
		} else if(this.countLettini === 2 && this.countSdraie === 2 ){
			tariffaObj = this.spiaggia.tariffe.find( tariffa => tariffa.cod === TariffeEnum.lettino2_sdraio2);
		}
		return tariffaObj.prezzo;
	}

	enableButton(){
		return this.showTariffa() && this.activeDay && this.ombrelloneSelected;
	}

	openRiepilogo(){
		const prenotazione = {
			codSpiaggia: this.spiaggia.id,
			descSpiaggia: this.spiaggia.title,
			ombrellone: this.ombrelloneSelected,
			dataPrenotazione: this.activeDay.labelPrenotazione,
			nlettini: this.countLettini,
			nsdraie : this.countSdraie,
			prezzo: this.getTariffaGiornaliera(),
			user: 'mencuccir'
		};
		const dialogRef = this.dialog.open(PrenotazioneDialogComponent, {
			data: prenotazione,
			width: '400px'
		}).afterClosed().subscribe( response => {
			if( response){
				console.log('exist: ', this.isPrenotazioneGiornalieraGiàFatta());
				if( this.isPrenotazioneGiornalieraGiàFatta()){
					const descSpiaggia = this.isPrenotazioneGiornalieraGiàFatta();
					this.presentAlertOmbrellone(1, descSpiaggia);
				} else if(this.checkPrenotazione(this.prenotazioni, prenotazione)){
					this.presentAlertOmbrellone(2);
				} else {
					this.doPrenotazione(prenotazione);
				}
			}
		});
	}

	async presentAlertOmbrellone(type, descSpiaggia?) {
    const alert = await this.alertCtrl.create({
			header: 'Errore prenotazione',
			message: type === 1 ? 'Per questa data hai già effettuato una prenotazione presso ' + descSpiaggia:
			 'L\'ombrellone selezionato è stato appena occupato!',
      buttons: [
         {
          text: 'Riprova',
          handler: () => {
						this.ombrelloneSelected = '';
          }
        }
      ]
    });

    await alert.present();
	}

	checkPrenotazione(prenotazioniList, prenotazione){
		return prenotazioniList.find( prenot => prenot.codSpiaggia === prenotazione.codSpiaggia &&
																	prenot.ombrellone === prenotazione.ombrellone &&
																	prenot.dataPrenotazione === prenotazione.dataPrenotazione);
	}

	doPrenotazione(prenotazione){
		this.prenotazioniService.addPrenotazione(prenotazione).then(data => {
				this.navController.navigateRoot('/prenotazioni');
			});

	}

	ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}



