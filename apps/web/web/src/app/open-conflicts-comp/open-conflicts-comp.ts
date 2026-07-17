import {Component, inject, input} from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableOverviewComp} from '../table-overview-comp/table-overview-comp';
import { OpenConflictsService } from '../open-conflicts-service';

@Component({
  selector: 'app-open-conflicts-comp',
  imports: [NavComp, ButtonComp, InfoFlexComp, TableOverviewComp],
  templateUrl: './open-conflicts-comp.html',
  styleUrl: './open-conflicts-comp.css',
})
export class OpenConflictsComp {
  dataService = inject(OpenConflictsService);
  

}
