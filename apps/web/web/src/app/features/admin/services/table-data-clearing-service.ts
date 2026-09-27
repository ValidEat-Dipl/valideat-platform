import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminClearingTickets } from '../models/admin-clearing-tickets.model';
import { API_BASE } from '../../../api.config';

@Injectable({
  providedIn: 'root',
})
export class TableDataClearingService {
  http = inject(HttpClient);

  getTableData(person?: string,
               fromDate?: string,
               toDate?: string,
               status?: string) {

    const params: any = {};
    if (person && person.length > 0) params.employeeName = person;
    if (fromDate) params.startDate = fromDate;
    if (toDate) params.endDate = toDate;
    if (status && status != 'ALL') params.status = status;

    return this.http.get<AdminClearingTickets[]>(`${API_BASE}/foodticket/table-clearing`,
      { params });
  }
}
