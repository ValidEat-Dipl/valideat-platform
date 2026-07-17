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
  ticketId?: number;

  constructor(
    private employeeEntryState: EmployeeEntryState,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ticket = this.employeeEntryState.ticket;
    // get id for detail page
    this.ticketId = this.employeeEntryState.savedTicketId;

    if (!this.ticket || !this.employeeEntryState.saved) {
      this.router.navigate(['/employee/start']);
    }
  }

  goToStart(): void {
    this.employeeEntryState.ticket = undefined;
    this.employeeEntryState.saved = false;
    this.employeeEntryState.savedTicketId = undefined;
    this.router.navigate(['/employee/start']);
  }

  goToEntry(): void {
    if (!this.ticketId) return;

    const ticketId = this.ticketId;

    this.employeeEntryState.ticket = undefined;
    this.employeeEntryState.saved = false;
    this.employeeEntryState.savedTicketId = undefined;

    // detail page
    this.router.navigate(['/employee/entries', ticketId]);
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }
}
