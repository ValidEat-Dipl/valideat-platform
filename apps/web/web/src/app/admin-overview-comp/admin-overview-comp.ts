import { Component, inject, OnInit } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {TableOverviewComp} from '../table-overview-comp/table-overview-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableDataOverviewService} from '../table-data-overview-service';
import {InfoFlexServiceAdminOverview} from '../info-flex-service-admin-overview';

@Component({
  selector: 'app-admin-overview-comp',
  imports: [NavComp, ButtonComp, InfoFlexComp, TableOverviewComp],
  templateUrl: './admin-overview-comp.html',
  styleUrl: './admin-overview-comp.css',
})
export class AdminOverviewComp implements OnInit {
  tableService = inject(TableDataOverviewService);
  infoContainerService = inject(InfoFlexServiceAdminOverview);

  lastYear: boolean = false;

  infoContainer: Record<string, number> = {};
  dataTable: any;

  ngOnInit() {
    this.loadData();
  }

  protected onToggleLastYear() {
    this.lastYear = !this.lastYear;
    this.loadData();
  }

  private loadData() {
    this.infoContainerService.getInfoContainerMap(this.lastYear).subscribe((data) => {
      this.infoContainer = data;
      console.log(data)
    });

    this.dataTable = this.tableService.getTableData();
  }
}
