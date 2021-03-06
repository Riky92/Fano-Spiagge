import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Storage} from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
const { SplashScreen } = Plugins;


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
		private storage: Storage,
		private navController: NavController,
		// private uniqueDeviceID: UniqueDeviceID
		){
			this.initializeApp();
			this.checkData();
  }

  initializeApp() {
    /* To make sure we provide the fastest app loading experience
       for our users, hide the splash screen automatically
       when the app is ready to be used:

        https://capacitor.ionicframework.com/docs/apis/splash-screen#hiding-the-splash-screen
    */
    SplashScreen.hide();
	}

	checkData(){
		this.storage.get('user').then( result => {
			if (result != null) {
				console.log('Data: '+ JSON.stringify(result));
				this.navController.navigateRoot('tab1');
			}
			}).catch(e => {
				console.log('error: '+ e);
				this.navController.navigateRoot('login');
				// Handle errors here
		});
	}
}
