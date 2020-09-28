import { Component, OnInit } from '@angular/core';
import { SpiaggeService } from '../services/spiagge.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators}  from '@angular/forms';
import { StorageService } from '../storage.service';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { Storage} from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { UserService } from '../services/user.service';
import { UsersProvider } from '../providers/users.provider';
import { User } from '../model/user';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

	users: User[];

	form: FormGroup;

	type = 'password';
	showPass = false;
	onFocusPassword = false;
	isLoggedIn;

  constructor(
		private usersProvider: UsersProvider,
		private alertController: AlertController,
		private formBuilder: FormBuilder,
		private storage: Storage,
		private facebook: Facebook,
		private toastCtrl: ToastController,
		private uniqueDeviceID: UniqueDeviceID,
		private navController: NavController
		) {
			this.form = this.formBuilder.group({
				username: new FormControl('', Validators.required),
				password: new FormControl('', Validators.required)
			});
			facebook.getLoginStatus()
				.then(res => {
					console.log(res.status);
					if (res.status === 'connect') {
						this.isLoggedIn = true;
					} else {
						this.isLoggedIn = false;
					}
				})
				.catch(e => console.log(e));
		 }

  ngOnInit() {
		this.usersProvider.getUsers().subscribe( response => {
			this.users = response;
			console.log('users: ', this.users);
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

		const user = {
			username: form.value.username,
			password: form.value.password
		}
		const userRegistered = this.isRegisterYet(user);
		let errore = '';

		if(!userRegistered){
			errore = 'Utente non registrato o errato';
			this.presentAlertError1(errore);
		} else {
			if( userRegistered.password !== user.password){
				errore = 'Password errata';
				this.presentAlertError2(errore);
			} else {
				let userToSave: User ;
				if( userRegistered.cellulare === user.username){
					userToSave = {
						cellulare: user.username,
						email: null,
						password: user.password,
						loggedWithFb: false
					};
					this.saveStorageUserAndAccess(user);
				} else if( userRegistered.email === user.username){
					userToSave = {
						cellulare: null,
						email: user.username,
						password: user.password,
						loggedWithFb: false
					};
					this.saveStorageUserAndAccess(user);
				}
			}
		}
	}

	saveStorageUserAndAccess(user){
		this.storage.set('user', JSON.stringify(user));
		this.navController.navigateRoot('/tab1');
	}

	async facebookLogin() {
    this.facebook.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if (res.status === 'connected') {
        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
	}

	getUserDetail(userid: any) {
		this.facebook.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
			.then(res => {
				console.log(res);
				const userToSave: User = {
					email: res.email,
					loggedWithFb: true
				};
				this.saveStorageUserAndAccess(userToSave);
				this.storage.set('user', JSON.stringify(userToSave));
				this.navController.navigateRoot('/tab1');
			})
			.catch(e => {
				console.log(e);
			});
	}

	salta() {
		this.navController.navigateRoot('/tab1');
	}

	showPassword() {
		this.showPass = !this.showPass;
		if(this.showPass){
			this.type = 'text';
		} else {
			this.type = 'password';
		}
 }

	isRegisterYet(user){
		return this.users.find( userRegistered => userRegistered.cellulare === user.username || userRegistered.email === user.username);
	}

	async presentAlertError1(errore) {

    const alert = await this.alertController.create({
      mode: 'ios',
      header:  'Errore',
      message:  errore,
      buttons: [
        {
          text:  'Riprova' ,
					role:  'cancel',
					cssClass: 'secondary',
          handler: () => {
						this.form.reset();
					}
				},
				{
          text:  'Registrati' ,
          handler: () => {
						this.navController.navigateRoot('/register')
					}
        }
      ]
		});
    await alert.present();
	}

	async presentAlertError2(errore) {

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

