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
import { DateRangePickerComp } from '../date-range-picker-comp/date-range-picker-comp';

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
            { key: 'lastChange', label: 'Letzte Änderung' },
            { key: 'actionOpenCase', label: 'Aktion' },
          ],
          rows: data.map((ticket) => ({
            person: ticket.employee.firstName + ' ' + ticket.employee.lastName,
            datum: ticket.useDate,
            status: new Status(ticket.status),
            lastChange: ticket.changeLog,
            action: 'Fall öffnen',
          })),
        });
      });
  }
}
