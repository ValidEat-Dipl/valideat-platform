# Nachweis: Mitarbeiterfrontend für Porsche-Version vorbereiten

## Metadaten

| Feld                    | Wert                     |
| ----------------------- | ------------------------ |
| Change-ID               | `VAL-004`              |
| Status                  | `implemented`          |
| Verantwortlich          | Erik Bergmair            |
| Beginn                  | 2026-07-09               |
| Abschluss               | noch nicht abgeschlossen |
| Tatsächlicher Zeitraum | ab 2026-07-09            |

## Git- und GitHub-Nachweise

| Nachweis     | Referenz                                                                                                                                                                             |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Issue        | `#10`                                                                                                                                                                              |
| Branch       | `main`                                                                                                                                                                             |
| Pull Request | nicht vorhanden                                                                                                                                                                      |
| Commits      | `1d9b3ca`, `612e3e9`, `0c07abc`, `06fae8c`, `4bd8773`, `e2322ed`, `770cd9d`, `5fe2a2f`, `48949d0`, `9f791ab`, `cf706e8`, `58e169a`, `31b7780`, `bb80819` |

## Tatsächlich umgesetzte Funktionen

- Ein eigener, lazy geladener Employee-Routenbereich wurde angelegt.
- Ein responsives Employee-Grundlayout und die Welcome Page wurden umgesetzt.
- Die Startseite wurde mit wiederverwendbarem Header und wiederverwendbarer Bottom-Navigation umgesetzt.
- Ein Employee-FoodTicket-Model und ein EmployeeTicket-Service kapseln die vorhandenen Backend-GET-Endpunkte.
- Die Startseite bezieht den Tagesstatus und die Mitarbeitererfassungen direkt per `subscribe`.
- Das Employee-FoodTicket-Model und die verwendenden Seiten wurden auf das flache `EmployeeGetTicketsDTO` des Backends umgestellt.
- Die Implementierung verwendet direkte HTTP-Subscriptions und einfache Signals für asynchron geladene Template-Zustände.
- Die Seite „Verwendung erfassen“ wurde als Reactive Form mit Pflichtfeldern und Bestätigungscheckbox umgesetzt.
- Ein kleiner Employee-State-Service hält die Eingaben zwischen Formular, Prüfseite und Erfolgsseite.
- Die Prüfseite zeigt alle Eingaben an und sendet den POST erst nach der ausdrücklichen Bestätigung.
- Die Erfolgsseite wird nur nach erfolgreichem POST aufgerufen und zeigt die gesendeten Erfassungsdaten.
- Restaurants, Markerlstufen und Kostenstellen werden beim Öffnen des Formulars aus den vorhandenen Backend-Endpunkten geladen.
- Die Seite „Meine Erfassungen“ lädt die vorhandenen Employee-Tickets und sortiert sie ohne zusätzliche Filter nach Datum, neueste Erfassung zuerst.
- Die Detail-Aktion öffnet eine eigene Route mit Ticket-ID und zeigt Datum, Markerlstufe, Kostenstelle, Restaurant, optionales Prüfdatum und Status.
- Die Detailseite und die Bearbeitungsseite laden den ausgewählten Eintrag direkt über das flache DTO von `GET /foodticket/{id}`.
- Die dynamische Detailroute `employee/entries/:id` wird in der SSR-Konfiguration mit `RenderMode.Server` behandelt, weil sie nicht ohne bekannte Parameter vorgerendert werden kann.
- Startseite, Erfassungsliste, Detailseite, Dropdownlisten sowie asynchrone Speicher- und Fehlerzustände wurden auf Angular Signals umgestellt.
- Beim asynchronen `patchValue()` des Reactive Forms wird gezielt `ChangeDetectorRef.markForCheck()` verwendet.
- Bei Erfassungen mit Status `OPEN` zeigt die Detailseite eine Aktion zum Bearbeiten an.
- Die Bearbeitungsseite lädt den ausgewählten Eintrag und die drei Dropdownlisten, befüllt ein Reactive Form und sendet die geänderten Werte per PUT.
- Einträge mit einem anderen Status werden von der Bearbeitungsseite zur Detailansicht zurückgeleitet; das Backend prüft Status und Employee-ID zusätzlich.
- Offene Erfassungen können nach einer Bestätigungsabfrage über `DELETE /foodticket/{ticketId}` gelöscht werden; nach HTTP 204 wird zur Erfassungsübersicht navigiert.
- Eine Loginseite sendet E-Mail und Passwort an den vorläufigen Login-Endpunkt und navigiert bei dessen Erfolgstext zur Startseite.
- Eine Registrierungsseite bildet die vorhandenen Employee-Felder in einem Reactive Form ab, prüft Passwortwiederholung und Zustimmung und sendet den Datensatz an `/employee/register`.
- Die Welcome Page ist mit der Loginseite verbunden; Login und Registrierung sind gegenseitig verlinkt.
- Das Erfassungsformular startet mit dem aktuellen, weiterhin änderbaren Datum und übernimmt Kostenstelle, Markerlstufe und Restaurant aus dem Eintrag mit der höchsten ID.
- Das Frontend übernimmt die vom POST zurückgegebene Ticket-ID direkt und verwendet sie für „Erfassung ansehen“.
- Für die Standardwerte des Formulars werden die geladenen Einträge im Frontend nach ID absteigend sortiert.

