import { Component } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';

@Component({
  selector: 'app-create-ticket-comp',
  imports: [
    NavComp,
    ButtonComp
  ],
  templateUrl: './create-ticket-comp.html',
  styleUrl: './create-ticket-comp.css',
})
export class CreateTicketComp {}
