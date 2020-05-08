import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpiaggiaPageRoutingModule } from './spiaggia-routing.module';

import { SpiaggiaPage } from './spiaggia.page';
import { SpiaggeService } from '../services/spiagge.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpiaggiaPageRoutingModule
  ],
	declarations: [SpiaggiaPage],
	providers: [SpiaggeService]
})
export class SpiaggiaPageModule {}
