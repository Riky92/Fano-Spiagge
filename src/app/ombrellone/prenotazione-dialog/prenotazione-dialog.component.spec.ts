import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PrenotazioneDialogComponent } from './prenotazione-dialog.component';

describe('PrenotazioneDialogComponent', () => {
  let component: PrenotazioneDialogComponent;
  let fixture: ComponentFixture<PrenotazioneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrenotazioneDialogComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PrenotazioneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
