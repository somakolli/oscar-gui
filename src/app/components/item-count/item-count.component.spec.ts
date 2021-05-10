import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItemCountComponent } from './item-count.component';

describe('ItemCountComponent', () => {
  let component: ItemCountComponent;
  let fixture: ComponentFixture<ItemCountComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
