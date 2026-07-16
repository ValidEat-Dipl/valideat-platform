import { Component, inject, OnInit, signal } from '@angular/core';
import { BadgeComp } from '../badge-comp/badge-comp';
import { ButtonComp } from '../button-comp/button-comp';
import { NavComp } from '../nav-comp/nav-comp';
import { ActivatedRoute } from '@angular/router';
import { TicketDetailService } from '../ticket-detail-service';
import { TableData } from '../table.model';
import { Status } from '../status.model';

@Component({
  selector: 'app-correct-ticket-comp',
  imports: [BadgeComp, ButtonComp, NavComp],
  templateUrl: './correct-ticket-comp.html',
  styleUrl: './correct-ticket-comp.css',
})
export class CorrectTicketComp implements OnInit {
  route = inject(ActivatedRoute);
  ticketDetailService = new TicketDetailService();

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
              id: ticket.id,
            },
          ],
        });
        console.log(this.dataDetail());
      });
    });
  }

  protected asStatus(value: unknown): Status | null {
    return value instanceof Status ? value : null;
  }
}
