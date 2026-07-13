import { inject, Injectable, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FoodTicket } from './food-ticket.model';
import { Status } from './status.model';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class TableDataClearingService {
  http = inject(HttpClient);

  data: FoodTicket[] = [];
  data$ = this.http.get('http://localhost:8080/api/table-clearing').subscribe((data) => {
    console.log(data);
    // @ts-ignore
    this.data = data;
  });

  // ChatGpt #1 Anfang
  currentRoute: string = "";
  constructor(private router: Router) {
    console.log(router.url);

    router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.currentRoute = event.url;
    });
  }
  // ChatGpt #1 Ende

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
      { key: 'status', label: 'Status' },
      { key: 'lastChange', label: 'Letzte Änderung' },
      { key: 'action', label: 'Aktion' },
    ],
    rows: [
      {
        person: 'Test1',
        datum: new Date(2026, 7, 9),
        stufe: 'Stufe A',
        kostenstelle: 'KST-001',
        status: new Status('Abgeglichen', 'success'),
        lastChange: new Date(2026, 7, 10),
        action: 'Ticket öffnen',
      },
      {
        person: 'Test2',
        datum: new Date(2026, 7, 9),
        stufe: 'Stufe A',
        kostenstelle: 'KST-001',
        status: new Status('Offen', 'warning'),
        lastChange: null,
        action: 'Ticket öffnen',
      },
      {
        person: 'Test3',
        datum: new Date(2026, 7, 9),
        stufe: 'Stufe A',
        kostenstelle: 'KST-001',
        status: new Status('Konflikt', 'danger'),
        lastChange: new Date(2026, 7, 10),
        action: 'Ticket öffnen',
      },
      {
        person: 'Test4',
        datum: new Date(2026, 7, 9),
        stufe: 'Stufe A',
        kostenstelle: 'KST-001',
        status: new Status('Abgeglichen', 'success'),
        lastChange: new Date(2026, 7, 10),
        action: 'Ticket öffnen',
      },
      {
        person: 'Test5',
        datum: new Date(2026, 7, 9),
        stufe: 'Stufe A',
        kostenstelle: 'KST-001',
        status: new Status('Abgeglichen', 'success'),
        lastChange: null,
        action: 'Ticket öffnen',
      },
      {
        person: 'Test6',
        datum: new Date(2026, 7, 9),
        stufe: 'Stufe A',
        kostenstelle: 'KST-001',
        status: new Status('Abgeglichen', 'success'),
        lastChange: new Date(2026, 7, 10),
        action: 'Ticket öffnen',
      },
      {
        person: 'Test7',
        datum: new Date(2026, 7, 9),
        stufe: 'Stufe A',
        kostenstelle: 'KST-001',
        status: new Status('Abgeglichen', 'success'),
        lastChange: new Date(2026, 7, 10),
        action: 'Ticket öffnen',
      },
      {
        person: 'Test8',
        datum: new Date(2026, 7, 9),
        stufe: 'Stufe A',
        kostenstelle: 'KST-001',
        status: new Status('Abgeglichen', 'success'),
        lastChange: new Date(2026, 7, 10),
        action: 'Ticket öffnen',
      },
    ],
  };

  getTableData(person?: string, costRank?: string, costDepartment?: string, status?: Status) {
    this.data$ = this.http.get('http://localhost:8080/api/table-clearing?'+person).subscribe((data) => {
      console.log(data);
      // @ts-ignore
      this.data = data;
    });
      return this.processedTableData;
  }
}
