import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminClearingTickets } from './admin-clearing-tickets.model';

@Injectable({
  providedIn: 'root',
})
export class CheckConflictService {
  http = inject(HttpClient);

  getClearingCase(id: number) {
    return this.http.get<AdminClearingTickets>(
      `http://localhost:8080/foodticket/table-clearing/${id}`,
    );
  }
}
