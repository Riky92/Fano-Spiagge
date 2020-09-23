import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { CarrelloOrdine} from '../model/carrello';
import { Ordine} from '../model/ordine';
import { Prenotazione} from '../model/prenotazione';
import { PrenotazioniProvider } from '../providers/prenotazioni.provider';
import { Spiaggia } from '../model/spiaggia';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { OrdiniProvider } from '../providers/ordini.provider';
import { OmbrelloneEnum} from '../model/common-constants'
import { Storage} from '@ionic/storage';

@Component({
  selector: 'app-ordine',
  templateUrl: './ordine.page.html',
  styleUrls: ['./ordine.page.scss'],
})
export class OrdinePage implements OnInit, OnDestroy {

	carrello

	minOrdineValue= 10;

	ordineInEdit = false;

	subscription;

	form: FormGroup;

	valueMin = 100;

	valueMax = 800;

	spiaggia: Spiaggia;

	file;

	numeri = [];

	type;

	fila;

	numero;

	typeOmbrellone;

	user;

	prenotazioni: Prenotazione[] =  [];

	showOmbrellone = false;

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private navController: NavController,
		private alertCtrl: AlertController,
		private storage: Storage,
		private formBuilder: FormBuilder,
		private prenotazioniProvider: PrenotazioniProvider,
		private ordiniProvider: OrdiniProvider

	) {
		this.initializeForm();
	}

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.carrello = this.router.getCurrentNavigation().extras.state.carrello;
				this.getUser();
				this.spiaggia =  this.router.getCurrentNavigation().extras.state.spiaggia;
				this.subscription = this.prenotazioniProvider.getPrenotazioni().subscribe( responsePrenotazioni => {
					this.prenotazioni = responsePrenotazioni;
				});
			}
		});
	}

	getUser(){
		this.storage.get('user').then( result => {
			if (result != null) {
				this.user = result;
			}
			}).catch(e => {
				console.log('error: '+ e);
		});
	}

	initializeForm(){
		this.form = this.formBuilder.group({
			typeOmbrellone: new FormControl('', Validators.required),
			filaOmbrellone: new FormControl('', Validators.required),
			numberOmbrellone: new FormControl('', Validators.required)}
			,
			{ validator: this.checkFormValidation('typeOmbrellone','filaOmbrellone', 'numberOmbrellone')}
			);
	}

	public checkFormValidation(type: string, fila: string, num: string) {
		return  (group: FormGroup):  {[key: string]: any} =>  {
			const typeForm = group.controls[type].value;
			const filaForm = group.controls[fila].value;
			const numberForm = group.controls[num].value;
			console.log('tipo: ' + typeForm , 'fila: '+  filaForm, 'numero: '+ numberForm);
			if (typeForm && filaForm && numberForm) {
				return {}
			} else {
				return {error:'Invalid form validation'};
			}
		};
	}

	getRowPrezzoCarrello(carrelloItem){
		return carrelloItem.prezzo * carrelloItem.nSelected;
	}

	getTotale(){
		let total = 0;
		this.carrello.forEach( item => {
			total += item.prezzo * item.nSelected;
		});
		return total;
	}


	svuotaCarrello(){
		this.presentAlertConfirm();
	}

	isNSelectedZero(carrelloItem){

		return carrelloItem.nSelected === 0;
	}
	addItem(carrelloItem){
		carrelloItem.nSelected++;
	}

	removeItem(carrelloItem){
		carrelloItem.nSelected--;
		if( carrelloItem.nSelected === 0){
			this.carrello = this.carrello.filter( itemCarrello => itemCarrello.cod !== carrelloItem.cod);
		}
	}

	async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Desideri svuotare il carrello ?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Si',
          handler: () => {
						this.carrello = [];
						this.navController.back();
          }
        }
      ]
    });

    await alert.present();
	}


	comeBack(){
		this.navController.back();
	}

	getMancante(){
		return (this.minOrdineValue - this.getTotale()).
		toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).toString();
	}

	ordineDisabled(){
		 return  !this.showOmbrellone || ( this.getTotale() < this.minOrdineValue);
	}

	allValueInserted(){
		return this.form.value.typeOmbrellone && this.form.value.filaOmbrellone && this.form.value.numberOmbrellone;
	}

	ordineMancante(){
		return this.getTotale() < this.minOrdineValue
	}

	isPrenotazioneGiornalieraGiàFatta(today){
		return this.prenotazioni.find( prenot => prenot.dataPrenotazione === today && prenot.user === 'mencuccir');
	}

	getSpiaggiaPrenotazione(today){
		return this.prenotazioni.find( prenot => prenot.dataPrenotazione === today && prenot.user === 'mencuccir');
	}

	async presentAlertOrdine(type) {
    const alert = await this.alertCtrl.create({
			header: 'Errore ordine',
			message: type === 1 ? 'Nessuna prenotazione attiva. Effettua una prenotazione in una spiaggia per poter effettuare l\'ordinare.':
			'Hai l\'ombrellone in un\'altra spiaggia.',
      buttons: [
         {
          text: 'Vai alle spiagge',
          handler: () => {
						this.navController.navigateRoot('/tab1');
          }
        }
      ]
    });

    await alert.present();
	}

	async presentConfirmOrdine() {
    const alert = await this.alertCtrl.create({
			header: 'Ordine effettuato',
			message: 'Grazie per aver ordinato. Invieremo il tuo ordine il prima possibile ',
      buttons: [
         {
          text: 'Ok',
          handler: () => {
						this.navController.navigateRoot('/ordini');
          }
        }
      ]
    });

    await alert.present();
	}

	vaiAlPagamento(){
		const carrelloOrdine: CarrelloOrdine[] = [];
		this.carrello.forEach( item => {
			carrelloOrdine.push({
				cod: item.cod,
				desc: item.desc,
				nSelected: item.nSelected,
				prezzo: this.getRowPrezzoCarrello(item)
			});
		});
		const ordine : Ordine = {
			codSpiaggia: this.spiaggia.id,
			descSpiaggia: this.spiaggia.title,
			ombrellone: this.form.value.typeOmbrellone === OmbrelloneEnum.ombrellone? this.form.value.numberOmbrellone :
			this.form.value.filaOmbrellone + '-' + this.form.value.numberOmbrellone,
			stato: {cod: 'nuovo', descrizione: 'Spedito'},
			timestamp: new Date(),
			day: new Date().toLocaleDateString(),
			carrello: carrelloOrdine,
			totale: this.getTotale(),
			user: 'mencuccir'
		};
		const ordineData: NavigationExtras = {
      state : {
        ordine
      }
    }
    this.router.navigate(['/pagamento'], ordineData);
		// this.ordiniProvider.addOrdine(ordine);
		// this.presentConfirmOrdine();

	}

	isVisible(){
		return this.form.value.typeOmbrellone;
	}

	changeType(event){
		const typeOmbrellone = this.spiaggia.ombrelloni.find( ombrellone => ombrellone.cod === event.target.value);
		this.typeOmbrellone = typeOmbrellone;
		this.file = typeOmbrellone.file;
		this.form.value.filaOmbrellone = null;
		this.form.value.numberOmbrellone = null;
		console.log('form: ', this.form);
		this.numeri = [];

		// this.initializeForm();
	}

	changeFila(event){
		this.numeri = [];
		const typeOmbrellone = this.spiaggia.ombrelloni.find( ombrellone => ombrellone.cod === this.typeOmbrellone.cod);
		this.form.value.numberOmbrellone = null;
		const fila = typeOmbrellone.file.find( f => f.codFila === event.target.value);
		for( let i = fila.valueMin; i <= fila.valueMax; i++){
			this.numeri.push(i);
		}
		console.log('numeri: ', this.numeri);

	}

	ordinaForm(form){

	}

	isGazebo(){
		return this.type === OmbrelloneEnum.gazebo;
	}

	ngOnDestroy(): void {
    this.subscription.unsubscribe();
	}

	setOmbrellone(){
		this.type= this.form.value.typeOmbrellone;
		this.fila = this.form.value.filaOmbrellone;
		this.numero = this.form.value.numberOmbrellone;
	}




}
