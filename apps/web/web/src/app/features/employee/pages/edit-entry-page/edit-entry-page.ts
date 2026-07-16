import { Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeHeader } from '../../components/employee-header/employee-header';
import { CostOrder } from '../../models/cost-order.model';
import { EmployeeFoodTicketRequest } from '../../models/employee-food-ticket.model';
import { Restaurant } from '../../models/restaurant.model';
import { Tier } from '../../models/tier.model';
import { EmployeeTicketService } from '../../services/employee-ticket.service';

@Component({
  selector: 'app-edit-entry-page',
  imports: [EmployeeHeader, ReactiveFormsModule],
  templateUrl: './edit-entry-page.html',
  styleUrl: './edit-entry-page.scss',
})
export class EditEntryPage implements OnInit {
  employeeId = 1; // TODO: später vom Login
  ticketId = 0;

  tiers = signal<Tier[]>([]);
  costOrders = signal<CostOrder[]>([]);
  restaurants = signal<Restaurant[]>([]);

  isLoading = signal(true);
  isSaving = signal(false);
  loadError = signal(false);
  saveError = signal(false);

  ticketForm = new FormGroup({
    date: new FormControl('', Validators.required),
    employeeName: new FormControl('', Validators.required),
    costOrder: new FormControl('', Validators.required),
    tier: new FormControl('', Validators.required),
    restaurantName: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeTicketService: EmployeeTicketService,
  ) {}

  ngOnInit(): void {
    this.ticketId = Number(this.route.snapshot.paramMap.get('id'));

    this.employeeTicketService.getTicketById(this.ticketId).subscribe({
      next: (ticket) => {
        if (ticket.status !== 'OPEN') {
          this.router.navigate(['/employee/entries', this.ticketId]);
          return;
        }

        this.ticketForm.patchValue({
          date: ticket.useDate,
          employeeName: `${ticket.firstName} ${ticket.lastName}`,
          costOrder: ticket.costOrder,
          tier: ticket.tier,
          restaurantName: ticket.restaurantName,
        });

        this.isLoading.set(false);
      },
      error: () => {
        this.loadError.set(true);
        this.isLoading.set(false);
      },
    });

    this.employeeTicketService.getRestaurants().subscribe((restaurants) => {
      this.restaurants.set(restaurants);
    });

    this.employeeTicketService.getTiers().subscribe((tiers) => {
      this.tiers.set(tiers);
    });

    this.employeeTicketService.getCostOrders().subscribe((costOrders) => {
      this.costOrders.set(costOrders);
    });
  }

  save(): void {
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

    this.isSaving.set(true);
    this.saveError.set(false);

    this.employeeTicketService.editTicket(this.ticketId, this.employeeId, ticket).subscribe({
      next: () => {
        this.router.navigate(['/employee/entries', this.ticketId]);
      },

      error: () => {

        this.isSaving.set(false);
        this.saveError.set(true);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/employee/entries', this.ticketId]);
  }
}
