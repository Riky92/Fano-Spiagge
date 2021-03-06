import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdinePageRoutingModule } from './ordine-routing.module';

import { OrdinePage } from './ordine.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdinePageRoutingModule
  ],
  declarations: [OrdinePage]
})
export class OrdinePageModule {}
