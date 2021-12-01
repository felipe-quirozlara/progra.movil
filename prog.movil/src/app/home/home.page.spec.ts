import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(),HttpClientTestingModule, RouterTestingModule.withRoutes([]), IonicStorageModule.forRoot()],
      // providers:[
      //   IonicStorageModule.forRoot(),
      //   RouterTestingModule,
      // ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería encontrar nombre de la app', ()=>{
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('ion-title').textContent).toContain('Asistencia QR App');
  })
});
