import { Component, OnInit } from '@angular/core';
import { SpiaggeService } from '../services/spiagge.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators}  from '@angular/forms';
import { StorageService } from '../storage.service';
import { NavController } from '@ionic/angular';
import { Storage} from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

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
		private uniqueDeviceID: UniqueDeviceID,
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

	init(){
		this.uniqueDeviceID.get()
		.then(( uuid: any) => {
			this.storage.set('user', uuid);
		// this.storage.set('user', 'mencuccir');
			this.navController.navigateRoot('tab1');
		}).catch((error: any) => console.log('error: ', error));

	}
}
