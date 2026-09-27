import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateAdminTicket } from '../models/create-admin-ticket.model';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root'
})
export class CreateAdminTicketService {

  http = inject(HttpClient);

  createAdminTicket(ticket: CreateAdminTicket) {
    return this.http.post(`${API_BASE}/foodticket/adminAddTicketEntry`, ticket)
  }

}
