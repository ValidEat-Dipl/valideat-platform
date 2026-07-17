import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { EmployeeEntryState } from '../../services/employee-entry-state';
import { CreateEntryPage } from './create-entry-page';

describe('CreateEntryPage', () => {
  let component: CreateEntryPage;
  let fixture: ComponentFixture<CreateEntryPage>;
  let httpTesting: HttpTestingController;
  let entryState: EmployeeEntryState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEntryPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEntryPage);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    entryState = TestBed.inject(EmployeeEntryState);
  });

  afterEach(() => httpTesting.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('stores the form values without sending a POST request', () => {
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    component.ticketForm.setValue({
      date: '2026-07-14',
      employeeName: 'Max Mustermann',
      costOrder: '1000 - Verwaltung',
      tier: 'INTERN',
      restaurantName: 'Gasthaus zur Stadt',
      confirmed: true,
    });

    component.onSubmit();

    expect(entryState.ticket?.tier).toBe('INTERN');
    httpTesting.expectNone('http://localhost:8080/foodticket/empAddTicketEntry');
  });

  it('uses the latest ticket values as dropdown defaults', () => {
    fixture.detectChanges();

    httpTesting.expectOne('http://localhost:8080/foodticket/findByEmployee/1').flush([
      {
        id: 12,
        firstName: 'Max',
        lastName: 'Mustermann',
        useDate: '2026-07-16',
        tier: 'EMPLOYEE',
        costOrder: '1200 - IT',
        restaurantName: 'Gasthaus zur Stadt',
        status: 'OPEN',
        checkDate: null,
      },
      {
        id: 4,
        firstName: 'Max',
        lastName: 'Mustermann',
        useDate: '2026-07-10',
        tier: 'APPRENTICE',
        costOrder: '1000 - Verwaltung',
        restaurantName: 'Restaurant Adler',
        status: 'CHECKED',
        checkDate: '2026-07-10',
      },
    ]);
    httpTesting.expectOne('http://localhost:8080/restaurant').flush([]);
    httpTesting.expectOne('http://localhost:8080/tier').flush([]);
    httpTesting.expectOne('http://localhost:8080/costOrder').flush([]);

    expect(component.ticketForm.value.tier).toBe('EMPLOYEE');
    expect(component.ticketForm.value.costOrder).toBe('1200 - IT');
    expect(component.ticketForm.value.restaurantName).toBe('Gasthaus zur Stadt');
    expect(component.ticketForm.controls.date.disabled).toBe(false);
  });
});
