# Aufgaben: Mitarbeiterfrontend für Porsche-Version vorbereiten

## Metadaten

| Feld             | Wert          |
| ---------------- | ------------- |
| Change-ID        | `VAL-004`     |
| Status           | `implemented` |
| Verantwortlich   | Erik Bergmair |
| Zuletzt geändert | 2026-07-21    |

Checkboxen werden nur abgehakt, wenn die Aufgabe wirklich erledigt ist. Nicht benötigte Punkte werden mit einer kurzen Begründung als nicht relevant markiert und nicht einfach als erledigt ausgegeben.

## 1. Vorbereitung

- [ ] Relevante FSD-Fragen für das Mitarbeiterfrontend prüfen.
- [x] Tatsächlichen Angular-Stand unter `apps/web/web` prüfen.
- [x] Bestehende Issues, Changes und Entscheidungen prüfen.
- [x] Figma-Screens für den mobilen Mitarbeiterbereich aus `VAL-003` als Umsetzungsgrundlage festhalten.
- [x] Überschneidungen mit HR-/Admin-Arbeit abgrenzen.

## 2. Klärung

- [x] Minimal nötige Datenfelder für die erste Mitarbeitererfassung als Annahme oder offene Frage dokumentieren.
- [x] Vorläufige Zustände einer Mitarbeitererfassung festhalten.
- [x] Authentifizierungsstand und Keycloak-Abhängigkeit als offen markieren.
- [x] Vorläufig angebundene API-Abhängigkeiten und verbleibende Einschränkungen dokumentieren.
- [x] Die von `POST /foodticket/empAddTicketEntry` zurückgegebene Ticket-ID im Frontend anbinden.
- [x] `GET /foodticket/{id}` mit begrenztem Detail-DTO ohne sensible Employee-Daten im Frontend anbinden.
- [ ] Für `PUT /foodticket/{ticketId}/{empId}` eine Antwort ohne vollständige Employee-Entity mit der Backend-Zuständigkeit abstimmen.
- [ ] `DELETE /foodticket/{ticketId}` backendseitig auf die betroffene Person und einen erlaubten Status beschränken.
- [x] Proposal und Design nach dem aktuellen Implementierungsstand aktualisieren.

## 3. Implementierung

- [x] Mitarbeiterbereich in der vorhandenen Angular-Struktur einordnen.
- [x] Routing oder Navigation für den Mitarbeiterflow vorbereiten.
- [x] Welcome- beziehungsweise Einstiegsscreen umsetzen oder einordnen.
- [x] Login/Register-Ansichten mit den vorläufigen Backend-Endpunkten umsetzen und als nicht finale Authentifizierung kennzeichnen.
- [x] Startseite für Mitarbeitende umsetzen.
- [x] Ansicht „Verwendung erstellen“ als ersten Reactive-Form-Stand umsetzen.
- [x] Ansicht „Angabe prüfen“ umsetzen.
- [x] Bestätigungsansicht „Daten erfasst“ umsetzen.
- [x] Aktion „Erfassung ansehen“ nach erfolgreicher Speicherung mit der Detailseite verbinden.
- [x] Aktuelles, änderbares Datum und letzte verwendete Dropdownwerte als Formularstandard setzen.
- [x] Ansicht „Letzte Erfassungen“ umsetzen.
- [x] Ansicht „Erfassungsdetail“ umsetzen.
- [x] Offene Erfassungen aus der Detailseite heraus bearbeitbar machen.
- [x] Offene Erfassungen aus der Detailseite heraus nach Bestätigung löschbar machen.
- [x] Asynchron geladene Employee-Zustände für Angular 22 zoneless-kompatibel auf Signals umstellen.
- [x] Vorläufige Mockdaten und die temporäre Employee-ID klar als Entwicklungsdaten kennzeichnen.
- [ ] Fehler- und Randfälle passend zum ersten Umfang umsetzen.
- [x] Datenschutz- und Sicherheitsauswirkungen des aktuellen API- und Auth-Stands dokumentieren.
- [x] Offline-Verhalten begründet als späteren eigenen Umfang festhalten.

## 4. Tests

- [x] Statische Prüfungen ausführen.
- [x] Automatisierte Tests erstellen oder anpassen, falls sinnvoll und im Projekt eingerichtet.
- [x] Automatisierte Tests ausführen, falls vorhanden.
- [ ] Mitarbeiterflow vollständig manuell im Browser durchklicken. Der Teilflow Start → Erfassungen → Start → Detail wurde am 2026-07-15 ohne Reload geprüft.
- [x] Mobile Darstellung prüfen.
- [ ] Fehler- und leere Zustände prüfen.
- [ ] Grobe Accessibility-Prüfung durchführen.
- [x] Befehle und tatsächliche Ergebnisse in `evidence.md` dokumentieren.

## 5. Dokumentation

- [x] Aktuelle Abweichungen vom Figma-Prototyp dokumentieren.
- [ ] Offene FSD-Fragen aus der Umsetzung sammeln.
- [ ] Betroffene gemeinsame Dokumentation aktualisieren, falls notwendig.
- [x] Tatsächlich verwendete Quellen mit Verwendungszweck für den bisherigen Umsetzungsstand eintragen.
- [ ] Relevante KI-IDs eintragen, falls für diesen Change verwendet.
- [x] Bekannte Einschränkungen festhalten.

## 6. Review

- [ ] Eigene Prüfung gegen alle Akzeptanzkriterien durchführen.
- [ ] Fachliches oder technisches Review einholen, falls für den erreichten Stand nötig.
- [ ] Review-Ergebnisse und offene Punkte dokumentieren.
- [ ] Notwendige Korrekturen umsetzen und erneut prüfen.

## 7. Abschluss

- [x] Tatsächliche Umsetzung und betroffene Dateien in `evidence.md` eintragen.
- [x] Issue, Branch, Pull Request und Commits verlinken, soweit vorhanden.
- [x] Status passend zum echten Prüfstand setzen.
- [ ] Alle offenen Checkboxen erklären oder erledigen.
- [ ] Abschlussdatum festhalten.
- [ ] Change mit Datumspräfix nach `completed/` verschieben.
