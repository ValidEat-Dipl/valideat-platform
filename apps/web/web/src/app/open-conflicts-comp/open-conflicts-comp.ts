import { Component } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableComp} from '../table-comp/table-comp';

@Component({
  selector: 'app-open-conflicts-comp',
  imports: [
    NavComp,
    ButtonComp,
    InfoFlexComp,
    TableComp
  ],
  templateUrl: './open-conflicts-comp.html',
  styleUrl: './open-conflicts-comp.css',
})
export class OpenConflictsComp {

  openConflictsCount = 1;

}
