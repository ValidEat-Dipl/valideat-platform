import { inject, Injectable, OnInit, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TicketDetailService {

  http = inject(HttpClient);

  loadTicketDetails(id: number) {
    return this.http.get(`http://localhost:8080/foodticket/${id}`)
  }

}
