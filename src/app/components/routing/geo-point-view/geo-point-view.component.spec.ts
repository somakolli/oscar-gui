import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoPointViewComponent } from './geo-point-view.component';

describe('GeoPointViewComponent', () => {
  let component: GeoPointViewComponent;
  let fixture: ComponentFixture<GeoPointViewComponent>;

  beforeEach(async(() => {
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
