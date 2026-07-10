import { Component, inject } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {TableComp} from '../table-comp/table-comp';
import {BadgeComp} from '../badge-comp/badge-comp';
import { TableCheckConflictComp } from '../table-check-conflict-comp/table-check-conflict-comp';
import { TableDataService } from '../table-data-service';

@Component({
  selector: 'app-check-conflict-comp',
  imports: [NavComp, TableComp, BadgeComp, TableCheckConflictComp],
  templateUrl: './check-conflict-comp.html',
  styleUrl: './check-conflict-comp.css',
})
export class CheckConflictComp {

  tableService = inject(TableDataService)

  dataTable = this.tableService.getTableData()

}
