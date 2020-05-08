import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OmbrellonePageRoutingModule } from './ombrellone-routing.module';

import { OmbrellonePage } from './ombrellone.page';
import { SpiaggeService } from '../services/spiagge.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
		IonicModule,
    OmbrellonePageRoutingModule
  ],
	declarations: [OmbrellonePage],
	providers: [SpiaggeService]
})
export class OmbrellonePageModule {}
