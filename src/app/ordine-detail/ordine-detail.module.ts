import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdineDetailPageRoutingModule } from './ordine-detail-routing.module';

import { OrdineDetailPage } from './ordine-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdineDetailPageRoutingModule
  ],
  declarations: [OrdineDetailPage]
})
export class OrdineDetailPageModule {}
