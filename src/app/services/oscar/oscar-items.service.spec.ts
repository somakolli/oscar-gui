import { TestBed } from '@angular/core/testing';

import { OscarItemsService } from './oscar-items.service';

describe('OscarItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OscarItemsService = TestBed.get(OscarItemsService);
    expect(service).toBeTruthy();
  });
});
