import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdineDetailPageRoutingModule } from './ordine-detail-routing.module';

import { OrdineDetailPage } from './ordine-detail.page';
import { AppcommonModule } from '../appcommon/appcommon.module';
// import { OrdineComponent } from '../common/ordine/ordine.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
		IonicModule,
		AppcommonModule,
    OrdineDetailPageRoutingModule
  ],
  declarations: [OrdineDetailPage]
})
export class OrdineDetailPageModule {}
