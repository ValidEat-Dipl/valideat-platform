import { formatDate } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeHeader } from '../../components/employee-header/employee-header';
import { EmployeeFoodTicket } from '../../models/employee-food-ticket.model';
import { EmployeeTicketService } from '../../services/employee-ticket.service';

@Component({
  selector: 'app-entry-detail-page',
  imports: [EmployeeHeader, RouterLink],
  templateUrl: './entry-detail-page.html',
  styleUrl: './entry-detail-page.scss',
})
export class EntryDetailPage implements OnInit {
  ticketId = 0;
  ticket = signal<EmployeeFoodTicket | undefined>(undefined);
  isLoading = signal(true);
  isDeleting = signal(false);
  deleteError = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeTicketService: EmployeeTicketService,
  ) {}

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeTicketService.getTicketById(this.ticketId).subscribe({
      next: (ticket) => {
        this.ticket.set(ticket);
        this.isLoading.set(false);
        
      },

      error: () => {
        this.isLoading.set(false);
      },

    });
  }

  deleteEntry(): void {
    const confirmed = window.confirm('Soll diese Erfassung wirklich gelöscht werden?');

    if (!confirmed) return;


     this.isDeleting.set(true);
    this.deleteError.set(false);

    this.employeeTicketService.deleteTicket(this.ticketId).subscribe({
      next: () => {
        this.router.navigate(['/employee/entries']);
      },

      error: () => {

        this.isDeleting.set(false);
        this.deleteError.set(true);

      },
    });
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }

  getStatusText(): string {
    if (this.ticket()?.status === 'CHECKED') return 'Abgeglichen';
    if (this.ticket()?.status === 'CONFLICT') return 'Konflikt';
    if (this.ticket()?.status === 'NEEDS_FIXING') return 'Korrektur nötig';
    return 'Erfasst';
  }

  getStatusClass(): string {
    if (this.ticket()?.status === 'CHECKED') return 'text-bg-success';
    if (this.ticket()?.status === 'CONFLICT') return 'text-bg-danger';
    if (this.ticket()?.status === 'NEEDS_FIXING') return 'text-bg-warning';
    return 'text-bg-primary';
  }
}
