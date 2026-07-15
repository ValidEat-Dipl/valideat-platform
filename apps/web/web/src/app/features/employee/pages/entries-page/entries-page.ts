import { formatDate } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeHeader } from '../../components/employee-header/employee-header';
import { EmployeeNavigation } from '../../components/employee-navigation/employee-navigation';
import { EmployeeFoodTicket } from '../../models/employee-food-ticket.model';
import { EmployeeTicketService } from '../../services/employee-ticket.service';

@Component({
  selector: 'app-entries-page',
  imports: [EmployeeHeader, EmployeeNavigation, RouterLink],
  templateUrl: './entries-page.html',
  styleUrl: './entries-page.scss',
})
export class EntriesPage implements OnInit {
  employeeId = 1; // TODO: später vom Login
  tickets = signal<EmployeeFoodTicket[]>([]);
  isLoading = signal(true);

  constructor(private employeeTicketService: EmployeeTicketService) {}

  ngOnInit(): void {
    this.employeeTicketService.findByEmployee(this.employeeId).subscribe((data) => {
      // Neueste Erfassung zuerst anzeigen
      this.tickets.set(data.sort((a, b) => b.useDate.localeCompare(a.useDate)));
      this.isLoading.set(false);
    });
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }

  getStatusText(status: EmployeeFoodTicket['status']): string {
    if (status === 'CHECKED') return 'Abgeglichen';
    if (status === 'CONFLICT') return 'Konflikt';
    if (status === 'NEEDS_FIXING') return 'Korrektur nötig';
    return 'Erfasst';
  }

  getStatusClass(status: EmployeeFoodTicket['status']): string {
    if (status === 'CHECKED') return 'text-bg-success';
    if (status === 'CONFLICT') return 'text-bg-danger';
    if (status === 'NEEDS_FIXING') return 'text-bg-warning';
    return 'text-bg-primary';
  }

  getStatusIcon(status: EmployeeFoodTicket['status']): string {
    if (status === 'CHECKED') return 'bi-check-circle';
    if (status === 'CONFLICT') return 'bi-exclamation-triangle';
    if (status === 'NEEDS_FIXING') return 'bi-pencil';
    return 'bi-clock';
  }
}
