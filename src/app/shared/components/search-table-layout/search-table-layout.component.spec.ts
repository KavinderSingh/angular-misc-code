import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTableLayoutComponent } from './search-table-layout.component';

describe('SearchTableLayoutComponent', () => {
  let component: SearchTableLayoutComponent;
  let fixture: ComponentFixture<SearchTableLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTableLayoutComponent]
    });
    fixture = TestBed.createComponent(SearchTableLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
