import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EmployeeFoodTicketRequest } from '../models/employee-food-ticket.model';
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

  it('loads a single ticket', () => {
    service.getTicketById(3).subscribe((ticket) => {
      expect(ticket.id).toBe(3);
    });

    const request = httpTesting.expectOne('http://localhost:8080/foodticket/3');
    expect(request.request.method).toBe('GET');
    request.flush({ id: 3 });
  });

  it('loads restaurants', () => {
    service.getRestaurants().subscribe((restaurants) => {
      expect(restaurants[0].name).toBe('Gasthaus zur Stadt');
    });

    const request = httpTesting.expectOne('http://localhost:8080/restaurant');
    expect(request.request.method).toBe('GET');
    request.flush([{ id: 1, address: 'Landstraße 10, 4020 Linz', name: 'Gasthaus zur Stadt' }]);
  });

  it('loads tiers', () => {
    service.getTiers().subscribe((tiers) => {
      expect(tiers[0].name).toBe('INTERN');
    });

    const request = httpTesting.expectOne('http://localhost:8080/tier');
    expect(request.request.method).toBe('GET');
    request.flush([{ name: 'INTERN', discount: 3 }]);
  });

  it('loads cost orders', () => {
    service.getCostOrders().subscribe((costOrders) => {
      expect(costOrders[0].name).toBe('1000 - Verwaltung');
    });

    const request = httpTesting.expectOne('http://localhost:8080/costOrder');
    expect(request.request.method).toBe('GET');
    request.flush([{ name: '1000 - Verwaltung' }]);
  });

  it('creates an employee ticket entry', () => {
    const ticket: EmployeeFoodTicketRequest = {
      date: '2026-07-14',
      employeeName: 'Max Mustermann',
      costOrder: '1000 - Verwaltung',
      tier: 'APPRENTICE',
      restaurantName: 'Restaurant Adler',
    };

    service.addTicketEntry(ticket).subscribe();

    const request = httpTesting.expectOne('http://localhost:8080/foodticket/empAddTicketEntry');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(ticket);
    request.flush(null);
  });

  it('edits an employee ticket entry', () => {
    const ticket: EmployeeFoodTicketRequest = {
      date: '2026-07-15',
      employeeName: 'Max Mustermann',
      costOrder: '1200 - IT',
      tier: 'EMPLOYEE',
      restaurantName: 'Café Mozart',
    };

    service.editTicket(8, 1, ticket).subscribe();

    const request = httpTesting.expectOne('http://localhost:8080/foodticket/8/1');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(ticket);
    request.flush(null);
  });

  it('deletes an employee ticket entry', () => {
    service.deleteTicket(3).subscribe();

    const request = httpTesting.expectOne('http://localhost:8080/foodticket/3');
    expect(request.request.method).toBe('DELETE');
    request.flush(null, { status: 204, statusText: 'No Content' });
  });
});
