import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedItemComponent } from './selected-item.component';

describe('SelectedItemComponent', () => {
  let component: SelectedItemComponent;
  let fixture: ComponentFixture<SelectedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
