import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminFoodTicket } from './admin-food-ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TableDataMostRecentService {
  http = inject(HttpClient);

  getTableData(
    person?: string,
    fromDate?: string,
    toDate?: string,
    status?: string
  ) {

    const params: any = {};
    if (person && person.length > 0) params.person = person;
    if (fromDate) params.costRank = fromDate;
    if (toDate) params.costDepartment = toDate;
    if (status && status != 'ALL') params.status = status;

    return this.http.get<AdminFoodTicket[]>('http://localhost:8080/foodticket/listAdminTickets', {
      params,
    });
  }
}
