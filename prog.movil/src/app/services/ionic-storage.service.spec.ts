import { TestBed } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';

import { IonicStorageService } from './ionic-storage.service';

describe('IonicStorageService', () => {
  let service: IonicStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        IonicStorageModule.forRoot(),
      ]
    });
    service = TestBed.inject(IonicStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
