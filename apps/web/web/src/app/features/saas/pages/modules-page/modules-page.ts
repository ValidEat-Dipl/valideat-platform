import { Component, inject } from '@angular/core';
import { SaasState } from '../../services/saas-state.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-saas-modules-page',
  imports: [FormsModule],
  templateUrl: './modules-page.html',
  styleUrl: './modules-page.scss',
})
export class SaasModulesPage {

  state = inject(SaasState);

  modules = [
    {
      name: 'Mitarbeiter-App',
      text: 'Mitarbeitende erfassen und prüfen ihre Markerlverwendung.',
      group: 'Kernmodule',
    },
    {
      name: 'HR / Admin',
      text: 'Erfassungen und Verwaltung für HR.',
      group: 'Kernmodule'
    },
    {
      name: 'Clearing',
      text: 'Mitarbeiter- und HR-Erfassungen abgleichen.',
      group: 'Kernmodule'
    },
    {
      name: 'Restaurant QR-Scanner',
      text: 'QR-Codes im Restaurant prüfen und einlösen.',
      group: 'Erweiterungen',
    },
    {
      name: 'Branding',
      text: 'App-Name und Farben vorbereiten.',
      group: 'Erweiterungen'
    },
    {
      name: 'Reporting & Export',
      text: 'Auswertungen und Export für die Abrechnung.',
      group: 'Erweiterungen',
    },
  ];


  enabled(name: string) {

    const id = this.state.selectedId();

    if (id === null) {
      return false;
    }

    const items = this.state.modules[id];

    if (!items) {
      return false;
    }

    return items.includes(name);
  }


  toggle(name: string, enabled: boolean) {

    const id = this.state.selectedId();

    if (id === null) {
      return;
    }


    let items = this.state.modules[id];

    if (!items) {
      items = [];
    }


    if (enabled) {

      this.state.modules[id] = [...items, name];

    } else {

      const newItems = [];

      for (const item of items) {

        if (item !== name) {
          newItems.push(item);
        }

      }

      this.state.modules[id] = newItems;
    }
  }
}