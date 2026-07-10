import {inject, Injectable, Service} from '@angular/core';
import {Status} from './status.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  http = inject(HttpClient);

  /*rawData = this.http.get('http://localhost:8080/getTicketList')*/
  rawData = {
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
        "person": "Test1",
        "datum": new Date(2026, 5, 9),
        "stufe": "Stufe B",
        "kostenstelle": "KST-002",
        "status": new Status("Offen", "warning"),
      },
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
        "person": "Test1",
        "datum": new Date(2026, 5, 9),
        "stufe": "Stufe B",
        "kostenstelle": "KST-002",
        "status": new Status("Offen", "warning"),
      },
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
        "person": "Test1",
        "datum": new Date(2026, 5, 9),
        "stufe": "Stufe B",
        "kostenstelle": "KST-002",
        "status": new Status("Offen", "warning"),
      },
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
        "person": "Test1",
        "datum": new Date(2026, 5, 9),
        "stufe": "Stufe B",
        "kostenstelle": "KST-002",
        "status": new Status("Offen", "warning"),
      }
    ]
  }

  getTableData() {
    return this.rawData
  }
}
