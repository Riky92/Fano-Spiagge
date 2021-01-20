import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ordine } from '../model/ordine';
import { SpiaggeService } from '../services/spiagge.service';
import { Pagamento } from '../model/pagamento';
import { NavController, AlertController } from '@ionic/angular';
import { OrdiniProvider } from '../providers/ordini.provider';
// import { Stripe } from '@ionic-native/stripe/ngx';
import { PagamentoEnum} from '../model/common-constants';
import { User } from '../model/user';
import { UsersProvider } from '../providers/users.provider';
import { Storage} from '@ionic/storage';
import { Carta } from '../model/carta';
import { CarteProvider } from '../providers/carte.provider';
import { CreditCardProvider } from '../providers/credit-card.provider';
import { CartaRequest } from '../model/carta-request';

declare var Stripe;

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

	ordine: Ordine;

	payment;

	cardSelected;

	user: User;

	addCarta = false;

	stripe = Stripe('pk_test_51HZdpiG9JKzj23VPeBLCh3BmzwIa0HPyKpRDvEvW9OWSS1TWnDII4mRNHijlZbrGqERWPJIHOxaJDzMzKUr8K8av00sDnGkM0F');
	card: Carta;

	cartaSaved: Carta;

	pagamenti: Array<Pagamento>;

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private ordiniProvider: OrdiniProvider,
		private alertCtrl: AlertController,
		private storage: Storage,
		private carteProvider: CarteProvider,
		private navController: NavController,
		private spiaggeService: SpiaggeService,
		private crediCardProvider: CreditCardProvider
		// private stripe: Stripe
	) { }

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.ordine = this.router.getCurrentNavigation().extras.state.ordine;
				this.getUser();
				this.spiaggeService.getTipiPagamento().subscribe( response => {
					this.pagamenti = response;
				});
				console.log('ordine: ', this.ordine);
      }
    });
	}

	getUser(){
		this.storage.get('user').then( result => {
			if (result != null) {
				this.user = JSON.parse(result);
				console.log('user: ', this.user);
				let type = '';
				if( this.user.cellulare != null){
					type = 'phone'
				} else if( this.user.email != null){
					type = 'text';
				}
				this.getCarte(type);
			}
			}).catch(e => {
				console.log('error: '+ e);
				this.presentAlertUserNotConnected();
		});
	}

	getCarte(type){
		this.carteProvider.getCarteByUser(this.user, type).subscribe( responseCarte => {
			console.log('responseCarte: ', responseCarte);
			this.card = this.getCarteData(responseCarte)[0];
			console.log('card from db: ', this.card);
		});
	}

	getCarteData(cartaData): Carta{
		return cartaData.map(e => {
			return {
				id: e.payload.doc.id,
					user: e.payload.doc.data()['user'],
					number: e.payload.doc.data()['number'],
					exp_year: e.payload.doc.data()['exp_year'],
					exp_month: e.payload.doc.data()['exp_month'],
					cvc: e.payload.doc.data()['cvc']
			};
		});
	}

	async presentAlertUserNotConnected() {
    const alert = await this.alertCtrl.create({
			header: 'Attenzione',
			message: 'Utente non loggato. Loggati o crea un account per poter completare l\'ordine',
      buttons: [
        {
          text: 'Non ora',
          cssClass: 'secondary',
          handler: () => {
						this.navController.back();
          }
        }, {
          text: 'Ok',
          handler: () => {
						this.navController.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
	}


	effettuaOrdine(){
		if(this.isPagamentoWithCarta()){
			this.effettuaOrdineConCarta();
		} else {
			this.ordiniProvider.addOrdine(this.ordine);
			this.presentConfirmOrdine();
		}
	}

	effettuaOrdineConCarta(){
			// pago

			this.crediCardProvider.init();
			const card: CartaRequest=  {
				number: String(this.card.number),
				expMonth: this.card.exp_month,
				expYear: this.card.exp_year,
				cvc: String(this.card.cvc)
			};

			this.crediCardProvider.validateCard(card).then( token => {
				// creo il token e pago
				console.log('token: ', token);
				const request = {
					amount: this.ordine.totale,
					currency: 'usd',
					token: token.id
				};
				console.log('request payment: ', request);
				this.crediCardProvider.makePayment(request).subscribe(data => {
					console.log('dati pagamento: ', data);
				});
			})
		// this.ordiniProvider.addOrdine(this.ordine);
		// this.presentConfirmOrdine();
	}

	async presentErrorCard() {
    const alert = await this.alertCtrl.create({
			header: 'Attenzione',
			message: 'Errore dati carta',
      buttons: [
        {
          text: 'Riprova',
          handler: () => {
						this.effettuaOrdine();
          }
        }
      ]
    });
    await alert.present();
	}



	isVisa(pagamento){
		return pagamento.id === this.payment && this.payment === PagamentoEnum.visa;
	}

	isPagamentoWithCarta(){
		return this.payment === PagamentoEnum.visa;
	}

	payWithVisa(dati){

	}

	getCard(cardData){
		this.card = cardData.card;
		this.card.user = this.user;
		this.carteProvider.addCarta(this.card);
	}

	payWithPaypal(dati){

	}

	payWithContanti(dati) {

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

	comeBack(){
		this.navController.back();
	}

	enablePayment(){
		return !(this.payment === PagamentoEnum.contanti || ( this.payment === PagamentoEnum.visa && this.card))
	}


}
