import { Component, inject, OnInit, signal } from '@angular/core';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { CurrentUserService } from '../../../../admin/services/current-user-service';
import { RestaurantAdminSidebar } from '../../components/restaurant-admin-sidebar/restaurant-admin-sidebar';
import { RestaurantTicketService } from '../../../services/restaurant-ticket.service';

@Component({
  selector: 'app-restaurant-admin-settings-page',
  imports: [RestaurantAdminSidebar],
  templateUrl: './restaurant-admin-settings-page.html',
  styleUrl: './restaurant-admin-settings-page.scss'
})

export class RestaurantAdminSettingsPage implements OnInit {

  restaurantName = signal('Restaurant');
  lastScan = signal('Keine Einlösung vorhanden');

  contactName = signal('Restaurant Admin');
  contactMail = signal('restaurant-admin@example.invalid');

  currentUserService = inject(CurrentUserService);
  ticketService = inject(RestaurantTicketService);
  router = inject(Router);

  

  ngOnInit() {
    let user = this.currentUserService.getUser();

    if(user == null) {
      this.router.navigate(['/restaurant/user/login']);
      return;
    }

    let name = user.firstName + ' ' + user.lastName;

    this.contactName.set(name);
    this.contactMail.set(user.email);


    this.ticketService.getTickets().subscribe(tickets => {

      if(tickets.length != 0) {
        let ticket = tickets[0];

        this.restaurantName.set(ticket.restaurant);

        let date = formatDate(ticket.useDate, 'dd.MM.yyyy', 'en');
        this.lastScan.set(date);
      }
    });
  }
}