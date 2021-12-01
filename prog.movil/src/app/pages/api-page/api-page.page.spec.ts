import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { ApiPagePage } from './api-page.page';

describe('ApiPagePage', () => {
  let component: ApiPagePage;
  let fixture: ComponentFixture<ApiPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiPagePage ],
      imports: [IonicModule.forRoot(),HttpClientTestingModule, RouterTestingModule.withRoutes([]),IonicStorageModule.forRoot()],
      
    }).compileComponents();

    fixture = TestBed.createComponent(ApiPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería encontrar titulo de api page', ()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ion-card-title').textContent).toContain('Ingresa tu sugerencia');
  })
});
