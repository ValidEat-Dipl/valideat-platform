import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantHeader } from '../../../components/restaurant-header/restaurant-header';

type ResultType = 'success' | 'already-used' | 'invalid' | 'wrong-location' | 'offline';

interface ScanResultView {
  icon: string;
  iconClass: string;
  badgeClass: string;
  badgeText: string;
  title: string;
  description: string;
  detailTitle: string;
  details: string[];
}

const RESULT_VIEWS: Record<ResultType, ScanResultView> = {
  success: {
    icon: 'bi-check2',
    iconClass: 'bg-success-subtle text-success',
    badgeClass: 'text-bg-success',
    badgeText: 'Eingelöst',
    title: 'Markerl erfolgreich eingelöst',
    description: 'Der QR-Code wurde geprüft und die Einlösung wurde im Beispielzustand bestätigt.',
    detailTitle: 'Einlösungsdaten',
    details: ['Markerlstufe: Stufe 2', 'Standort: Restaurant Nord', 'Zeitpunkt: 12:34 Uhr'],
  },
  'already-used': {
    icon: 'bi-exclamation-triangle',
    iconClass: 'bg-warning-subtle text-warning-emphasis',
    badgeClass: 'text-bg-warning',
    badgeText: 'Bereits eingelöst',
    title: 'Dieses Markerl wurde bereits eingelöst',
    description: 'Der Beispielzustand zeigt, dass eine doppelte Einlösung verhindert werden soll.',
    detailTitle: 'Letzte bekannte Einlösung',
    details: ['Standort: Restaurant Nord', 'Zeitpunkt: 11:18 Uhr', 'Status: bereits verbucht'],
  },
  invalid: {
    icon: 'bi-x-lg',
    iconClass: 'bg-danger-subtle text-danger',
    badgeClass: 'text-bg-danger',
    badgeText: 'Ungültig',
    title: 'QR-Code ungültig oder abgelaufen',
    description: 'Der QR-Code kann in diesem Beispiel nicht akzeptiert werden.',
    detailTitle: 'Mögliche Gründe',
    details: [
      'Ablaufzeit überschritten',
      'QR-Code gehört zu keinem aktiven Markerl',
      'Markerl nicht freigegeben',
    ],
  },
  'wrong-location': {
    icon: 'bi-geo-alt',
    iconClass: 'bg-secondary-subtle text-secondary',
    badgeClass: 'text-bg-secondary',
    badgeText: 'Falscher Standort',
    title: 'Für diesen Standort nicht gültig',
    description:
      'Der Beispielzustand zeigt einen QR-Code, der nicht zum aktiven Restaurant gehört.',
    detailTitle: 'Prüfung',
    details: [
      'Aktiver Standort: Restaurant Nord',
      'Erlaubter Standort: Restaurant Süd',
      'Einlösung blockiert',
    ],
  },
  offline: {
    icon: 'bi-wifi-off',
    iconClass: 'bg-dark-subtle text-dark',
    badgeClass: 'text-bg-dark',
    badgeText: 'Nicht geprüft',
    title: 'Prüfung aktuell nicht möglich',
    description:
      'Ohne Serververbindung wird in diesem statischen Entwurf keine Einlösung bestätigt.',
    detailTitle: 'Nächster Schritt',
    details: [
      'Verbindung prüfen',
      'Später erneut scannen',
      'Keine lokale Freigabe in diesem Change',
    ],
  },
};

@Component({
  selector: 'app-scan-result-page',
  imports: [RestaurantHeader, RouterLink],
  templateUrl: './scan-result-page.html',
  styleUrl: './scan-result-page.scss',
})
export class ScanResultPage {
   route = inject(ActivatedRoute);
   resultType = (this.route.snapshot.data['result'] ?? 'success') as ResultType;

    result = RESULT_VIEWS[this.resultType];
}
