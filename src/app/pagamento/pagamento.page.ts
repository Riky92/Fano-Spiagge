import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ordine } from '../model/ordine';
import { SpiaggeService } from '../services/spiagge.service';
import { Pagamento } from '../model/pagamento';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {

	ordine: Ordine;

	payment;

	pagamenti: Array<Pagamento>;

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private navController: NavController,
		private spiaggeService: SpiaggeService
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

	comeBack(){
		this.navController.back();
	}


}
