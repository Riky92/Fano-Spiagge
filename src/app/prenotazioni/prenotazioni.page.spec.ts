import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrenotazioniPage } from './prenotazioni.page';

describe('PrenotazioniPage', () => {
  let component: PrenotazioniPage;
  let fixture: ComponentFixture<PrenotazioniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenotazioniPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrenotazioniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
