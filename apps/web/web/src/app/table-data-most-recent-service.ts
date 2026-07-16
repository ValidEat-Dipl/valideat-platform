import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminFoodTicket } from './admin-food-ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TableDataMostRecentService {
  http = inject(HttpClient);

  getTableData(
    employeeName?: string,
    fromDate?: string,
    toDate?: string,
    status?: string
  ) {

    const params: any = {};
    if (employeeName && employeeName.length > 0) params.employeeName = employeeName;
    if (fromDate) params.startDate = fromDate;
    if (toDate) params.endDate = toDate;
    if (status && status != 'ALL') params.status = status;
console.log(params);
    return this.http.get<AdminFoodTicket[]>('http://localhost:8080/foodticket/listAdminTickets', {
      params,
    });
  }
}
