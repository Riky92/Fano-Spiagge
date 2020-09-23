import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdineComponent } from './components/ordine/ordine.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [OrdineComponent],
  imports: [
		CommonModule,
		IonicModule
	],
	exports: [
		OrdineComponent
	]
})
export class AppcommonModule { }
