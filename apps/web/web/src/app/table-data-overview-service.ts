import { computed, inject, Injectable, Service} from '@angular/core';
import {Status} from './status.model';
import {HttpClient} from '@angular/common/http';
import { FoodTicket } from './food-ticket.model';
import { TableData } from './table.model';

@Injectable({
  providedIn: 'root',
})
export class TableDataOverviewService {
  http = inject(HttpClient);

  getTableData(lastYear = false) {
    const params: any = {};

    if (lastYear) {
      params.last12months = true;
    }

    return this.http.get<FoodTicket[]>(
      'http://localhost:8080/foodticket/overview',
      { params }
    );
  }
}
