import { computed, inject, Injectable, Service} from '@angular/core';
import {Status} from './status.model';
import {HttpClient} from '@angular/common/http';
import { FoodTicket } from './food-ticket.model';
import { TableData } from './table.model';

@Injectable({
  providedIn: 'root',
})
export class TableDataService {
  http = inject(HttpClient);

  data: FoodTicket[] = [];
  data$ = this.http.get('http://localhost:8080/api/foodticket')
    .subscribe((data) => {
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
    "headers": [
      "person",
      "datum",
      "stufe",
      "kostenstelle",
      "status"
    ],
    "rows": [
      {
        "person": "Test1",
        "datum": new Date(2026, 7, 9),
        "stufe": "Stufe A",
        "kostenstelle": "KST-001",
        "status": new Status("Abgeglichen", "success"),
      },
      {
        "person": "Test2",
        "datum": new Date(2026, 4, 9),
        "stufe": "Stufe A",
        "kostenstelle": "KST-001",
        "status": new Status("Konflikt", "danger"),
      },
      {
        "person": "Test3",
        "datum": new Date(2026, 5, 9),
        "stufe": "Stufe B",
        "kostenstelle": "KST-002",
        "status": new Status("Offen", "warning"),
      },
      {
        "person": "Test4",
        "datum": new Date(2026, 7, 9),
        "stufe": "Stufe A",
        "kostenstelle": "KST-001",
        "status": new Status("Abgeglichen", "success"),
      },
      {
        "person": "Test5",
        "datum": new Date(2026, 4, 9),
        "stufe": "Stufe A",
        "kostenstelle": "KST-001",
        "status": new Status("Konflikt", "danger"),
      },
      {
        "person": "Test6",
        "datum": new Date(2026, 5, 9),
        "stufe": "Stufe B",
        "kostenstelle": "KST-002",
        "status": new Status("Offen", "warning"),
      },
      {
        "person": "Test7",
        "datum": new Date(2026, 7, 9),
        "stufe": "Stufe A",
        "kostenstelle": "KST-001",
        "status": new Status("Abgeglichen", "success"),
      }
    ]
  }

  getTableData() {
    return this.processedTableData;
  }
}
