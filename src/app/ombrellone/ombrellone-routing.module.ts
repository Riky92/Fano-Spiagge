import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OmbrellonePage } from './ombrellone.page';
import { PrenotazioneDialogComponent} from './prenotazione-dialog/prenotazione-dialog.component';
import { MatDialog} from '@angular/material/dialog';

const routes: Routes = [
  {
    path: '',
    component: OmbrellonePage
  }
];

@NgModule({
	entryComponents: [PrenotazioneDialogComponent],
  imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [MatDialog]
})
export class OmbrellonePageRoutingModule {}
