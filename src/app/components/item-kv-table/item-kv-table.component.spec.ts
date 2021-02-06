import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItemKvTableComponent } from './item-kv-table.component';

describe('ItemKvTableComponent', () => {
  let component: ItemKvTableComponent;
  let fixture: ComponentFixture<ItemKvTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemKvTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemKvTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
