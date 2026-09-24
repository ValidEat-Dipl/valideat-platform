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
    } else if (this.employeeEntryState.qrCode) {
      this.router.navigate(['/employee/success']);
    }
  }

  confirmEntry(): void {
    if (!this.ticket) {
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');

    // Hier wird noch kein Ticket gespeichert. Erst das Restaurant löst den Code ein.
    this.employeeTicketService.createTicketQRCode(this.ticket).subscribe({
      next: (qrCode) => {
        this.employeeEntryState.qrCode = qrCode;

        this.router.navigate(['/employee/success']);
      },
      error: () => {
        
        this.isSaving.set(false);
        this.errorMessage.set('Der QR-Code konnte nicht erstellt werden. Bitte versuchen Sie es erneut.');
      },
    });
  }

  goBack(): void {
    this.location.back();
  }

  cancel(): void {
    this.employeeEntryState.ticket = undefined;
    this.employeeEntryState.qrCode = undefined;
    this.router.navigate(['/employee/start']);
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }
}
