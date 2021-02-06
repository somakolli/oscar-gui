import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SuggestionDetailComponent } from './suggestion-detail.component';

describe('SuggestionDetailComponent', () => {
  let component: SuggestionDetailComponent;
  let fixture: ComponentFixture<SuggestionDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
