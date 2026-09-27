# Bericht: SaaS-Backendanbindung

> Historischer Stand vor Backendcommit f05fd08. Aktuelle Bewertung und noch notwendige Arbeiten: [VAL-010 Status](../VAL-010-adapt-saas-backend-fixes/status.md). Die folgenden alten Fehlerlisten sind nicht mehr die aktuelle Übergabe.

## Zusammenfassung

Die vorhandenen neuen SaaS-APIs sind im Frontend angebunden, ohne eigene Änderungen am Servercode. Für die folgenden Speicherabläufe müssen Regeln und Branding bereits vorhanden sein; neue Organisationen bleiben hier durch Serverfehler blockiert. Nutzerzuweisung, Organisationsänderung, Modulauswahl, einzelne Verwendungstage, Restaurantpflicht, Korrekturhinweise und Brandingentwürfe werden im Backend gespeichert. Die Vorschau lädt Entwurf und veröffentlichten Stand separat; Publish ist ein eigener API-Aufruf. Dashboard zeigt die gespeicherte Modulauswahl. Die Anwendung anderer App-Bereiche wird dadurch noch nicht tenantabhängig umgeschaltet.

Einfacher TS-Stil: konkrete Services, normale subscribe-Aufrufe, explizite Prüfungen, keine Optional Chains oder Non-Null-Assertions im SaaS-TypeScript. FormControls/getRawValue mit nonNullable halten Formwerte ohne Assertions verwendbar. SaasState enthält nur die gemeinsame Tenantliste/Auswahl; lokale Entwurfsobjekte und unnötige Detailabfragen wurden entfernt. Bestehender Auth-Interceptor und gemeinsame API_BASE-Konfiguration `/api` werden verwendet. Keine geschützten Leseaufrufe im SSR-Kontext.

## Gefundene und eingebundene Routen

Frontend verwendet `/api` als Proxypräfix; unten stehen die tatsächlichen Backendpfade.

| Methode und Route                                       | Verwendung / DTO                                                                     |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| POST `/employee/login`                                | Vorhandener LoginResponseDTO; SaaS-Rolle prüfen und currentUser speichern.          |
| POST `/saas-admin/tenant`                             | Bestehende Organisationsregistrierung mit CreateTenantDTO.                           |
| GET `/saas-admin/tenants`                             | TenantOverviewDTO-Liste für Auswahl, Dashboard und Kundenübersicht.                |
| GET `/saas-admin/tenant/{id}`                         | Organisationsformular; Tenant mit name/manager und vorhandenen Farben.               |
| PUT `/saas-admin/tenant/{id}`                         | EditTenantDTO mit organisationName/contactPerson; bestehende Tenantfarben erhalten.  |
| GET `/saas-admin/unassigned-employees`                | UnassignedEmpDTO mit firstname/lastname (kleingeschrieben), ID, E-Mail und Rolle.    |
| PUT `/saas-admin/assign/{tenantId}/{empId}`           | Explizite Zielorganisation; Eintrag nach Erfolg entfernen, Übersicht aktualisieren. |
| GET/PUT `/saas-admin/tenant/{tenantId}/modules`       | Vollständiger Katalog mit enabled; Speichern als moduleIds-Liste.                   |
| GET/PUT `/saas-admin/tenant/{tenantId}/rules`         | usageDays als Wochentagsliste, restaurantRequired und correctionHints als Boolean.   |
| GET `/saas-admin/tenant/{tenantId}/branding`          | Getrennte draft-/published-Objekte.                                                  |
| PUT `/saas-admin/tenant/{tenantId}/branding`          | appName, shortName, primaryColor, accentColor, logo.                                 |
| POST `/saas-admin/tenant/{tenantId}/branding/publish` | Gespeicherten Entwurf übernehmen; Vorschau lädt den Stand anschließend neu.       |

Weitere vorhandene Routen wurden im Code geprüft, aber nicht als tenantübergreifende Verwaltungsaktionen verwendet:

| Vorhandene Route                                            | Grenze                                                                                                     |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| GET `/saas-admin/tenant-overview`                         | Verwendet tenantId aus JWT; neue UI verwendet globale Übersicht und explizite IDs.                        |
| GET `/saas-admin/tenantByManager/{id}`                    | Tenantabhängige Employeesuche und Kontaktperson als Textvergleich; keine belastbare Admin-Mitgliedschaft. |
| PUT `/saas-admin/assign/{empId}`                          | Alte Zuweisung mit Tenant aus JWT; neue UI verwendet ausdrücklich die neue Route.                         |
| PUT `/saas-admin/restaurant/{restaurantId}`               | Tenant aus JWT, kein expliziter Ziel-Tenant.                                                               |
| PUT `/saas-admin/restaurant/{restaurantId}/user/{userId}` | Restaurant und Nutzer müssen schon zum JWT-Tenant gehören.                                               |
| POST `/saas-admin/tier?discount=...`                      | Textkörper, Tenant aus JWT.                                                                               |
| POST `/saas-admin/costorder`                              | Textkörper, Tenant aus JWT.                                                                               |

