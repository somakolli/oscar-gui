import { TestBed } from '@angular/core/testing';

import { ItemStoreService } from './item-store.service';

describe('ItemStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemStoreService = TestBed.get(ItemStoreService);
    expect(service).toBeTruthy();
  });
});
