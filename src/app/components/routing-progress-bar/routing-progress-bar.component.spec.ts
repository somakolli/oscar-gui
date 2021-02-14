import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingProgressBarComponent } from './routing-progress-bar.component';

describe('RoutingProgressBarComponent', () => {
  let component: RoutingProgressBarComponent;
  let fixture: ComponentFixture<RoutingProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
