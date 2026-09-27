import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root',
})
export class DeleteTicketService {
  http = inject(HttpClient);

  deleteTicket(id: number) {
    return this.http.delete(`${API_BASE}/foodticket/${id}`);
  }
}
