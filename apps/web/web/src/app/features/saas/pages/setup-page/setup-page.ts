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
      text: 'Gewünschte Funktionen als lokalen Entwurf vorbereiten.',
      path: 'modules',
      status: 'UI-Entwurf',
    },

    {
      title: 'Nutzer zuordnen',
      text: 'Registrierte Nutzer einem Unternehmen zuweisen.',
      path: 'user-assignment',
      status: 'Backend offen',
    },

    {
      title: 'Regeln vorbereiten',
      text: 'Verwendungstage und Restaurantpflicht festlegen.',
      path: 'organization',
      status: 'UI-Entwurf',
    },

    {
      title: 'Branding prüfen',
      text: 'Farben und Darstellung in der Vorschau ansehen.',
      path: 'branding',
      status: 'UI-Entwurf',
    },
  ];

}