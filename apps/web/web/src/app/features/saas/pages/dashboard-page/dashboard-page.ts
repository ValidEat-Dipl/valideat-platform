import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SaasState } from '../../services/saas-state.service';

@Component({
  selector: 'app-saas-dashboard-page',
  imports: [RouterLink],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class SaasDashboardPage {

  state = inject(SaasState);

}