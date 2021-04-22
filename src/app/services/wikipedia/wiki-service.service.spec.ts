import { TestBed } from '@angular/core/testing';

import { WikiServiceService } from './wiki-service.service';

describe('WikiServiceService', () => {
  let service: WikiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WikiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
