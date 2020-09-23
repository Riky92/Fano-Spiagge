import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-tipo-pagamento',
  templateUrl: './tipo-pagamento.component.html',
  styleUrls: ['./tipo-pagamento.component.scss'],
})
export class TipoPagamentoComponent implements OnChanges {

	@Input() tipoPagamento;

  constructor() { }

  ngOnChanges() {
		console.log('tipoPagamento: ', this.tipoPagamento)
	}
}
