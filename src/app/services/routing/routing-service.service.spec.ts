import { TestBed } from '@angular/core/testing';

import { RoutingServiceService } from './routing-service.service';

describe('RoutingServiceService', () => {
  let service: RoutingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
