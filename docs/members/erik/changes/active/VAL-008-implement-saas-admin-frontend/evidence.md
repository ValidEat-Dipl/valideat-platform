# Nachweise: SaaS-Admin-Frontend

## Metadaten

- Change-ID: `VAL-008`
- Status: `in_progress`
- Verantwortlich: Erik Bergmair
- Datum: `2026-09-26`

## Vor Umsetzung geprüft

- Referenz: bestehender Change `VAL-007-integrate-qr-code-scan-flow`.
- Gestaltung: Nutzeranhänge `Xnip2026-09-26_17-54-50.png`, `17-54-56.png`, `17-55-07.png`, `17-55-14.png`, `17-55-22.png` aus Downloads. Keine externe Figma-Abfrage, keine erfundene Quelle.
- Backendquellen: `SaasAdminResource.java`, `SaaSAdminRepository.java`, `EmployeeResource.java`, `EmployeeRepository.java`, `TenantService.java`, `Tenant.java`, `Role.java` und DTOs unter `apps/api/backend/src/main/java/at/htl/`.

## Tatsächlicher Backendvertrag

- `GET /saas-admin/tenants`: Liste TenantOverviewDTO.
- `GET /saas-admin/tenant-overview`: einzelnes TenantOverviewDTO, benötigt `tenantId` im JWT.
- `GET /saas-admin/tenant/{id}`: Tenant mit Stammdaten und Farben.
- `GET /saas-admin/tenantByManager/{id}`: Tenants anhand Managername, Employee-Lookup tenantgebunden.
- `POST /saas-admin/tenant`: CreateTenantDTO(name, manager, email, country, companySize, primaryColor, accentColor), Antwort Tenant/201.
- `PUT /saas-admin/assign/{empId}`: Employee dem JWT-Tenant zuweisen, leere 200-Antwort. Die im Auftrag genannte Variante mit `{tenantId}/{empId}` existiert NICHT.
- `PUT /saas-admin/restaurant/{restaurantId}` und `PUT /saas-admin/restaurant/{restaurantId}/user/{userId}`: vorhanden, Tenant aus JWT.
- `POST /saas-admin/tier?discount=...` und `POST /saas-admin/costorder`: Text-Body, Tenant aus JWT.
- TenantOverviewDTO: tenantId, tenantName, manager, email, country, companySize sowie employeeCount, adminCount, restaurantCount, costOrderCount, tierCount, foodTicketCount. Kein Modulstatus, Setupfortschritt oder Aktivitätsdatum.
- `POST /employee/login`: LoginDTO(email, password), LoginResponseDTO(token, id, firstName, lastName, email, role, tenant). Rolle `SAAS_ADMIN` existiert. Keine eigene SaaS-Login- oder Kontoregistrierungsroute gefunden. Login greift auf `employee.getTenant().getId()` zu: Login ohne Tenant kann im Backend scheitern.
- `GET /employee` ist tenantgefiltert und kann Nutzer ohne Tenant nicht liefern. Keine andere passende Liste gefunden. Auch RestaurantUser hat keine passende globale Liste.
- Tenant hat primaryColor/accentColor; keine Update-/Publish-Routen für Branding, Module, Regeln oder Stammdaten gefunden.
- In SaasAdminResource keine `@RolesAllowed`-Absicherung gesehen; Frontend-Guard ersetzt keine Backendautorisierung. Serverseitige Rollenprüfung bleibt Backendklärung.

## Prüfungen

Die folgenden Prüfungen wurden am 2026-09-26 tatsächlich ausgeführt:

| Prüfung | Ergebnis |
|---|---|
| `npm run build --prefix apps/web/web` | Erfolgreich. Initial-Bundle 828,52 kB überschreitet Warnbudget 500 kB um 328,52 kB. Keine Compilefehler, 0 prerendered Routen entsprechend Client-Rendering. Zwei neue Importwarnungen im ersten Lauf anschließend entfernt. |
| `npm test --prefix apps/web/web -- --watch=false --include='src/app/features/saas/**/*.spec.ts'` | Fehlgeschlagen vor Testausführung: bestehender `info-flex-service-export.spec.ts:3` importiert `InfloFlexServiceExport`, exportiert ist `InfoFlexServiceExport`. Dieser fremde Test wurde nicht geändert. |
| `npm test --prefix apps/web/web -- --watch=false --ts-config=tsconfig.saas.spec.json --include='src/app/features/saas/**/*.spec.ts'` | Erfolgreich: final 1 Testdatei, 10 Tests bestanden (zuvor 9 Tests; danach Routentest ergänzt). HTTP-Antworten sind Test-Mocks, keine Live-Backendnachweise. |
| `git diff --check` | Erfolgreich, keine Whitespacefehler. |
| Lokaler Devserver: `npm start -- --host 127.0.0.1 --port 4300` | Gestartet; Login und Registrierung im In-App-Browser geöffnet und visuell kontrolliert. Registrierungsansicht auch mit Desktop-Viewport geprüft. |
| Nicht angemeldet `/saas/dashboard` im Browser öffnen | Weiterleitung zu `/saas/login` beobachtet. Organisationsanlage ohne Anmeldung sichtbar gesperrt. |

