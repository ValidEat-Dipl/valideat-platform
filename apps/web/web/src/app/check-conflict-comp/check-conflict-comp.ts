import { Component } from '@angular/core';
import {ButtonComp} from '../button-comp/button-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {NavComp} from '../nav-comp/nav-comp';
import {TableComp} from '../table-comp/table-comp';

@Component({
  selector: 'app-check-conflict-comp',
  imports: [
    ButtonComp,
    InfoFlexComp,
    NavComp,
    TableComp
  ],
  templateUrl: './check-conflict-comp.html',
  styleUrl: './check-conflict-comp.css',
})
export class CheckConflictComp {}
