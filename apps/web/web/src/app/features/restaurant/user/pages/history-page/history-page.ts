import { formatDate } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrentUserService } from '../../../../admin/services/current-user-service';
import { RestaurantHeader } from '../../../components/restaurant-header/restaurant-header';
import { RestaurantNavigation } from '../../../components/restaurant-navigation/restaurant-navigation';
import { RestaurantTicket } from '../../../models/restaurant-ticket.model';
import { RestaurantTicketService } from '../../../services/restaurant-ticket.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-history-page',
  imports: [RestaurantHeader, RestaurantNavigation, RouterLink],
  templateUrl: './history-page.html',
  styleUrl: './history-page.scss',
})
export class HistoryPage implements OnInit {

  tickets = signal<RestaurantTicket[]>([])
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


    this.restaurantTicketService.getTickets().subscribe({

      next: (data) => {
        this.tickets.set(data)
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
    if (status === 'CHECKED') return 'bg-success-subtle text-success'
    if (status === 'CONFLICT') return 'bg-danger-subtle text-danger'
    if (status === 'NEEDS_FIXING') return 'bg-warning-subtle text-warning-emphasis'
    return 'bg-secondary-subtle text-secondary'
  }

  getStatusIcon(status: RestaurantTicket['status']): string {
    if (status === 'CHECKED') return 'bi-check2'
    if (status === 'CONFLICT') return 'bi-exclamation-triangle'
    if (status === 'NEEDS_FIXING') return 'bi-pencil'
    return 'bi-clock'
  }
}
