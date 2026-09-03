import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestaurantOverview, RestaurantTicket } from '../models/restaurant-ticket.model';

const API_BASE = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class RestaurantTicketService {
  
  private http = inject(HttpClient);

  getOverview() {
    return this.http.get<RestaurantOverview>(`${API_BASE}/restaurant/overview`)
  }

  getTickets() {
    return this.http.get<RestaurantTicket[]>(`${API_BASE}/restaurant/tickets`)
  }
}
