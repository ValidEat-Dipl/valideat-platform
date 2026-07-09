import { Component } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {BadgeComp} from '../badge-comp/badge-comp';

@Component({
  selector: 'app-ticket-details-comp',
  imports: [
    NavComp,
    BadgeComp
  ],
  templateUrl: './ticket-details-comp.html',
  styleUrl: './ticket-details-comp.css',
})
export class TicketDetailsComp {

  conflict = true;

}