## Betroffene Dateien

| Datei                                                                                | Tatsächliche Änderung                                                                                              |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/proposal.md`     | Ziel, Umfang, Nicht-Umfang, Akzeptanzkriterien und offene Fragen für das Mitarbeiterfrontend dokumentiert.          |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/design.md`       | geplante technische Umsetzung, Datenfluss, Benutzerablauf, Risiken und Teststrategie beschrieben.                    |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/tasks.md`        | überprüfbare Aufgaben für Vorbereitung, Klärung, Umsetzung, Tests, Dokumentation, Review und Abschluss angelegt. |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/evidence.md`     | Nachweisdatei für den tatsächlichen Stand angelegt.                                                                |
| `apps/web/web/src/app/features/employee/employee.routes.ts`                        | Lazy geladene Welcome-, Start- und Erfassungs-Routes des Employee-Bereichs.                                          |
| `apps/web/web/src/app/features/employee/layout/employee-layout/*`                  | Gemeinsame responsive Grundfläche des Employee-Bereichs.                                                            |
| `apps/web/web/src/app/features/employee/pages/welcome-page/*`                      | Responsiver Einstiegsscreen.                                                                                         |
| `apps/web/web/src/app/features/employee/pages/login-page/*`                        | Vorläufige Loginseite mit Reactive Form, Fehlerzustand und automatisiertem Request-Test.                            |
| `apps/web/web/src/app/features/employee/pages/register-page/*`                     | Registrierungsformular für die Felder der vorhandenen Employee-Entity.                                              |
| `apps/web/web/src/app/features/employee/pages/start-page/*`                        | Startseite, direkte HTTP-Subscriptions und Datumsformatierung.                                                       |
| `apps/web/web/src/app/features/employee/pages/create-entry-page/*`                 | Reactive Form für Datum, Name, Kostenstelle, Markerlstufe, Restaurant und Bestätigung.                             |
| `apps/web/web/src/app/features/employee/pages/review-entry-page/*`                 | Prüfseite mit Zusammenfassung und abschließendem POST.                                                             |
| `apps/web/web/src/app/features/employee/pages/entry-success-page/*`                | Erfolgsansicht nach einer bestätigten Erfassung.                                                                    |
| `apps/web/web/src/app/features/employee/pages/entries-page/*`                      | Nach Datum sortierte Liste der Mitarbeitererfassungen mit Lade- und Leerzustand.                                     |
| `apps/web/web/src/app/features/employee/pages/entry-detail-page/*`                 | Einzelabruf, Statusdarstellung, Bearbeitungslink und bestätigtes Löschen einer offenen Erfassung.                  |
| `apps/web/web/src/app/features/employee/pages/edit-entry-page/*`                   | Einzelabruf und Reactive Form zum Bearbeiten einer offenen Erfassung sowie Tests des Lade- und PUT-Ablaufs.          |
| `apps/web/web/src/app/features/employee/components/employee-header/*`              | Wiederverwendbarer Header mit variablem Titel und optionaler Zurück-Navigation.                                     |
| `apps/web/web/src/app/features/employee/components/employee-navigation/*`          | Wiederverwendbare Bottom-Navigation.                                                                                 |
| `apps/web/web/src/app/features/employee/models/employee-food-ticket.model.ts`      | Frontend-Modell der für den Employee-Bereich benötigten Ticketdaten.                                               |
| `apps/web/web/src/app/features/employee/models/employee-register-request.model.ts` | Request-Modell für die vorläufige Registrierung.                                                                   |
| `apps/web/web/src/app/features/employee/models/restaurant.model.ts`                | Modell der Restaurant-Antwort mit ID, Adresse und Name.                                                              |
| `apps/web/web/src/app/features/employee/models/tier.model.ts`                      | Modell der Markerlstufen-Antwort mit Name und Rabatt.                                                                |
| `apps/web/web/src/app/features/employee/models/cost-order.model.ts`                | Modell der Kostenstellen-Antwort.                                                                                    |
| `apps/web/web/src/app/features/employee/services/employee-ticket.service.ts`       | Gekapselte GET-, POST-, PUT- und DELETE-Aufrufe für Mitarbeitererfassungen.                                         |
| `apps/web/web/src/app/features/employee/services/employee-auth.service.ts`         | Vorläufige POST-Aufrufe für Login und Registrierung.                                                               |
| `apps/web/web/src/app/features/employee/services/employee-entry-state.ts`          | Einfacher temporärer Zustand für den noch nicht abgeschlossenen Erfassungsflow.                                    |
| `apps/web/web/src/app/app.routes.server.ts`                                        | Server-Rendering für die parametrisierten Employee-Detail- und Bearbeitungsrouten festgelegt.                       |

