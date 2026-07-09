import {Component, input} from '@angular/core';

@Component({
  selector: 'app-badge-comp',
  imports: [],
  templateUrl: './badge-comp.html',
  styleUrl: './badge-comp.css',
})
export class BadgeComp {

  text = input("Badge");
  bgColor = input("primary");

}
