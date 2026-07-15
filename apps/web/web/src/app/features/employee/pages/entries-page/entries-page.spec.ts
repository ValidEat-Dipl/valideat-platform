import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { EmployeeTicketService } from '../../services/employee-ticket.service';
import { EntriesPage } from './entries-page';

describe('EntriesPage', () => {
  let component: EntriesPage;
  let fixture: ComponentFixture<EntriesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntriesPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(EntriesPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the newest entry first', () => {
    const employeeTicketService = TestBed.inject(EmployeeTicketService);

    vi.spyOn(employeeTicketService, 'findByEmployee').mockReturnValue(of([
      {
        id: 1,
        firstName: 'Max',
        lastName: 'Mustermann',
        useDate: '2026-07-14',
        tier: 'INTERN',
        costOrder: '1000 - Verwaltung',
        restaurantName: 'Gasthaus zur Stadt',
        status: 'OPEN',
        checkDate: null,
      },
      {
        id: 2,
        firstName: 'Max',
        lastName: 'Mustermann',
        useDate: '2026-07-15',
        tier: 'APPRENTICE',
        costOrder: '1000 - Verwaltung',
        restaurantName: 'Restaurant Adler',
        status: 'CHECKED',
        checkDate: '2026-07-15',
      },
    ]));

    component.ngOnInit();

    expect(component.tickets[0].id).toBe(2);
    expect(component.tickets[1].id).toBe(1);
  });
});
