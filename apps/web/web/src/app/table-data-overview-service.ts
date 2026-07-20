import { inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FoodTicket } from './food-ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TableDataOverviewService {
  http = inject(HttpClient);

  getTableData(lastYear = false, sortBy?: string) {
    const params: any = {};

    if (lastYear) params.last12months = true;
    if (sortBy) params.sortBy = sortBy;

    return this.http.get<FoodTicket[]>('http://localhost:8080/foodticket/overview', { params });
  }
}
