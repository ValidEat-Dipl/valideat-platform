import { formatDate } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EmployeeHeader } from '../../components/employee-header/employee-header';
import { EmployeeNavigation } from '../../components/employee-navigation/employee-navigation';
import { EmployeeFoodTicket } from '../../models/employee-food-ticket.model';
import { EmployeeTicketService } from '../../services/employee-ticket.service';

@Component({
  selector: 'app-start-page',
  imports: [EmployeeHeader, EmployeeNavigation],
  templateUrl: './start-page.html',
  styleUrl: './start-page.scss',
})
export class StartPage implements OnInit {

  employeeId = 1; // TODO: später von Login
  employeeName = 'Mitarbeiter:in';

  today = new Date();
  currentDate = this.today.toLocaleDateString('de-AT', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  todaysTicketUsed = false;
  latestEntry?: EmployeeFoodTicket;
  statusText = '';

  statusClass = 'text-bg-primary';

  private employeeTicketService = inject(EmployeeTicketService);

  ngOnInit(): void {
    let date = formatDate(this.today, 'yyyy-MM-dd', 'en');

    this.employeeTicketService
      .checkIfTodaysTicketUsed(this.employeeId, date)
      .subscribe((result) => {
        console.log(result)
        this.todaysTicketUsed = result
      });

    this.employeeTicketService.findByEmployee(this.employeeId).subscribe((tickets) => {

      console.log(tickets)

      if (tickets.length === 0) {
        return;
      }

      this.employeeName = `${tickets[0].employee.firstName} ${tickets[0].employee.lastName}`;

      this.latestEntry = tickets
        .filter((ticket) => ticket.ticketType === 'EMPLOYEE' && ticket.useDate <= date)
        .sort((a, b) => b.useDate.localeCompare(a.useDate))[0];

      if (this.latestEntry?.status === 'CHECKED') {
        this.statusText = 'Abgeglichen';
        this.statusClass = 'text-bg-success';
      } else if (this.latestEntry?.status === 'CONFLICT') {
        this.statusText = 'Konflikt';
        this.statusClass = 'text-bg-danger';
      } else {
        this.statusText = 'Erfasst';
      }
    });
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }
}
