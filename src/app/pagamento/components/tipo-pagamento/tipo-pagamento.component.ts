import { Component, OnInit, OnChanges, Input, Output , EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tipo-pagamento',
  templateUrl: './tipo-pagamento.component.html',
  styleUrls: ['./tipo-pagamento.component.scss'],
})
export class TipoPagamentoComponent implements OnChanges {

	@Input() tipoPagamento

	@Output() pagamentoDati = new EventEmitter();

	form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnChanges() {
		console.log('tipoPagamento: ', this.tipoPagamento);
		this.initializeForm();
	}

	initializeForm(){
		switch( this.tipoPagamento ){
			case 'visa':
			this.form = this.formBuilder.group({
				numero_carta: new FormControl('', Validators.required),
				numero_sicurezza: new FormControl('', Validators.required),
				nome: new FormControl('', Validators.required),
				cognome: new FormControl('', Validators.required)
			});
			break;
			case 'paypal': this.form = this.formBuilder.group({
				username: new FormControl('', Validators.required),
				password: new FormControl('', Validators.required)
			});
			break;
			case 'contanti': this.form = this.formBuilder.group({
				username: new FormControl('', Validators.required),
				password: new FormControl('', Validators.required)
			});
			break;
		}
		console.log('form: ', this.form);
	}

	confermaDati(form){
		let data;
		switch( this.tipoPagamento ){
			case 'visa':
				data = {
					numero_carta: form.value.numero_carta,
					numero_sicurezza: form.value.numero_sicurezza,
					nome: form.value.nome,
					cognome: form.value.cognome,
				}
			break;
			case 'paypal':
				data = {
					numero_carta: form.value.numero_carta,
					numero_sicurezza: form.value.numero_sicurezza,
					nome: form.value.nome,
					cognome: form.value.cognome,
				}
			break;
			case 'contanti': data = {
				numero_carta: form.value.numero_carta,
				numero_sicurezza: form.value.numero_sicurezza,
				nome: form.value.nome,
				cognome: form.value.cognome,
			}
			break;
		}
		this.pagamentoDati.emit(data);
	}
}
