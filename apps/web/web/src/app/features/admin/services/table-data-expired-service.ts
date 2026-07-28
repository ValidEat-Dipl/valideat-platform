import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodTicket } from '../models/food-ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TableDataExpiredService {
  http = inject(HttpClient);

  getExpiredTickets() {
    return this.http.get<FoodTicket[]>('http://localhost:8080/foodticket/expired');
  }
}
