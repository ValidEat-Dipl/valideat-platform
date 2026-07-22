import {Component, inject} from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {BadgeComp} from '../badge-comp/badge-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {InfoFlexServiceAdminOverview} from '../../services/info-flex-service-admin-overview';
import { ExportService } from '../../services/export-service';

@Component({
  selector: 'app-export-comp',
  imports: [NavComp, ButtonComp, InfoFlexComp],
  templateUrl: './export-comp.html',
  styleUrl: './export-comp.css',
})
export class ExportComp {
  infoContainerService = inject(InfoFlexServiceAdminOverview);
  downloadCsvService = inject(ExportService);

  mapInfoContainer = this.infoContainerService.getInfoContainerMap();
  openConflictsCount = 0;

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
