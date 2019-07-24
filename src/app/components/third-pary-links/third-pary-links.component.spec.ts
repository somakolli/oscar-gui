import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdParyLinksComponent } from './third-pary-links.component';

describe('ThirdParyLinksComponent', () => {
  let component: ThirdParyLinksComponent;
  let fixture: ComponentFixture<ThirdParyLinksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdParyLinksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdParyLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
