# Aufgaben: JWT-Anmeldung im Mitarbeiterfrontend integrieren

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-005` |
| Status | `draft` |
| Verantwortlich | Erik Bergmair |
| Zuletzt geändert | 2026-07-21 |

Checkboxen werden nur abgehakt, wenn die Aufgabe wirklich erledigt ist. Der Change wurde zunächst nur geplant; es wurden noch keine Implementierungs- oder Testaufgaben als erledigt markiert.

## 1. Vorbereitung

- [ ] Relevante FSD-Aussagen und offene Authentifizierungsfragen prüfen.
- [ ] Aktuellen Login-, Register- und Employee-ID-Stand im Frontend vollständig prüfen.
- [ ] Aktuellen Loginvertrag und vorhandene JWT-Konfiguration im Backend prüfen.
- [ ] Zugehöriges GitHub Issue feststellen oder anlegen lassen und referenzieren.
- [ ] Betroffene Employee-Seiten mit hart codierter Mitarbeiter-ID erfassen.

## 2. Klärung

- [ ] Verhalten und Statuscode bei ungültigen Zugangsdaten mit dem Backend-Teammitglied abstimmen.
- [ ] Klären, welche Endpunkte bereits einen Bearer-Token verlangen.
- [ ] Klären, welche Employee-Routen einen Route Guard erhalten sollen.
- [ ] Serverseitige Vergabe der Rolle `EMPLOYEE` bei Registrierung abstimmen.
- [ ] Fachliche Zulässigkeit der Selbstregistrierung als offene Frage dokumentieren.
- [ ] Proposal und Design nach den geklärten Punkten aktualisieren.

## 3. Implementierung

- [ ] Login-Request- und Login-Response-Model anlegen.
- [ ] `EmployeeAuthService.login()` auf JSON-Body und typisierte Antwort umstellen.
- [ ] Erfolgreiche Anmeldung mit Token und minimalen Mitarbeiterdaten speichern.
- [ ] Einfache Methoden zum Auslesen von Token und Mitarbeiter-ID ergänzen.
- [ ] Logout implementieren und gespeicherte Anmeldedaten entfernen.
- [ ] Loginseite auf die neue Erfolgsantwort und Fehlerfälle umstellen.
- [ ] Hart codierte Mitarbeiter-ID auf der Startseite ersetzen.
- [ ] Hart codierte Mitarbeiter-ID auf der Erfassungsseite ersetzen.
- [ ] Hart codierte Mitarbeiter-ID auf der Verlaufsseite ersetzen.
- [ ] Hart codierte Mitarbeiter-ID auf der Bearbeitungsseite ersetzen.
- [ ] Weitere Vorkommen von `employeeId = 1` suchen und begründet ersetzen.
- [ ] Fehlende oder ungültige lokale Anmeldung behandeln.
- [ ] Logout in die Employee-Oberfläche einbinden.
- [ ] Falls vom Backend bereits benötigt: Bearer-Token mit einem einfachen HTTP-Interceptor mitsenden.
- [ ] Falls abgestimmt: geschützte Employee-Routen mit einem Route Guard versehen.
- [ ] Registerseite an den abgestimmten Backendvertrag anpassen oder als noch blockiert dokumentieren.
- [ ] Keine Passwörter oder JWTs durch eigene Logs ausgeben.

## 4. Tests

- [ ] Service-Test für URL, Methode und JSON-Body des Loginrequests anpassen.
- [ ] Service-Test für Speichern und Auslesen der Anmeldedaten ergänzen.
- [ ] Logout und Entfernen der gespeicherten Daten automatisiert prüfen.
- [ ] Loginseite bei erfolgreicher Antwort automatisiert prüfen.
- [ ] Loginseite bei ungültiger oder fehlerhafter Antwort automatisiert prüfen.
- [ ] Betroffene Employee-Seiten mit angemeldeter Mitarbeiter-ID automatisiert prüfen.
- [ ] Employee-Tests ausführen.
- [ ] Angular-Build beziehungsweise isolierte Kompilierung ausführen.
- [ ] Erfolgreichen Login mit lokalem Backend manuell prüfen.
- [ ] Zentralen Employee-Flow mit der angemeldeten ID manuell prüfen.
- [ ] Falsche Zugangsdaten manuell prüfen.
- [ ] Nicht erreichbares Backend manuell prüfen.
- [ ] Logout und erneuten Zugriff auf geschützte Seiten manuell prüfen.
- [ ] Mobile Darstellung, Tastaturbedienung und Fehlermeldungen prüfen.
- [ ] Befehle und tatsächliche Ergebnisse in `evidence.md` dokumentieren.

## 5. Dokumentation

- [ ] Tatsächlich verwendeten Loginvertrag in `evidence.md` dokumentieren.
- [ ] Abweichungen vom Design dokumentieren.
- [ ] Sicherheitsgrenzen der Frontendlösung festhalten.
- [ ] Offene Backend- und Registrierungsfragen dokumentieren.
- [ ] Tagesprotokoll für die tatsächliche Arbeit aktualisieren.
- [ ] Tatsächlich verwendete Quellen mit Verwendungszweck eintragen.
- [ ] Relevante KI-IDs eintragen.

## 6. Review

- [ ] Eigene Prüfung gegen alle Akzeptanzkriterien durchführen.
- [ ] Technischen Abgleich des Loginvertrags mit dem Backend-Teammitglied dokumentieren.
- [ ] Review-Ergebnisse und offene Punkte festhalten.
- [ ] Notwendige Korrekturen umsetzen und erneut prüfen.

## 7. Abschluss

- [ ] Tatsächliche Umsetzung und betroffene Dateien in `evidence.md` eintragen.
- [ ] Issue, Branch, Pull Request und Commits verlinken, soweit vorhanden.
- [ ] Status passend zum echten Implementierungs- und Prüfstand setzen.
- [ ] Alle offenen Checkboxen erklären oder erledigen.
- [ ] Abschlussdatum festhalten.
- [ ] Change mit Datumspräfix nach `completed/` verschieben.
