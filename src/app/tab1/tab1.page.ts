import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { SpiaggeService } from '../services/spiagge.service';
import { Router, NavigationExtras } from '@angular/router';
import { Spiaggia } from '../model/spiaggia';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  spiagge: Array<Spiaggia>;
  coords;

  constructor(
    private spiaggeService: SpiaggeService,
    private router: Router,
    private geo: Geolocation,
    // private storage: Storage,
    private navController: NavController
    ) {}


  ngOnInit(){
    // this.storage.clear()
    this.getSpiagge();

  }

  getSpiagge(){
    this.spiaggeService.getSpiagge().subscribe( response => {
      this.spiagge = response;
      this.getLocation();

    });
  }

  getLocation(){
    this.geo.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: true
    }).then((res) => {
      this.coords = {
        lat: res.coords.latitude,
        lon: res.coords.longitude
      };
      console.log('coordinates: ', this.coords);
      this.calculateDistanceFromSpiagge();
    }).catch((e) => {
      console.log(e);
    })
  }

  calculateDistanceFromSpiagge(){
    this.spiagge.forEach( spiaggia => {
      spiaggia.distance = this.getDistance(this.coords, spiaggia.address);
    });
    console.log('spiagge: ', this.spiagge);
  }

  getDistance(coords, address){
    return this.calculateDistance(coords.lat, address.lat, coords.lon, address.lon);
  }

  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    const p = 0.017453292519943295;    // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
    const dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
    return dis;
  }

  goToSpiaggia(spiaggia){
    const spaggiaData: NavigationExtras = {
      state : {
        spiaggia
      }
    }
    this.router.navigate(['/bar'], spaggiaData);

  }

  navigateToSpiagge(){
    this.navController.navigateRoot('/tab1');
  }

  navigateToPrenotazioni(){
    this.navController.navigateRoot('/prenotazioni');
  }

  navigateToOrdini(){
    this.navController.navigateRoot('/ordini');
  }

}
