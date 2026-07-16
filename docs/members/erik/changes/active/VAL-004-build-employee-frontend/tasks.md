# Aufgaben: Mitarbeiterfrontend für Porsche-Version vorbereiten

## Metadaten

| Feld             | Wert          |
| ---------------- | ------------- |
| Change-ID        | `VAL-004`     |
| Status           | `draft`       |
| Verantwortlich   | Erik Bergmair |
| Zuletzt geändert | 2026-07-15    |

Checkboxen werden nur abgehakt, wenn die Aufgabe wirklich erledigt ist. Nicht benötigte Punkte werden mit einer kurzen Begründung als nicht relevant markiert und nicht einfach als erledigt ausgegeben.

## 1. Vorbereitung

- [ ] Relevante FSD-Fragen für das Mitarbeiterfrontend prüfen.
- [x] Tatsächlichen Angular-Stand unter `apps/web/web` prüfen.
- [x] Bestehende Issues, Changes und Entscheidungen prüfen.
- [x] Figma-Screens für den mobilen Mitarbeiterbereich aus `VAL-003` als Umsetzungsgrundlage festhalten.
- [x] Überschneidungen mit HR-/Admin-Arbeit abgrenzen.

## 2. Klärung

- [ ] Minimal nötige Datenfelder für die erste Mitarbeitererfassung als Annahme oder offene Frage dokumentieren.
- [ ] Vorläufige Zustände einer Mitarbeitererfassung festhalten.
- [ ] Authentifizierungsstand und Keycloak-Abhängigkeit klären oder als offen markieren.
- [ ] API-Abhängigkeiten mit Backend-Zuständigkeit abstimmen oder als Mockdaten-Stand dokumentieren.
- [x] `GET /foodticket/{id}` mit begrenztem Detail-DTO ohne sensible Employee-Daten im Frontend anbinden.
- [ ] Für `PUT /foodticket/{ticketId}/{empId}` eine Antwort ohne vollständige Employee-Entity mit der Backend-Zuständigkeit abstimmen.
- [ ] `DELETE /foodticket/{ticketId}` backendseitig auf die betroffene Person und einen erlaubten Status beschränken.
- [ ] Proposal und Design nach den geklärten Punkten aktualisieren.

## 3. Implementierung

- [x] Mitarbeiterbereich in der vorhandenen Angular-Struktur einordnen.
- [x] Routing oder Navigation für den Mitarbeiterflow vorbereiten.
- [x] Welcome- beziehungsweise Einstiegsscreen umsetzen oder einordnen.
- [ ] Login/Register-Ansichten als UI, Platzhalter oder Anbindung passend zum Auth-Stand behandeln.
- [x] Startseite für Mitarbeitende umsetzen.
- [x] Ansicht „Verwendung erstellen“ als ersten Reactive-Form-Stand umsetzen.
- [x] Ansicht „Angabe prüfen“ umsetzen.
- [x] Bestätigungsansicht „Daten erfasst“ umsetzen.
- [x] Ansicht „Letzte Erfassungen“ umsetzen.
- [x] Ansicht „Erfassungsdetail“ umsetzen.
- [x] Offene Erfassungen aus der Detailseite heraus bearbeitbar machen.
- [x] Offene Erfassungen aus der Detailseite heraus nach Bestätigung löschbar machen.
- [x] Asynchron geladene Employee-Zustände für Angular 22 zoneless-kompatibel auf Signals umstellen.
- [x] Vorläufige Mockdaten und die temporäre Employee-ID klar als Entwicklungsdaten kennzeichnen.
- [ ] Fehler- und Randfälle passend zum ersten Umfang umsetzen.
- [ ] Datenschutz- und Sicherheitsauswirkungen berücksichtigen.
- [ ] Offline-Verhalten umsetzen oder begründet als späteren eigenen Change festhalten.

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

- [ ] Tatsächliche Umsetzung und betroffene Dateien in `evidence.md` eintragen.
- [ ] Issue, Branch, Pull Request und Commits verlinken, soweit vorhanden.
- [ ] Status passend zum echten Prüfstand setzen.
- [ ] Alle offenen Checkboxen erklären oder erledigen.
- [ ] Abschlussdatum festhalten.
- [ ] Change mit Datumspräfix nach `completed/` verschieben.
