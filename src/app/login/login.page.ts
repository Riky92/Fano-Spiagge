import { Component, OnInit } from '@angular/core';
import { SpiaggeService } from '../services/spiagge.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators}  from '@angular/forms';
import { StorageService } from '../storage.service';
import { NavController } from '@ionic/angular';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	spiagge = [];
	ombrelloni = [];

	form: FormGroup;

  constructor(
		private spiaggiaService: SpiaggeService,
		private formBuilder: FormBuilder,
		private storage: Storage,
		private navController: NavController
		) {
			this.form = this.formBuilder.group({
				spiaggia: new FormControl('', Validators.required),
				ombrellone: new FormControl('', Validators.required)
			});
		 }

  ngOnInit() {
		this.spiaggiaService.getSpiagge().subscribe( response => {
			this.spiagge = response;
			this.spiaggiaService.getOmbrelloni().subscribe( res2 => {
				this.ombrelloni = res2;
			});
		});
	}

	submitForm(form){
		console.log('form: ', form.value);
		this.storage.set('data',{
			spiaggia: form.value.spiaggia,
			ombrellone: form.value.ombrellone
		});
		this.navController.navigateRoot('tab1');
	}


}
