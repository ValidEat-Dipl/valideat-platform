import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-employee-navigation',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './employee-navigation.html',
  styleUrl: './employee-navigation.scss',
})
export class EmployeeNavigation {}
