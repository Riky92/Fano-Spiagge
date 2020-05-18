import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
	},
	{
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
	},
	{
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'spiaggia',
    loadChildren: () => import('./spiaggia/spiaggia.module').then( m => m.SpiaggiaPageModule)
  },
  {
    path: 'ombrellone',
    loadChildren: () => import('./ombrellone/ombrellone.module').then( m => m.OmbrellonePageModule)
  },
  {
    path: 'prenotazioni',
    loadChildren: () => import('./prenotazioni/prenotazioni.module').then( m => m.PrenotazioniPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'bar',
    loadChildren: () => import('./bar/bar.module').then( m => m.BarPageModule)
  },
  {
    path: 'ordine',
    loadChildren: () => import('./ordine/ordine.module').then( m => m.OrdinePageModule)
  },
  {
    path: 'ordini',
    loadChildren: () => import('./ordini/ordini.module').then( m => m.OrdiniPageModule)
  },
  {
    path: 'ordine-detail',
    loadChildren: () => import('./ordine-detail/ordine-detail.module').then( m => m.OrdineDetailPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
