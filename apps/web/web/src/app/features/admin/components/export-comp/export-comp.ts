import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {BadgeComp} from '../badge-comp/badge-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {InfoFlexServiceAdminOverview} from '../../services/info-flex-service-admin-overview';
import { ExportService } from '../../services/export-service';
import { InfoFlexServiceExport } from '../../services/info-flex-service-export';

@Component({
  selector: 'app-export-comp',
  imports: [NavComp, ButtonComp, InfoFlexComp],
  templateUrl: './export-comp.html',
  styleUrl: './export-comp.css',
})
export class ExportComp implements OnInit {
  infoContainerService = inject(InfoFlexServiceExport);
  downloadCsvService = inject(ExportService);

  infoContainer = signal<Record<string, number>>({});
  openConflictsCount = signal<number>(0);

  ngOnInit() {
    this.load();
  }

  protected load() {
    this.infoContainerService
      .getInfoContainerMap()
      .subscribe((data) => {
        this.infoContainer.set({ ...data });
        this.openConflictsCount.set(data["Offene Konflikte"]);
      });

  }

  protected downloadCsvFile() {
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
