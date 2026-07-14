import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { EmployeeEntryState } from '../../services/employee-entry-state';
import { EntrySuccessPage } from './entry-success-page';

describe('EntrySuccessPage', () => {
  let component: EntrySuccessPage;
  let fixture: ComponentFixture<EntrySuccessPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrySuccessPage],
      providers: [provideRouter([])],
    }).compileComponents();

    const entryState = TestBed.inject(EmployeeEntryState);
    entryState.ticket = {
      date: '2026-07-14',
      employeeName: 'Max Mustermann',
      costOrder: '1000 - Verwaltung',
      tier: 'INTERN',
      restaurantName: 'Gasthaus zur Stadt',
    };
    entryState.saved = true;

    fixture = TestBed.createComponent(EntrySuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
