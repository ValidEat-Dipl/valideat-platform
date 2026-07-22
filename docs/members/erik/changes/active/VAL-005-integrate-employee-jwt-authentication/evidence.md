# Nachweis: JWT-Anmeldung im Mitarbeiterfrontend integrieren

## Metadaten

| Feld                    | Wert                     |
| ----------------------- | ------------------------ |
| Change-ID               | `VAL-005`              |
| Status                  | `draft`                |
| Verantwortlich          | Erik Bergmair            |
| Beginn                  | 2026-07-21               |
| Abschluss               | noch nicht abgeschlossen |
| Tatsächlicher Zeitraum | Planung seit 2026-07-21  |

## Git- und GitHub-Nachweise

| Nachweis     | Referenz                                     |
| ------------ | -------------------------------------------- |
| Issue        | nicht festgestellt                           |
| Branch       | `main` zum Zeitpunkt der Change-Erstellung |
| Pull Request | nicht vorhanden                              |
| Commits      | für diesen Change noch nicht vorhanden      |

## Tatsächlich umgesetzte Funktionen

- Noch keine Funktionen im Rahmen von `VAL-005` umgesetzt.
- Der Change wurde am 2026-07-21 als Planungsstand angelegt.

## Festgestellter Ausgangsstand

- Das Frontend sendet den Login derzeit an `POST /employee/login/{email}/{password}` und erwartet eine Textantwort.
- Das aktuelle Backend stellt `POST /employee/login` mit JSON-Body bereit.
- Die Backendantwort ist als `LoginResponseDTO` mit `token`, `id`, `firstName`, `lastName`, `email` und `role` definiert.
- Die Employee-Startseite, Erfassungsseite, Verlaufsseite und Bearbeitungsseite enthalten derzeit eine fest eingetragene Mitarbeiter-ID `1`.
- Das Frontend speichert den JWT und die angemeldete Mitarbeiter-ID derzeit nicht.
- Die Registrierung verwendet weiterhin die Employee-Entity; die sichere serverseitige Rollenvergabe ist noch zu klären.

## Betroffene Dateien

| Datei                                                                                          | Tatsächliche Änderung                                                          |
| ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `docs/members/erik/changes/active/VAL-005-integrate-employee-jwt-authentication/proposal.md` | Change-Ausgangslage, Ziel, Umfang und Akzeptanzkriterien angelegt                |
| `docs/members/erik/changes/active/VAL-005-integrate-employee-jwt-authentication/design.md`   | geplante Frontendintegration, Datenfluss, Risiken und Teststrategie dokumentiert |
| `docs/members/erik/changes/active/VAL-005-integrate-employee-jwt-authentication/tasks.md`    | offene, überprüfbare Arbeitsschritte angelegt                                  |
| `docs/members/erik/changes/active/VAL-005-integrate-employee-jwt-authentication/evidence.md` | tatsächlichen Planungs- und Ausgangsstand dokumentiert                          |

Produktivcode wurde bei der Erstellung dieses Planungsstands nicht geändert.

## Akzeptanzkriterien

| Kriterium                                              | Ergebnis                        | Nachweis                                                |
| ------------------------------------------------------ | ------------------------------- | ------------------------------------------------------- |
| Login verwendet JSON-Body                              | nicht erfüllt                  | Frontend verwendet noch den alten URL-Vertrag           |
| Loginantwort ist typisiert                             | nicht erfüllt                  | noch kein passendes Frontendmodel vorhanden             |
| JWT und Mitarbeiter-ID sind verfügbar                 | nicht erfüllt                  | noch keine Speicherung implementiert                    |
| Employee-Seiten verwenden angemeldete ID               | nicht erfüllt                  | mehrere Seiten verwenden noch ID `1`                  |
| Fehlerhafte Anmeldung speichert keine Sitzung          | nicht geprüft                  | Umsetzung steht aus                                     |
| Logout entfernt lokale Daten                           | nicht erfüllt                  | Logout steht aus                                        |
| Passwort wird nicht dauerhaft oder in URLs gespeichert | nicht erfüllt                  | derzeitige Loginroute enthält das Passwort im URL-Pfad |
| Automatisierte Tests sind angepasst                    | nicht erfüllt                  | bestehende Tests erwarten den alten Vertrag             |
| Manueller Employee-Flow mit angemeldetem Benutzer      | nicht geprüft                  | Umsetzung steht aus                                     |
| Sicherheitsgrenzen sind ehrlich dokumentiert           | erfüllt für den Planungsstand | Proposal und Design                                     |

