import {Component, inject} from '@angular/core';
import {ButtonComp} from "../button-comp/button-comp";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import { CreateAdminTicketService } from '../create-admin-ticket-service';
import { Router } from '@angular/router';

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

  createAdminTicketService = inject(CreateAdminTicketService)
  router = inject(Router);

  anotherTicket: boolean = false;

  form = inject(FormBuilder)
    .nonNullable.group({
      username: ['', Validators.required],
      useDate: ['', Validators.required],
      costDepartment: ['', Validators.required],
      costRank: ['', Validators.required],
      restaurant: ['', Validators.required],
      checkDate: ['', Validators.required]
  })

  onSubmit() {
    if (this.form.invalid) return;

    console.log(this.form.getRawValue());

    this.createAdminTicketService
      .createAdminTicket({
        useDate: this.form.value.useDate!,
        employeeName: this.form.value.username!,
        costOrder: this.form.value.costDepartment!,
        tier: this.form.value.costRank!,
        restaurantName: this.form.value.restaurant!,
        checkDate: this.form.value.checkDate!,
        adminName: 'David Leitner',
      })
      .subscribe({
        next: () => {
          if (this.anotherTicket) {
            this.form.reset();
            console.log("speichern und nächstes");
          } else {
            console.log("speichern");
            /*this.router.navigate(['/ticketDetails/id']);*/
          }
        },
      });
  }

}
