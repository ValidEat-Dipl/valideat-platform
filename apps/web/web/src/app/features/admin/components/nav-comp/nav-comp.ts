import {Component, signal} from '@angular/core';
import {BreadcrumbComp} from '../breadcrumb-comp/breadcrumb-comp';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-comp',
  imports: [BreadcrumbComp],
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
