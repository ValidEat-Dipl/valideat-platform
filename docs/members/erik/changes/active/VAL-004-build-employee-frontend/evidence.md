# Nachweis: Mitarbeiterfrontend für Porsche-Version vorbereiten

## Metadaten

| Feld                   | Wert                     |
| ---------------------- | ------------------------ |
| Change-ID              | `VAL-004`                |
| Status                 | `draft`                  |
| Verantwortlich         | Erik Bergmair            |
| Beginn                 | 2026-07-09               |
| Abschluss              | noch nicht abgeschlossen |
| Tatsächlicher Zeitraum | ab 2026-07-09            |

## Git- und GitHub-Nachweise

| Nachweis     | Referenz                                             |
| ------------ | ---------------------------------------------------- |
| Issue        | `#10`                                                |
| Branch       | `main`                                               |
| Pull Request | nicht vorhanden                                      |
| Commits      | `612e3e9` – Employee-Routes, Layout und Welcome Page |

## Tatsächlich umgesetzte Funktionen

- Ein eigener, lazy geladener Employee-Routenbereich wurde angelegt.
- Ein responsives Employee-Grundlayout und die Welcome Page wurden umgesetzt.
- Die Startseite wurde mit wiederverwendbarem Header und wiederverwendbarer Bottom-Navigation umgesetzt.
- Ein Employee-FoodTicket-Model und ein EmployeeTicket-Service kapseln die vorhandenen Backend-GET-Endpunkte.
- Die Startseite bezieht den Tagesstatus und die Mitarbeitererfassungen direkt per `subscribe`.
- Die Implementierung verwendet bewusst einfache Component-Properties, Constructor-Injection und direkte HTTP-Aufrufe entsprechend Eriks bestehendem Angular-Stil.

## Betroffene Dateien

| Datei                                                                          | Tatsächliche Änderung                                                                                            |
| ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/proposal.md` | Ziel, Umfang, Nicht-Umfang, Akzeptanzkriterien und offene Fragen für das Mitarbeiterfrontend dokumentiert.       |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/design.md`   | geplante technische Umsetzung, Datenfluss, Benutzerablauf, Risiken und Teststrategie beschrieben.                |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/tasks.md`    | überprüfbare Aufgaben für Vorbereitung, Klärung, Umsetzung, Tests, Dokumentation, Review und Abschluss angelegt. |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/evidence.md` | Nachweisdatei für den tatsächlichen Stand angelegt.                                                              |
| `apps/web/web/src/app/features/employee/employee.routes.ts`                    | Lazy geladene Welcome- und Start-Routes des Employee-Bereichs.                                                   |
| `apps/web/web/src/app/features/employee/layout/employee-layout/*`              | Gemeinsame responsive Grundfläche des Employee-Bereichs.                                                         |
| `apps/web/web/src/app/features/employee/pages/welcome-page/*`                  | Responsiver Einstiegsscreen.                                                                                     |
| `apps/web/web/src/app/features/employee/pages/start-page/*`                    | Startseite, direkte HTTP-Subscriptions und Datumsformatierung.                                                   |
| `apps/web/web/src/app/features/employee/components/employee-header/*`          | Wiederverwendbarer Header mit variablem Titel und optionaler Zurück-Navigation.                                  |
| `apps/web/web/src/app/features/employee/components/employee-navigation/*`      | Wiederverwendbare Bottom-Navigation.                                                                             |
| `apps/web/web/src/app/features/employee/models/employee-food-ticket.model.ts`  | Frontend-Modell der für den Employee-Bereich benötigten Ticketdaten.                                             |
| `apps/web/web/src/app/features/employee/services/employee-ticket.service.ts`   | Gekapselte GET-Aufrufe für Tagesstatus und Mitarbeitererfassungen.                                               |

## Akzeptanzkriterien

