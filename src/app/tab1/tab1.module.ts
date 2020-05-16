import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SpiaggeService } from '../services/spiagge.service';
// import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
	declarations: [Tab1Page],
	providers: [
		SpiaggeService,
		// UniqueDeviceID,
		Storage]
})
export class Tab1PageModule {}
