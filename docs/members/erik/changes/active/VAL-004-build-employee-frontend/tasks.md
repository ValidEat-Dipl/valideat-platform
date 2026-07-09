# Aufgaben: Mitarbeiterfrontend für Porsche-Version vorbereiten

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-004` |
| Status | `draft` |
| Verantwortlich | Erik Bergmair |
| Zuletzt geändert | 2026-07-09 |

Checkboxen werden nur abgehakt, wenn die Aufgabe wirklich erledigt ist. Nicht benötigte Punkte werden mit einer kurzen Begründung als nicht relevant markiert und nicht einfach als erledigt ausgegeben.

## 1. Vorbereitung

- [ ] Relevante FSD-Fragen für das Mitarbeiterfrontend prüfen.
- [ ] Tatsächlichen Angular-Stand unter `apps/web/web` prüfen.
- [ ] Bestehende Issues, Changes und Entscheidungen prüfen.
- [ ] Figma-Screens für den mobilen Mitarbeiterbereich aus `VAL-003` als Umsetzungsgrundlage festhalten.
- [ ] Überschneidungen mit HR-/Admin-Arbeit abgrenzen.

## 2. Klärung

- [ ] Minimal nötige Datenfelder für die erste Mitarbeitererfassung als Annahme oder offene Frage dokumentieren.
- [ ] Vorläufige Zustände einer Mitarbeitererfassung festhalten.
- [ ] Authentifizierungsstand und Keycloak-Abhängigkeit klären oder als offen markieren.
- [ ] API-Abhängigkeiten mit Backend-Zuständigkeit abstimmen oder als Mockdaten-Stand dokumentieren.
- [ ] Proposal und Design nach den geklärten Punkten aktualisieren.

## 3. Implementierung

- [ ] Mitarbeiterbereich in der vorhandenen Angular-Struktur einordnen.
- [ ] Routing oder Navigation für den Mitarbeiterflow vorbereiten.
- [ ] Welcome- beziehungsweise Einstiegsscreen umsetzen oder einordnen.
- [ ] Login/Register-Ansichten als UI, Platzhalter oder Anbindung passend zum Auth-Stand behandeln.
- [ ] Startseite für Mitarbeitende umsetzen.
- [ ] Ansicht „Verwendung erstellen“ umsetzen.
- [ ] Ansicht „Angabe prüfen“ umsetzen.
- [ ] Bestätigungsansicht „Daten erfasst“ umsetzen.
- [ ] Ansicht „Letzte Erfassungen“ umsetzen.
- [ ] Ansicht „Erfassungsdetail“ umsetzen.
- [ ] Vorläufige Mockdaten klar als Entwicklungsdaten kennzeichnen.
- [ ] Fehler- und Randfälle passend zum ersten Umfang umsetzen.
- [ ] Datenschutz- und Sicherheitsauswirkungen berücksichtigen.
- [ ] Offline-Verhalten umsetzen oder begründet als späteren eigenen Change festhalten.

## 4. Tests

- [ ] Statische Prüfungen ausführen.
- [ ] Automatisierte Tests erstellen oder anpassen, falls sinnvoll und im Projekt eingerichtet.
- [ ] Automatisierte Tests ausführen, falls vorhanden.
- [ ] Mitarbeiterflow manuell im Browser durchklicken.
- [ ] Mobile Darstellung prüfen.
- [ ] Fehler- und leere Zustände prüfen.
- [ ] Grobe Accessibility-Prüfung durchführen.
- [ ] Befehle und tatsächliche Ergebnisse in `evidence.md` dokumentieren.

## 5. Dokumentation

- [ ] Abweichungen vom Figma-Prototyp dokumentieren.
- [ ] Offene FSD-Fragen aus der Umsetzung sammeln.
- [ ] Betroffene gemeinsame Dokumentation aktualisieren, falls notwendig.
- [ ] Tatsächlich verwendete Quellen mit Verwendungszweck eintragen.
- [ ] Relevante KI-IDs eintragen, falls für diesen Change verwendet.
- [ ] Bekannte Einschränkungen festhalten.

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
