import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SpiaggiaPage } from './spiaggia.page';

describe('SpiaggiaPage', () => {
  let component: SpiaggiaPage;
  let fixture: ComponentFixture<SpiaggiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpiaggiaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SpiaggiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
