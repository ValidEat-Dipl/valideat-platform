import { Component } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {BreadcrumbComp} from '../breadcrumb-comp/breadcrumb-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {TableComp} from '../table-comp/table-comp';

@Component({
  selector: 'app-admin-overview-comp',
  imports: [
    NavComp,
    ButtonComp,
    TableComp
  ],
  templateUrl: './admin-overview-comp.html',
  styleUrl: './admin-overview-comp.css',
})
export class AdminOverviewComp {
  protected readonly toString = toString;
}
