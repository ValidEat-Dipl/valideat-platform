import {Component, inject, input} from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableOverviewComp} from '../table-overview-comp/table-overview-comp';
import {InfoFlexServiceAdminOverview} from '../info-flex-service-admin-overview';

@Component({
  selector: 'app-open-conflicts-comp',
  imports: [
    NavComp,
    ButtonComp,
    InfoFlexComp
  ],
  templateUrl: './open-conflicts-comp.html',
  styleUrl: './open-conflicts-comp.css',
})
export class OpenConflictsComp {

  infoContainerService = inject(InfoFlexServiceAdminOverview)

  mapInfoContainer = this.infoContainerService.getInfoContainerMap();
  openConflictsCount = 0;

}
