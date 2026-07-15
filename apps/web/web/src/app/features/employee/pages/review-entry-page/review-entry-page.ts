import { formatDate, Location } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeHeader } from '../../components/employee-header/employee-header';
import { EmployeeFoodTicketRequest } from '../../models/employee-food-ticket.model';
import { EmployeeEntryState } from '../../services/employee-entry-state';
import { EmployeeTicketService } from '../../services/employee-ticket.service';

@Component({
  selector: 'app-review-entry-page',
  imports: [EmployeeHeader],
  templateUrl: './review-entry-page.html',
  styleUrl: './review-entry-page.scss',
})
export class ReviewEntryPage implements OnInit {
  ticket?: EmployeeFoodTicketRequest;
  isSaving = signal(false);
  errorMessage = signal('');

  constructor(
    private employeeEntryState: EmployeeEntryState,
    private employeeTicketService: EmployeeTicketService,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.ticket = this.employeeEntryState.ticket;

    if (!this.ticket) {
      this.router.navigate(['/employee/create']);
    } else if (this.employeeEntryState.saved) {
      this.router.navigate(['/employee/success']);
    }
  }

  confirmEntry(): void {
    if (!this.ticket) {
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');

    this.employeeTicketService.addTicketEntry(this.ticket).subscribe({
      next: () => {
        this.employeeEntryState.saved = true;
        this.router.navigate(['/employee/success']);
      },
      error: () => {
        this.isSaving.set(false);
        this.errorMessage.set('Die Erfassung konnte nicht gespeichert werden.');
      },
    });
  }

  goBack(): void {
    this.location.back();
  }

  cancel(): void {
    this.employeeEntryState.ticket = undefined;
    this.employeeEntryState.saved = false;
    this.router.navigate(['/employee/start']);
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }
}
