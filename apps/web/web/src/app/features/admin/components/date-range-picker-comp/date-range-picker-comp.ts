import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker-comp',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './date-range-picker-comp.html',
  styleUrl: './date-range-picker-comp.css',
})
export class DateRangePickerComp {
  fromDate: string = '';
  toDate: string = '';

  @Output()
  dateRangeChange = new EventEmitter<{
    from: string;
    to: string;
  }>();

  protected onDateChange() {
    this.dateRangeChange.emit({
      from: this.fromDate,
      to: this.toDate,
    });
  }

  protected clearDates() {
    this.fromDate = '';
    this.toDate = '';

    this.onDateChange();
  }

  protected isInvalidRange(): boolean {
    if (!this.fromDate || !this.toDate) {
      return false;
    }

    return new Date(this.fromDate) > new Date(this.toDate);
  }
}
