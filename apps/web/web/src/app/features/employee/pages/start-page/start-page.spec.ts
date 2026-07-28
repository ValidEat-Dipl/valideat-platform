import { provideHttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { StartPage } from './start-page';

describe('StartPage', () => {
  let component: StartPage;
  let fixture: ComponentFixture<StartPage>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        id: 7,
        firstName: 'Max',
        lastName: 'Mustermann',
        email: 'max.mustermann@firma.at',
        role: 'EMPLOYEE',
        token: 'test-token',
      }),
    );

    await TestBed.configureTestingModule({
      imports: [StartPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(StartPage);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => {
    localStorage.removeItem('currentUser');
    httpTesting.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the data for the logged in employee', () => {
    fixture.detectChanges();

    const date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    httpTesting
      .expectOne(`http://localhost:8080/employee/checkIfTodaysTicketUsed/7/${date}`)
      .flush(false);
    httpTesting.expectOne('http://localhost:8080/foodticket/findByEmployee/7').flush([]);

    expect(component.employeeId).toBe(7);
  });
});
