import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { SpiaggeService } from '../services/spiagge.service';
import { Router, NavigationExtras } from '@angular/router';
import { Spiaggia } from '../model/spiaggia';
import { Storage} from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

	spiagge: Array<Spiaggia>;

	constructor(
		private spiaggeService: SpiaggeService,
		private router: Router
		) {}


	ngOnInit(){
		this.getSpiagge();

	}

	getSpiagge(){
		this.spiaggeService.getSpiagge().subscribe( response => {
			this.spiagge = response;
		});
	}

	goToSpiaggia(spiaggia){
		const spaggiaData: NavigationExtras = {
      state : {
        spiaggia
      }
    }
    this.router.navigate(['/spiaggia'], spaggiaData);

	}

}
