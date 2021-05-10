import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NewItemListComponent } from './new-item-list.component';

describe('NewItemListComponent', () => {
  let component: NewItemListComponent;
  let fixture: ComponentFixture<NewItemListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NewItemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
