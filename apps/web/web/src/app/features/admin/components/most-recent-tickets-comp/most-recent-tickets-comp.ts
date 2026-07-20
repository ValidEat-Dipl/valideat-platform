import { Component, inject, OnInit, signal } from '@angular/core';
import { NavComp } from '../nav-comp/nav-comp';
import { ButtonComp } from '../button-comp/button-comp';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TableOverviewComp } from '../table-overview-comp/table-overview-comp';
import { TableData } from '../../models/table.model';
import { TableDataMostRecentService } from '../../services/table-data-most-recent-service';
import { Status } from '../../models/status.model';

@Component({
  selector: 'app-most-recent-tickets-comp',
  imports: [NavComp, ButtonComp, ReactiveFormsModule, TableOverviewComp],
  templateUrl: './most-recent-tickets-comp.html',
  styleUrl: './most-recent-tickets-comp.css',
})
export class MostRecentTicketsComp implements OnInit {
  tableService = inject(TableDataMostRecentService);

  dataTable = signal<TableData>({
    headers: [],
    rows: [],
  });

  ngOnInit() {
    this.load();
  }

  form = inject(FormBuilder).nonNullable.group({
    person: '',
    fromDate: '',
    toDate: '',
    status: 'ALL',
  });

  protected onSubmit() {
    this.load();
  }

  protected load() {
    this.tableService
      .getTableData(
        this.form.value.person,
        this.form.value.fromDate,
        this.form.value.toDate,
        this.form.value.status,
      )
      .subscribe((data) => {
        this.dataTable.set({
          headers: [
            { key: 'person', label: 'Person' },
            { key: 'datum', label: 'Eingelöst am' },
            { key: 'stufe', label: 'Stufe' },
            { key: 'kostenstelle', label: 'Kostenstelle' },
            { key: 'createdBy', label: 'Erfasst von' },
            { key: 'checkDate', label: 'Prüfdatum' },
            { key: 'status', label: 'Status' },
            { key: 'actionDetail', label: 'Aktion' },
          ],
          rows: data.map((ticket) => ({
            person: ticket.employeeName,
            datum: ticket.useDate,
            stufe: ticket.tier,
            kostenstelle: ticket.costOrder,
            createdBy: ticket.adminName,
            checkDate: ticket.checkDate,
            status: new Status(ticket.status),
            actionDetail: 'Details',
            id: ticket.id
          })),
        });
      });
  }
}
