import { Component, computed, input } from '@angular/core';
import { BadgeComp } from '../badge-comp/badge-comp';
import { DatePipe } from '@angular/common';
import { Status } from '../status.model';
import { TableData } from '../table.model';

@Component({
  selector: 'app-table-check-conflict-comp',
  imports: [BadgeComp, DatePipe],
  templateUrl: './table-check-conflict-comp.html',
  styleUrl: './table-check-conflict-comp.css',
})
export class TableCheckConflictComp {
  dataEmp = input<TableData>();
  dataTicket = input<TableData>();

  conflictFields = "STUFE"

  protected readonly Status = Status;
  protected readonly Date = Date;
}
