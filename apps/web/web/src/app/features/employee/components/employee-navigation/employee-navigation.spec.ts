import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EmployeeNavigation } from './employee-navigation';

describe('EmployeeNavigation', () => {
  let component: EmployeeNavigation;
  let fixture: ComponentFixture<EmployeeNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeNavigation],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
