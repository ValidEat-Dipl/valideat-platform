import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeHeader } from '../../components/employee-header/employee-header';
import { EmployeeFoodTicketRequest } from '../../models/employee-food-ticket.model';
import { EmployeeEntryState } from '../../services/employee-entry-state';

@Component({
  selector: 'app-entry-success-page',
  imports: [EmployeeHeader],
  templateUrl: './entry-success-page.html',
  styleUrl: './entry-success-page.scss',
})
export class EntrySuccessPage implements OnInit {
  ticket?: EmployeeFoodTicketRequest;

  constructor(
    private employeeEntryState: EmployeeEntryState,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ticket = this.employeeEntryState.ticket;

    if (!this.ticket || !this.employeeEntryState.saved) {
      this.router.navigate(['/employee/start']);
    }
  }

  goToStart(): void {
    this.employeeEntryState.ticket = undefined;
    this.employeeEntryState.saved = false;
    this.router.navigate(['/employee/start']);
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }
}
