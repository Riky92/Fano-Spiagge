import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpiaggiaPage } from './spiaggia.page';

const routes: Routes = [
  {
    path: '',
    component: SpiaggiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpiaggiaPageRoutingModule {}
