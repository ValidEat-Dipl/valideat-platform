import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodTicketConflictResponse } from '../models/food-ticket-conflict.model';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root',
})
export class OpenConflictsService {
  http = inject(HttpClient);

  getData() {
    return this.http.get<FoodTicketConflictResponse>(`${API_BASE}/foodticket/conflicts`);
  }
}
