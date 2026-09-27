import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SaasState } from '../../services/saas-state.service';

@Component({
  selector: 'app-saas-setup-page',
  imports: [RouterLink],
  templateUrl: './setup-page.html',
  styleUrl: './setup-page.scss',
})
export class SaasSetupPage {

  state = inject(SaasState);

  steps = [
    {
      title: 'Organisation prüfen',
      text: 'Stammdaten und Kontaktperson kontrollieren.',
      path: 'organization',
      status: 'Prüfen',
    },

    {
      title: 'Module auswählen',
      text: 'Gewünschte Funktionen für die Organisation speichern.',
      path: 'modules',
      status: 'Konfigurieren',
    },

    {
      title: 'Nutzer zuordnen',
      text: 'Registrierte Nutzer einem Unternehmen zuweisen.',
      path: 'user-assignment',
      status: 'Zuordnen',
    },

    {
      title: 'Regeln vorbereiten',
      text: 'Verwendungstage und Restaurantpflicht festlegen.',
      path: 'organization',
      status: 'Konfigurieren',
    },

    {
      title: 'Branding prüfen',
      text: 'Farben und Darstellung in der Vorschau ansehen.',
      path: 'branding',
      status: 'Konfigurieren',
    },
  ];

}