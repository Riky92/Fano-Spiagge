import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BarPageRoutingModule } from './bar-routing.module';
import { BarPage } from './bar.page';
import { CarrelloDialogComponent} from './carrello-dialog/carrello-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
		CommonModule,
    FormsModule,
		IonicModule,
		MatDialogModule,
		MatTableModule,
    BarPageRoutingModule
	],
	entryComponents: [CarrelloDialogComponent],
	declarations: [BarPage]
})
export class BarPageModule {}
