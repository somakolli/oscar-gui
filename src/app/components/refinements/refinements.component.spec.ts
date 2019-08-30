import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefinementsComponent } from './refinements.component';

describe('RefinementsComponent', () => {
  let component: RefinementsComponent;
  let fixture: ComponentFixture<RefinementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefinementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefinementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
