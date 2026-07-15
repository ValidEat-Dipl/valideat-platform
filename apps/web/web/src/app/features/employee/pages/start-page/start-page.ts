import { formatDate } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeeHeader } from '../../components/employee-header/employee-header';
import { EmployeeNavigation } from '../../components/employee-navigation/employee-navigation';
import { EmployeeFoodTicket } from '../../models/employee-food-ticket.model';
import { EmployeeTicketService } from '../../services/employee-ticket.service';

@Component({
  selector: 'app-start-page',
  imports: [EmployeeHeader, EmployeeNavigation, RouterLink],
  templateUrl: './start-page.html',
  styleUrl: './start-page.scss',
})
export class StartPage implements OnInit {
  employeeId = 1; // TODO: später von Login
  employeeName = signal('Mitarbeiter:in');

  today = new Date();
  currentDate = this.today.toLocaleDateString('de-AT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  todaysTicketUsed = signal(false);
  latestEntry = signal<EmployeeFoodTicket | undefined>(undefined);
  statusText = signal('');
  statusClass = signal('text-bg-primary');

  private employeeTicketService = inject(EmployeeTicketService);

  ngOnInit(): void {
    let date = formatDate(this.today, 'yyyy-MM-dd', 'en');

    this.employeeTicketService
      .checkIfTodaysTicketUsed(this.employeeId, date)
      .subscribe((result) => {
        this.todaysTicketUsed.set(result);
      });

    this.employeeTicketService.findByEmployee(this.employeeId).subscribe((tickets) => {
      if (tickets.length === 0) {
        return;
      }

      this.employeeName.set(`${tickets[0].firstName} ${tickets[0].lastName}`);

      let latestEntry = tickets
        .filter((ticket) => ticket.useDate <= date)
        .sort((a, b) => b.useDate.localeCompare(a.useDate))[0];

      this.latestEntry.set(latestEntry);

      if (latestEntry?.status === 'CHECKED') {
        this.statusText.set('Abgeglichen');
        this.statusClass.set('text-bg-success');
      } else if (latestEntry?.status === 'CONFLICT') {
        this.statusText.set('Konflikt');
        this.statusClass.set('text-bg-danger');
      } else {
        this.statusText.set('Erfasst');
      }
    });
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }
}
