import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagamentoPageRoutingModule } from './pagamento-routing.module';

import { PagamentoPage } from './pagamento.page';
import { SpiaggeService } from '../services/spiagge.service';
import { TipoPagamentoComponent} from './components/tipo-pagamento/tipo-pagamento.component';
import { AppcommonModule } from '../appcommon/appcommon.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
		IonicModule,
		AppcommonModule,
    PagamentoPageRoutingModule
  ],
	declarations: [PagamentoPage, TipoPagamentoComponent],
	providers: [SpiaggeService]
})
export class PagamentoPageModule {}
