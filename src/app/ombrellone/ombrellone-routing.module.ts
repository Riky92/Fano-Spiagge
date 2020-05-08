import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OmbrellonePage } from './ombrellone.page';

const routes: Routes = [
  {
    path: '',
    component: OmbrellonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OmbrellonePageRoutingModule {}
