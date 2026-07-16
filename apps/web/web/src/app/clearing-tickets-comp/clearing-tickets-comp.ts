import { Component, inject, OnInit, signal } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableOverviewComp} from '../table-overview-comp/table-overview-comp';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { InfoFlexServiceClearing } from '../info-flex-service-clearing';
import { TableDataClearingService } from '../table-data-clearing-service';
import { TableData } from '../table.model';
import { Status } from '../status.model';

@Component({
  selector: 'app-clearing-tickets-comp',
  imports: [
    NavComp,
    ButtonComp,
    InfoFlexComp,
    ReactiveFormsModule,
    TableOverviewComp
  ],
  templateUrl: './clearing-tickets-comp.html',
  styleUrl: './clearing-tickets-comp.css',
})
export class ClearingTicketsComp implements OnInit {
  tableService = inject(TableDataClearingService);
  infoContainerService = inject(InfoFlexServiceClearing);

  infoContainer = signal<Record<string, number>>({});
  dataTable = signal<TableData>({
    headers: [],
    rows: [],
  });

  ngOnInit() {
    this.load();
  }

  form = inject(FormBuilder).nonNullable.group({
    person: '',
    toDate: '',
    fromDate: '',
    status: 'ALL',
  });

  protected onSubmit() {
    this.load();
  }

  protected load() {
    this.infoContainerService
      .getInfoContainerMap(
        this.form.value.person,
        this.form.value.toDate,
        this.form.value.fromDate,
        this.form.value.status,
      )
      .subscribe((data) => {
        this.infoContainer.set({ ...data });
        console.log(data);
      });

    this.tableService
      .getTableData(
        this.form.value.person,
        this.form.value.toDate,
        this.form.value.fromDate,
        this.form.value.status,
      )
      .subscribe((data) => {
        this.dataTable.set({
          headers: [
            { key: 'person', label: 'Person' },
            { key: 'datum', label: 'Datum' },
            { key: 'status', label: 'Status' },
            { key: 'conflictType', label: 'Konfliktart' },
            { key: 'lastChange', label: 'Letzte Änderung' },
            { key: 'actionOpenCase', label: 'Aktion' },
          ],
          rows: data.map((ticket) => ({
            person: ticket.empTicketEmpName ?? ticket.adminTicketEmpName,
            datum: ticket.empTicketUseDate ?? ticket.adminTicketUseDate,
            status: ticket.empTicketStatus ? new Status(ticket.empTicketStatus) : new Status(ticket.adminTicketStatus),
            conflictType: ticket.empTicketConflict ?? ticket.adminTicketConflict,
            lastChange: ticket.empTicketLog ?? ticket.adminTicketLog,
            actionOpenCase: 'Fall öffnen',
          })),
        });
      });
  }
}
