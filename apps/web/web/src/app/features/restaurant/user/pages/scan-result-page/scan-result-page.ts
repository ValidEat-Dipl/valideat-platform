import { Component, OnInit, inject } from '@angular/core';
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

@Component({
  selector: 'app-scan-result-page',
  imports: [RestaurantHeader, RouterLink],
  templateUrl: './scan-result-page.html',
  styleUrl: './scan-result-page.scss',
})
export class ScanResultPage implements OnInit {
  route = inject(ActivatedRoute);

  result: ScanResultView = {
    icon: 'bi-check2',
    iconClass: 'bg-success-subtle text-success',
    badgeClass: 'text-bg-success',
    badgeText: 'Eingelöst',
    title: 'Markerl erfolgreich eingelöst',
    description: 'Der QR-Code wurde geprüft und die Einlösung wurde im Beispielzustand bestätigt.',
    detailTitle: 'Einlösungsdaten',
    details: ['Markerlstufe: Stufe 2', 'Standort: Restaurant Nord', 'Zeitpunkt: 12:34 Uhr'],
  };

  ngOnInit(): void {
    let resultType = (this.route.snapshot.data['result'] ?? 'success') as ResultType;
    this.result = this.getResult(resultType);
  }

  getResult(type: ResultType): ScanResultView {
    if (type === 'already-used') {
      return {
        icon: 'bi-exclamation-triangle',
        iconClass: 'bg-warning-subtle text-warning-emphasis',
        badgeClass: 'text-bg-warning',
        badgeText: 'Bereits eingelöst',
        title: 'Dieses Markerl wurde bereits eingelöst',
        description: 'Der Beispielzustand zeigt, dass eine doppelte Einlösung verhindert werden soll.',
        detailTitle: 'Letzte bekannte Einlösung',
        details: ['Standort: Restaurant Nord', 'Zeitpunkt: 11:18 Uhr', 'Status: bereits verbucht'],
      };
    }

    if (type === 'invalid') {
      return {
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
      };
    }

    if (type === 'wrong-location') {
      return {
        icon: 'bi-geo-alt',
        iconClass: 'bg-secondary-subtle text-secondary',
        badgeClass: 'text-bg-secondary',
        badgeText: 'Falscher Standort',
        title: 'Für diesen Standort nicht gültig',
        description: 'Der Beispielzustand zeigt einen QR-Code, der nicht zum aktiven Restaurant gehört.',
        detailTitle: 'Prüfung',
        details: [
          'Aktiver Standort: Restaurant Nord',
          'Erlaubter Standort: Restaurant Süd',
          'Einlösung blockiert',
        ],
      };
    }

    
    if (type === 'offline') {
      return {
        icon: 'bi-wifi-off',
        iconClass: 'bg-dark-subtle text-dark',
        badgeClass: 'text-bg-dark',
        badgeText: 'Nicht geprüft',
        title: 'Prüfung aktuell nicht möglich',
        description: 'Ohne Serververbindung wird in diesem statischen Entwurf keine Einlösung bestätigt.',
        detailTitle: 'Nächster Schritt',
        details: [
          'Verbindung prüfen',
          'Später erneut scannen',
          'Keine lokale Freigabe in diesem Change',
        ],
      };
    }

    return {
      icon: 'bi-check2',
      iconClass: 'bg-success-subtle text-success',
      badgeClass: 'text-bg-success',
      badgeText: 'Eingelöst',
      title: 'Markerl erfolgreich eingelöst',
      description: 'Der QR-Code wurde geprüft und die Einlösung wurde im Beispielzustand bestätigt.',
      detailTitle: 'Einlösungsdaten',
      details: ['Markerlstufe: Stufe 2', 'Standort: Restaurant Nord', 'Zeitpunkt: 12:34 Uhr'],
    };
  }
}