## Akzeptanzkriterien

| Kriterium                                                                                                                   | Ergebnis | Nachweis                                                            |
| --------------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------- |
| Der tatsächliche Angular-Ausgangsstand wurde geprüft und in `evidence.md` dokumentiert.                                 | erfüllt | Tagesprotokoll 2026-07-13 und betroffene Dateien                    |
| Der Mitarbeiterbereich ist klar von HR-/Admin-Funktionen abgegrenzt.                                                        | erfüllt | eigener Feature-Ordner unter `features/employee`                  |
| Die umzusetzenden Figma-Screens sind im Design referenziert.                                                                | erfüllt | `design.md`, betroffene Komponenten und Benutzerablauf            |
| Offene fachliche Regeln sind als Annahmen oder offene Fragen dokumentiert.                                                  | erfüllt | `proposal.md`, offene Fragen und Annahmen                         |
| Die Hauptnavigation des Mitarbeiterflows ist geplant oder umgesetzt.                                                        | erfüllt | Start und Erfassungen verlinkt; Hilfe mangels Zielseite deaktiviert |
| Die Erfassung einer Markerlverwendung ist als UI-Flow umgesetzt oder als nächster konkreter Umsetzungsschritt vorbereitet. | erfüllt | Formular, Prüfseite, POST bei Bestätigung und Erfolgsseite        |
| Vorläufige Daten und Mockdaten sind klar als nicht produktiv gekennzeichnet.                                               | erfüllt | temporäre Employee-ID im Code kommentiert                          |
| Bootstrap 5.3 und SCSS werden konsistent zur bisherigen Designentscheidung verwendet.                                       | erfüllt | Employee-Layout, Welcome und Start Page                             |
| Nicht umgesetzte API-, Auth-, Offline- oder Porsche-Details werden nicht als erledigt dargestellt.                          | erfüllt | `proposal.md`, Nicht-Umfang und offene Fragen                     |
| Ausgeführte Prüfungen sind mit tatsächlichem Ergebnis in `evidence.md` dokumentiert.                                   | erfüllt | Abschnitt „Ausgeführte Prüfungen“                               |

## Abweichungen vom Design

