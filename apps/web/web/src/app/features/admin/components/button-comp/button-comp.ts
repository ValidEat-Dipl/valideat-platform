import { Component, HostBinding, input, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-button-comp',
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

  @HostBinding('class.disabled-button')
  get isDisabled() {
    return this.disabled();
  }
}
