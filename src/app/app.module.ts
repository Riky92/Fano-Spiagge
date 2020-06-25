import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
	imports: [BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		IonicStorageModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
		AngularFireStorageModule,
		FormsModule,
		BrowserAnimationsModule,
		HttpClientModule
	],
  providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		 HttpService,
		 SQLitePorter,
		//  UniqueDeviceID,
		 SQLite
		],
  bootstrap: [AppComponent]
})
export class AppModule {}
