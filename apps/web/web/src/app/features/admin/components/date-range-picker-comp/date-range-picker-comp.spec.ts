import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangePickerComp } from './date-range-picker-comp';

describe('DateRangePickerComp', () => {
  let component: DateRangePickerComp;
  let fixture: ComponentFixture<DateRangePickerComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DateRangePickerComp],
    }).compileComponents();

    fixture = TestBed.createComponent(DateRangePickerComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
