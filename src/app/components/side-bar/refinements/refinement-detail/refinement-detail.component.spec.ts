import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefinementDetailComponent } from './refinement-detail.component';

describe('RefinementDetailComponent', () => {
  let component: RefinementDetailComponent;
  let fixture: ComponentFixture<RefinementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefinementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefinementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
