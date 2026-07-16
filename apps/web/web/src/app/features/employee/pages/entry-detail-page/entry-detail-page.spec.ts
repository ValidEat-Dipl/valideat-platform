import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { EntryDetailPage } from './entry-detail-page';

describe('EntryDetailPage', () => {
  let component: EntryDetailPage;
  let fixture: ComponentFixture<EntryDetailPage>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryDetailPage],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: () => '3' },
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EntryDetailPage);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the selected ticket', () => {
    fixture.detectChanges();

    const request = httpTesting.expectOne('http://localhost:8080/foodticket/3');
    expect(request.request.method).toBe('GET');
    request.flush(createTicket());

    expect(component.ticket()?.id).toBe(3);
  });

  it('deletes the selected ticket after confirmation', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    fixture.detectChanges();
    httpTesting.expectOne('http://localhost:8080/foodticket/3').flush(createTicket());

    component.deleteEntry();

    const request = httpTesting.expectOne('http://localhost:8080/foodticket/3');
    expect(request.request.method).toBe('DELETE');
    request.flush(null, { status: 204, statusText: 'No Content' });
  });

  function createTicket() {
    return {
      id: 3,
      firstName: 'Lukas',
      lastName: 'Gruber',
      useDate: '2026-07-16',
      tier: 'EMPLOYEE',
      costOrder: '1200 - IT',
      restaurantName: 'Gasthaus zur Stadt',
      status: 'OPEN',
      checkDate: null,
      adminFirstName: null,
      adminLastName: null,
    };
  }
});