Der erste Versuch, Tests anzulegen, verwendete versehentlich einen doppelt relativen Repositorypfad und brach vor dem Schreiben ab. Nach Korrektur wurden die oben genannten SaaS-Tests angelegt und ausgeführt. Kein Testerfolg wird aus diesem Fehlversuch abgeleitet.

### Inhalt der zehn automatisierten Prüfungen

1. Fehlende, beschädigte und falsche Rollen-Sitzungen abweisen; SaaS-Admin zulassen.
2. SSR: kein Local-Storage-Lesen und kein Tenantlisten-Request.
3. Vorhandenen JWT-Interceptor und echte Tenant-URLs verwenden, keinen JWT-gebundenen Overview-Aufruf erzwingen.
4. Fehler beim Laden wiederholen und veraltete Detailrequests bei Tenantwechsel abbrechen.
5. Employee-Login nutzen, falsche Rolle nicht speichern, gültige SaaS-Sitzung weiterleiten.
6. CreateTenantDTO senden, Erfolg erst nach Antwort, aktuellen Benutzer unverändert lassen.
7. Zuweisung sichtbar sperren, keine erfundene Nutzerliste und keinen PUT senden.
8. Branding-Entwürfe zwischen Tenants trennen, keine Backendänderung senden.
9. Kontrastwerte berechnen (schwarz/weiß/Bootstrap-Blau).
10. Alle zehn Routen rendern; abgemeldete Sitzung auch bei Navigation innerhalb der Verwaltung abweisen.

Keine echte Anmeldung, Organisationsanlage oder Zuweisung gegen ein laufendes Backend durchgeführt. Geschützte Seiten wurden automatisiert mit Mockdaten gerendert; die vollständige visuelle Kontrolle dieser Seiten mit echtem SaaS-Konto bleibt offen. Keine fachliche Freigabe, kein Commit, Push oder PR.

## Tatsächlich umgesetzt

- Zehn lazy geladene Routen unter `/saas`, Rollen-Guard und Sidebar mit Tenant-Auswahl.
- Login über bestehende Employee-Authentifizierung; Organisationsanlage über CreateTenantDTO mit allen vorhandenen Feldern (Farben zunächst Standardwerte).
- Dashboard und Kundenliste zeigen Backendzahlen statt der Figma-Beispielzahlen; Lade-/Leer-/Fehlerzustände vorhanden.
- Setup dient als Navigation, ohne erfundene Prozentwerte, Modulstatus oder Live-Aktivierung.
- Module und Regeln als lokale, tenantgetrennte Entwürfe; Stammdaten lesend.
- Brandingfarben aus Tenantdetails, lokale Bearbeitung und Vorschau für Mitarbeiter-App, Restaurant und Admin; echte Kontrastberechnung. Vorschauinhalte ausdrücklich als Beispiele bezeichnet.
- Nutzerzuweisungsseite mit Listenbereich, echter Tenant-Auswahl und gesperrtem Button samt Begründung. Mangels Listenroute und expliziter Ziel-Tenant-Route kein Zuweisungsrequest. Erfolg/Fehler nach tatsächlicher Zuweisung deshalb noch nicht implementierbar.
- Beschädigtes `currentUser`-JSON wird abgefangen. Bestehender Interceptor und globale Client-Rendering-Konfiguration bleiben unverändert.

## Noch offen

