import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EmployeeTicketService } from './employee-ticket.service';

describe('EmployeeTicketService', () => {
  let service: EmployeeTicketService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(EmployeeTicketService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('checks whether an employee used a ticket on a given date', () => {
    service.checkIfTodaysTicketUsed(1, '2026-07-13').subscribe((hasUsedTicket) => {
      expect(hasUsedTicket).toBe(false);
    });

    const request = httpTesting.expectOne(
      'http://localhost:8080/employee/checkIfTodaysTicketUsed/1/2026-07-13',
    );

    expect(request.request.method).toBe('GET');
    request.flush(false);
  });

  it('loads tickets for an employee', () => {
    service.findByEmployee(1).subscribe((tickets) => {
      expect(tickets).toEqual([]);
    });

    const request = httpTesting.expectOne('http://localhost:8080/foodticket/findByEmployee/1');

    expect(request.request.method).toBe('GET');
    request.flush([]);
  });
});
