import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrdinePage } from './ordine.page';

const routes: Routes = [
  {
    path: '',
    component: OrdinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdinePageRoutingModule {}