- Backendroute für unzugewiesene registrierte Nutzer und passende DTOs. Unregistrierte Personen besitzen noch keinen zuweisbaren Employee-Datensatz.
- Expliziter Ziel-Tenant bei Zuweisung; optional danach RestaurantUser-Zuweisung ergänzen.
- Null-Tenant-Login im Backend, SaaS-Kontoanlage und serverseitige Rollen-/Tenantautorisierung klären.
- Organisation bearbeiten, Module/Regeln/Branding dauerhaft speichern, Logo-Upload und veröffentlichen.
- Live-Test mit echtem SaaS-Konto, echten Tenants und echten Fehlerantworten.
- Breite Regressionstests bleiben durch den vorhandenen Admin-Testimport blockiert; keine vollständige Suite als bestanden behauptet.
- Fachliche Abstimmung als spätere SaaS-Plattformfunktion, keine automatische Porsche-Freigabe.

## Nacharbeit vom 2026-09-26: Anpassung an Employee und Restaurant

### Tatsächlich erneut gelesene Referenzen

Unter `apps/web/web/src/app/features/` insbesondere:

- `employee/pages/login-page/`: TS, Template und SCSS; `FormGroup`, `FormControl`, `Validators`, `markAllAsTouched()`, `isLoading` und Speicherung der einzelnen LoginResponse-Felder.
- `employee/pages/register-page/`: TS und Template, explizites Requestobjekt und `registerError`.
- `employee/pages/create-entry-page/create-entry-page.ts`: Formular per `patchValue`, einfacher lokaler Entwurf, direkte `subscribe()`-Aufrufe und `markForCheck()` nach asynchronen Formularänderungen.
- `employee/pages/start-page/start-page.ts`, `entries-page/entries-page.ts`, `services/employee-auth.service.ts`, `employee-ticket.service.ts`, `employee-entry-state.ts`.
- `restaurant/user/pages/login-page/restaurant-user-login-page.ts` und HTML; `overview-page/restaurant-user-overview-page.ts`, `history-page/history-page.ts`, `scan-page/scan-page.ts`.
- `restaurant/admin/pages/overview-page/restaurant-admin-overview-page.ts`, HTML und SCSS; `settings-page/restaurant-admin-settings-page.ts`.
- `restaurant/admin/components/restaurant-admin-sidebar/`: TS, HTML und SCSS; `restaurant/services/restaurant-auth.service.ts`, `restaurant-ticket.service.ts`.

### Umgesetzte Anpassungen

- Alle zehn Seiten liegen jetzt in `pages/<seitenname>/<seitenname>.ts/.html/.scss`; Layout entsprechend in `layout/saas-layout/`.
- Separate `components/saas-sidebar/` nach dem Restaurant-Sidebar-Aufbau. Abmelden bleibt auch bei schmalem Fenster erreichbar.
- Login, Registrierung, Regeln und Branding verwenden `ReactiveFormsModule`, `FormGroup` und `FormControl`; Validierung in den Submitmethoden mit `markAllAsTouched()`.
- Login/Registrierung mit `isLoading`, `loginError` bzw. `registerError`, normalen Konstruktorabhängigkeiten und expliziten Request-/Benutzerobjekten. SaaS-Auth hat einen eigenen kleinen Service; Loginroute unverändert `/employee/login`.
- `SaasService` verwendet `API_BASE`, Konstruktorinjektion und direkte HttpClient-Methoden. DTOs sind explizite Interfaces in `tenant.model.ts`; Entwürfe in `saas-draft.model.ts`.
- Keine `effect()`-Aufrufe mehr: `ngOnInit()` startet das Laden; Tenantwechsel laufen über `selectTenant()` und `subscribe({ next, error })`. Der gemeinsame State bleibt für die SaaS-weite Tenant-Auswahl notwendig.
- Formulare abonnieren Tenantänderungen, übernehmen Werte mit `reset()` und melden asynchrone Änderungen per `markForCheck()`. Abonnements und laufende Detailrequests werden beendet, wenn ihre Seite/Verwaltung verlassen wird.
- Eine spät eintreffende Tenantdetail-Antwort überschreibt keine bereits bearbeiteten Regeln. Ungültiges Branding öffnet keine Vorschau mit einem alten Entwurf.
- Struktur und Verhalten wurden übernommen; absichtliche Tippfehler oder ungeschützte Browserzugriffe wurden nicht nachgeahmt. Guard, SSR-Schutz und Backendgrenzen bleiben erhalten.

### Neue tatsächlich ausgeführte Prüfungen

