import { TestBed } from '@angular/core/testing';

import { AuthGardService } from './auth-gard.service';
import { RouterModule, Routes } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGardService', () => {
  let service: AuthGardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        // RouterModule.forRoot([]),
        IonicStorageModule.forRoot(),
        RouterTestingModule.withRoutes([])
      ]
    });
    service = TestBed.inject(AuthGardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
