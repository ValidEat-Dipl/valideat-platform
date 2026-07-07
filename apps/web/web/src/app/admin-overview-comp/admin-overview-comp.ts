import { Component } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {BreadcrumbComp} from '../breadcrumb-comp/breadcrumb-comp';
import {ButtonComp} from '../button-comp/button-comp';

@Component({
  selector: 'app-admin-overview-comp',
  imports: [
    NavComp,
    BreadcrumbComp,
    ButtonComp
  ],
  templateUrl: './admin-overview-comp.html',
  styleUrl: './admin-overview-comp.css',
})
export class AdminOverviewComp {}
