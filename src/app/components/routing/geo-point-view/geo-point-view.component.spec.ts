import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GeoPointViewComponent } from './geo-point-view.component';

describe('GeoPointViewComponent', () => {
  let component: GeoPointViewComponent;
  let fixture: ComponentFixture<GeoPointViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoPointViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoPointViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
