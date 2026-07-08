import {Component, input, Input,} from '@angular/core';
@Component({
  selector: 'app-button-comp',
  imports: [],
  templateUrl: './button-comp.html',
  styleUrl: './button-comp.css',
})
export class ButtonComp {

  buttonType = input<string>("primary");
  text = input<string>("Button");

}
