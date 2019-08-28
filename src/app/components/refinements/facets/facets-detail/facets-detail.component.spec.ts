import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacetsDetailComponent } from './facets-detail.component';

describe('FacetsDetailComponent', () => {
  let component: FacetsDetailComponent;
  let fixture: ComponentFixture<FacetsDetailComponent>;

  beforeEach(async(() => {
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
