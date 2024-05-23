import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesFilterComponent } from './cities-filter.component';

describe('CitiesFilterComponent', () => {
  let component: CitiesFilterComponent;
  let fixture: ComponentFixture<CitiesFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitiesFilterComponent]
    });
    fixture = TestBed.createComponent(CitiesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
