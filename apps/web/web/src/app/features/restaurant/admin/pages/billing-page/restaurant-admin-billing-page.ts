import { formatDate } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../../../admin/services/current-user-service';
import { RestaurantAdminSidebar } from '../../components/restaurant-admin-sidebar/restaurant-admin-sidebar';
import { RestaurantBilling, RestaurantMonthlyBilling } from '../../../models/restaurant-ticket.model';
import { RestaurantTicketService } from '../../../services/restaurant-ticket.service';

@Component({
  selector: 'app-restaurant-admin-billing-page',
  imports: [FormsModule, RestaurantAdminSidebar],
  templateUrl: './restaurant-admin-billing-page.html',
  styleUrl: './restaurant-admin-billing-page.scss'
})

export class RestaurantAdminBillingPage implements OnInit {

  billing = signal<RestaurantBilling | undefined>(undefined);
  months = signal<RestaurantMonthlyBilling[]>([]);
  loading = signal(false);
  error = signal(false);

  fromDate = '2026-08-27';
  toDate = '2026-09-01';

  currentUserService = inject(CurrentUserService);
  ticketService = inject(RestaurantTicketService);
  router = inject(Router);

  ngOnInit() {
    let user = this.currentUserService.getUser();

    if(user == null) {
      this.router.navigate(['/restaurant/user/login']);
      return;
    }

    this.getData();
  }

  getData() {
    this.loading.set(true);
    this.error.set(false);

    this.ticketService.getBilling(this.fromDate, this.toDate).subscribe({
      next: data => {
        this.billing.set(data);
        this.loading.set(false);
      },
      error: err => {
        console.log(err);
        this.loading.set(false);
        this.error.set(true);
      }
    });

    this.ticketService.getMonthlyBilling().subscribe({
      next: data => {
        this.months.set(data);
      },
      error: () => {
        this.months.set([]);
      }
    });
  }

  costOrderRows() {
    let data = this.billing();

    if(data == undefined) {
      return [];
    }

    let rows = [];

    for(let name in data.costOrders) {
      rows.push({
        name: name,
        count: data.costOrders[name]
      });
    }

    return rows;
  }

  periodTitle() {
    return this.getFormattedDate(this.fromDate) + ' - ' + this.getFormattedDate(this.toDate);
  }

  getFormattedDate(date: string) {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }
}