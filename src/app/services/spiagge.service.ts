import { HttpService} from './http.service';
import { Injectable } from '@angular/core';


@Injectable()
export class SpiaggeService{

	constructor(private http: HttpService){

	}

	getSpiagge(){
		return this.http.get('/assets/data/spiagge.json');
	}

	getOmbrelloni(){
		return this.http.get('/assets/data/ombrelloni.json');
	}

	getPrenotazioni(){

	}
}