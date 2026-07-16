import { Component, inject, OnInit } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {BadgeComp} from '../badge-comp/badge-comp';
import { ActivatedRoute } from '@angular/router';
import { TicketDetailService } from '../ticket-detail-service';

@Component({
  selector: 'app-ticket-details-comp',
  imports: [NavComp, BadgeComp],
  templateUrl: './ticket-details-comp.html',
  styleUrl: './ticket-details-comp.css',
})
export class TicketDetailsComp implements OnInit {

  route = inject(ActivatedRoute);
  ticketDetailService = new TicketDetailService();

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.ticketDetailService.loadTicketDetails(id).subscribe(ticket => {
        console.log(ticket);
      });
    });
  }



  conflict = true;
}
