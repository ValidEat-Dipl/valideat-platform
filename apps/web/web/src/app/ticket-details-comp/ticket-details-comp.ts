import { Component, inject, OnInit, signal } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {BadgeComp} from '../badge-comp/badge-comp';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketDetailService } from '../ticket-detail-service';
import { FoodTicketDetail } from '../food-ticket-detail.model';
import { TableData } from '../table.model';
import { Status } from '../status.model';
import { ButtonComp } from '../button-comp/button-comp';
import { delay } from 'rxjs';

@Component({
  selector: 'app-ticket-details-comp',
  imports: [NavComp, BadgeComp, ButtonComp],
  templateUrl: './ticket-details-comp.html',
  styleUrl: './ticket-details-comp.css',
})
export class TicketDetailsComp implements OnInit {
  route = inject(ActivatedRoute);
  ticketDetailService = inject(TicketDetailService);

  dataDetail = signal<TableData>({
    headers: [],
    rows: [],
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.ticketDetailService.loadTicketDetails(id).subscribe((ticket) => {
        this.dataDetail.set({
          headers: [
            { key: 'person', label: 'Mitarbeiter' },
            { key: 'datum', label: 'Datum' },
            { key: 'stufe', label: 'Stufe' },
            { key: 'kostenstelle', label: 'Kostenstelle' },
            { key: 'restaurant', label: 'Restaurant' },
            { key: 'checkDate', label: 'Prüfdatum' },
            { key: 'adminName', label: 'Erfasst von' }
          ],
          rows: [
            {
              person: ticket.firstName + ' ' + ticket.lastName,
              datum: ticket.useDate,
              stufe: ticket.tier,
              kostenstelle: ticket.costOrder,
              restaurant: ticket.restaurantName,
              checkDate: ticket.checkDate,
              status: new Status(ticket.status),
              adminName: ticket.adminFirstName+' '+ ticket.adminLastName,
              id: ticket.id,
            },
          ],
        });
      });
    });
  }

  protected asStatus(value: unknown): Status | null {
    return value instanceof Status ? value : null;
  }
}
