import {Component, inject} from '@angular/core';
import {ButtonComp} from "../button-comp/button-comp";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-react-form-comp',
    imports: [
        ButtonComp,
        ReactiveFormsModule
    ],
  templateUrl: './react-form-comp.html',
  styleUrl: './react-form-comp.css',
})
export class ReactFormComp {

  form = inject(FormBuilder)
    .nonNullable.group({
      username: [''],
      dateTicket: [''],
      costDepartment: [''],
      costRank: [''],
      restaurant: [''],
      dateUsage: [''],
      signature: [false],
  })

  onSubmit() {
    if (this.form.invalid) return;
    console.log(this.form.getRawValue());
  }

}
