import { Component, inject, OnInit, signal } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {TableOverviewComp} from '../table-overview-comp/table-overview-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableDataOverviewService} from '../../services/table-data-overview-service';
import {InfoFlexServiceAdminOverview} from '../../services/info-flex-service-admin-overview';
import { FormsModule } from '@angular/forms';
import { TableData } from '../../models/table.model';
import { Status } from '../../models/status.model';

@Component({
  selector: 'app-admin-overview-comp',
  imports: [NavComp, ButtonComp, InfoFlexComp, TableOverviewComp, FormsModule],
  templateUrl: './admin-overview-comp.html',
  styleUrl: './admin-overview-comp.css',
})
export class AdminOverviewComp implements OnInit {
  tableService = inject(TableDataOverviewService);
  infoContainerService = inject(InfoFlexServiceAdminOverview);

  sortBy: 'asc' | 'desc' | null = null;
  lastYear: boolean = false;

  infoContainer = signal<Record<string, number>>({});
  dataTable = signal<TableData>({
    headers: [],
    rows: [],
  });

  ngOnInit() {
    this.loadData();
  }

  onToggleLastYear() {
    this.loadData();
  }
  protected onSortChange(direction: 'asc' | 'desc' | null) {
    this.sortBy = direction;
    this.loadData();
  }

  protected loadData() {
    this.infoContainerService.getInfoContainerMap(this.lastYear).subscribe((data) => {
      this.infoContainer.set({ ...data });
    });

    this.tableService.getTableData(this.lastYear, this.sortBy ?? undefined).subscribe((data) => {
      this.dataTable.set({
        headers: [
          { key: 'typ', label: 'Tickettyp' },
          { key: 'person', label: 'Person' },
          { key: 'datum', label: 'Datum' },
          { key: 'stufe', label: 'Stufe' },
          { key: 'kostenstelle', label: 'Kostenstelle' },
          { key: 'status', label: 'Status' },
          { key: 'actionDetail', label: 'Aktion' },
        ],
        rows: data.map((ticket) => ({
          person: ticket.employee.firstName + ' ' + ticket.employee.lastName,
          datum: ticket.useDate,
          stufe: ticket.tier.name,
          kostenstelle: ticket.costOrder.name,
          typ: ticket.ticketType,
          status: new Status(ticket.status),
          actionDetail: 'Details',
          id: ticket.id,
        })),
      });
    });
  }
}
