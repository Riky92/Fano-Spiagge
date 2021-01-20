import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagamentoPageRoutingModule } from './pagamento-routing.module';

import { PagamentoPage } from './pagamento.page';
import { SpiaggeService } from '../services/spiagge.service';
import { TipoPagamentoComponent} from './components/tipo-pagamento/tipo-pagamento.component';
import { CreditCardComponent} from './components/credit-card/credit-card.component';
import { VisaComponent} from './components/visa/visa.component';
import { AppcommonModule } from '../appcommon/appcommon.module';
import { Stripe } from '@ionic-native/stripe/ngx';
import { CarteService } from '../services/carte.service';
import { CarteProvider } from '../providers/carte.provider';
import { CreditCardProvider } from '../providers/credit-card.provider';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
		IonicModule,
		ReactiveFormsModule,
		AppcommonModule,
    PagamentoPageRoutingModule
  ],
	declarations: [PagamentoPage, TipoPagamentoComponent, VisaComponent, CreditCardComponent],
	providers: [
		SpiaggeService,
		CarteService,
		CarteProvider,
		CreditCardProvider,
		Stripe
	]
})
export class PagamentoPageModule {}
