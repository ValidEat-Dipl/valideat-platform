import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-employee-header',
  imports: [],
  templateUrl: './employee-header.html',
  styleUrl: './employee-header.scss',
})
export class EmployeeHeader {
  @Input() title = 'ValidEat';
  @Input() showBackButton = false;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
