import { Component, OnInit } from '@angular/core';
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
import { PrenotazioniService } from '../services/prenotazioni.service';


@Component({
  selector: 'app-ombrellone',
  templateUrl: './ombrellone.page.html',
  styleUrls: ['./ombrellone.page.scss'],
})
export class OmbrellonePage implements OnInit {


	calendarOneWeek = [];
	activeDay;
	spiaggia: Spiaggia
	ombrelloneSelected = '';
	ombrelloni: Ombrellone[];

	prenotazioni: Prenotazione[];

	countLettini = 0;
	countSdraie = 0;

	tariffa;

	disabledMattino = false;
	disabledPomeriggio = false;

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private spiaggiaService: SpiaggeService,
		private prenotazioniService: PrenotazioniService,
		private navController: NavController,
		private dialog: MatDialog

	) { }

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.spiaggia = this.router.getCurrentNavigation().extras.state.spiaggia;
				this.spiaggiaService.getOmbrelloni().subscribe( response => {
					this.ombrelloni = response;
					this.getPrenotazioni();
					this.initCalendar();
				});
      }
    });
	}

	getPrenotazioni(){
		this.prenotazioniService.getDatabaseState().subscribe( isReady => {
			if( isReady){
				this.prenotazioniService.getPrenotazioni().subscribe( responsePrenotazioni => {
					this.prenotazioni = responsePrenotazioni;
				});
			}
		})
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
			spiaggia: this.spiaggia.title,
			ombrellone: this.ombrelloneSelected,
			dataPrenotazione: this.activeDay.labelPrenotazione,
			nlettini: this.countLettini,
			nsdraie : this.countSdraie,
			prezzo: this.getTariffaGiornaliera()
		};
		const dialogRef = this.dialog.open(PrenotazioneDialogComponent, {
			data: prenotazione,
			width: '400px'
		}).afterClosed().subscribe( response => {
			if( response){
				this.doPrenotazione(prenotazione);
			}
		});
	}

	doPrenotazione(prenotazione){
		this.navController.navigateRoot('/prenotazioni')
		this.prenotazioniService.addPrenotazione(
			prenotazione.spiaggia,prenotazione.ombrellone, prenotazione.dataPrenotazione,
			prenotazione.nlettini, prenotazione.nsdraie, prenotazione.prezzo, 'mencuccir').then(data => {
				this.navController.navigateRoot('/prenotazioni');
			});

	}

}



