import { Component } from '@angular/core';
import {BreadcrumbComp} from '../breadcrumb-comp/breadcrumb-comp';

@Component({
  selector: 'app-nav-comp',
  imports: [
    BreadcrumbComp
  ],
  templateUrl: './nav-comp.html',
  styleUrl: './nav-comp.css',
})
export class NavComp {}
