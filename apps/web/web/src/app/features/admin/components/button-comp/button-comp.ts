import {Component, input, Input,} from '@angular/core';
@Component({
  selector: 'app-button-comp',
  imports: [],
  templateUrl: './button-comp.html',
  styleUrl: './button-comp.css',
})
export class ButtonComp {
  buttonDesignType = input<string>('primary');
  text = input<string>('Button');
  buttonType = input<string>('button');
  link = input<string>('');
  disabled = input<boolean>(false);
  icon = input<string>('icon');
}
