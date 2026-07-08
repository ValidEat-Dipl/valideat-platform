import {Component, input} from '@angular/core';

@Component({
  selector: 'app-table-comp',
  imports: [],
  templateUrl: './table-comp.html',
  styleUrl: './table-comp.css',
})
export class TableComp {

  caption = input<string>("");
  data = input();

}
