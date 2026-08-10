# Aufgaben: JWT-Anmeldung im Mitarbeiterfrontend integrieren

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-005` |
| Status | `implemented` |
| Verantwortlich | Erik Bergmair |
| Zuletzt geändert | 2026-08-10 |

Checkboxen werden nur abgehakt, wenn die Aufgabe wirklich erledigt ist. Die JWT-Anmeldung und die Verwendung der angemeldeten Mitarbeiter-ID sind als erster Teil umgesetzt; Logout, Guard, Interceptor und vollständige Verifikation bleiben offen.

## 1. Vorbereitung

- [ ] Relevante FSD-Aussagen und offene Authentifizierungsfragen prüfen.
- [x] Aktuellen Login-, Register- und Employee-ID-Stand im Frontend vollständig prüfen.
- [x] Aktuellen Loginvertrag und vorhandene JWT-Konfiguration im Backend prüfen.
- [x] Zugehöriges GitHub Issue feststellen oder anlegen lassen und referenzieren.
- [x] Betroffene Employee-Seiten mit hart codierter Mitarbeiter-ID erfassen.

## 2. Klärung

- [ ] Verhalten und Statuscode bei ungültigen Zugangsdaten mit dem Backend-Teammitglied abstimmen.
- [ ] Klären, welche Endpunkte bereits einen Bearer-Token verlangen.
- [ ] Klären, welche Employee-Routen einen Route Guard erhalten sollen.
- [ ] Serverseitige Vergabe der Rolle `EMPLOYEE` bei Registrierung abstimmen.
- [ ] Fachliche Zulässigkeit der Selbstregistrierung als offene Frage dokumentieren.
- [ ] Proposal und Design nach den geklärten Punkten aktualisieren.

## 3. Implementierung

- [x] Vorhandenes Login-Response-Model des Admin-Logins wiederverwenden; der einfache Login-Request wird direkt aus E-Mail und Passwort gebildet.
- [x] `EmployeeAuthService.login()` auf JSON-Body und typisierte Antwort umstellen.
- [x] Erfolgreiche Anmeldung mit Token und minimalen Mitarbeiterdaten speichern.
- [x] Vorhandenen `CurrentUserService` zum Auslesen der gespeicherten Mitarbeiter-ID wiederverwenden.
- [ ] Logout implementieren und gespeicherte Anmeldedaten entfernen.
- [x] Loginseite auf die neue Erfolgsantwort und den vorhandenen HTTP-Fehlerfall umstellen.
- [x] Hart codierte Mitarbeiter-ID auf der Startseite ersetzen.
- [x] Hart codierte Mitarbeiter-ID auf der Erfassungsseite ersetzen.
- [x] Hart codierte Mitarbeiter-ID auf der Verlaufsseite ersetzen.
- [x] Hart codierte Mitarbeiter-ID auf der Bearbeitungsseite ersetzen.
- [x] Weitere Vorkommen von `employeeId = 1` im Employee-Produktivcode suchen und ersetzen.
- [x] Fehlende lokale Anmeldung behandeln und den gemeinsamen Local-Storage-Service SSR-sicher machen.
- [ ] Logout in die Employee-Oberfläche einbinden.
- [ ] Falls vom Backend bereits benötigt: Bearer-Token mit einem einfachen HTTP-Interceptor mitsenden.
- [ ] Falls abgestimmt: geschützte Employee-Routen mit einem Route Guard versehen.
- [x] Registerseite vorläufig mit dem festen Literalwert `EMPLOYEE` an den aktuellen Backendvertrag anpassen und das Sicherheitsrisiko dokumentieren.
- [x] Keine Passwörter oder JWTs durch eigene Employee-Logs ausgeben.

## 4. Tests

- [x] Service-Test für URL, Methode und JSON-Body des Loginrequests anpassen.
- [ ] Service-Test für Speichern und Auslesen der Anmeldedaten ergänzen.
- [ ] Logout und Entfernen der gespeicherten Daten automatisiert prüfen.
- [x] Loginseiten-Test für erfolgreiche Antwort und gespeicherte ID anpassen.
- [x] Loginseite bei ungültiger oder fehlerhafter Antwort automatisiert prüfen.
- [x] Betroffene Employee-Seitentests auf eine gespeicherte Test-ID umstellen.
- [x] Employee-Tests ausführen; Ausführung am 2026-07-28 durch eine fremde fehlerhafte Admin-Spec blockiert.
- [x] Angular-Build und isolierte TypeScript-Kompilierung ausführen.
- [x] Erfolgreichen Loginrequest mit lokalem Backend prüfen, ohne Tokenwert auszugeben.
- [ ] Zentralen Employee-Flow mit der angemeldeten ID manuell prüfen.
- [ ] Falsche Zugangsdaten manuell prüfen.
- [ ] Nicht erreichbares Backend manuell prüfen.
- [ ] Logout und erneuten Zugriff auf geschützte Seiten manuell prüfen.
- [ ] Mobile Darstellung, Tastaturbedienung und Fehlermeldungen prüfen.
- [x] Befehle und tatsächliche Ergebnisse in `evidence.md` dokumentieren.

## 5. Dokumentation

- [x] Tatsächlich verwendeten Loginvertrag in `evidence.md` dokumentieren.
- [x] Abweichungen vom Design dokumentieren.
- [x] Sicherheitsgrenzen der Frontendlösung festhalten.
- [x] Offene Backend- und Registrierungsfragen dokumentieren.
- [x] Tagesprotokoll für die tatsächliche Arbeit aktualisieren.
- [ ] Tatsächlich verwendete Quellen mit Verwendungszweck eintragen.
- [ ] Relevante KI-IDs eintragen.

## 6. Review

- [ ] Eigene Prüfung gegen alle Akzeptanzkriterien durchführen.
- [ ] Technischen Abgleich des Loginvertrags mit dem Backend-Teammitglied dokumentieren.
- [ ] Review-Ergebnisse und offene Punkte festhalten.
- [ ] Notwendige Korrekturen umsetzen und erneut prüfen.

## 7. Abschluss

- [x] Tatsächliche Teilumsetzung und betroffene Dateien in `evidence.md` eintragen.
- [x] Issue, Branch, Pull Request und Commits verlinken, soweit vorhanden.
- [x] Status passend zum echten Implementierungs- und Prüfstand setzen.
- [ ] Alle offenen Checkboxen erklären oder erledigen.
- [ ] Abschlussdatum festhalten.
- [ ] Change mit Datumspräfix nach `completed/` verschieben.
