import { TestBed } from '@angular/core/testing';

import { RoutingDataStoreService } from './routing-data-store.service';

describe('RoutingDataStoreService', () => {
  let service: RoutingDataStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutingDataStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
