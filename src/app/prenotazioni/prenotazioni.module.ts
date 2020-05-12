import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrenotazioniPageRoutingModule } from './prenotazioni-routing.module';

import { PrenotazioniPage } from './prenotazioni.page';
import { PrenotazioniService } from '../services/prenotazioni.service';
import { SpiaggeService } from '../services/spiagge.service';
import { PrenotazioniProvider } from '../providers/prenotazioni.provider';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrenotazioniPageRoutingModule
  ],
	declarations: [PrenotazioniPage],
	providers: [
		PrenotazioniService,
		PrenotazioniProvider,
		SpiaggeService,
	]
})
export class PrenotazioniPageModule {}
