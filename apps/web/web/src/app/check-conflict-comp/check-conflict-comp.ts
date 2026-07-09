import { Component } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {TableComp} from '../table-comp/table-comp';
import {BadgeComp} from '../badge-comp/badge-comp';

@Component({
  selector: 'app-check-conflict-comp',
  imports: [
    NavComp,
    TableComp,
    BadgeComp
  ],
  templateUrl: './check-conflict-comp.html',
  styleUrl: './check-conflict-comp.css',
})
export class CheckConflictComp {}
