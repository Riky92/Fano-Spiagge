import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { SpiaggeService } from '../services/spiagge.service';
import { StorageService } from '../storage.service';

@NgModule({
  imports: [
    CommonModule,
		FormsModule,
		ReactiveFormsModule,
		IonicModule,
    LoginPageRoutingModule
  ],
	declarations: [LoginPage],
	providers: [SpiaggeService, StorageService]
})
export class LoginPageModule {}
