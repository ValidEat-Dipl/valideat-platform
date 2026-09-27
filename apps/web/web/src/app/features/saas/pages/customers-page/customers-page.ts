import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SaasState } from '../../services/saas-state.service';

@Component({
  selector: 'app-saas-customers-page',
  imports: [RouterLink],
  templateUrl: './customers-page.html',
  styleUrl: './customers-page.scss',
})
export class SaasCustomersPage {

  state = inject(SaasState);


  select(id: number) {

    this.state.selectTenant(id);

  }

}