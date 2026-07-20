import {Component, signal} from '@angular/core';
import {BreadcrumbComp} from '../breadcrumb-comp/breadcrumb-comp';

@Component({
  selector: 'app-nav-comp',
  imports: [
    BreadcrumbComp
  ],
  templateUrl: './nav-comp.html',
  styleUrl: './nav-comp.css',
})
export class NavComp {

  datalistHrefs = signal([
    "http://localhost:4200/admin-overview",
    "http://localhost:4200/most-recent-created",
    "http://localhost:4200/clearing-tickets",
    "http://localhost:4200/open-conflicts",
    "http://localhost:4200/export",
  ]);

  datalistLabels = signal([
    "Übersicht",
    "Markerl erfassen",
    "Clearing",
    "Konflikte",
    "Export & Freigabe"
  ]);

  dataListIcons = signal([
    "bar-chart-line",
    "plus",
    "check-circle",
    "exclamation-triangle",
    "download"
  ])

}
