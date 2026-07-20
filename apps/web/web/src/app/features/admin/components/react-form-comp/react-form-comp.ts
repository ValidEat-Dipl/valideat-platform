import { Component, inject, OnInit } from '@angular/core';
import {ButtonComp} from "../button-comp/button-comp";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import { CreateAdminTicketService } from '../../services/create-admin-ticket-service';
import { Router } from '@angular/router';
import { EmployeeTicketService } from '../../../employee/services/employee-ticket.service';
import { Restaurant } from '../../../employee/models/restaurant.model';
import { Tier } from '../../models/tier.model';
import { CostOrder } from '../../models/costOrder.model';

@Component({
  selector: 'app-react-form-comp',
  imports: [ButtonComp, ReactiveFormsModule],
  templateUrl: './react-form-comp.html',
  styleUrl: './react-form-comp.css',
})
export class ReactFormComp implements OnInit {
  createAdminTicketService = inject(CreateAdminTicketService);
  router = inject(Router);
  dropdownService = inject(EmployeeTicketService);
  costOrders: CostOrder[] = [];
  restaurants: Restaurant[] = [];
  tiers: Tier[] = [];

  ngOnInit() {
    this.dropdownService.getCostOrders().subscribe((data) => {
      this.costOrders = data;
    });

    this.dropdownService.getRestaurants().subscribe((data) => {
      this.restaurants = data;
    });

    this.dropdownService.getTiers().subscribe((data) => {
      this.tiers = data;
    });
  }

  form = inject(FormBuilder).nonNullable.group({
    username: ['', Validators.required],
    useDate: ['', Validators.required],
    costDepartment: ['', Validators.required],
    costRank: ['', Validators.required],
    restaurant: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.createAdminTicketService
      .createAdminTicket({
        useDate: this.form.value.useDate!,
        employeeName: this.form.value.username!,
        costOrder: this.form.value.costDepartment!,
        tier: this.form.value.costRank!,
        restaurantName: this.form.value.restaurant!,
        adminName: 'David Leitner'
      })
      .subscribe({
        next: () => {
          this.form.reset();
        },
      });
  }
}
