import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RestaurantBilling, RestaurantMonthlyBilling, RestaurantOverview, RestaurantTicket } from '../models/restaurant-ticket.model';

const API_BASE = 'http://localhost:8080';

@Injectable({ providedIn: 'root' })
export class RestaurantTicketService {
  
  private http = inject(HttpClient);

  getOverview() {
    return this.http.get<RestaurantOverview>(`${API_BASE}/restaurant/overview`)
  }

  getTickets() {
    return this.http.get<RestaurantTicket[]>(`${API_BASE}/restaurant/tickets`)
  }

  scanQRCode(token: string) {
    return this.http.post<{ id: number; firstName: string; lastName: string; restaurantName: string; status: string }>(
      `${API_BASE}/foodticket/scanQRCode`, token,
      { headers: { 'Content-Type': 'text/plain' } },
    )
  }

  getTicketsWithFilter(status = '', fromDate = '', toDate = '', costOrder = '') {
    let params: string[] = []

    if (status) params.push(`status=${status}`)
    if (fromDate) params.push(`fromDate=${fromDate}`)
    if (toDate) params.push(`toDate=${toDate}`)
    if (costOrder) params.push(`costOrder=${costOrder}`)

    let query = params.length > 0 ? `?${params.join('&')}` : ''

    return this.http.get<RestaurantTicket[]>(`${API_BASE}/restaurant/tickets${query}`)
  }

  getBilling(fromDate: string, toDate: string) {
    return this.http.get<RestaurantBilling>(`${API_BASE}/restaurant/abrechnung?fromDate=${fromDate}&toDate=${toDate}`)
  }

  getMonthlyBilling() {
    return this.http.get<RestaurantMonthlyBilling[]>(`${API_BASE}/restaurant/abrechnung/monthly`)
  }
}
