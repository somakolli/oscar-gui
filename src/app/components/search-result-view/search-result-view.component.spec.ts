import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SearchResultViewComponent } from './search-result-view.component';

describe('SearchResultViewComponent', () => {
  let component: SearchResultViewComponent;
  let fixture: ComponentFixture<SearchResultViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
