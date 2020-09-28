import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SpiaggeService } from '../services/spiagge.service';
import { StorageService } from '../storage.service';
import { Facebook } from '@ionic-native/facebook/ngx';

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
    LoginPageRoutingModule
  ],
	declarations: [LoginPage],
	providers: [
		SpiaggeService,
		StorageService,
		Facebook
	]
})
export class LoginPageModule {}
