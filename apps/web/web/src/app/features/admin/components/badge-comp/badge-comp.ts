import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-badge-comp',
  imports: [],
  templateUrl: './badge-comp.html',
  styleUrl: './badge-comp.css',
})
export class BadgeComp {

  text = input("Badge");
  bgColor = input("");

  icon = computed(() => {
    switch (this.bgColor()) {
      case "success": return "check2-circle";
      case "info": return "clock";
      case "danger": return "exclamation-triangle";
      case "warning": return "exclamation-circle";
      case "secondary": return "archive";
      default: return "";
    }
  })

}
