import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CurrentUserService } from '../../../../admin/services/current-user-service';
import { RestaurantTicketService } from '../../../services/restaurant-ticket.service';

@Component({
  selector: 'app-restaurant-admin-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './restaurant-admin-sidebar.html',
  styleUrl: './restaurant-admin-sidebar.scss'
})

export class RestaurantAdminSidebar {

  restaurantName = signal('Restaurant');

  currentUserService = inject(CurrentUserService);
  ticketService = inject(RestaurantTicketService);

  constructor() {
    let user = this.currentUserService.getUser();

    if(user) {
      this.ticketService.getTickets().subscribe(tickets => {

        if(tickets.length != 0) {
          this.restaurantName.set(tickets[0].restaurant);
        }

      });
    }
  }
}