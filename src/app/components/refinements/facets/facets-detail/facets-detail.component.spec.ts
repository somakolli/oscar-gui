import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FacetsDetailComponent } from './facets-detail.component';

describe('FacetsDetailComponent', () => {
  let component: FacetsDetailComponent;
  let fixture: ComponentFixture<FacetsDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FacetsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacetsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
