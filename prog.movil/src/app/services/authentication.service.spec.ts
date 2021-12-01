import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPageModule } from '../login/login.module';
import { LoginPage } from '../login/login.page';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        IonicStorageModule.forRoot(),
        RouterTestingModule.withRoutes([])
      ],
      // declarations: [
      //   LoginPageModule,
      // ],
      // providers: [{}]
    }).compileComponents();

    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
