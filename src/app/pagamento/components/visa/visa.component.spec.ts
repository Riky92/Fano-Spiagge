import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisaComponent } from './visa.component';

describe('VisaComponent', () => {
  let component: VisaComponent;
  let fixture: ComponentFixture<VisaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
