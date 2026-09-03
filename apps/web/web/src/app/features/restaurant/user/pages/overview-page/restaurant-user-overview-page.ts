import { formatDate } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrentUserService } from '../../../../admin/services/current-user-service';
import { RestaurantHeader } from '../../../components/restaurant-header/restaurant-header';
import { RestaurantNavigation } from '../../../components/restaurant-navigation/restaurant-navigation';
import { RestaurantOverview, RestaurantTicket } from '../../../models/restaurant-ticket.model';
import { RestaurantTicketService } from '../../../services/restaurant-ticket.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-restaurant-user-overview-page',
  imports: [RestaurantHeader, RestaurantNavigation, RouterLink],
  templateUrl: './restaurant-user-overview-page.html',
  styleUrl: './restaurant-user-overview-page.scss',
})
export class RestaurantUserOverviewPage implements OnInit {
  overview = signal<RestaurantOverview | undefined>(undefined)
  tickets = signal<RestaurantTicket[]>([])
  restaurantName = signal('Restaurant')
  loading = signal(true)
  error = signal(false)

  private restaurantTicketService = inject(RestaurantTicketService)
  private currentUserService = inject(CurrentUserService)

  private router = inject(Router)


  ngOnInit(): void {
    let user = this.currentUserService.getUser()
    if (!user) {
      this.router.navigate(['/restaurant/user/login'])
      return
    }

    this.restaurantTicketService.getOverview().subscribe({

      next: (data) => {
        this.overview.set(data)
        this.loading.set(false)
      },

      error: () => {
        this.loading.set(false)
        this.error.set(true)
      }
    })

    this.restaurantTicketService.getTickets().subscribe((data) => {
      this.tickets.set(data)

      if (data.length > 0) {
        this.restaurantName.set(data[0].restaurant)
      }

    })
  }

  todayCount(): number {
    let today = formatDate(new Date(), 'yyyy-MM-dd', 'en')
    return this.tickets().filter((ticket) => ticket.useDate == today).length
  }
}
