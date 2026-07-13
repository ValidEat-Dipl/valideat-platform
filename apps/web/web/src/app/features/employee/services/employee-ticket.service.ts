import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeFoodTicket } from '../models/employee-food-ticket.model';

const API_BASE = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class EmployeeTicketService {
  constructor(private http: HttpClient) {}

  checkIfTodaysTicketUsed(employeeId: number, date: string) {
    return this.http.get<boolean>(
      `${API_BASE}/employee/checkIfTodaysTicketUsed/${employeeId}/${date}`,
    );
  }

  findByEmployee(employeeId: number) {
    return this.http.get<EmployeeFoodTicket[]>(
      `${API_BASE}/foodticket/findByEmployee/${employeeId}`,
    );
  }
}
