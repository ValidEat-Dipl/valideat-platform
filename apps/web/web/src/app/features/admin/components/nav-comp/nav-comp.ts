import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-nav-comp',
  templateUrl: './nav-comp.html',
  styleUrl: './nav-comp.css',
})
export class NavComp {
  datalistHrefs = signal([
    '/admin-overview',
    '/most-recent-created',
    '/clearing-tickets',
    '/open-conflicts',
    '/export',
  ]);

  datalistLabels = signal([
    'Übersicht',
    'Markerl erfassen',
    'Clearing',
    'Konflikte',
    'Export & Freigabe',
  ]);

  dataListIcons = signal([
    'bar-chart-line',
    'plus',
    'check-circle',
    'exclamation-triangle',
    'download',
  ]);
}
