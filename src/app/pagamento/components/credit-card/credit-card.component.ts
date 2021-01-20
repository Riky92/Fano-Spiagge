import { Component, OnInit, Output , EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Stripe } from '@ionic-native/stripe/ngx';
import { AlertController, NavController, NavParams } from '@ionic/angular';
import { Carta } from 'src/app/model/carta';
import { CartaRequest } from 'src/app/model/carta-request';
import { CreditCardProvider } from 'src/app/providers/credit-card.provider';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
})
export class CreditCardComponent implements OnInit {

	@Input() cartaSaved: Carta;

	@Output() cardEmitter = new EventEmitter();

	form: FormGroup;

  cardNumber: string;
  cardMonth: number;
  cardYear: number;
  cardCVC: string;

  constructor(
		public navCtrl: NavController,
		public stripe: Stripe,
		private alertCtrl: AlertController,
		private creditCardProvider: CreditCardProvider,
		private formBuilder: FormBuilder) {
			this.form = this.formBuilder.group({
				cardNumberForm: new FormControl('', Validators.required),
				cardMonthForm: new FormControl('', Validators.required),
				cardYearForm: new FormControl('', Validators.required),
				cardCVVForm: new FormControl('', Validators.required)
			});
	}

  ngOnInit() {
		if(this.cartaSaved){
			this.cardNumber = String(this.cartaSaved.number);
			this.cardMonth = this.cartaSaved.exp_month;
			this.cardYear = this.cartaSaved.exp_year;
			this.cardCVC = String(this.cartaSaved.cvc)

		}
  }

  validateCard(){
		// if( this.cards) {
		// 	this.cards.forEach( carta => {
		// 		if( carta.number === Number(this.cardNumber)){
		// 			this.presentErrorCardDuplicate();
		// 			return;
		// 		}
		// 	})
		// }
		this.creditCardProvider.init();
    const card: CartaRequest = {
      number: this.cardNumber,
      expMonth: this.cardMonth,
      expYear: this.cardYear,
      cvc: this.cardCVC
     };
		 this.creditCardProvider.validateCard(card).then(token => {
			console.log(token);
			console.log('card: ', card);
			const cardData = {
				card,
				token
			}
			this.cardEmitter.emit(cardData);
		})
		.catch(error => {
			this.presentErrorCard();
			console.error(error);
		});
	}

	async presentErrorCardDuplicate() {
    const alert = await this.alertCtrl.create({
			header: 'Attenzione',
			message: 'Carta gia presente',
      buttons: [
        {
          text: 'Riprova',
          handler: () => {
						this.form.reset();
          }
        }
      ]
    });
    await alert.present();
	}

	async presentErrorCard() {
    const alert = await this.alertCtrl.create({
			header: 'Attenzione',
			message: 'Errore inserimento dati carta',
      buttons: [
        {
          text: 'Riprova',
          handler: () => {
						this.form.reset();
          }
        }
      ]
    });
    await alert.present();
	}

	cc_format(value: string) {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length > 0) {
      this.cardNumber = parts.join(' ');
    } else {
      this.cardNumber = value;
    }
  }

}
