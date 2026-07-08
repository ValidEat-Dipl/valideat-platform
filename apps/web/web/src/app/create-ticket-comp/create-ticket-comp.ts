import { Component } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {ReactiveFormsModule} from '@angular/forms';
import {ReactFormComp} from '../react-form-comp/react-form-comp';

@Component({
  selector: 'app-create-ticket-comp',
  imports: [
    NavComp,
    ReactiveFormsModule,
    ReactFormComp
  ],
  templateUrl: './create-ticket-comp.html',
  styleUrl: './create-ticket-comp.css',
})
export class CreateTicketComp {
}
