# Nachweis: JWT-Anmeldung im Mitarbeiterfrontend integrieren

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-005` |
| Status | `implemented` |
| Verantwortlich | Erik Bergmair |
| Beginn | 2026-07-21 |
| Abschluss | noch nicht abgeschlossen |
| Tatsächlicher Zeitraum | Planung seit 2026-07-21; erste Umsetzung am 2026-07-28 |

## Git- und GitHub-Nachweise

| Nachweis | Referenz |
|---|---|
| Issue | `#17` |
| Branch | `main` |
| Pull Request | nicht vorhanden |
| Commits | `d50250f` – `feat(employee): integrate JWT login and current user session #17` |

## Tatsächlich umgesetzte Funktionen

- Der Change wurde am 2026-07-21 als Planungsstand angelegt.
- Der Employee-Login sendet E-Mail-Adresse und Passwort als JSON-Body an `POST /employee/login`.
- Die Login-Antwort wird mit dem bereits vorhandenen `LoginResponseDTO` des Admin-Logins typisiert.
- Nach erfolgreicher Anmeldung werden JWT, ID, Name, E-Mail und Rolle mit dem vorhandenen `CurrentUserService` im Local Storage gespeichert.
- Startseite, Erfassungsformular, Verlauf und Bearbeitungsseite verwenden die gespeicherte ID statt der Entwicklungs-ID `1`.
- Fehlen gespeicherte Anmeldedaten auf diesen vier Seiten, wird zur Employee-Loginseite navigiert.
- Der gemeinsame `CurrentUserService` greift beim serverseitigen Rendering nicht mehr auf das dort nicht vorhandene `localStorage` zu.
- Name und Mitarbeiter-ID stammen aus dem gespeicherten Benutzer. Dropdown-Standardwerte stammen weiterhin aus dem letzten Ticket.
- Die Registrierung sendet als vorläufigen Workaround den im TypeScript-Model festgelegten Literalwert `role: 'EMPLOYEE'`.

## Festgestellter Ausgangsstand

- Das Frontend sendete den Login zuvor an `POST /employee/login/{email}/{password}` und erwartete eine Textantwort.
- Das aktuelle Backend stellt `POST /employee/login` mit JSON-Body bereit.
- Die Backendantwort ist als `LoginResponseDTO` mit `token`, `id`, `firstName`, `lastName`, `email` und `role` definiert.
- Startseite, Erfassungsseite, Verlaufsseite und Bearbeitungsseite verwendeten zuvor die fest eingetragene Mitarbeiter-ID `1`.
- Das Frontend speicherte JWT und angemeldete Mitarbeiter-ID zuvor nicht.
- Die Registrierung verwendet weiterhin die Employee-Entity; die sichere serverseitige Rollenvergabe ist noch zu klären.

## Betroffene Dateien

| Datei | Tatsächliche Änderung |
|---|---|
| `apps/web/web/src/app/features/employee/services/employee-auth.service.ts` | Login auf JSON-Body und typisierte JWT-Antwort umgestellt |
| `apps/web/web/src/app/features/employee/pages/login-page/login-page.ts` | erfolgreiche Antwort über den vorhandenen `CurrentUserService` gespeichert |
| `apps/web/web/src/app/features/employee/pages/register-page/register-page.ts` und `.html` | tatsächliche Backend- beziehungsweise HTTP-Fehlermeldung für die lokale Diagnose sichtbar gemacht |
| `apps/web/web/src/app/features/employee/models/employee-register-request.model.ts` | vorläufige Rolle auf den Literaltyp `'EMPLOYEE'` begrenzt |
| Registerseiten- und Auth-Service-Spec | erwarteten temporären Rollenwert im Request ergänzt |
| `apps/web/web/src/app/features/employee/pages/start-page/start-page.ts` | angemeldete ID und angemeldeten Namen verwendet |
| `apps/web/web/src/app/features/employee/pages/create-entry-page/create-entry-page.ts` | angemeldete ID und angemeldeten Namen verwendet |
| `apps/web/web/src/app/features/employee/pages/entries-page/entries-page.ts` | Verlauf für die angemeldete ID geladen |
| `apps/web/web/src/app/features/employee/pages/edit-entry-page/edit-entry-page.ts` | PUT mit der angemeldeten ID ausgeführt |
| `apps/web/web/src/app/features/admin/services/current-user-service.ts` | vorhandenen gemeinsamen Benutzerspeicher gegen fehlendes `localStorage` beim SSR abgesichert |
| sechs zugehörige `*.spec.ts`-Dateien | Loginvertrag und Test-ID an den neuen Stand angepasst |
| `proposal.md`, `design.md`, `tasks.md`, `evidence.md` | tatsächlichen Planungs- und Umsetzungsstand dokumentiert |
| `docs/members/erik/worklogs/2026-07-28.md` | Tagesarbeit und Prüfungen dokumentiert |

