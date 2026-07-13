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

  data: FoodTicket[] = [];
  data$ = this.http.get('http://localhost:8080/api/overview').subscribe((data) => {
    console.log(data);
    // @ts-ignore
    this.data = data;
  });

  /*processedTableData = {
    "headers": ['person', 'datum', 'stufe', 'kostenstelle', 'status'],
    "rows":
      this.data.map(foodTicket => {
        return {
          person: foodTicket.employeeId,
          datum: foodTicket.useDate,
          stufe: foodTicket.tier,
          kostenstelle: foodTicket.costOrder,
          status: foodTicket.status
        }
      })
  };*/
  processedTableData = {
    headers: [
      { key: 'person', label: 'Person' },
      { key: 'datum', label: 'Datum' },
      { key: 'stufe', label: 'Stufe' },
      { key: 'kostenstelle', label: 'Kostenstelle' },
      { key: 'typ', label: 'Tickettyp' },
      { key: 'status', label: 'Status' },
      { key: 'action', label: 'Aktion' },
    ],
    rows: [
      {
        person: 'Test1',
        datum: new Date(2026, 7, 9),
        stufe: 'Stufe A',
        kostenstelle: 'KST-001',
        typ: 'HR',
        status: new Status({ key: 'OPEN', label: 'Offen' }),
        action: 'Ticket öffnen',
      },
      {
        person: 'Test2',
        datum: new Date(2026, 4, 9),
        stufe: 'Stufe A',
        kostenstelle: 'KST-001',
        typ: 'HR',
        status: new Status({ key: 'CONFLICT', label: 'Konflikt' }),
        action: 'Ticket öffnen',
      },
      {
        person: 'Test3',
        datum: new Date(2026, 5, 9),
        stufe: 'Stufe B',
        kostenstelle: 'KST-002',
        typ: 'Employee',
        status: new Status({ key: 'CHECKED', label: 'Abgeglichen' }),
        action: 'Ticket öffnen',
      },
    ],
  };

  getTableData(lastYear = false) {

    const params: any = {};
    if (lastYear) params.lastYear = lastYear;

    this.data$ = this.http
      .get('http://localhost:8080/api/overview', { params })
      .subscribe((data) => {
        console.log(data);
        // @ts-ignore
        this.data = data;
      });

    return this.processedTableData;
  }
}
