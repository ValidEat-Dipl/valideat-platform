import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodTicket } from '../models/food-ticket.model';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root',
})
export class TableDataExpiredService {
  http = inject(HttpClient);

  getExpiredTickets() {
    return this.http.get<FoodTicket[]>(`${API_BASE}/foodticket/expired`);
  }
}
