import { Injectable } from '@angular/core';
import { EmployeeFoodTicketRequest } from '../models/employee-food-ticket.model';

@Injectable({ providedIn: 'root' })
export class EmployeeEntryState {
  ticket?: EmployeeFoodTicketRequest;
  saved = false;
  savedTicketId?: number;
}