Admin-Produktivcode wurde nicht verändert. Der vorhandene `CurrentUserService` und das vorhandene `LoginResponseDTO` werden wiederverwendet.

## Akzeptanzkriterien

| Kriterium | Ergebnis | Nachweis |
|---|---|---|
| Login verwendet JSON-Body | implementiert | `EmployeeAuthService.login()` |
| Loginantwort ist typisiert | implementiert | vorhandenes `LoginResponseDTO` |
| JWT und Mitarbeiter-ID sind verfügbar | implementiert | `CurrentUserService` und Loginseite |
| Employee-Seiten verwenden angemeldete ID | implementiert | Start, Erstellen, Verlauf und Bearbeiten |
| Fehlerhafte Anmeldung speichert keine Sitzung | implementiert | Loginseiten-Test und Speicherung nur im Erfolgszweig |
| Logout entfernt lokale Daten | nicht erfüllt | Logout steht aus |
| Passwort wird nicht dauerhaft oder in URLs gespeichert | implementiert | Passwort befindet sich nur im JSON-Loginrequest |
| Automatisierte Tests sind angepasst | erfüllt für den Employee-Stand | betroffene Specs im Commit `d50250f`; früherer Gesamt-Testlauf war durch fremde Admin-Spec blockiert |
| Manueller Employee-Flow mit angemeldetem Benutzer | nicht geprüft | Browserprüfung steht aus |
| Sicherheitsgrenzen sind ehrlich dokumentiert | erfüllt für den Zwischenstand | Proposal, Design und bekannte Einschränkungen |

## Abweichungen vom Design

- Statt neuer Employee-eigener Sitzungsmodelle und eines zweiten Speichers werden das vorhandene `LoginResponseDTO` und der `CurrentUserService` aus dem Adminbereich wiederverwendet. Das hält die erste Integration klein; die Ablage unter `features/admin` ist jedoch keine endgültige gemeinsame Struktur.
- Ein HTTP-Interceptor wurde nicht umgesetzt, weil im geprüften Repository-Stand keine Employee-Ressource einen Bearer-Token verlangt.
- Ein Route Guard und Logout wurden noch nicht umgesetzt. Die vier Seiten mit Employee-ID leiten bei fehlendem gespeicherten Benutzer direkt zur Loginseite weiter.

## Ausgeführte Prüfungen

| Datum | Prüfung oder Befehl | Umgebung | Ergebnis | Status |
|---|---|---|---|---|
| 2026-07-21 | `git status --short` | lokales Repository | bestehende uncommittete Dokumentationsänderungen festgestellt und nicht verworfen | bestanden |
| 2026-07-21 | Repository-Suche nach Login, JWT und `employeeId = 1` | lokales Repository | alter Frontendvertrag, aktueller Backendvertrag und vier hart codierte Employee-IDs festgestellt | bestanden |
| 2026-07-28 | `npx tsc -p tsconfig.app.json --noEmit` | lokales Angular-Projekt | ohne TypeScript-Fehler abgeschlossen | bestanden |
| 2026-07-28 | `npx ng build` | lokales Angular-Projekt, Node.js 23.11.0 | Employee-Bundles erstellt; Gesamtbuild anschließend durch drei fremde parametrisierte Admin-Prerender-Routen abgebrochen | teilweise bestanden |
| 2026-07-28 | `npx ng build` nach SSR-Korrektur | lokales Angular-Projekt, Node.js 23.11.0 | keine `localStorage is not defined`-Ausnahme mehr; bekannte fremde Admin-Prerender-Fehler bleiben | teilweise bestanden |
| 2026-07-28 | Angular-Testlauf mit Employee-Include | lokales Angular-Projekt | Test-Build durch Tippfehler in fremder Admin-Spec `info-flex-service-export.spec.ts` blockiert; keine Employee-Tests ausgeführt | fehlgeschlagen außerhalb Employee-Code |
| 2026-07-28 | `npx vitest run src/app/features/employee` | lokales Angular-Projekt | wegen fehlender Angular-Testbuilder-/JIT-Initialisierung nicht als Ersatz ausführbar | fehlgeschlagen |
| 2026-07-28 | lokaler `POST /employee/login` mit Entwicklungszugang | lokales Backend | Antwort enthielt Token, ID, Rolle und erforderliche Kontofelder; Tokenwert wurde nicht ausgegeben | bestanden |
| 2026-07-28 | `git diff --check` | lokales Repository | keine Whitespace-Fehler | bestanden |
| 2026-07-28 | Commitprüfung | Git-Verlauf | `d50250f` enthält Employee-Loginservice, Login/Register-Seiten, CurrentUserService-Anpassung und betroffene Employee-Tests | bestanden |