- Erfassungen ist in der Bottom-Navigation verlinkt; Hilfe bleibt deaktiviert, weil die Zielseite fehlt.
- Der Button „Verwendung erfassen“ führt auf die neue Reactive-Form-Seite.
- „Erfassung ansehen“ verwendet die direkt vom POST zurückgegebene Ticket-ID.
- Die „Details“-Aktionen in der Erfassungsliste führen auf `/employee/entries/:id`.
- Die im Figma-Zwischenstand gezeigten Status- und Datumsfilter wurden nach Rücksprache entfernt; die Liste zeigt alle Einträge mit dem neuesten Datum zuerst.
- Die Dropdownwerte werden aus `/restaurant`, `/tier` und `/costOrder` geladen; der POST verwendet weiterhin die jeweiligen Namen.
- Die Employee-ID ist vorläufig auf den lokalen Entwicklungsdatensatz 1 gesetzt, weil der Login noch keine ID liefert.

## Ausgeführte Prüfungen

| Datum      | Prüfung oder Befehl                                                             | Umgebung        | Ergebnis                                                                                                                                 | Status                                            |
| ---------- | -------------------------------------------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| 2026-07-09 | Anlage des Change-Ordners und der vier Change-Dokumente                          | lokal           | Dokumente wurden angelegt                                                                                                                | bestanden                                         |
| 2026-07-13 | `npx ng test --watch=false --include='src/app/features/employee/**/*.spec.ts'` | lokal           | 6 Testdateien, 7 Tests bestanden                                                                                                         | bestanden                                         |
| 2026-07-13 | `npx ng build`                                                                 | lokal           | Build erfolgreich; bestehende HR/Admin-404-Ausgaben und Bundle-Warnung vorhanden                                                         | bestanden mit bekannten Warnungen                 |
| 2026-07-13 | Mobile Browserprüfung bei 390 × 844                                            | lokal           | kein horizontaler Überlauf, Bottom-Navigation am unteren Rand                                                                           | bestanden                                         |
| 2026-07-13 | Responsive Prüfung bei 1440 × 900                                              | lokal           | Container 1320 px, Inhaltsbereich 636 px, kein horizontaler Überlauf                                                                    | bestanden                                         |
| 2026-07-13 | Live-GET `checkIfTodaysTicketUsed/1/2026-07-13`                                | lokales Backend | HTTP 200,`false`                                                                                                                       | bestanden                                         |
| 2026-07-13 | Live-GET `/foodticket/findByEmployee/1`                                        | lokales Backend | HTTP 200, gültige JSON-Liste mit 3 Einträgen und 2519 Byte                                                                             | bestanden mit Datenschutz-Einschränkung          |
| 2026-07-14 | `npx ng test --watch=false --include='src/app/features/employee/**/*.spec.ts'` | lokal           | 7 Testdateien, 9 Tests bestanden                                                                                                         | bestanden                                         |
| 2026-07-14 | `npx ng build`                                                                 | lokal           | Build erfolgreich; bestehende HR/Admin-404-Ausgaben und Bundle-Warnung vorhanden                                                         | bestanden mit bekannten Warnungen                 |
| 2026-07-14 | Mobile Browserprüfung bei 390 × 844                                            | lokal           | Formular vollständig sichtbar, kein horizontaler Überlauf                                                                              | bestanden                                         |
| 2026-07-14 | Reactive-Form-Prüfung                                                           | lokal           | zunächst ungültig; nach Auswahl aller Pflichtwerte und Checkbox gültig                                                                | bestanden                                         |
| 2026-07-14 | Live-GET `/foodticket/findByEmployee/1`                                        | lokales Backend | HTTP 200; flaches DTO mit Vorname, Nachname, Ticketdaten und ohne Employee-Entity                                                        | bestanden                                         |
| 2026-07-14 | Employee- und Datepicker-Tests nach Fehlerbehebung                               | lokal           | 8 Testdateien, 10 Tests bestanden                                                                                                        | bestanden                                         |
| 2026-07-14 | `npx ng build` nach Datepicker-Fehlerbehebung                                  | lokal           | Build erfolgreich; bekannte HR-Endpunkt-404-Ausgaben und Bundle-Warnung vorhanden                                                        | bestanden mit bekannten Warnungen                 |
| 2026-07-14 | Browserprüfung `/employee/start` nach DTO-Umstellung                          | lokal           | Name und aktuelles Ticket aus flachem DTO dargestellt; keine Browserfehler                                                               | bestanden                                         |
| 2026-07-14 | Employee-Tests nach Erweiterung des Erfassungsflows                              | lokal           | 9 Testdateien, 13 Tests bestanden; kein POST bei „Weiter“, POST erst bei Bestätigung                                                  | bestanden                                         |
| 2026-07-14 | Browserflow Formular bis Prüfseite bei 390 × 844                               | lokal           | Werte korrekt übernommen, kein horizontaler Überlauf, keine Browserfehler                                                              | bestanden                                         |
| 2026-07-14 | Live-GETs `/restaurant`, `/tier` und `/costOrder`                          | lokales Backend | HTTP 200; 5 Restaurants, 5 Stufen und 10 Kostenstellen                                                                                   | bestanden                                         |
| 2026-07-14 | Employee-Tests nach Dropdown-Anbindung                                           | lokal           | 9 Testdateien, 16 Tests bestanden                                                                                                        | bestanden                                         |
| 2026-07-14 | Browserprüfung der dynamischen Dropdowns                                        | lokal           | alle drei Listen mit Backendwerten dargestellt; keine Browserfehler                                                                      | bestanden                                         |
| 2026-07-15 | Isolierte TypeScript-Prüfung `entries-page.ts`                                | lokal           | ohne TypeScript-Fehler abgeschlossen                                                                                                     | bestanden                                         |
| 2026-07-15 | Employee- und Datepicker-Tests nach Konfliktauflösung                           | lokal           | 11 Testdateien, 19 Tests bestanden                                                                                                       | bestanden                                         |
| 2026-07-15 | `npx ng build` nach Konfliktauflösung                                         | lokal           | Build erfolgreich; bekannte HR-Endpunkt-404-Ausgaben und Bundle-Warnung vorhanden                                                        | bestanden mit bekannten Warnungen                 |
| 2026-07-15 | `git diff --check`                                                             | lokal           | ohne Fehler abgeschlossen                                                                                                                | bestanden                                         |
| 2026-07-15 | Browserprüfung `/employee/entries` bei 390 × 844                             | lokal           | vier Einträge und funktionierender Statusfilter im damaligen Zwischenstand; kein Überlauf und keine Browserfehler                      | bestanden                                         |
| 2026-07-15 | Test der vereinfachten Erfassungsliste                                           | lokal           | 1 Testdatei, 2 Tests bestanden; neueste Erfassung wird zuerst ausgegeben                                                                 | bestanden                                         |
| 2026-07-15 | Tests für Erfassungsliste und neue Detailseite                                  | lokal           | 2 Testdateien, 3 Tests bestanden                                                                                                         | bestanden                                         |
| 2026-07-15 | `npx ng build` nach Umsetzung der Detailseite                                  | lokal           | Build erfolgreich; bekannte HR/Admin-404-Ausgaben und Bundle-Warnung vorhanden                                                           | bestanden mit bekannten Warnungen                 |
| 2026-07-15 | Employee-Tests nach Signal-Umstellung                                            | lokal           | 11 Testdateien, 19 Tests bestanden                                                                                                       | bestanden                                         |
| 2026-07-15 | Browsernavigation Start → Erfassungen → Start → Detail ohne Reload            | lokal           | Backenddaten wurden auf allen Seiten aktualisiert dargestellt; keine Browserfehler                                                       | bestanden                                         |
| 2026-07-15 | `npx ng build` nach Signal-Umstellung                                          | lokal           | Build-Ausgabe erstellt; Bundle-Warnung und bestehender HR/Admin-Prerender-Fehler bei `ticket.employee.firstName` ausgegeben            | bestanden mit bekannten Warnungen                 |
| 2026-07-15 | `git diff --check` nach Signal- und Dokumentationsänderungen                  | lokal           | ohne Fehler abgeschlossen                                                                                                                | bestanden                                         |
| 2026-07-15 | Live-GET `/foodticket/1`                                                       | lokales Backend | HTTP 200; vollständiges, verschachteltes `FoodTicket` mit 578 Byte                                                                    | bestanden mit Datenschutz-Einschränkung          |
| 2026-07-15 | Temporäre Tests der direkten Detail-Endpunkt-Anbindung                          | lokal           | 2 Testdateien, 8 Tests und anschließend 11 Testdateien mit 20 Tests bestanden; Anbindung danach aus Datenschutzgründen zurückgenommen | bestandener Zwischenstand                         |
| 2026-07-15 | Temporärer Build mit direkter Detail-Endpunkt-Anbindung                         | lokal           | Build-Ausgabe erstellt; Anbindung danach zurückgenommen; bekannte Bundle- und HR/Admin-Warnungen vorhanden                              | bestandener Zwischenstand mit bekannten Warnungen |
| 2026-07-15 | Employee-Tests nach Rücknahme der direkten Detail-Endpunkt-Anbindung            | lokal           | 11 Testdateien, 19 Tests bestanden; Detailseite verwendet wieder das flache Employee-DTO                                                 | bestanden                                         |
| 2026-07-15 | Employee-Tests nach Umsetzung der Bearbeitungsseite                              | lokal           | 12 Testdateien, 22 Tests bestanden; Laden des Formulars und PUT-Request automatisiert geprüft                                           | bestanden                                         |
| 2026-07-15 | `npx ng build` nach Umsetzung der Bearbeitungsseite                            | lokal           | Build-Ausgabe inklusive `edit-entry-page` erstellt; bekannte Bundle-Warnung und HR/Admin-Prerender-Ausnahme ausgegeben                 | bestanden mit bekannten Warnungen                 |
| 2026-07-16 | Bereitgestellter Live-GET `/foodticket/3`                                      | lokales Backend | HTTP 200; flaches DTO mit 244 Byte und ohne verschachtelte Employee-Entity                                                               | bestanden                                         |
| 2026-07-16 | Bereitgestellter Live-DELETE `/foodticket/2`                                   | lokales Backend | HTTP 204 ohne Response-Body                                                                                                              | bestanden                                         |
| 2026-07-16 | Employee-Tests nach Einzelabruf- und Löschanbindung                             | lokal           | 12 Testdateien und 26 Tests bestanden; GET und DELETE mit `HttpTestingController` geprüft                                             | bestanden                                         |
| 2026-07-16 | `npx ng build` nach Einzelabruf- und Löschanbindung                           | lokal           | Angular-Code kompiliert; Gesamtbuild wegen fremder parametrisierter Prerender-Route `ticket-details/:id` abgebrochen                   | fehlgeschlagen außerhalb Employee-Code           |
| 2026-07-16 | `git diff --check`                                                             | lokal           | ohne Fehler abgeschlossen                                                                                                                | bestanden                                         |
| 2026-07-16 | Employee-Tests nach Login- und Registrierungsumsetzung                           | lokal           | 15 Testdateien und 30 Tests bestanden; Login- und Register-Requests automatisiert geprüft                                               | bestanden                                         |
| 2026-07-16 | `npx ng build` nach Login- und Registrierungsumsetzung                         | lokal           | Login- und Register-Chunks erstellt; Gesamtbuild danach wegen zwei fremden parametrisierten Prerender-Routen abgebrochen                 | fehlgeschlagen außerhalb Employee-Code           |
| 2026-07-17 | Employee-Tests nach Formularstandard und Detailverlinkung                        | lokal           | 15 Testdateien und 32 Tests bestanden; Dropdownstandard und Navigation zur gespeicherten ID geprüft                                     | bestanden                                         |
| 2026-07-17 | `npx ng build` nach Formularstandard und Detailverlinkung                      | lokal           | Employee-Chunks erstellt; Gesamtbuild danach wegen zwei fremden parametrisierten Prerender-Routen abgebrochen                            | fehlgeschlagen außerhalb Employee-Code           |
| 2026-07-17 | Employee-Tests nach direkter ID-Übergabe                                        | lokal           | 15 Testdateien und 32 Tests bestanden; POST-ID und Navigation ohne zusätzlichen Listenabruf geprüft                                    | bestanden                                         |
| 2026-07-21 | Dokumentationsabgleich nach der Arbeitspause                                     | lokal           | Git-Verlauf, Tagesberichte, Proposal, Design, Tasks und Evidence abgeglichen; nur Dateien unter `docs/members/erik/` verändert        | bestanden                                         |

