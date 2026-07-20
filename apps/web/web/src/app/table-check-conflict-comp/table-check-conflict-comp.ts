import { Component, input, output } from '@angular/core';
import { BadgeComp } from '../badge-comp/badge-comp';
import { Status } from '../status.model';
import { TableData } from '../table.model';
import { ButtonComp } from '../button-comp/button-comp';

@Component({
  selector: 'app-table-check-conflict-comp',
  imports: [BadgeComp, ButtonComp],
  templateUrl: './table-check-conflict-comp.html',
  styleUrl: './table-check-conflict-comp.css',
})
export class TableCheckConflictComp {
  data = input<TableData>();

  conflictFields: any;

  correctEmployee = output<void>();
  correctAdmin = output<void>();
  protected onCorrectEmployee() { this.correctEmployee.emit(); }
  protected onCorrectAdmin() { this.correctAdmin.emit(); }

  protected readonly Status = Status;
  protected readonly Date = Date;
}