Nicht ausgeführte Prüfungen:

- Die angepassten Employee-Tests konnten wegen der fremden fehlerhaften Admin-Spec nicht ausgeführt werden.
- Der Login wurde noch nicht manuell über die sichtbare Angular-Oberfläche durchgeklickt.
- Fehlgeschlagener Login, Logout, Route Guard und Interceptor wurden noch nicht geprüft.
- Keine fachliche oder sicherheitstechnische Freigabe durch Porsche durchgeführt.

## Bekannte Einschränkungen

- Die FSD enthält noch keine ausgearbeitete Authentifizierungsanforderung.
- Der aktuelle Backendvertrag ist ein technischer Zwischenstand und keine dokumentierte Porsche-Freigabe.
- Die serverseitige Absicherung der Employee-Endpunkte ist noch nicht vollständig umgesetzt.
- Das JWT wird wie beim vorhandenen Admin-Login vorläufig zusammen mit den Kontodaten im Local Storage gespeichert.
- `CurrentUserService` und `LoginResponseDTO` sind derzeit unter `features/admin` abgelegt, obwohl sie nun von beiden Bereichen verwendet werden.
- Der Token wird noch nicht per Interceptor an Requests angehängt, da die geprüften Backend-Endpunkte derzeit keine entsprechende Absicherung verwenden.
- Ein zentraler Route Guard und Logout fehlen noch.
- Verhalten und Statuscode bei ungültigen Zugangsdaten sind noch nicht verbindlich abgestimmt.
- Die Rolle bei der Registrierung muss serverseitig sicher vergeben werden; dies liegt außerhalb von Eriks Frontendverantwortung.
- Der vorläufige Literaltyp verhindert nur versehentlich andere Werte im eigenen TypeScript-Code. Ein direkter HTTP-Request kann weiterhin manipuliert werden; das Backend muss die Rolle deshalb vor produktiver Nutzung selbst setzen.
- Selbstregistrierung kann fachlich unzulässig sein und muss noch geklärt werden.

## Eigene Leistung von Erik

Erik verantwortet Planung, Angular-Integration, UI-Zustände, Frontendtests und Dokumentation des Employee-Logins. JWT-Erzeugung, Passwortprüfung, serverseitige Rollenvergabe und Endpoint-Berechtigungen stammen aus der Backendarbeit beziehungsweise bleiben Aufgabe des zuständigen Backend-Teammitglieds.

## Review

| Datum | Prüfende Person | Gegenstand | Ergebnis | Offene Punkte |
|---|---|---|---|---|
| 2026-07-21 | Erik Bergmair | erster Planungsstand | Change als `draft` angelegt | API-Fehlervertrag, Token-Speicherung, Guard, Interceptor und Registrierung |
| 2026-07-28 | Erik Bergmair | erste JWT-Frontendintegration | kompiliert und API-Antwort geprüft; Browserflow noch nicht geprüft | Logout, Tests, Guard, Interceptor und Registrierung |

## Verwendete Quellen

Keine externen Quellen verwendet. Grundlage waren der aktuelle Repository- und Backendstand sowie das vorhandene Muster des Admin-Logins.

## KI-Unterstützung



## Abschlusscheckliste

- [x] Tatsächlicher Umfang ist für den aktuellen Implementierungsstand dokumentiert.
- [x] Akzeptanzkriterien haben einen ehrlichen Prüfstatus für den Zwischenstand.
- [x] Ausgeführte und nicht ausgeführte Tests sind getrennt.
- [x] Abweichungen und Einschränkungen sind sichtbar.
- [x] Eigene und gemeinsame Leistungen sind getrennt.
- [x] Quellen und KI-Unterstützung sind eingetragen oder als nicht vorhanden markiert.
- [x] Git- und Review-Nachweise sind eingetragen oder als nicht vorhanden markiert.
- [x] Der Status entspricht dem tatsächlichen Stand `implemented`; Logout, Guard, Interceptor, Review und vollständige manuelle Prüfung stehen noch aus.