| Prüfung | Ergebnis nach der Nacharbeit |
|---|---|
| `npm test --prefix apps/web/web -- --watch=false --ts-config=tsconfig.saas.spec.json --include='src/app/features/saas/**/*.spec.ts'` | 1 Testdatei, 13 Tests bestanden. Die bestehenden zehn Prüfungen wurden an neue Pfade, FormControls und explizite Tenantwechsel angepasst. Zusätzlich: ungültige Formulare/fehlende Berechtigungsbestätigung senden keine Requests; lokale Regeln bleiben trotz verspäteter Tenantdetails erhalten; Vorschau öffnet nur mit gültigem Brandingentwurf. |
| `npm run build --prefix apps/web/web` | Erfolgreich. Finales Initial-Bundle 826,20 kB, Warnbudget 500 kB, Überschreitung 326,20 kB. Kein neuer Template-/Importfehler; eine im ersten Refactor-Build gemeldete ungenutzte RouterLink-Referenz wurde entfernt. |
| `git diff --check` | Erfolgreich. |

Keine neue manuelle Browserprüfung und kein echter Backend-End-to-End-Test in dieser Nacharbeit. Die oben dokumentierten Browserprüfungen beziehen sich auf den ersten Stand. Der vorhandene Admin-Testimport wurde nicht geändert; der breite Testlauf wurde in dieser Nacharbeit nicht erneut ausgeführt. Backend unverändert, keine neue Freigabe, kein Commit, Push oder PR.

## Geänderte und neue Dateien dieses Changes

Aktueller Stand nach der Nacharbeit, repository-relative Pfade. Die früher flach unter `pages/` und `layout/` angelegten Dateien wurden in die unten aufgeführten Unterordner verschoben. `saas-page.scss` wurde durch seitenbezogene Styles ersetzt; `saas.model.ts` wurde in Tenant- und Entwurfsmodelle aufgeteilt. Andere vorhandene oder parallel entstandene Dokumentationsänderungen gehören nicht zu diesem Change.

- `apps/web/web/src/app/app.routes.ts`
- `apps/web/web/src/app/features/admin/services/current-user-service.ts`
- `apps/web/web/tsconfig.saas.spec.json`
- `apps/web/web/src/app/features/saas/components/saas-sidebar/saas-sidebar.html`
- `apps/web/web/src/app/features/saas/components/saas-sidebar/saas-sidebar.scss`
- `apps/web/web/src/app/features/saas/components/saas-sidebar/saas-sidebar.ts`
- `apps/web/web/src/app/features/saas/layout/saas-layout/saas-layout.html`
- `apps/web/web/src/app/features/saas/layout/saas-layout/saas-layout.scss`
- `apps/web/web/src/app/features/saas/layout/saas-layout/saas-layout.ts`
- `apps/web/web/src/app/features/saas/models/saas-draft.model.ts`
- `apps/web/web/src/app/features/saas/models/tenant.model.ts`
- `apps/web/web/src/app/features/saas/pages/branding-page/branding-page.html`
- `apps/web/web/src/app/features/saas/pages/branding-page/branding-page.scss`
- `apps/web/web/src/app/features/saas/pages/branding-page/branding-page.ts`
- `apps/web/web/src/app/features/saas/pages/branding-preview-page/branding-preview-page.html`
- `apps/web/web/src/app/features/saas/pages/branding-preview-page/branding-preview-page.scss`
- `apps/web/web/src/app/features/saas/pages/branding-preview-page/branding-preview-page.ts`
- `apps/web/web/src/app/features/saas/pages/customers-page/customers-page.html`
- `apps/web/web/src/app/features/saas/pages/customers-page/customers-page.scss`
- `apps/web/web/src/app/features/saas/pages/customers-page/customers-page.ts`
- `apps/web/web/src/app/features/saas/pages/dashboard-page/dashboard-page.html`
- `apps/web/web/src/app/features/saas/pages/dashboard-page/dashboard-page.scss`
- `apps/web/web/src/app/features/saas/pages/dashboard-page/dashboard-page.ts`
- `apps/web/web/src/app/features/saas/pages/login-page/login-page.html`
- `apps/web/web/src/app/features/saas/pages/login-page/login-page.scss`
- `apps/web/web/src/app/features/saas/pages/login-page/login-page.ts`
- `apps/web/web/src/app/features/saas/pages/modules-page/modules-page.html`
- `apps/web/web/src/app/features/saas/pages/modules-page/modules-page.scss`
- `apps/web/web/src/app/features/saas/pages/modules-page/modules-page.ts`
- `apps/web/web/src/app/features/saas/pages/organization-page/organization-page.html`
- `apps/web/web/src/app/features/saas/pages/organization-page/organization-page.scss`
- `apps/web/web/src/app/features/saas/pages/organization-page/organization-page.ts`
- `apps/web/web/src/app/features/saas/pages/register-page/register-page.html`
- `apps/web/web/src/app/features/saas/pages/register-page/register-page.scss`
- `apps/web/web/src/app/features/saas/pages/register-page/register-page.ts`
- `apps/web/web/src/app/features/saas/pages/setup-page/setup-page.html`
- `apps/web/web/src/app/features/saas/pages/setup-page/setup-page.scss`
- `apps/web/web/src/app/features/saas/pages/setup-page/setup-page.ts`
- `apps/web/web/src/app/features/saas/pages/user-assignment-page/user-assignment-page.html`
- `apps/web/web/src/app/features/saas/pages/user-assignment-page/user-assignment-page.scss`
- `apps/web/web/src/app/features/saas/pages/user-assignment-page/user-assignment-page.ts`
- `apps/web/web/src/app/features/saas/saas.guard.ts`
- `apps/web/web/src/app/features/saas/saas.routes.ts`
- `apps/web/web/src/app/features/saas/saas.spec.ts`
- `apps/web/web/src/app/features/saas/services/branding-colors.ts`
- `apps/web/web/src/app/features/saas/services/saas-auth.service.ts`
- `apps/web/web/src/app/features/saas/services/saas-state.service.ts`
- `apps/web/web/src/app/features/saas/services/saas.service.ts`
- `docs/members/erik/changes/active/VAL-008-implement-saas-admin-frontend/design.md`
- `docs/members/erik/changes/active/VAL-008-implement-saas-admin-frontend/evidence.md`
- `docs/members/erik/changes/active/VAL-008-implement-saas-admin-frontend/proposal.md`
- `docs/members/erik/changes/active/VAL-008-implement-saas-admin-frontend/tasks.md`

