import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';
import { User } from '../model/user';
import { UsersProvider } from '../providers/users.provider';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	form: FormGroup;

	users: User[];

  constructor(
		private navController: NavController,
		private usersProvider: UsersProvider,
		private alertController: AlertController,
		private formBuilder: FormBuilder) {
			this.form = this.formBuilder.group({
				cellulare: new FormControl('', Validators.required),
				password: new FormControl('', Validators.required)
			});
	}

  ngOnInit() {
		this.usersProvider.getUsers().subscribe( response => {
			this.users = response;
		});
	}

	createAccount(form){
		const user: User = {
			cellulare: form.value.cellulare,
			password: form.value.password
		};
		if(this.isRegisterYet(user)){
			this.presentAlertConfirm();
		} else {
			this.usersProvider.addUser(user);
			this.comeBack();
		};
	}

	isRegisterYet(user){
		return this.users.find( userRegistered => userRegistered.cellulare === user.cellulare);
	}

	async presentAlertConfirm() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Errore',
      message: 'Utente già esistente! ',
      buttons: [
        {
          text: 'Riprova',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Password dimenticata',
          handler: () => {
						this.navController.navigateRoot('/forgot-password');
          }
        }
      ]
    });
    await alert.present();
  }

	comeBack(){
		this.navController.back();
	}

}
