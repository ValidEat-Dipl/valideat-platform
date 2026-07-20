import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodTicketConflictResponse } from '../models/food-ticket-conflict.model';

@Injectable({
  providedIn: 'root',
})
export class OpenConflictsService {
  http = inject(HttpClient);

  getData() {
    return this.http.get<FoodTicketConflictResponse>('http://localhost:8080/foodticket/conflicts');
  }
}
