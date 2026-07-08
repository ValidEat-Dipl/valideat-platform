import { Component } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableComp} from '../table-comp/table-comp';

@Component({
  selector: 'app-clearing-tickets-comp',
  imports: [
    NavComp,
    ButtonComp,
    InfoFlexComp,
    TableComp
  ],
  templateUrl: './clearing-tickets-comp.html',
  styleUrl: './clearing-tickets-comp.css',
})
export class ClearingTicketsComp {}
