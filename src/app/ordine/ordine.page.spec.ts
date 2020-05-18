import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdinePage } from './ordine.page';

describe('OrdinePage', () => {
  let component: OrdinePage;
  let fixture: ComponentFixture<OrdinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
