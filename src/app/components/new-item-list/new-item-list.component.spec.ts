import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemListComponent } from './new-item-list.component';

describe('NewItemListComponent', () => {
  let component: NewItemListComponent;
  let fixture: ComponentFixture<NewItemListComponent>;

  beforeEach(async(() => {
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