Nicht ausgeführte Prüfungen:

- Die abschließende Bestätigung wurde nicht live angeklickt, damit kein weiterer Datenbankeintrag erzeugt wird.
- Der POST wurde nicht live ausgeführt, damit durch die Prüfung kein zusätzlicher Datenbankeintrag entsteht; der Request ist mit `HttpTestingController` automatisiert geprüft.
- Der PUT wurde nicht live ausgeführt, damit kein bestehender Datenbankeintrag verändert wird; URL, Methode und Request-Body sind mit `HttpTestingController` automatisiert geprüft.
- Im Rahmen dieser Frontend-Umsetzung wurde kein zusätzlicher Live-DELETE ausgelöst; der vom Benutzer bereitgestellte HTTP-204-Nachweis und der automatisierte Request-Test wurden verwendet.
- Fachliche Prüfung durch Porsche wurde nicht durchgeführt.
- Review durch Teammitglieder wurde noch nicht dokumentiert.

## Bekannte Einschränkungen

- Die FSD ist noch nicht ausgearbeitet.
- Fachliche Regeln für Mitarbeitererfassung, Markerlstufen, Nachträge, Korrekturen und Status sind offen.
- API und Authentifizierung sind für diesen Change noch nicht verbindlich abgestimmt.
- Der Login liefert keine Employee-ID; im Frontend wird vorläufig der lokale Entwicklungsdatensatz 1 verwendet.
- Der vorläufige Login liefert nur einen Text, aber weder Token noch Session oder Employee-ID. Eine erfolgreiche Antwort ist deshalb noch keine belastbare Authentifizierung.
- Der vorläufige Login überträgt das Passwort als URL-Path-Parameter. Dadurch kann es in Logs, Verlauf und Infrastruktur sichtbar werden; vor einer echten Nutzung muss der Endpunkt auf einen Request-Body über HTTPS sowie eine richtige Auth-Lösung umgestellt werden.
- Die Registrierung nimmt aktuell die Employee-Entity direkt entgegen. Ein begrenztes Register-DTO mit serverseitiger Validierung ist noch offen.
- Personalnummer und Kostenstelle aus dem Figma-Entwurf sind nicht im aktuellen Employee-Backendmodell vorhanden und wurden deshalb nicht erfunden.
- `findByEmployee` liefert nun ein begrenztes, flaches `EmployeeGetTicketsDTO`; das Frontend wurde auf diese Antwort umgestellt.
- Die Dropdowns hängen von den Backend-Endpunkten `/restaurant`, `/tier` und `/costOrder` ab; ein eigener Ladefehler-Hinweis fehlt noch.
- `GET /foodticket/{id}` liefert nun ein begrenztes, flaches DTO und wird von Detail- und Bearbeitungsseite verwendet.
- `PUT /foodticket/{ticketId}/{empId}` liefert nach erfolgreicher Bearbeitung derzeit ebenfalls die vollständige `FoodTicket`-Entity. Das Frontend verwendet diese Antwort nicht; die unnötigen Daten werden trotzdem übertragen und sollten backendseitig durch `204 No Content` oder ein begrenztes DTO ersetzt werden.
- `DELETE /foodticket/{ticketId}` prüft im gezeigten Backend-Code weder Employee-ID noch Status. Die UI zeigt Löschen nur bei `OPEN`, diese Regel muss aus Sicherheitsgründen trotzdem auch backendseitig durchgesetzt werden.
- Das aktuelle flache `EmployeeGetTicketsDTO` enthält keine konkrete Konfliktursache; die Detailseite zeigt deshalb weiterhin nur einen allgemeinen Konflikthinweis.
- Der Zwischenzustand liegt nur im Arbeitsspeicher des Frontends; nach einem Neuladen beginnt der noch nicht bestätigte Flow erneut beim Formular.
- Der POST liefert die erzeugte ID aktuell als einzelne Zahl. Ein festes Response-DTO wäre bei einer späteren Stabilisierung des API-Vertrags eindeutiger.
- Das DTO enthält keinen Erstellungszeitpunkt und keinen Tickettyp. „Letzter Eintrag“ wird deshalb vorläufig im Frontend als Eintrag mit der höchsten ID interpretiert.
- Die endgültige SSR-/Deployment-Strategie für die dynamische Detailroute ist noch nicht abgestimmt.
- Der Gesamtbuild wird derzeit von den fremden parametrisierten Prerender-Routen `ticket-details/:id` und `ticket-details/correct/:id` ohne `getPrerenderParams` beziehungsweise passenden RenderMode blockiert; dieser Code liegt außerhalb des Employee-Changes.
- HR-/Admin-Funktionen gehören nicht zu diesem Change.
- Offline-, Kamera-, Scanner- und Restaurantfunktionen werden nicht in diesem ersten Mitarbeiterfrontend-Change umgesetzt.

