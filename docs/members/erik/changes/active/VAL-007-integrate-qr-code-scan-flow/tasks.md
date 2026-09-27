# Aufgaben: QR-Code-Scanflow im Employee- und Restaurant-Frontend integrieren

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-007` |
| Status | `in_progress` |
| Verantwortlich | Erik Bergmair |
| Zuletzt geändert | `2026-09-26` |

Checkboxen werden nur abgehakt, wenn die Aufgabe wirklich erledigt ist. Nicht benötigte Punkte werden mit einer kurzen Begründung als nicht relevant markiert und nicht einfach als erledigt ausgegeben.

## 1. Vorbereitung

- [x] Tatsächlichen Backendstand zu QR-Code-Endpunkten prüfen.
- [x] Tatsächlichen Restaurant-Scanseitenstand prüfen.
- [x] Tatsächlichen Employee-Service- und Startseitenstand prüfen.
- [x] Change-Ordner für die QR-Code-Integration anlegen.
- [ ] Relevante FSD-Fragen zu QR-Code, Restaurant, Sicherheit und Offline prüfen.
- [ ] Bestehende Issues, Commits und Teamabsprachen eintragen.

## 2. Klärung

- [x] Technischen Employee-Flow auf QR-Code-Erzeugung statt direkter Speicherung umstellen; fachliche Teamentscheidung bleibt offen.
- [x] Kamera-Scanner und manuelle Token-Eingabe umsetzen.
- [ ] Backend-Fehlerverhalten bei ungültigem, abgelaufenem und bereits gescanntem QR-Code prüfen.
- [ ] WebSocket-Verhalten im Browser mit echtem QR-Code testen.
- [ ] Klären, ob Restaurant-User oder Restaurant-Admin scannen soll.
- [x] Proposal und Design auf den technischen Stand aktualisieren.

## 3. Implementierung

- [x] QR-Code-Response-Model im Frontend anlegen.
- [x] `EmployeeTicketService` um `createTicketQRCode()` erweitern.
- [x] Employee-Flow so erweitern, dass aus den bestehenden Eingaben ein QR-Code erzeugt wird.
- [x] Backend-SVG als Bild im Employee-Frontend anzeigen.
- [x] WebSocket-Verbindung mit `qrCodeId` öffnen.
- [x] Employee-Status bei `SCAN_SUCCESS` aktualisieren.
- [x] QR-Code-Ablauf nach fünf Minuten im UI anzeigen; ein neuer Code wird über einen neuen Flow erzeugt.
- [x] Restaurant-Service um `scanQRCode()` erweitern.
- [x] Restaurant-Scanseite von Demo-Buttons auf Kamera-Scan und Token-Eingabe umstellen.
- [x] Erfolgs- und Fehlerzustände auf der Restaurantseite anzeigen.
- [ ] Nach erfolgreichem Scan Restaurantdaten beziehungsweise Verlauf aktualisierbar machen.
- [x] Leeren Token, HTTP-Fehler, Kamera-Berechtigung, fehlende Kamera und WebSocket-Abbruch behandeln.
- [x] Token nicht loggen und Backend-Sicherheitsgrenzen dokumentieren.
- [x] Offline-Einlösung begründet als nicht umgesetzt markieren.

## 4. Tests

- [x] Statische Prüfungen ausführen.
- [ ] QR-bezogene automatisierte Tests im Change behalten: auf Nutzerwunsch entfernt.
- [x] Historischer QR-Testlauf vor der Entfernung: 16 Tests bestanden.
- [ ] Employee-QR-Erzeugung manuell mit lokalem Backend prüfen.
- [ ] Restaurant-Scan manuell mit lokalem Backend prüfen.
- [ ] WebSocket-Erfolg manuell prüfen.
- [ ] Ungültigen QR-Token manuell prüfen.
- [ ] Abgelaufenen QR-Token manuell prüfen.
- [ ] Nicht erreichbares Backend prüfen.
- [ ] Mobile Darstellung der QR- und Scanansichten prüfen.
- [x] Befehle und tatsächliche Ergebnisse in `evidence.md` dokumentieren.

## 5. Dokumentation

- [x] Abweichungen vom ursprünglichen Plan dokumentieren.
- [ ] Betroffene gemeinsame Dokumentation aktualisieren, falls notwendig.
- [x] Tatsächlich verwendete Quellen mit Verwendungszweck eintragen.
- [x] Am 26.09.2026 ergänzend SRC-029 bis SRC-035 recherchieren und Formulierungsvorschläge für die QR-Integration in den Diplomarbeitsnotizen ergänzen.
- [x] Diese ergänzende Recherche unter AI-002 dokumentieren; frühere KI-Nutzungen bleiben separat nachzutragen.
- [ ] Relevante KI-IDs eintragen.
- [x] Bekannte Einschränkungen festhalten.
- [x] Sicherheitsgrenzen des QR-Code-Ansatzes ehrlich dokumentieren.

## 6. Review

- [ ] Eigene Prüfung gegen alle Akzeptanzkriterien durchführen.
- [ ] Technischen Backendvertrag mit Backend-Teammitglied abgleichen.
- [ ] Review-Ergebnisse und offene Punkte dokumentieren.
- [ ] Notwendige Korrekturen umsetzen und erneut prüfen.

## 7. Abschluss

- [x] Tatsächliche Umsetzung und betroffene Dateien in `evidence.md` eintragen.
- [ ] Issue, Branch, Pull Request und Commits verlinken, soweit vorhanden.
- [ ] Status passend zum echten Prüfstand setzen.
- [ ] Alle offenen Checkboxen erklären oder erledigen.
- [ ] Abschlussdatum festhalten.
- [ ] Change mit Datumspräfix nach `completed/` verschieben.
