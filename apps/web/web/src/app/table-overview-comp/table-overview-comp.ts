import {Component, computed, inject, input, InputSignal, OnInit, signal, Signal} from '@angular/core';
import {TableData} from '../table.model';
import {DatePipe} from '@angular/common';
import {Status} from '../status.model';
import {BadgeComp} from '../badge-comp/badge-comp';

@Component({
  selector: 'app-table-admin-overview-comp',
  imports: [DatePipe, BadgeComp],
  standalone: true,
  templateUrl: './table-comp-admin-overview.html',
  styleUrl: './table-comp-admin-overview.css',
})
export class TableCompAdminOverview {
  caption = input<string>('');
  data = input<TableData>();

  length = computed(() => this.data()?.rows.length ?? 0);

  initRow = signal(0);
  maxRows = 5;

  // Copilot #1 Anfang
  visibleRows = computed(() => {
    const rows = this.data()?.rows ?? [];
    return rows.slice(this.initRow(), this.initRow() + this.maxRows);
  });

  protected setInitRowNumber(number: number) {
    this.initRow.set(number);
  }

  protected nextPage() {
    const next = this.initRow() + this.maxRows;
    if (next < this.length()) this.initRow.set(next);
  }

  protected prevPage() {
    const prev = this.initRow() - this.maxRows;
    if (prev >= 0) this.initRow.set(prev);
  }

  protected pageCount = computed(() =>
    Math.ceil(this.length() / this.maxRows),
  );

  protected currentPage = computed(() =>
      Math.floor(this.initRow() / this.maxRows) + 1,
  );
  // Copilot #1 Ende

  protected readonly Date = Date;
  protected readonly Status = Status;
  protected readonly Array = Array;
}
