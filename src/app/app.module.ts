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

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
	imports: [BrowserModule,
		IonicModule.forRoot(),
		AppRoutingModule,
		IonicStorageModule.forRoot(),
		BrowserAnimationsModule,
		HttpClientModule
	],
  providers: [
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
		 HttpService,
		 SQLitePorter,
		 SQLite
		],
  bootstrap: [AppComponent]
})
export class AppModule {}
