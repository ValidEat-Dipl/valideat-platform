import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {BadgeComp} from '../badge-comp/badge-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {InfoFlexServiceAdminOverview} from '../../services/info-flex-service-admin-overview';
import { ExportService } from '../../services/export-service';
import { InfoFlexServiceExport } from '../../services/info-flex-service-export';
import { RouterLink } from '@angular/router';
import { TableOverviewComp } from '../table-overview-comp/table-overview-comp';
import { FoodTicket } from '../../models/food-ticket.model';
import { TableData } from '../../models/table.model';
import { TableDataExpiredService } from '../../services/table-data-expired-service';
import { Status } from '../../models/status.model';

@Component({
  selector: 'app-export-comp',
  imports: [NavComp, ButtonComp, InfoFlexComp, TableOverviewComp],
  templateUrl: './export-comp.html',
  styleUrl: './export-comp.css',
})
export class ExportComp implements OnInit {
  infoContainerService = inject(InfoFlexServiceExport);
  downloadCsvService = inject(ExportService);
  tableDataExpiredService = inject(TableDataExpiredService);

  infoContainer = signal<Record<string, number>>({});
  openConflictsCount = signal<number>(0);
  dataTable = signal<TableData>({
    headers: [],
    rows: [],
  });

  ngOnInit() {
    this.load();
  }

  protected load() {
    this.infoContainerService.getInfoContainerMap().subscribe((data) => {
      this.infoContainer.set({ ...data });
      this.openConflictsCount.set(data['Offene Konflikte']);
    });

    this.tableDataExpiredService.getExpiredTickets().subscribe((data) => {
      this.dataTable.set({
        headers: [
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
          status: new Status(ticket.status),
          actionDetail: 'Details',
          id: ticket.id,
        })),
      });
    })
  }

  protected downloadCsvFile() {
    if (this.openConflictsCount() < 0) {
      this.downloadCsvService.downloadCsvFile().subscribe((blob) => {
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'foodtickets.csv';
        link.click();

        window.URL.revokeObjectURL(url);
      });
    }
  }
}
