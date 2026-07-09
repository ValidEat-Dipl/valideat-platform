import {Component, input, InputSignal} from '@angular/core';

@Component({
  selector: 'app-info-flex-comp',
  imports: [],
  templateUrl: './info-flex-comp.html',
  styleUrl: './info-flex-comp.css',
})
export class InfoFlexComp {

  data: InputSignal<Map<string, number> | undefined> = input<Map<string, number>>();

}
