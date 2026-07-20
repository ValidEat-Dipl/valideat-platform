import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DeleteTicketService {
  http = inject(HttpClient);

  deleteTicket(id: number) {
    return this.http.delete(`http://localhost:8080/foodticket/${id}`);
  }
}
