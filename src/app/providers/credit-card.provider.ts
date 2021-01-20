import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CreditCardProvider{

	constructor(
		private stripe: Stripe,
		private http: HttpClient) {

	}

	init() {
		this.stripe.setPublishableKey('pk_test_51HZdpiG9JKzj23VPeBLCh3BmzwIa0HPyKpRDvEvW9OWSS1TWnDII4mRNHijlZbrGqERWPJIHOxaJDzMzKUr8K8av00sDnGkM0F');
	}

	validateCard(card) {
	// Run card validation here and then attempt to tokenise
		return this.stripe.createCardToken(card);
	}

	makePayment(request) {
		return this.http.post('https://us-central1-shoppr-c97a7.cloudfunctions.net/payWithStripe',request);
	}

}