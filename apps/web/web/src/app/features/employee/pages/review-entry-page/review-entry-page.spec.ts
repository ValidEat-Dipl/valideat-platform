import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { EmployeeEntryState } from '../../services/employee-entry-state';
import { ReviewEntryPage } from './review-entry-page';

describe('ReviewEntryPage', () => {
  let component: ReviewEntryPage;
  let fixture: ComponentFixture<ReviewEntryPage>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewEntryPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    TestBed.inject(EmployeeEntryState).ticket = {
      date: '2026-07-14',
      employeeName: 'Max Mustermann',
      costOrder: '1000 - Verwaltung',
      tier: 'INTERN',
      restaurantName: 'Gasthaus zur Stadt',
    };

    fixture = TestBed.createComponent(ReviewEntryPage);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => httpTesting.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sends the POST request after confirmation', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    component.confirmEntry();

    const request = httpTesting.expectOne('http://localhost:8080/foodticket/empAddTicketEntry');
    expect(request.request.method).toBe('POST');
    request.flush(12);

    expect(TestBed.inject(EmployeeEntryState).saved).toBe(true);
    expect(TestBed.inject(EmployeeEntryState).savedTicketId).toBe(12);
    expect(navigate).toHaveBeenCalledWith(['/employee/success']);
  });
});
