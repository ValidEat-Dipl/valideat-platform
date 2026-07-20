import { inject, Injectable, OnInit, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FoodTicket } from '../models/food-ticket.model';
import { FoodTicketDetail } from '../models/food-ticket-detail.model';

@Injectable({
  providedIn: 'root'
})
export class TicketDetailService {

  http = inject(HttpClient);

  loadTicketDetails(id: number) {
    return this.http.get<FoodTicketDetail>(`http://localhost:8080/foodticket/${id}`)
  }

}
