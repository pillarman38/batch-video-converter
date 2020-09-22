import { TestBed } from '@angular/core/testing';

import { SavedInfoService } from './saved-info.service';

describe('SavedInfoService', () => {
  let service: SavedInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
