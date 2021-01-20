import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ordine',
  templateUrl: './ordine.component.html',
  styleUrls: ['./ordine.component.scss'],
})
export class OrdineComponent implements OnInit {

	@Input() carrello;

  constructor() { }

	ngOnInit() {}

	getTotale(){
		let total = 0;
		this.carrello.forEach( item => {
			total += item.prezzo * item.nSelected;
		});
		return total;
	}

	getRowPrezzoCarrello(carrelloItem){
		return carrelloItem.prezzo * carrelloItem.nSelected;
	}


}
