import {Component, inject} from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {TableComp} from '../table-comp/table-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableDataService} from '../table-data-service';
import {InfoFlexService} from '../info-flex-service';

@Component({
  selector: 'app-admin-overview-comp',
  imports: [
    NavComp,
    ButtonComp,
    TableComp,
    InfoFlexComp
  ],
  templateUrl: './admin-overview-comp.html',
  styleUrl: './admin-overview-comp.css',
})
export class AdminOverviewComp {

  tableService = inject(TableDataService)
  infoContainerService = inject(InfoFlexService)

  mapInfoContainer = this.infoContainerService.getInfoContainerMap()
  dataTable = this.tableService.getTableData()

}