## Datenmodell- und Routenprüfung am 2026-09-27

Auf Nutzerwunsch wurde [backend-handoff.md](backend-handoff.md) zum Weiterleiten erstellt. Erneut geprüft wurden Entities, Beziehungen, Auth-/Tenant-Repositories, SaaS-Routen, DTOs, relevante Ticketverwendungen und die Schema-Konfiguration. Zusätzlich festgestellt: `Tier.name` und `CostOrder.name` sind globale Primärschlüssel; die aktuelle Struktur erlaubt keine gleichnamigen unabhängigen Datensätze pro Tenant. `FoodTicket` referenziert diese Entities, daher müssen Schlüsseländerungen die Beziehungen berücksichtigen. `Tenant.manager` ist ein Textfeld, keine Admin-ID-Beziehung. Konfiguration verwendet `drop-and-create`.

Die Übergabe trennt vorhandene APIs von vorgeschlagenen Verträgen und späterer Basisdatenverwaltung. Neue Routen, DTOs und Modelle sind nicht implementiert und nicht vom Team freigegeben. Kein Backendcode geändert, kein Build/Live-Test durchgeführt, kein Commit/Push/PR. Neu: `backend-handoff.md`; ergänzt: `tasks.md` und diese Evidence. Die eigentliche Frontendanbindung der neuen APIs bleibt ein späterer Schritt.

## HTML-Platzhalter entfernt am 2026-09-27

Auf Nutzerwunsch wurden die SaaS-Templates auf Platzhalter geprüft. Geändert: `organization-page.html` (Eingabeplatzhalter entfernt), `branding-page.html` (neutrale Komponentenbeschriftungen), `branding-preview-page.html` (Beispielperson, Restaurantbeispiel und simulierte Erfassungs-/Einlöse-/Aktivstatus entfernt; echte Mitarbeiterzahl des gewählten Tenants statt statischer 12) und `modules-page.html` (funktionslose Offline-/OCR-Karten entfernt). Die Branding-Vorschau bleibt als reine Darstellung gekennzeichnet. Farbstatus-Beispiele in der Komponentenansicht, Auswahlaufforderungen, leere Zustände und Hinweise auf fehlende Backendfunktionen bleiben erhalten.

Prüfungen dieser Nacharbeit:

