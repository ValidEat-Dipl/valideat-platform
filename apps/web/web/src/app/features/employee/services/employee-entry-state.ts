import { Injectable } from '@angular/core';
import { EmployeeFoodTicketRequest, QRCodeResponse } from '../models/employee-food-ticket.model';

@Injectable({ providedIn: 'root' })
export class EmployeeEntryState {
  ticket?: EmployeeFoodTicketRequest;
  qrCode?: QRCodeResponse;
}
