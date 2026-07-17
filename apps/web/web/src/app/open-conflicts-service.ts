import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminClearingTickets } from './admin-clearing-tickets.model';
import { FoodTicketConflictResponse } from './food-ticket-conflict.model';

@Injectable({
  providedIn: 'root',
})
export class OpenConflictsService {
  http = inject(HttpClient);

  getData() {
    return this.http.get<FoodTicketConflictResponse>(
      'http://localhost:8080/foodticket/conflicts'
    );
  }
}
