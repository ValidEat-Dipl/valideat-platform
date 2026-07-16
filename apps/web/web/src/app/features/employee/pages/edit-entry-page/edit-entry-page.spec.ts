import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { EditEntryPage } from './edit-entry-page';

describe('EditEntryPage', () => {
  let component: EditEntryPage;
  let fixture: ComponentFixture<EditEntryPage>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEntryPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => '8' },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditEntryPage);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('loads an open ticket into the form', () => {
    fixture.detectChanges();
    answerLoadRequests('OPEN');

    expect(component.ticketForm.value.employeeName).toBe('Max Mustermann');
    expect(component.ticketForm.value.tier).toBe('INTERN');
  });

  it('sends the changed ticket with PUT', () => {
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    fixture.detectChanges();
    answerLoadRequests('OPEN');

    component.ticketForm.patchValue({
      costOrder: '1200 - IT',
      tier: 'EMPLOYEE',
      restaurantName: 'Café Mozart',
    });
    component.save();

    const request = httpTesting.expectOne('http://localhost:8080/foodticket/8/1');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body.tier).toBe('EMPLOYEE');
    request.flush(null);
  });

  function answerLoadRequests(status: 'OPEN' | 'CHECKED'): void {
    httpTesting.expectOne('http://localhost:8080/foodticket/8').flush({
      id: 8,
      firstName: 'Max',
      lastName: 'Mustermann',
      useDate: '2026-07-15',
      tier: 'INTERN',
      costOrder: '1000 - Verwaltung',
      restaurantName: 'Gasthaus zur Stadt',
      status,
      checkDate: null,
      adminFirstName: null,
      adminLastName: null,
    });
    httpTesting
      .expectOne('http://localhost:8080/restaurant')
      .flush([{ id: 1, address: 'Landstraße 10, 4020 Linz', name: 'Gasthaus zur Stadt' }]);
    httpTesting.expectOne('http://localhost:8080/tier').flush([{ name: 'INTERN', discount: 3 }]);
    httpTesting.expectOne('http://localhost:8080/costOrder').flush([{ name: '1000 - Verwaltung' }]);
  }
});
