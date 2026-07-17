import { Component, inject, OnInit, signal } from '@angular/core';
import { NavComp } from '../nav-comp/nav-comp';
import { InfoFlexComp } from '../info-flex-comp/info-flex-comp';
import { TableOverviewComp } from '../table-overview-comp/table-overview-comp';
import { OpenConflictsService } from '../open-conflicts-service';
import { FoodTicketConflictResponse } from '../food-ticket-conflict.model';
import { TableData } from '../table.model';
import { Status } from '../status.model';

@Component({
  selector: 'app-open-conflicts-comp',
  imports: [NavComp, InfoFlexComp, TableOverviewComp],
  templateUrl: './open-conflicts-comp.html',
  styleUrl: './open-conflicts-comp.css',
})
export class OpenConflictsComp implements OnInit {
  dataService = inject(OpenConflictsService);

  dataResponse = signal<FoodTicketConflictResponse>({
    conflicts: [],
    count: 0,
  });

  dataTable = signal<TableData>({
    headers: [],
    rows: [],
  });

  ngOnInit() {
    this.loadData();
  }

  protected loadData() {
    this.dataService.getData().subscribe((data) => {
      this.dataResponse.set(data);

      this.dataTable.set({
        headers: [
          { key: 'person', label: 'Person' },
          { key: 'datum', label: 'Datum' },
          { key: 'conflict', label: 'Konfliktart' },
          { key: 'wrongField', label: 'Betroffene Angaben' },
          { key: 'status', label: 'Status' },
          { key: 'lastChange', label: 'Letzte Änderung' },
          { key: 'actionDetail', label: 'Aktion' },
        ],

        rows: data.conflicts.map((ticket) => ({
          person: ticket.empName,
          datum: ticket.useDate,
          conflict: ticket.conflict ?? 'Kein Gegenstück gefunden',
          wrongField: ticket.wrongField,
          status: new Status(ticket.status),
          lastChange: ticket.changeLogs?.[0]?.changeDate ?? 'Noch keine Änderung vorgenommen',
          actionDetail: 'Details',
          id: ticket.id,
        })),
      });
      console.log(this.dataResponse().conflicts[0].status);
    });
  }
}
