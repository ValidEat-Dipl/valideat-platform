import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminClearingTickets } from '../models/admin-clearing-tickets.model';
import { CreateAdminTicket } from '../models/create-admin-ticket.model';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root',
})
export class CheckConflictService {
  http = inject(HttpClient);

  getClearingCase(id: number) {
    return this.http.get<AdminClearingTickets>(
      `${API_BASE}/foodticket/table-clearing/${id}`,
    );
  }
}
