import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { UsersProvider } from '../providers/users.provider';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

	form: FormGroup;

	users: User[];

	constructor(
		private navController: NavController,
		private usersProvider: UsersProvider,
		private alertController: AlertController,
		private formBuilder: FormBuilder) {
			this.form = this.formBuilder.group({
				cellulare: new FormControl('', Validators.required),
				nuova_password: new FormControl('', Validators.required),
				conferma_password: new FormControl('', Validators.required)
			});
	}

  ngOnInit() {
		this.usersProvider.getUsers().subscribe( response => {
			this.users = response;
			console.log('users: ', this.users);
		});
	}

	isRegisterYet(cellulare){
		return this.users.find( userRegistered => userRegistered.cellulare === cellulare);
	}

	comeBack(){
		this.navController.back();
	}

	cambiaPasswordAccount(form){
		const formData = {
			cellulare: form.value.cellulare,
			nuova_password: form.value.nuova_password,
			conferma_password: form.value.conferma_password
		};
		let errore = '';
		if( !this.isRegisterYet(formData.cellulare)){
			errore = 'Utente non registrato';
			this.presentAlertError(errore);
		} else {
			if( formData.nuova_password !== formData.conferma_password){
				errore = 'Le password sono diverse'
				this.presentAlertError(errore);
			} else {
				const user = this.isRegisterYet( formData.cellulare);
				this.usersProvider.updateUser(user);
				this.presentAlertConfirm();
			}
		}
	}

	async presentAlertConfirm() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header:  'Account aggiornato',
      message:  'Password cambiata con successo!',
      buttons: [
        {
          text:  'Login' ,
          handler: () => {
            this.navController.navigateRoot('/login');
          }
        }
      ]
    });
    await alert.present();
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
