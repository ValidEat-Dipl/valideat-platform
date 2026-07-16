import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { RegisterPage } from './register-page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('registers an employee and navigates to login', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    component.registerForm.setValue({
      firstName: 'Test',
      lastName: 'Person',
      email: 'test.person@example.invalid',
      department: 'IT',
      address: '',
      phoneNumber: '',
      password: 'test-password',
      passwordConfirmation: 'test-password',
      consent: true,
    });
    component.register();

    const request = httpTesting.expectOne('http://localhost:8080/employee/register');
    expect(request.request.body.passwordHash).toBe('test-password');
    request.flush('New Employee Registered');

    expect(navigate).toHaveBeenCalledWith(['/employee/login']);
  });
});
