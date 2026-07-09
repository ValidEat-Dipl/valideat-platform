import {Component, inject} from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {BadgeComp} from '../badge-comp/badge-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {InfoFlexService} from '../info-flex-service';

@Component({
  selector: 'app-export-comp',
  imports: [
    NavComp,
    ButtonComp,
    BadgeComp,
    InfoFlexComp
  ],
  templateUrl: './export-comp.html',
  styleUrl: './export-comp.css',
})
export class ExportComp {

  infoContainerService = inject(InfoFlexService)

  mapInfoContainer = this.infoContainerService.getInfoContainerMap();
  openConflictsCount = this.mapInfoContainer.get("Offene Konflikte");

}
