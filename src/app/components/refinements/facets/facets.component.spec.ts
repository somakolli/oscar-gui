import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FacetsComponent } from './facets.component';

describe('FacetsComponent', () => {
  let component: FacetsComponent;
  let fixture: ComponentFixture<FacetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
