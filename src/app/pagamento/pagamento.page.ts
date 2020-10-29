import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ordine } from '../model/ordine';
import { SpiaggeService } from '../services/spiagge.service';
import { Pagamento } from '../model/pagamento';
import { NavController, AlertController } from '@ionic/angular';
import { OrdiniProvider } from '../providers/ordini.provider';
// import { Stripe } from '@ionic-native/stripe/ngx';
import { PagamentoEnum} from '../model/common-constants';

declare var Stripe;

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

	ordine: Ordine;

	payment;

	stripe = Stripe('pk_test_51HZdpiG9JKzj23VPeBLCh3BmzwIa0HPyKpRDvEvW9OWSS1TWnDII4mRNHijlZbrGqERWPJIHOxaJDzMzKUr8K8av00sDnGkM0F');
  card: any;

	pagamenti: Array<Pagamento>;

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private ordiniProvider: OrdiniProvider,
		private alertCtrl: AlertController,
		private navController: NavController,
		private spiaggeService: SpiaggeService,
		// private stripe: Stripe
	) { }

  ngOnInit() {
		this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
				this.ordine = this.router.getCurrentNavigation().extras.state.ordine;
				this.spiaggeService.getTipiPagamento().subscribe( response => {
					this.pagamenti = response;
				});
				console.log('ordine: ', this.ordine);
      }
    });
	}

	// setupStripe(){
  //   const elements = this.stripe.elements();
  //   const style = {
  //     base: {
  //       color: '#32325d',
  //       lineHeight: '24px',
  //       fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
  //       fontSmoothing: 'antialiased',
  //       fontSize: '16px',
  //       '::placeholder': {
  //         color: '#aab7c4'
  //       }
  //     },
  //     invalid: {
  //       color: '#fa755a',
  //       iconColor: '#fa755a'
  //     }
  //   };

  //   this.card = elements.create('card', { style });
	// 	document.getElementById('card-element');
  //   this.card.mount('#card-element');

  //   this.card.addEventListener('change', event => {
  //     const displayError = document.getElementById('card-errors');
  //     if (event.error) {
  //       displayError.textContent = event.error.message;
  //     } else {
  //       displayError.textContent = '';
  //     }
  //   });

  //   const form = document.getElementById('payment-form');
  //   form.addEventListener('submit', event => {
  //     event.preventDefault();

  //     // this.stripe.createToken(this.card)
  //     this.stripe.createSource(this.card).then(result => {
  //       if (result.error) {
  //         const errorElement = document.getElementById('card-errors');
  //         errorElement.textContent = result.error.message;
  //       } else {
  //         console.log(result);
  //       }
  //     });
  //   });
  // }

	// goToStripe(){
	// 	this.navController.navigateRoot('/stripe-java-script')
	// }

	effettuaOrdine(){
		this.ordiniProvider.addOrdine(this.ordine);
		this.presentConfirmOrdine();
	}

	// getDatiPagamento(dati){
	// 	console.log('dati: ', dati);
	// 	switch(this.payment){
	// 		case 'visa' : this.payWithStripe(); break;
	// 		case 'paypal': this.payWithPaypal(dati); break;
	// 		case 'contanti': this.payWithContanti(dati); break;
	// 	}
	// }

	payWithVisa(dati){

	}

	// payWithStripe() {
  //   this.stripe.setPublishableKey(this.STRIPE_PUBLISH_KEY);

  //   const cardDetails = {
  //     number: '4242424242424242',
  //     expMonth: 12,
  //     expYear: 2020,
  //     cvc: '220'
  //   }

  //   this.stripe.createCardToken(cardDetails)
  //     .then(token => {
  //       console.log(token);
  //     })
  //     .catch(error => console.error(error));
  // }

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


}