Die alten JWT-Tenant-Routen setzen weiterhin eine Tenant-Zuordnung voraus und sind für globale SaaS-Admins ohne Tenant nicht geeignet. Sie werden von dieser UI nicht aufgerufen.

## Abgrenzung zum Server

Auf ausdrücklichen Nutzerwunsch wurden alle eigenen Änderungen an SaasAdminResource, EmployeeRepository, RestaurantUserRepository, SaaSAdminRepository und den Regeln-Seeds zurückgenommen. Im Backend-Diff bleibt ausschließlich die schon vorher vorhandene Max-Rollenänderung in import.sql. Es wurde keine neue Backendfunktion hinzugefügt.

GET-Fehler bei Regeln und Branding sperren die Formulare. HTTP 500 wird nicht als Beweis für eine fehlende Konfiguration behandelt. Branding-404 bedeutet im bestehenden Backend „Tenant nicht gefunden“ und wird als Fehler angezeigt. Die Zuweisung behandelt den vorhandenen Status 400 bei bereits zugewiesenen Employees. Erfolgreiches Speichern bleibt eine tatsächliche Serverantwort.

Konkrete Fehler, notwendige Änderungen und Vorschläge für die Serverperson stehen in der direkt weitergebbaren [Backend-Übergabe](backend-handoff.md).

## Aktuelle Prüfungen nach Rücknahme

- `npm run build` in apps/web/web: erfolgreich; Initial-Bundle 826,38 kB bei 500-kB-Warnbudget. Node 23 meldet zusätzlich den Hinweis auf eine nicht für Produktion empfohlene ungerade Version. Keine Templatefehler.
- `./mvnw -DskipTests package` in apps/api/backend: zurückgesetzter Backendcode erfolgreich gebaut; keine Maven-Tests ausgeführt, keine Serverquelldatei für den Test verändert.
- 45 tatsächliche API-Requests/Prüfbedingungen mit eigenem Backend auf 8081 und eigener Datenbank valideat_saas_val009_original; [Protokoll](api-checks.md). Organisation, Module, bestehende Regeln, Branding/Publish und Employee-Zuweisung gespeichert und erneut gelesen. Fehlende Konfiguration, Regeln-ID-Konflikt, fehlender Rollenschutz, unbekannter Employee und Login ohne Tenant ebenfalls reproduziert. Das sind keine 45 erfolgreichen Fachtests; einige Prüfungen bestätigen ausdrücklich Defekte.
- TypeScript-AST-Prüfung: 20 SaaS-TS-Dateien ohne Optional Chains und Non-Null-Assertions. `git diff --check` erfolgreich.
- Testbackend beendet, Testdatenbank gelöscht. Keine Schreibtests am laufenden Benutzerbackend. Keine neue Browserprüfung nach Rücknahme, kein neuer Unit-Testlauf und keine entfernten SaaS-Specs wieder eingeführt.

## Historische Prüfungen vor Rücknahme

Zuvor wurden mit zwischenzeitlichen eigenen Serverkorrekturen 67 API-Requests/Prüfbedingungen sowie Browserabläufe geprüft: Login/Logout, Guard, Module, Organisation, Regeln, Brandingentwurf/Publish, Tenantwechsel, Nutzerzuweisung, Registrierung und Erstkonfiguration. Nach API_BASE-Umstellung außerdem API-Proxy und Login ohne Tenant; nach State-Vereinfachung Dashboard und Tenantwechsel. Ein gestopptes Testbackend zeigte einen Ladefehler. Node-Auslieferung unter localhost lieferte 200 ohne localStorage-Fehler; 127.0.0.1 wurde durch die vorhandene Host-Allowlist abgewiesen. Ein erster Vorschau-Start mit falschem index-Dateinamen wurde korrigiert. Keine dauerhafte Screenshotdatei gespeichert.

Diese Ergebnisse sind historisch und gelten insbesondere für Rollen, Erstkonfiguration und Login ohne Tenant NICHT für den jetzt wieder unveränderten Server. Das alte Protokoll bleibt entsprechend gekennzeichnet in api-checks.md erhalten. Auch die damalige Testdatenbank und temporären Server wurden entfernt/beendet. Keine vollständige Ticket-/QR-End-to-End-Prüfung oder fachliche Freigabe.

## Offene Punkte

