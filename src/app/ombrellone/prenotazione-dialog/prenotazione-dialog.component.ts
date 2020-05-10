import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-prenotazione-dialog',
  templateUrl: './prenotazione-dialog.component.html',
  styleUrls: ['./prenotazione-dialog.component.scss'],
})
export class PrenotazioneDialogComponent implements OnInit {

  constructor(
		@Inject(MAT_DIALOG_DATA) public data,
		private dialogRef: MatDialogRef<PrenotazioneDialogComponent>) {}

  ngOnInit() {
		console.log('data: ', this.data);
	}

	close(){
		this.dialogRef.close();
	}

	conferma(){
		this.dialogRef.close('conferma');
	}

}