| Kriterium                                                                                                                  | Ergebnis                  | Nachweis                                                             |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------------------------------------------------------------------- |
| Der tatsächliche Angular-Ausgangsstand wurde geprüft und in `evidence.md` dokumentiert.                                    | erfüllt                   | Tagesprotokoll 2026-07-13 und betroffene Dateien                     |
| Der Mitarbeiterbereich ist klar von HR-/Admin-Funktionen abgegrenzt.                                                       | erfüllt                   | eigener Feature-Ordner unter `features/employee`                     |
| Die umzusetzenden Figma-Screens sind im Design referenziert.                                                               | teilweise erfüllt         | `design.md`, Benutzerablauf                                          |
| Offene fachliche Regeln sind als Annahmen oder offene Fragen dokumentiert.                                                 | teilweise erfüllt         | `proposal.md`, offene Fragen und Annahmen                            |
| Die Hauptnavigation des Mitarbeiterflows ist geplant oder umgesetzt.                                                       | teilweise erfüllt         | Start verlinkt; Erfassungen und Hilfe mangels Zielseiten deaktiviert |
| Die Erfassung einer Markerlverwendung ist als UI-Flow umgesetzt oder als nächster konkreter Umsetzungsschritt vorbereitet. | vorbereitet               | Startbutton vorhanden, Zielseite noch offen                          |
| Vorläufige Daten und Mockdaten sind klar als nicht produktiv gekennzeichnet.                                               | erfüllt                   | temporäre Employee-ID im Code kommentiert                            |
| Bootstrap 5.3 und SCSS werden konsistent zur bisherigen Designentscheidung verwendet.                                      | erfüllt                   | Employee-Layout, Welcome und Start Page                              |
| Nicht umgesetzte API-, Auth-, Offline- oder Porsche-Details werden nicht als erledigt dargestellt.                         | erfüllt für Planungsstand | `proposal.md`, Nicht-Umfang und offene Fragen                        |
| Ausgeführte Prüfungen sind mit tatsächlichem Ergebnis in `evidence.md` dokumentiert.                                       | erfüllt                   | Abschnitt „Ausgeführte Prüfungen“                                    |

## Abweichungen vom Design

- Erfassungen und Hilfe sind in der Bottom-Navigation sichtbar, aber noch deaktiviert, weil die Zielseiten fehlen.
- Der Button „Verwendung erfassen“ bleibt ohne Zielroute, bis die nächste Flow-Seite umgesetzt ist.
- Die Employee-ID ist vorläufig auf den lokalen Entwicklungsdatensatz 1 gesetzt, weil der Login noch keine ID liefert.

## Ausgeführte Prüfungen

| Datum      | Prüfung oder Befehl                                                            | Umgebung        | Ergebnis                                                                         | Status                                  |
| ---------- | ------------------------------------------------------------------------------ | --------------- | -------------------------------------------------------------------------------- | --------------------------------------- |
| 2026-07-09 | Anlage des Change-Ordners und der vier Change-Dokumente                        | lokal           | Dokumente wurden angelegt                                                        | bestanden                               |
| 2026-07-13 | `npx ng test --watch=false --include='src/app/features/employee/**/*.spec.ts'` | lokal           | 6 Testdateien, 7 Tests bestanden                                                 | bestanden                               |
| 2026-07-13 | `npx ng build`                                                                 | lokal           | Build erfolgreich; bestehende HR/Admin-404-Ausgaben und Bundle-Warnung vorhanden | bestanden mit bekannten Warnungen       |
| 2026-07-13 | Mobile Browserprüfung bei 390 × 844                                            | lokal           | kein horizontaler Überlauf, Bottom-Navigation am unteren Rand                    | bestanden                               |
| 2026-07-13 | Responsive Prüfung bei 1440 × 900                                              | lokal           | Container 1320 px, Inhaltsbereich 636 px, kein horizontaler Überlauf             | bestanden                               |
| 2026-07-13 | Live-GET `checkIfTodaysTicketUsed/1/2026-07-13`                                | lokales Backend | HTTP 200, `false`                                                                | bestanden                               |
| 2026-07-13 | Live-GET `/foodticket/findByEmployee/1`                                        | lokales Backend | HTTP 200, gültige JSON-Liste mit 3 Einträgen und 2519 Byte                       | bestanden mit Datenschutz-Einschränkung |

Nicht ausgeführte Prüfungen:

