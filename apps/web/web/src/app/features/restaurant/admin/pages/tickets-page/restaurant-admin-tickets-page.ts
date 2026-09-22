import { formatDate } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../../../admin/services/current-user-service';
import { RestaurantAdminSidebar } from '../../components/restaurant-admin-sidebar/restaurant-admin-sidebar';
import { RestaurantTicket } from '../../../models/restaurant-ticket.model';
import { RestaurantTicketService } from '../../../services/restaurant-ticket.service';

@Component({
  selector: 'app-restaurant-admin-tickets-page',
  imports: [FormsModule, RestaurantAdminSidebar],
  templateUrl: './restaurant-admin-tickets-page.html',
  styleUrl: './restaurant-admin-tickets-page.scss'
})

export class RestaurantAdminTicketsPage implements OnInit {

  tickets = signal<RestaurantTicket[]>([]);
  restaurantName = signal('Restaurant');

  loading = signal(false);
  error = signal(false);

  fromDate = '';
  toDate = '';
  status = '';
  costOrder = '';

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

    this.ticketService.getTicketsWithFilter(
      this.status,
      this.fromDate,
      this.toDate,
      this.costOrder
    ).subscribe({
      
      next: tickets => {
        this.tickets.set(tickets);

        if(tickets.length != 0) {
          this.restaurantName.set(tickets[0].restaurant);
        }

        this.loading.set(false);
      },

      error: err => {
        console.log(err);
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }


  resetFilter() {
    this.fromDate = '';
    this.toDate = '';
    this.status = '';
    this.costOrder = '';

    this.getData();
  }


  getStatusText(status: RestaurantTicket['status']) {

    if(status == 'CHECKED') {
      return 'Erfolgreich';
    }

    if(status == 'CONFLICT') {
      return 'Bereits eingelöst';
    }

    if(status == 'NEEDS_FIXING') {
      return 'Ungültig';
    }

    return 'Offen';
  }


  getStatusClass(status: RestaurantTicket['status']) {

    if(status == 'CHECKED')
      return 'text-bg-success';

    if(status == 'CONFLICT')
      return 'text-bg-warning';

    if(status == 'NEEDS_FIXING')
      return 'text-bg-danger';

    return 'text-bg-secondary';
  }


  formatTicketDate(date: string) {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }
}