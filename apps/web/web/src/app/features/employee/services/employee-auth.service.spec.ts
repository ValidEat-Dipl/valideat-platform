import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { EmployeeRegisterRequest } from '../models/employee-register-request.model';
import { EmployeeAuthService } from './employee-auth.service';

describe('EmployeeAuthService', () => {
  let service: EmployeeAuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(EmployeeAuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('sends the login data to the JWT login route', () => {
    service.login('max.mustermann@firma.at', 'password123').subscribe();

    const request = httpTesting.expectOne('http://localhost:8080/employee/login');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      email: 'max.mustermann@firma.at',
      password: 'password123',
    });
    request.flush({
      token: 'test-token',
      id: 1,
      firstName: 'Max',
      lastName: 'Mustermann',
      email: 'max.mustermann@firma.at',
      role: 'EMPLOYEE',
    });
  });

  it('sends the employee data to the register route', () => {
    const employee: EmployeeRegisterRequest = {
      firstName: 'Test',
      lastName: 'Person',
      address: 'Testadresse',
      department: 'IT',
      phoneNumber: '+43 660 0000000',
      email: 'test.person@example.invalid',
      passwordHash: 'test-password',
      role: 'EMPLOYEE',
    };

    service.register(employee).subscribe();

    const request = httpTesting.expectOne('http://localhost:8080/employee/register');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(employee);
    request.flush('New Employee Registered');
  });
});
