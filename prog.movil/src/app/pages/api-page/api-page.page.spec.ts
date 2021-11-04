import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApiPagePage } from './api-page.page';

describe('ApiPagePage', () => {
  let component: ApiPagePage;
  let fixture: ComponentFixture<ApiPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApiPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
