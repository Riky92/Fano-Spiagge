import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OmbrellonePageRoutingModule } from './ombrellone-routing.module';

import { OmbrellonePage } from './ombrellone.page';
import { SpiaggeService } from '../services/spiagge.service';
import { MatDialogModule} from '@angular/material/dialog';
import { PrenotazioniService } from '../services/prenotazioni.service';

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
		MatDialogModule,
		IonicModule,
    OmbrellonePageRoutingModule
  ],
	declarations: [OmbrellonePage],
	providers: [SpiaggeService, PrenotazioniService]
})
export class OmbrellonePageModule {}
