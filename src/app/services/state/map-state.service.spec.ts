import { TestBed } from '@angular/core/testing';

import { MapStateService } from './map-state.service';

describe('MapStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapStateService = TestBed.get(MapStateService);
    expect(service).toBeTruthy();
  });
});
