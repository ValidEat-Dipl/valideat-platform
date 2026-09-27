import { Component, inject } from '@angular/core';
import { SaasState } from '../../services/saas-state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-saas-user-assignment-page',
  imports: [FormsModule],
  templateUrl: './user-assignment-page.html',
  styleUrl: './user-assignment-page.scss',
})
export class SaasUserAssignmentPage {

  state = inject(SaasState);

  // Kein erfundener Datenbestand: die nötige Listenroute fehlt im Backend.
  users: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  }[] = [];

  selectedUser: number | null = null;

}