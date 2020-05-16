import { Component, OnInit , Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-carrello-dialog',
  templateUrl: './carrello-dialog.component.html',
  styleUrls: ['./carrello-dialog.component.scss'],
})
export class CarrelloDialogComponent implements OnInit {

	columns;
  carrelloDataSource;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data,
		private dialogRef: MatDialogRef<CarrelloDialogComponent>) {}

  ngOnInit() {
  }


	close(){
		this.dialogRef.close();
	}

	conferma(){
		this.dialogRef.close('conferma');
	}


	getRowPrezzoCarrello(carrelloItem){
		return carrelloItem.prezzo * carrelloItem.nSelected;
	}

	getTotale(){
		let total = 0;
		this.data.forEach( item => {
			total += item.prezzo * item.nSelected;
		});
		return total;
	}


}
