import { Component } from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';

@Component({
  selector: 'app-export-comp',
  imports: [
    NavComp,
    ButtonComp
  ],
  templateUrl: './export-comp.html',
  styleUrl: './export-comp.css',
})
export class ExportComp {}
