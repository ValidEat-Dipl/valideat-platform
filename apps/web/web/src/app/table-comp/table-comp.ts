import {Component, input, InputSignal, OnInit} from '@angular/core';
import {TableData} from '../table.model';
import {DatePipe} from '@angular/common';
import {Status} from '../status.model';
import {BadgeComp} from '../badge-comp/badge-comp';

@Component({
  selector: 'app-table-comp',
  imports: [
    DatePipe,
    BadgeComp
  ],
  standalone: true,
  templateUrl: './table-comp.html',
  styleUrl: './table-comp.css',
})
export class TableComp{

  caption = input<string>("");
  data = input<TableData>();

  protected readonly Date = Date;

  protected readonly Status = Status;
}
