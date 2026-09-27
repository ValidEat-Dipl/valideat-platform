# Design: SaaS-Admin-Frontend

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-008` |
| Status | `in_progress` |
| Verantwortlich | Erik Bergmair |
| Proposal | [proposal.md](proposal.md) |
| Zuletzt geändert | `2026-09-26` |

## Technische Lösung

Lazy geladene SaaS-Routen, einfache Standalone-Komponenten, gemeinsames Sidebar-Layout und SCSS im Bootstrap-Stil. Direkte Services mit `subscribe()` statt zusätzlicher State-Frameworks. Responsive Navigation für kleinere Fenster, Labels und Status mit Text.

Login verwendet `POST /employee/login`, prüft `SAAS_ADMIN` und speichert über den abgesicherten CurrentUserService. Ein Guard prüft Browser-Kontext und Rolle. Der existierende Interceptor hängt das JWT an. Die vorhandene globale Client-Rendering-Konfiguration bleibt erhalten.

Kunden und Dashboard lesen `GET /saas-admin/tenants`. Organisation und Branding beziehen sich auf einen explizit ausgewählten Tenant und lesen `GET /saas-admin/tenant/{id}`. Registrierung nutzt `POST /saas-admin/tenant` mit CreateTenantDTO; sie erstellt ausschließlich eine Organisation und keinen Login. Module, Regeln und Brandingänderungen bleiben lokale Sitzungsentwürfe, weil passende Update-/Publish-Routen fehlen.

## Nutzerzuweisung und Backendgrenze

Die Seite zeigt einen eigenständigen Listen-/Auswahlbereich und eine Tenant-Auswahl. Es wird kein leerer Backendbestand behauptet, solange keine Nutzerliste verfügbar ist. `GET /employee` filtert bereits per `e.tenant.id = :tenantId`, schließt also Nutzer ohne Tenant aus. Eine Liste unzugewiesener Nutzer fehlt. `PUT /saas-admin/assign/{tenantId}/{empId}` fehlt ebenfalls. Vorhanden ist nur `/assign/{empId}` mit Ziel aus dem JWT. Deshalb bleibt freies Zuweisen gesperrt; keine erfundenen URLs und keine Manipulation von Tenant-Claims.

## Zustände und Prüfung

Laden, leer, Fehler mit Wiederholen und Erfolg erst nach echter Serverantwort. Lokale Entwürfe werden bei Tenantwechsel getrennt gehalten. Der State-Service liegt am Layout: Neuladen, Abmelden oder Verlassen der Verwaltung (z. B. zur Registrierung) verwirft die Entwürfe. Brandingvorschau enthält ausdrücklich Beispieldaten. Geplant: Angular-Build, gezielte Service-/Guard-Prüfungen und wenn möglich Browserkontrolle. Live-Backendtests nur bei tatsächlich vorhandener Umgebung dokumentieren.

## Umgesetzte Details

- Registrierung ist sichtbar, das tatsächliche Anlegen ist auf angemeldete SaaS-Admins beschränkt. Die Backendroute erstellt keinen Zugang und weist den aktuellen Nutzer keinem neuen Tenant zu.
- Dashboard und Organisation verwenden die globale Tenantübersicht statt JWT-gebundener Requests. Dadurch wird bei fehlendem `tenantId` kein `tenant-overview`-Request ausgelöst.
- Farbwerte bestehender Tenants werden gelesen; App-Name/Kurzname bleiben Vorschauwerte. Logo-Upload und Publish sind sichtbar als nicht verfügbar gekennzeichnet.
- Der Kontrast von Weiß auf der Primärfarbe wird berechnet, nicht pauschal als bestanden angezeigt. Das ist keine vollständige Barrierefreiheitsprüfung.
- `CurrentUserService` behandelt beschädigtes JSON im vorhandenen Local-Storage-Eintrag jetzt als fehlende Sitzung.
- `tsconfig.saas.spec.json` grenzt die SaaS-Tests ein, weil der bestehende Admin-Spec einen nicht exportierten Klassennamen importiert.

## Nacharbeit nach erneutem Codevergleich

Die Seiten werden wie unter `employee/pages` und `restaurant/.../pages` in eigene Ordner mit TS, HTML und SCSS verschoben. Die Sidebar wird entsprechend `RestaurantAdminSidebar` eine einfache eigene Komponente. Login und Registrierung verwenden `FormGroup`, `FormControl`, `Validators`, `markAllAsTouched()`, `isLoading` und `loginError`/`registerError` wie die bestehenden Loginseiten. Organisation und Branding übernehmen dasselbe Formularpattern. API-Service mit `API_BASE` und direkten HttpClient-Methoden; eigener SaaS-Auth-Service wie EmployeeAuthService/RestaurantAuthService.

Die gemeinsame Tenant-Auswahl bleibt SaaS-spezifisch notwendig. Laden erfolgt explizit über Methoden und `subscribe({ next, error })`; alte Detailrequests werden beim Tenantwechsel beendet. Lokale Entwürfe bleiben auf die geöffnete Verwaltung begrenzt. Formulare werden beim Tenantwechsel zurückgesetzt, damit Änderungen nicht beim falschen Tenant landen. Vorhandener Guard und SSR-Schutz bleiben erhalten.
