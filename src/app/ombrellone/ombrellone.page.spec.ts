import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OmbrellonePage } from './ombrellone.page';

describe('OmbrellonePage', () => {
  let component: OmbrellonePage;
  let fixture: ComponentFixture<OmbrellonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OmbrellonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OmbrellonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
