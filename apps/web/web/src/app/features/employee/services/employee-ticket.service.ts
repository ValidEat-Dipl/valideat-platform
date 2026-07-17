import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EmployeeFoodTicket,
  EmployeeFoodTicketRequest,
} from '../models/employee-food-ticket.model';
import { CostOrder } from '../models/cost-order.model';
import { Restaurant } from '../models/restaurant.model';
import { Tier } from '../models/tier.model';

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

  getTicketById(ticketId: number) {
    return this.http.get<EmployeeFoodTicket>(`${API_BASE}/foodticket/${ticketId}`);
  }

  getRestaurants() {
    return this.http.get<Restaurant[]>(`${API_BASE}/restaurant`);
  }

  getTiers() {
    return this.http.get<Tier[]>(`${API_BASE}/tier`);
  }

  getCostOrders() {
    return this.http.get<CostOrder[]>(`${API_BASE}/costOrder`);
  }

  addTicketEntry(ticket: EmployeeFoodTicketRequest) {
    return this.http.post<number>(`${API_BASE}/foodticket/empAddTicketEntry`, ticket);
  }

  editTicket(ticketId: number, employeeId: number, ticket: EmployeeFoodTicketRequest) {
    return this.http.put<void>(`${API_BASE}/foodticket/${ticketId}/${employeeId}`, ticket);
  }

  deleteTicket(ticketId: number) {
    return this.http.delete<void>(`${API_BASE}/foodticket/${ticketId}`);
  }
}
