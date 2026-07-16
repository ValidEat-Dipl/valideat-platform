import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateAdminTicket } from './create-admin-ticket.model';

@Injectable({
  providedIn: 'root'
})
export class CreateAdminTicketService {

  http = inject(HttpClient);

  createAdminTicket(ticket: CreateAdminTicket) {
    return this.http.post('http://localhost:8080/foodticket/adminAddTicketEntry', ticket)
  }

}
