import { Component, OnInit } from '@angular/core';
import { SpiaggeService } from '../services/spiagge.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators}  from '@angular/forms';
import { StorageService } from '../storage.service';
import { NavController, AlertController } from '@ionic/angular';
import { Storage} from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { UserService } from '../services/user.service';
import { UsersProvider } from '../providers/users.provider';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	users: User[];

	form: FormGroup;

  constructor(
		private usersProvider: UsersProvider,
		private alertController: AlertController,
		private formBuilder: FormBuilder,
		private storage: Storage,
		private uniqueDeviceID: UniqueDeviceID,
		private navController: NavController
		) {
			this.form = this.formBuilder.group({
				cellulare: new FormControl('', Validators.required),
				password: new FormControl('', Validators.required)
			});
		 }

  ngOnInit() {
		this.usersProvider.getUsers().subscribe( response => {
			this.users = response;
		})
	}

	init(){
		this.uniqueDeviceID.get()
		.then(( uuid: any) => {
			this.storage.set('user', uuid);
		// this.storage.set('user', 'mencuccir');
			this.navController.navigateRoot('tab1');
		}).catch((error: any) => console.log('error: ', error));

	}

	login(form){

		const user: User = {
			cellulare: form.value.cellulare,
			password: form.value.password
		}
		const userRegistered = this.isRegisterYet(user);
		let errore = '';
		if(!userRegistered){
			errore = 'Utente non registrato';
			this.presentAlertError(errore);
		} else {
			if( userRegistered.password !== user.password){
				errore = 'Password errata';
				this.presentAlertError(errore);
			} else {
				this.storage.set('user', JSON.stringify(user));
				// sessionStorage.setItem( 'user', JSON.stringify(user));
				this.navController.navigateRoot('/tab1');
			}
		}
	}

	isRegisterYet(user){
		return this.users.find( userRegistered => userRegistered.cellulare === user.cellulare);
	}

	async presentAlertError(errore) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header:  'Errore',
      message:  errore,
      buttons: [
        {
          text:  'Riprova' ,
          role:  'cancel',
          handler: () => {}
        }
      ]
    });
    await alert.present();
	}
}
