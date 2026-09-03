import { formatDate } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrentUserService } from '../../../../admin/services/current-user-service';
import { RestaurantHeader } from '../../../components/restaurant-header/restaurant-header';
import { RestaurantTicket } from '../../../models/restaurant-ticket.model';
import { RestaurantTicketService } from '../../../services/restaurant-ticket.service';

@Component({
  selector: 'app-detail-page',
  imports: [RestaurantHeader, RouterLink],
  templateUrl: './detail-page.html',
  styleUrl: './detail-page.scss',
})

export class DetailPage implements OnInit {
  ticket = signal<RestaurantTicket | undefined>(undefined)
  loading = signal(true)
  error = signal(false)

  private restaurantTicketService = inject(RestaurantTicketService)
  private currentUserService = inject(CurrentUserService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)


  ngOnInit(): void {
    let user = this.currentUserService.getUser()
    if (!user) {
      this.router.navigate(['/restaurant/user/login'])
      return
    }


    let id = Number(this.route.snapshot.paramMap.get('id'))

    this.restaurantTicketService.getTickets().subscribe({

      next: (tickets) => {
        this.ticket.set(tickets.find((ticket) => ticket.ticketId == id))

        this.loading.set(false)
      },

      error: () => {
        this.loading.set(false)
        this.error.set(true)
      }

    })
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en')
  }


  getStatusText(status: RestaurantTicket['status']): string {
    if (status === 'CHECKED') return 'Erfolgreich'
    if (status === 'CONFLICT') return 'Konflikt'
    if (status === 'NEEDS_FIXING') return 'Korrektur nötig'
    return 'Offen'
  }


  getStatusClass(status: RestaurantTicket['status']): string {
    if (status === 'CHECKED') return 'text-bg-success'
    if (status === 'CONFLICT') return 'text-bg-danger'
    if (status === 'NEEDS_FIXING') return 'text-bg-warning'
    return 'text-bg-secondary'
  }
}

