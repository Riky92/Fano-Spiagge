import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdiniPage } from './ordini.page';

describe('OrdiniPage', () => {
  let component: OrdiniPage;
  let fixture: ComponentFixture<OrdiniPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdiniPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdiniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
