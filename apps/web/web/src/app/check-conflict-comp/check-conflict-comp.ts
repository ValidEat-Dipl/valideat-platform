import { Component, inject, signal } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {TableOverviewComp} from '../table-overview-comp/table-overview-comp';
import {BadgeComp} from '../badge-comp/badge-comp';
import { TableCheckConflictComp } from '../table-check-conflict-comp/table-check-conflict-comp';
import { TableDataOverviewService } from '../table-data-overview-service';
import { TableData } from '../table.model';

@Component({
  selector: 'app-check-conflict-comp',
  imports: [NavComp, BadgeComp, TableCheckConflictComp],
  templateUrl: './check-conflict-comp.html',
  styleUrl: './check-conflict-comp.css',
})
export class CheckConflictComp {
  tableService = inject(TableDataOverviewService);

  dataTable = signal<TableData>({
    headers: [],
    rows: [],
  });
}
