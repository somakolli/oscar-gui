import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsDetailComponent } from './parents-detail.component';

describe('ParentsDetailComponent', () => {
  let component: ParentsDetailComponent;
  let fixture: ComponentFixture<ParentsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
