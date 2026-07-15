import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  employeeId = 1; // TODO: später vom Login
  ticket?: EmployeeFoodTicket;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private employeeTicketService: EmployeeTicketService,
  ) {}

  ngOnInit(): void {
    let ticketId = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeTicketService.findByEmployee(this.employeeId).subscribe((data) => {
      for (let ticket of data) {
        if (ticket.id == ticketId) {
          this.ticket = ticket;
        }
      }

      this.isLoading = false;
    });
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }

  getStatusText(): string {
    if (this.ticket?.status === 'CHECKED') return 'Abgeglichen';
    if (this.ticket?.status === 'CONFLICT') return 'Konflikt';
    if (this.ticket?.status === 'NEEDS_FIXING') return 'Korrektur nötig';
    return 'Erfasst';
  }

  getStatusClass(): string {
    if (this.ticket?.status === 'CHECKED') return 'text-bg-success';
    if (this.ticket?.status === 'CONFLICT') return 'text-bg-danger';
    if (this.ticket?.status === 'NEEDS_FIXING') return 'text-bg-warning';
    return 'text-bg-primary';
  }
}
