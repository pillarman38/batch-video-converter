import { TestBed } from '@angular/core/testing';

import { RecievedInfoServiceService } from './recieved-info-service.service';

describe('RecievedInfoServiceService', () => {
  let service: RecievedInfoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecievedInfoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
