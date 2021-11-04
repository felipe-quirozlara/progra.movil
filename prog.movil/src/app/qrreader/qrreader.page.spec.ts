import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QrreaderPage } from './qrreader.page';

describe('QrreaderPage', () => {
  let component: QrreaderPage;
  let fixture: ComponentFixture<QrreaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrreaderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QrreaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