0. Serverkorrekturen für Rollenschutz, öffentliche Rollenvergabe, fehlende Konfigurationen, Regeln-ID-Sequenz, Login ohne Tenant und konsistente Fehlerantworten stehen aus; siehe Backend-Übergabe.
1. Restaurantbetrieb ohne Integration / manuell / QR / gemischt ist weiterhin nicht modelliert. Vorhanden ist nur das Modul RESTAURANT sowie restaurantRequired; das reicht nicht für die vereinbarten Varianten oder Unterschiede pro Restaurant.
2. Module und Regeln werden gespeichert, aber im Ticket-/QR-/Clearing-Code noch nicht ausgewertet. Die Konfiguration aktiviert/deaktiviert diese Abläufe noch nicht.
3. Publish speichert Branding, aber es gibt keine mandantenspezifische Runtime-Konfigurationsroute für Employee/Restaurant/HR und keine dortige Anwendung der Werte.
4. Logo wird als vorhandene Adresse gespeichert und in der Vorschau angezeigt. Keine Datei-Upload-/Ablagerungsroute vorhanden.
5. Setup-Fortschritt, Aktivierung und Aktivitäten fehlen weiterhin. Keine erfundenen Fortschrittswerte oder Produktivfreigaben.
6. Tenantübergreifende Restaurant-/RestaurantUser-Zuweisung fehlt; die bestehenden Routen hängen am JWT-Tenant. Die Nutzerseite zeigt die neue Employee-Liste, keine RestaurantUser.
7. Bekannte weitergehende Datenmodell-/Betriebspunkte bleiben: Tier/CostOrder mit globalen Namensschlüsseln, manager als Text, drop-and-create-Konfiguration und eine separate Prüfung der übrigen Backendberechtigungen. Diese Integration ist keine Produktionsfreigabe.

## Geänderte Dateien

Die folgenden Dateien gehören zur aktuellen Frontendumsetzung; sonstige bereits vorhandene Dokumentationsänderungen und .angular nicht. Keine eigene Serveränderung bleibt im Diff. Die vorbestehende Max-Rolle in import.sql gehört nicht zu diesem Change.

- `apps/web/web/src/app/features/saas/models/saas-draft.model.ts`
- `apps/web/web/src/app/features/saas/models/saas-settings.model.ts`
- `apps/web/web/src/app/features/saas/pages/branding-page/branding-page.html`
- `apps/web/web/src/app/features/saas/pages/branding-page/branding-page.ts`
- `apps/web/web/src/app/features/saas/pages/branding-preview-page/branding-preview-page.html`
- `apps/web/web/src/app/features/saas/pages/branding-preview-page/branding-preview-page.ts`
- `apps/web/web/src/app/features/saas/pages/dashboard-page/dashboard-page.html`
- `apps/web/web/src/app/features/saas/pages/dashboard-page/dashboard-page.ts`
- `apps/web/web/src/app/features/saas/pages/modules-page/modules-page.html`
- `apps/web/web/src/app/features/saas/pages/modules-page/modules-page.ts`
- `apps/web/web/src/app/features/saas/pages/organization-page/organization-page.html`
- `apps/web/web/src/app/features/saas/pages/organization-page/organization-page.ts`
- `apps/web/web/src/app/features/saas/pages/setup-page/setup-page.html`
- `apps/web/web/src/app/features/saas/pages/setup-page/setup-page.ts`
- `apps/web/web/src/app/features/saas/pages/user-assignment-page/user-assignment-page.html`
- `apps/web/web/src/app/features/saas/pages/user-assignment-page/user-assignment-page.ts`
- `apps/web/web/src/app/features/saas/saas.guard.ts`
- `apps/web/web/src/app/features/saas/services/saas-auth.service.ts`
- `apps/web/web/src/app/features/saas/services/saas-state.service.ts`
- `apps/web/web/src/app/features/saas/services/saas.service.ts`
- `docs/members/erik/changes/active/VAL-008-implement-saas-admin-frontend/evidence.md`
- `docs/members/erik/changes/active/VAL-008-implement-saas-admin-frontend/tasks.md`
- `docs/members/erik/changes/active/VAL-009-connect-saas-admin-backend/backend-handoff.md`
- `docs/members/erik/changes/active/VAL-009-connect-saas-admin-backend/api-checks.md`
- `docs/members/erik/changes/active/VAL-009-connect-saas-admin-backend/design.md`
- `docs/members/erik/changes/active/VAL-009-connect-saas-admin-backend/evidence.md`
- `docs/members/erik/changes/active/VAL-009-connect-saas-admin-backend/proposal.md`
- `docs/members/erik/changes/active/VAL-009-connect-saas-admin-backend/report.md`
- `docs/members/erik/changes/active/VAL-009-connect-saas-admin-backend/tasks.md`
