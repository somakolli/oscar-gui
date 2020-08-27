import { TestBed } from '@angular/core/testing';

import { SuggestionsService } from './suggestions.service';

describe('SuggestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SuggestionsService = TestBed.get(SuggestionsService);
    expect(service).toBeTruthy();
  });
});
