# Tasks: SaaS-Backendanbindung

> Historischer Stand vor Backendcommit f05fd08. Aktuelle Bewertung und noch notwendige Arbeiten: [VAL-010 Status](../VAL-010-adapt-saas-backend-fixes/status.md). Die folgenden alten Fehlerlisten sind nicht mehr die aktuelle Übergabe.

- [x] Aktuellen TS-Stil und neue Backendrouten, DTOs, Entities, Seeds lesen.
- [x] Change vor Implementierung anlegen.
- [x] Konkrete API-Probleme prüfen und als Serverübergabe dokumentieren.
- [x] Eigene zwischenzeitliche Backendänderungen auf Nutzerwunsch zurücknehmen; vorbestehende Max-Rolle erhalten.
- [x] Regeln-/Branding-Fehlerbehandlung auf unveränderten Server abstimmen.
- [x] Services und Modelle auf echte API-Verträge umstellen.
- [x] Nutzerzuweisung und Organisationsbearbeitung anbinden.
- [x] Module, Regeln, Branding und Publish anbinden.
- [x] Dashboard/Setup und veraltete Hinweise aktualisieren.
- [x] Build, API- und UI-Prüfungen durchführen, tatsächliche Ergebnisse dokumentieren.
- [x] Abschlussbericht mit offenen Backendpunkten erstellen.

## Folgearbeiten außerhalb der vorhandenen Verträge

- [ ] Restaurantmodi und Einstellungen pro Restaurant im Backend vereinbaren/umsetzen.
- [ ] Module und Regeln im Ticket-/QR-/Clearing-Code anwenden.
- [ ] Runtime-Konfiguration/Branding in den übrigen App-Bereichen bereitstellen.
- [ ] Setup-/Aktivierungs-/Aktivitätsrouten und Logo-Upload ergänzen.

Stand: vorhandene APIs angebunden, bestehende Konfigurationen nutzbar. Initiale Regeln/Branding neuer Organisationen bleiben durch Serverfehler im UI blockiert. Keine Behauptung, dass der gesamte SaaS-Betrieb fertig oder freigegeben ist.

- [x] Frontendbuild und 45 API-Requests/Prüfbedingungen gegen unveränderten Servercode erneut ausführen; Fehlerbefunde getrennt dokumentieren.
- [x] Frühere Prüfungen mit zwischenzeitlichen Serverkorrekturen ausdrücklich als historisch markieren.
- [ ] Serververantwortliche Person: Initialisierung, Regeln-ID-Sequenz, Login ohne Tenant, Berechtigungen und Fehlerverträge korrigieren; siehe backend-handoff.md.

## Dashboard vereinfachen

- [x] Bereich „Nächste Schritte“ und gelben Setup-/Aktivierungshinweis entfernen.
- [x] Zugehörige ungenutzte Styles entfernen und Template per Build prüfen.
