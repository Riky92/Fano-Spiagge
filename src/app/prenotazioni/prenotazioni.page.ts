import { Component, OnInit } from '@angular/core';
import { PrenotazioniService } from '../services/prenotazioni.service';
import { Prenotazione } from '../model/prenotazione';
import { NavController } from '@ionic/angular';
import { SpiaggeService } from '../services/spiagge.service';
import { Spiaggia } from '../model/spiaggia';

@Component({
  selector: 'app-prenotazioni',
  templateUrl: './prenotazioni.page.html',
  styleUrls: ['./prenotazioni.page.scss'],
})
export class PrenotazioniPage implements OnInit {

	constructor(
		private prenotazioniService: PrenotazioniService,
		private spiaggeService: SpiaggeService,
		private navController: NavController) { }

	prenotazioni: Prenotazione[] = [];

	spiagge: Spiaggia[] = [];

	prenotazioniByDay: Prenotazione;

	calendarOneWeek = [];
	activeDay;

  ngOnInit() {
		this.initCalendar();
		this.getPrenotazioniMock();
		// this.getSpiagge();
	}

	getPrenotazioni(){
		this.prenotazioniService.getDatabaseState().subscribe( isReady => {
			if( isReady){
				this.prenotazioniService.getPrenotazioni().subscribe( responsePrenotazioni => {
					this.prenotazioni = responsePrenotazioni;
					this.initCalendar();
					console.log('prenotazioni: ', this.prenotazioni);
				});
			}
		})
	}

	getSpiagge(){
		this.spiaggeService.getSpiagge().subscribe( responseSpiagge => {
			this.spiagge = responseSpiagge;
		})
	}
	getPrenotazioniMock(){
		return this.prenotazioniService.getPrenotazioniMock().subscribe( response => {
			this.prenotazioni = response;
			console.log('prenotazioni: ', this.prenotazioni);
			this.prenotazioniByDay = this.prenotazioni.find( prenotazione => prenotazione.dataPrenotazione === this.activeDay.labelPrenotazione);
			console.log('prenotazioniByDay:',  this.prenotazioniByDay);
		});
	}

	changeDay(day){
		this.activeDay = day;
		this.prenotazioniByDay = this.prenotazioni.find( prenotazione => prenotazione.dataPrenotazione === this.activeDay.labelPrenotazione);
		console.log('prenotazioniByDay:',  this.prenotazioniByDay);
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
			console.log(typeof(date.getUTCMonth()))
		}

		this.activeDay = this.calendarOneWeek[0];
		console.log('activeDay: ', this.activeDay);
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

	navigateToSpiagge(){
		this.navController.navigateRoot('/tab1');
	}

	navigateToPrenotazioni(){
		this.navController.navigateRoot('/prenotazioni');
	}


}