## Abweichungen vom Design

Keine Abweichungen festgestellt; die Implementierung hat noch nicht begonnen.

## Ausgeführte Prüfungen

| Datum      | Prüfung oder Befehl                                                                                                            | Umgebung           | Ergebnis                                                                                                                   | Status    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------- | --------- |
| 2026-07-21 | `git status --short`                                                                                                          | lokales Repository | bestehende uncommittete Dokumentationsänderungen in `VAL-004` und Worklog festgestellt; nicht verändert oder verworfen | bestanden |
| 2026-07-21 | Repository-Suche nach Login, JWT und `employeeId = 1`                                                                         | lokales Repository | alter Frontendvertrag, aktueller Backendvertrag und vier hart codierte Employee-IDs festgestellt                           | bestanden |
| 2026-07-21 | Sichtprüfung von `EmployeeResource`, `EmployeeRepository`, `LoginResponseDTO`, `EmployeeAuthService` und `LoginPage` | lokales Repository | Ausgangsstand für Proposal und Design bestätigt                                                                          | bestanden |

Nicht ausgeführte Prüfungen:

- Keine automatisierten Tests ausgeführt, weil bei der Change-Erstellung noch kein Produktivcode geändert wurde.
- Kein Angular-Build ausgeführt, weil bei der Change-Erstellung noch kein Produktivcode geändert wurde.
- Kein Login-Request ausgeführt; die Live-Integration wird erst nach der Frontendänderung geprüft.
- Keine fachliche oder sicherheitstechnische Freigabe durch Porsche durchgeführt.

## Bekannte Einschränkungen

- Die FSD enthält noch keine ausgearbeitete Authentifizierungsanforderung.
- Der aktuelle Backendvertrag ist ein technischer Zwischenstand und keine dokumentierte Porsche-Freigabe.
- Die serverseitige Absicherung der Employee-Endpunkte ist noch nicht vollständig festgestellt.
- Die produktive Token-Speicherung ist noch nicht entschieden.
- Verhalten und Statuscode bei ungültigen Zugangsdaten sind noch nicht verbindlich abgestimmt.
- Die Rolle bei der Registrierung muss serverseitig sicher vergeben werden; dies liegt außerhalb von Eriks Frontendverantwortung.
- Selbstregistrierung kann fachlich unzulässig sein und muss noch geklärt werden.

## Eigene Leistung von Erik

Erik verantwortet die Planung, Angular-Integration, UI-Zustände, Frontendtests und Dokumentation des Mitarbeiter-Logins. JWT-Erzeugung, Passwortprüfung, serverseitige Rollenvergabe und Endpoint-Berechtigungen stammen aus der Backendarbeit beziehungsweise bleiben Aufgabe des zuständigen Backend-Teammitglieds.

## Review

| Datum      | Prüfende Person | Gegenstand           | Ergebnis                      | Offene Punkte                                                              |
| ---------- | ---------------- | -------------------- | ----------------------------- | -------------------------------------------------------------------------- |
| 2026-07-21 | Erik Bergmair    | erster Planungsstand | Change als `draft` angelegt | API-Fehlervertrag, Token-Speicherung, Guard, Interceptor und Registrierung |

## Verwendete Quellen

Keine externen Quellen verwendet. Der Planungsstand beruht auf dem tatsächlichen Repository- und Backend-Zwischenstand. Externe Angular- und Sicherheitshinweise werden erst nach tatsächlicher Verwendung mit Quellen-ID eingetragen.

## KI-Unterstützung


## Abschlusscheckliste

- [ ] Tatsächlicher Umfang ist vollständig dokumentiert.
- [ ] Akzeptanzkriterien haben einen ehrlichen Prüfstatus.
- [X] Ausgeführte und nicht ausgeführte Tests sind für den Planungsstand getrennt.
- [X] Abweichungen und Einschränkungen sind für den Planungsstand sichtbar.
- [X] Eigene und gemeinsame Leistungen sind getrennt.
- [ ] Quellen und KI-IDs sind vollständig eingetragen.
- [X] Git- und Review-Nachweise sind eingetragen oder als nicht vorhanden markiert.
- [X] Der Status entspricht dem tatsächlichen Planungsstand `draft`.
