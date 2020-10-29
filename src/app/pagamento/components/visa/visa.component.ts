import { Component, OnInit } from '@angular/core';

declare var Stripe;

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss'],
})
export class VisaComponent implements OnInit {

	stripe = Stripe('pk_test_51HZdpiG9JKzj23VPeBLCh3BmzwIa0HPyKpRDvEvW9OWSS1TWnDII4mRNHijlZbrGqERWPJIHOxaJDzMzKUr8K8av00sDnGkM0F');
	card: any;

	form;

  constructor() { }

	ngOnInit() {
		this.setupStripe();
	}

	setupStripe(){
    const elements = this.stripe.elements();
    const style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style });
    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    this.form = document.getElementById('payment-form');
    this.form.addEventListener('submit', event => {
      event.preventDefault();
			console.log('passo qui');
      this.stripe.createSource(this.card).then(result => {
			console.log('result: ', document.getElementById('card-element'));
        if (result.error) {
          const errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
        }
      });
    });
	}

	aggiungiCarta(){
		console.log('card:', this.card);
		// 1234 5432 4323 1334    06/21    121
	}

}