## Eigene Leistung von Erik

Erik verantwortet Planung, UI/UX-Entscheidungen, Angular-Umsetzung, manuelle Prüfung und Dokumentation des Mitarbeiterfrontends. Die Implementierung wurde umgesetzt. Die verwendeten Backend-Endpunkte stammen aus der gemeinsamen Backend-Arbeit; Authentifizierung und HR-/Admin-Funktionen werden getrennt betrachtet und müssen mit den zuständigen Teammitgliedern abgestimmt werden.

## Review

| Datum      | Prüfende Person | Gegenstand           | Ergebnis                               | Offene Punkte                       |
| ---------- | ---------------- | -------------------- | -------------------------------------- | ----------------------------------- |
| 2026-07-09 | Erik Bergmair    | erster Planungsstand | angelegt, noch nicht fachlich reviewed | FSD-Fragen, API, Auth, Teamabgleich |

## Verwendete Quellen

| Quellen-ID  | Quelle                                                                                                  | Verwendungszweck                                                                   |
| ----------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `SRC-006` | [Bootstrap-Entscheidung](../../../sources/sources.md#src-006--angular-material-vs-bootstrap-bei-bairesdev) | Kontext zur Bootstrap-Entscheidung gegenüber Angular Material.                    |
| `SRC-008` | [Bootstrap 5.3 Introduction](../../../sources/sources.md#src-008--bootstrap-53-introduction)               | Grundlage für mobile-first und responsive Ausrichtung.                            |
| `SRC-009` | [Bootstrap Sass](../../../sources/sources.md#src-009--bootstrap-sass)                                      | Grundlage für SCSS-Anpassungen.                                                   |
| `SRC-011` | [Figma Components](../../../sources/sources.md#src-011--figma-components)                                  | Bezug zur komponentenorientierten Ableitung aus dem Figma-Prototyp.                |
| `SRC-020` | [Angular Component Inputs](../../../sources/sources.md#src-020--angular-component-inputs)                  | Grundlage für variable Header-Titel und optionale Input-Werte.                    |
| `SRC-021` | [Angular Location API](../../../sources/sources.md#src-021--angular-location-api)                          | Grundlage für den Zurück-Button über `Location.back()`.                       |
| `SRC-022` | [Angular Zoneless](../../../sources/sources.md#src-022--angular-zoneless)                                  | Grundlage für Signals und `markForCheck()` bei asynchronen Zustandsänderungen. |

## KI-Unterstützung

| KI-ID | Gesprächsdatei | Unterstützung | Prüfung und Verwendung |
| ----- | --------------- | -------------- | ----------------------- |

## Abschlusscheckliste

- [X] Tatsächlicher Umfang ist für den aktuellen Implementierungsstand dokumentiert.
- [X] Akzeptanzkriterien haben einen ehrlichen Prüfstatus.
- [X] Ausgeführte und nicht ausgeführte Tests sind getrennt.
- [X] Abweichungen und Einschränkungen sind sichtbar.
- [X] Eigene und gemeinsame Leistungen sind getrennt.
- [X] Quellen und KI-Unterstützung sind für den aktuellen Stand eingetragen.
- [X] Git- und Review-Nachweise sind eingetragen oder als nicht vorhanden markiert.
- [X] Der Status entspricht dem tatsächlichen Stand `implemented`; vollständige Verifikation, Review und Abschluss stehen noch aus.
