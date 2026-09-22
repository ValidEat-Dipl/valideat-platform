import { formatDate } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrentUserService } from '../../../../admin/services/current-user-service';
import { RestaurantAdminSidebar } from '../../components/restaurant-admin-sidebar/restaurant-admin-sidebar';
import { RestaurantOverview, RestaurantTicket } from '../../../models/restaurant-ticket.model';
import { RestaurantTicketService } from '../../../services/restaurant-ticket.service';

@Component({
  selector: 'app-restaurant-admin-overview-page',
  imports: [RestaurantAdminSidebar, RouterLink],
  templateUrl: './restaurant-admin-overview-page.html',
  styleUrl: './restaurant-admin-overview-page.scss'
})

export class RestaurantAdminOverviewPage implements OnInit {

  overview = signal<RestaurantOverview | undefined>(undefined);
  tickets = signal<RestaurantTicket[]>([]);
  restaurantName = signal('Restaurant');

  loading = signal(true);
  error = signal(false);

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

    this.ticketService.getOverview().subscribe({
      next: data => {
        this.overview.set(data);
        this.loading.set(false);
      },
      error: err => {
        console.log(err);
        this.loading.set(false);
        this.error.set(true);
      }
    });


    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets.set(tickets);

      if(tickets.length != 0) {
        this.restaurantName.set(tickets[0].restaurant);
      }
    });
  }


  today() {
    return formatDate(new Date(), 'dd.MM.yyyy', 'en');
  }

 lastTickets() {
  let allTickets = this.tickets();
  let lastTickets = [];

  for(let i = 0; i < allTickets.length && i < 3; i++) {
    lastTickets.push(allTickets[i]);
  }

    return lastTickets;
  }


  getStatusText(status: RestaurantTicket['status']) {

    if(status == 'CHECKED') {
      return 'Erfolgreich';
    }

    if(status == 'CONFLICT')
      return 'Bereits eingelöst';

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