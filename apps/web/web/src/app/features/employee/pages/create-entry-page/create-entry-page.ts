import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeHeader } from '../../components/employee-header/employee-header';
import { EmployeeFoodTicketRequest } from '../../models/employee-food-ticket.model';
import { EmployeeEntryState } from '../../services/employee-entry-state';
import { EmployeeTicketService } from '../../services/employee-ticket.service';

@Component({
  selector: 'app-create-entry-page',
  imports: [EmployeeHeader, ReactiveFormsModule],
  templateUrl: './create-entry-page.html',
  styleUrl: './create-entry-page.scss',
})
export class CreateEntryPage implements OnInit {
  employeeId = 1; // TODO: später vom Login

  // Lokale Entwicklungswerte aus import.sql
  tiers = ['INTERN', 'APPRENTICE', 'EMPLOYEE', 'TEAM_LEAD', 'MANAGER'];
  costOrders = [
    '1000 - Verwaltung',
    '1100 - Personal',
    '1200 - IT',
    '1300 - Buchhaltung',
    '2000 - Produktion',
    '2100 - Logistik',
    '2200 - Einkauf',
    '3000 - Vertrieb',
    '3100 - Marketing',
    '4000 - Forschung & Entwicklung',
  ];
  restaurants = [
    'Gasthaus zur Stadt',
    'Restaurant Adler',
    'Zum Goldenen Löwen',
    'Café Mozart',
    'Bistro am Park',
  ];

  ticketForm = new FormGroup({
    date: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en'), Validators.required),
    employeeName: new FormControl('', Validators.required),
    costOrder: new FormControl('', Validators.required),
    tier: new FormControl('', Validators.required),
    restaurantName: new FormControl('', Validators.required),
    confirmed: new FormControl(false, Validators.requiredTrue),
  });

  constructor(
    private employeeTicketService: EmployeeTicketService,
    private employeeEntryState: EmployeeEntryState,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.employeeEntryState.ticket) {
      this.ticketForm.patchValue({
        ...this.employeeEntryState.ticket,
        confirmed: true,
      });
    }

    this.employeeTicketService.findByEmployee(this.employeeId).subscribe((tickets) => {
      if (tickets.length > 0) {
        this.ticketForm.patchValue({
          employeeName: `${tickets[0].firstName} ${tickets[0].lastName}`,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }

    const formValue = this.ticketForm.value;
    const ticket: EmployeeFoodTicketRequest = {
      date: formValue.date!,
      employeeName: formValue.employeeName!,
      costOrder: formValue.costOrder!,
      tier: formValue.tier!,
      restaurantName: formValue.restaurantName!,
    };

    this.employeeEntryState.ticket = ticket;
    this.employeeEntryState.saved = false;
    this.router.navigate(['/employee/review']);
  }

  cancel(): void {
    this.employeeEntryState.ticket = undefined;
    this.employeeEntryState.saved = false;
    this.router.navigate(['/employee/start']);
  }
}
