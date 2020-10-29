import { Component, OnInit } from '@angular/core';
import { Stripe } from '@ionic-native/stripe/ngx';
import { NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {

  cardNumber: string;
  cardMonth: number;
  cardYear: number;
  cardCVV: string;

  constructor(public navCtrl: NavController, public stripe: Stripe) {
	}

  ngOnInit() {
    this.stripe.setPublishableKey('pk_test_51HZdpiG9JKzj23VPeBLCh3BmzwIa0HPyKpRDvEvW9OWSS1TWnDII4mRNHijlZbrGqERWPJIHOxaJDzMzKUr8K8av00sDnGkM0F');
  }

  validateCard(){
    const card = {
      number: this.cardNumber,
      expMonth: this.cardMonth,
      expYear: this.cardYear,
      cvc: this.cardCVV
     };

     // Run card validation here and then attempt to tokenise

     this.stripe.createCardToken(card)
        .then(token => console.log(token))
        .catch(error => console.error(error));
  }

}
