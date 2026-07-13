import {Component, inject} from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableOverviewComp} from '../table-overview-comp/table-overview-comp';
import {TableDataOverviewService} from '../table-data-overview-service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { InfoFlexServiceClearing } from '../info-flex-service-clearing';
import { TableDataClearingService } from '../table-data-clearing-service';
import { Status } from '../status.model';

@Component({
  selector: 'app-clearing-tickets-comp',
  imports: [NavComp, ButtonComp, InfoFlexComp, ReactiveFormsModule, TableOverviewComp],
  templateUrl: './clearing-tickets-comp.html',
  styleUrl: './clearing-tickets-comp.css',
})
export class ClearingTicketsComp {
  tableService = inject(TableDataClearingService);
  infoContainerService = inject(InfoFlexServiceClearing);

  mapInfoContainer = this.infoContainerService.getInfoContainerMap();
  dataTable = this.tableService.getTableData();

  form = inject(FormBuilder).nonNullable.group({
    person: '',
    dateTicket: '',
    costRank: '',
    costDepartment: '',
    status: '',
  });

  protected onSubmit() {
    this.dataTable = this.tableService.getTableData(
      this.form.value.person,
      this.form.value.costRank,
      this.form.value.costDepartment,
      this.form.value.status
    );
  }

  protected onReset() {
    this.dataTable = this.tableService.getTableData();
  }
}