- Der vollständige Mitarbeiterflow wurde noch nicht durchgeklickt, weil die Zielseiten noch fehlen.
- Fachliche Prüfung durch Porsche wurde nicht durchgeführt.
- Review durch Teammitglieder wurde noch nicht dokumentiert.

## Bekannte Einschränkungen

- Die FSD ist noch nicht ausgearbeitet.
- Fachliche Regeln für Mitarbeitererfassung, Markerlstufen, Nachträge, Korrekturen und Status sind offen.
- API und Authentifizierung sind für diesen Change noch nicht verbindlich abgestimmt.
- Der Login liefert keine Employee-ID; im Frontend wird vorläufig der lokale Entwicklungsdatensatz 1 verwendet.
- `findByEmployee` liefert vollständige Employee-Entity-Daten inklusive `passwordHash`. Der Endpunkt benötigt vor produktiver Verwendung ein begrenztes DTO.
- HR-/Admin-Funktionen gehören nicht zu diesem Change.
- Offline-, Kamera-, Scanner- und Restaurantfunktionen werden nicht in diesem ersten Mitarbeiterfrontend-Change umgesetzt.

## Eigene Leistung von Erik

Erik plant und dokumentiert den Mitarbeiterfrontend-Change als persönlichen Arbeitsbereich. Die spätere technische Umsetzung betrifft Eriks Frontend- und UI/UX-Verantwortung. Backend, Authentifizierung und HR-/Admin-Funktionen werden getrennt betrachtet und müssen mit den zuständigen Teammitgliedern abgestimmt werden.

## Review

| Datum      | Prüfende Person | Gegenstand           | Ergebnis                               | Offene Punkte                       |
| ---------- | --------------- | -------------------- | -------------------------------------- | ----------------------------------- |
| 2026-07-09 | Erik Bergmair   | erster Planungsstand | angelegt, noch nicht fachlich reviewed | FSD-Fragen, API, Auth, Teamabgleich |

## Verwendete Quellen

| Quellen-ID | Quelle                                                                                                     | Verwendungszweck                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `SRC-006`  | [Bootstrap-Entscheidung](../../../sources/sources.md#src-006--angular-material-vs-bootstrap-bei-bairesdev) | Kontext zur Bootstrap-Entscheidung gegenüber Angular Material.      |
| `SRC-008`  | [Bootstrap 5.3 Introduction](../../../sources/sources.md#src-008--bootstrap-53-introduction)               | Grundlage für mobile-first und responsive Ausrichtung.              |
| `SRC-009`  | [Bootstrap Sass](../../../sources/sources.md#src-009--bootstrap-sass)                                      | Grundlage für SCSS-Anpassungen.                                     |
| `SRC-011`  | [Figma Components](../../../sources/sources.md#src-011--figma-components)                                  | Bezug zur komponentenorientierten Ableitung aus dem Figma-Prototyp. |
| `SRC-020`  | [Angular Component Inputs](../../../sources/sources.md#src-020--angular-component-inputs)                  | Grundlage für variable Header-Titel und optionale Input-Werte.      |
| `SRC-021`  | [Angular Location API](../../../sources/sources.md#src-021--angular-location-api)                          | Grundlage für den Zurück-Button über `Location.back()`.             |

## KI-Unterstützung

| KI-ID | Gesprächsdatei | Unterstützung | Prüfung und Verwendung |
| ----- | -------------- | ------------- | ---------------------- |

## Abschlusscheckliste

- [ ] Tatsächlicher Umfang ist vollständig dokumentiert.
- [ ] Akzeptanzkriterien haben einen ehrlichen Prüfstatus.
- [ ] Ausgeführte und nicht ausgeführte Tests sind getrennt.
- [ ] Abweichungen und Einschränkungen sind sichtbar.
- [ ] Eigene und gemeinsame Leistungen sind getrennt.
- [ ] Quellen und KI-IDs sind vollständig eingetragen.
- [ ] Git- und Review-Nachweise sind eingetragen oder als nicht vorhanden markiert.
- [ ] Der Status entspricht dem tatsächlichen Stand.
