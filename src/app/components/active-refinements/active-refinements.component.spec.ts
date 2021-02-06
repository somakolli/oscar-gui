import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ActiveRefinementsComponent } from './active-refinements.component';

describe('ActiveRefinementsComponent', () => {
  let component: ActiveRefinementsComponent;
  let fixture: ComponentFixture<ActiveRefinementsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveRefinementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRefinementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
