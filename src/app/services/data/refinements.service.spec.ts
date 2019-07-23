import { TestBed } from '@angular/core/testing';

import { RefinementsService } from './refinements.service';

describe('RefinementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefinementsService = TestBed.get(RefinementsService);
    expect(service).toBeTruthy();
  });
});