- Suche mit `rg` nach `placeholder|platzhalter|beispiel|testfirma|testperson|muster|demo|später verfügbar` in allen SaaS-HTML-Dateien: keine Treffer.
- `npm run build --prefix apps/web/web`: erfolgreich, Initial-Bundle 826,08 kB; bestehende Warnung zum 500-kB-Budget (326,08 kB darüber).
- `git diff --check`: erfolgreich; erfasst nur von Git verfolgte Änderungen, die neuen SaaS-Dateien sind weiterhin untracked. Ihre Templates wurden durch den Build geprüft.

Keine Unit-Tests oder Browserprüfung für diese Template-Nacharbeit ausgeführt. Keine Backenddatei geändert; die bereits vorgefundene Änderung an `import.sql` wurde nicht bearbeitet. Keine neue Backendanbindung, kein Commit, Push oder PR. `tasks.md` aktualisiert.

## Formatierung auf Nutzerwunsch am 2026-09-27

Mehr Leerzeilen zwischen Abschnitten, teilweise doppelte Leerzeilen vor Methoden sowie unterschiedlich umgebrochene HTML-Attribute ergänzt. Als Vergleich erneut Employee-Welcome, Restaurant-History und Restaurant-Header gelesen. Änderungen betreffen 27 Dateien: jeweils HTML/TS der zehn SaaS-Seiten, Sidebar und Layout sowie die drei Services `saas-auth.service.ts`, `saas-state.service.ts` und `saas.service.ts`. SCSS, Modelle, Routing, Guard und Tests wurden dabei nicht geändert. Ergänzt: `tasks.md` und `evidence.md`.

Prüfungen dieser reinen Formatierungsänderung:

- Alle 27 Dateien gegen eine vor der Änderung erstellte temporäre Kopie verglichen: ohne Whitespace identischer Inhalt; keine nachgestellten Leerzeichen.
- Die 15 betroffenen TS-Dateien zusätzlich mit dem lokalen TypeScript-Scanner geprüft: identische Tokens einschließlich Stringinhalten.
- `npm run build --prefix apps/web/web`: erfolgreich, weiterhin Initial-Bundle 826,08 kB und Warnung zum 500-kB-Budget.
- `git diff --check`: erfolgreich (nur verfolgte Dateien; die neuen SaaS-Dateien wurden separat wie oben geprüft).

Keine Unit-Tests oder Browserprüfung erneut ausgeführt. Keine Logik-, Text- oder Backendänderung und kein Commit, Push oder PR.

## SaaS-Tests auf Nutzerwunsch entfernt am 2026-09-27

Nach Klärung des Umfangs ("nur saas") wurden `apps/web/web/src/app/features/saas/saas.spec.ts` und `apps/web/web/tsconfig.saas.spec.json` gelöscht. Die gemeinsame `tsconfig.spec.json` sowie sämtliche Tests anderer Bereiche bleiben erhalten. `tasks.md` aktualisiert. Frühere Testergebnisse und Dateilisten in dieser Evidence beschreiben den damaligen Stand; der dokumentierte SaaS-Testaufruf ist nach der Löschung nicht mehr ausführbar.

Dateiprüfung erfolgreich: beide Dateien entfernt, keine weiteren SaaS-Specs vorhanden; gemeinsame Konfiguration und 52 andere Spec-Dateien vorhanden. `git diff --check` erfolgreich. Keine Tests und kein Build für diese Löschung ausgeführt. Keine Änderung am Anwendungscode, kein Commit, Push oder PR.


## Anschlussstand VAL-009 am 2026-09-27

Die zuvor fehlenden Employee-Zuweisungs- und Konfigurationsrouten wurden inzwischen im Backend ergänzt und unter [VAL-009](../VAL-009-connect-saas-admin-backend/report.md) angebunden. Die oben stehenden Aussagen zu fehlenden Listen-/Speicherrouten beschreiben den damaligen Stand. Aktueller Stand, tatsächlich ausgeführte Live-Prüfungen und weiterhin fehlende Plattformfunktionen stehen dort. Keine SaaS-Spec-Datei wieder eingeführt, kein Commit/Push/PR.

Ergänzung: Auf späteren ausdrücklichen Nutzerwunsch wurden eigene Serverkorrekturen aus VAL-009 zurückgenommen. Aktuell wird der unveränderte Server verwendet; Grenzen bei Erstkonfiguration, Login ohne Tenant und Berechtigungen sind in der [Backend-Übergabe](../VAL-009-connect-saas-admin-backend/backend-handoff.md) dokumentiert. Frühere Prüfergebnisse mit korrigiertem Server sind dort als historisch gekennzeichnet.
