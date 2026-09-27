import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateAdminTicket } from '../models/create-admin-ticket.model';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root',
})
export class CorrectTicketService {
  http = inject(HttpClient);

  correctAdminTicket(id: number, ticket: CreateAdminTicket) {
    return this.http.put(`${API_BASE}/foodticket/adminEditTicket/${id}`, ticket);
  }

}
