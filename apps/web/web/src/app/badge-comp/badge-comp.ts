import {Component, computed, input, OnInit} from '@angular/core';

@Component({
  selector: 'app-badge-comp',
  imports: [],
  templateUrl: './badge-comp.html',
  styleUrl: './badge-comp.css',
})
export class BadgeComp {

  text = input("Badge");
  bgColor = input("primary");

  icon = computed(() => {
    switch (this.bgColor()) {
      case "success": return "check2-circle";
      case "warning": return "clock";
      case "danger": return "exclamation-triangle";
      default: return "";
    }
  })

}
