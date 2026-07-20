import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateAdminTicket } from './create-admin-ticket.model';

@Injectable({
  providedIn: "root"
})
export class CorrectTicketService {

  http = inject(HttpClient)

  correctAdminTicket(id: number, ticket: CreateAdminTicket) {
    return this.http.put(`http://localhost:8080/foodticket/adminEditTicket/${id}`, ticket);
  }

}
