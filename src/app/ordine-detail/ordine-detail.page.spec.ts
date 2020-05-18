import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrdineDetailPage } from './ordine-detail.page';

describe('OrdineDetailPage', () => {
  let component: OrdineDetailPage;
  let fixture: ComponentFixture<OrdineDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdineDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrdineDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
