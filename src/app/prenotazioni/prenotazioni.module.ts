import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrenotazioniPageRoutingModule } from './prenotazioni-routing.module';

import { PrenotazioniPage } from './prenotazioni.page';
import { PrenotazioniService } from '../services/prenotazioni.service';
import { SpiaggeService } from '../services/spiagge.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrenotazioniPageRoutingModule
  ],
	declarations: [PrenotazioniPage],
	providers: [PrenotazioniService, SpiaggeService]
})
export class PrenotazioniPageModule {}
