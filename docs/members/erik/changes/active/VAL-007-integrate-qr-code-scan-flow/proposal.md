# Proposal: QR-Code-Scanflow im Employee- und Restaurant-Frontend integrieren

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-007` |
| Status | `in_progress` |
| Verantwortlich | Erik Bergmair |
| Erstellt am | `2026-09-23` |
| Zuletzt geändert | `2026-09-24` |
| FSD-Referenz | nicht vorhanden; FSD-Fragen zu QR-Code, Restaurant und Sicherheit sind noch offen |
| GitHub Issue | nicht festgestellt |

## Herkunft und Sicherheit

- Art: Teamentscheidung / technische Integration / spätere Plattformfunktion
- Grundlage: vorhandener Backend-Code, vorhandene HTTP-Beispiele, bisheriger Restaurant-User-Prototyp und Gesprächsstand im Team
- Bestätigt durch: nicht fachlich durch Porsche bestätigt

## Ausgangslage

Der Restaurant-User-Bereich enthält bisher eine Scan-Seite mit statischen Demo-Ergebnissen. Der Employee-Bereich erstellt bisher normale Einträge über `POST /foodticket/empAddTicketEntry`, aber noch keinen QR-Code-Flow.

Im Backend existiert bereits eine QR-Code-Logik:

- Mitarbeitende können für eine Markerlverwendung einen QR-Code erzeugen lassen.
- Das Backend gibt dafür ein SVG, einen QR-Token und eine `qrCodeId` zurück.
- Über einen WebSocket kann die Mitarbeitendenansicht erfahren, ob der QR-Code erfolgreich gescannt wurde.
- Restaurant-User können den QR-Token an das Backend senden, wodurch die Einlösung gespeichert wird.

Diese Backend-Funktion stammt nicht aus Eriks Frontendarbeit und muss im Frontend erst sauber angebunden werden.

## Ziel

Der QR-Code-Flow soll als erster funktionaler Frontend-Stand umgesetzt werden:

- Mitarbeitende erzeugen aus ihren Eingaben einen QR-Code statt nur einen normalen Eintrag direkt zu speichern.
- Die Mitarbeitendenansicht zeigt den QR-Code und wartet auf das Scan-Ergebnis.
- Restaurant-User erfassen beziehungsweise scannen den QR-Token und senden ihn an das Backend.
- Nach erfolgreicher Einlösung werden passende Erfolgs- oder Fehlermeldungen angezeigt.
- Der bisherige Demo-Scanbereich wird durch echte Funktionalität ersetzt.

## Umfang

- QR-Code-Erzeugung im Employee-Frontend über `POST /foodticket/empCreateTicketQRCode`.
- Anzeige des vom Backend gelieferten QR-Code-SVG im Employee-Frontend.
- WebSocket-Verbindung auf `/qrCodeScan/{qrCodeId}` für den Scanstatus.
- Restaurant-User-Scanseite mit Browser-Kamera und manueller Token-Eingabe.
- Einlösung über `POST /foodticket/scanQRCode` mit `Content-Type: text/plain`.
- Anzeige von Lade-, Erfolgs- und Fehlerzuständen im Restaurant-User-Frontend.
- Entfernen oder Ersetzen der bisherigen Demo-Ergebnislinks.
- Aktualisierung der persönlichen Nachweise nach der Implementierung.

## Nicht-Umfang

- Keine Änderung am Backend, außer ein klarer Fehler verhindert die Frontend-Integration und muss separat abgestimmt werden.
- Keine vollständige native Kamera-App.
- Keine Offline-Einlösung.
- Keine fachliche Porsche-Freigabe des QR-Prozesses.
- Keine abschließende Sicherheitsbewertung gegen Weitergabe, Screenshots oder Replay-Angriffe.
- Keine finale FSD-Anforderungserstellung in diesem Change.

## Akzeptanzkriterien

- [x] Employee-Frontend kann für eine Markerlverwendung einen QR-Code vom Backend anfordern (technisch und per Build geprüft).
- [x] Der QR-Code wird aus dem Backend-SVG angezeigt (Template und Build geprüft; Gerätetest offen).
- [x] Employee-Frontend öffnet den WebSocket mit der gelieferten `qrCodeId`.
- [x] Bei `SCAN_SUCCESS` aktualisiert sich der Employee-Status (Code und Build geprüft; Live-Test offen).
- [x] Restaurant-User-Frontend kann einen QR-Token an `POST /foodticket/scanQRCode` senden (Code und Build geprüft; Live-Test offen).
- [x] Restaurant-User zeigt einen Erfolg nur nach erfolgreicher Backend-Antwort.
- [x] Restaurant-User sieht bei Fehler eine Meldung; echte Backend-Fehlerfälle sind noch nicht manuell geprüft.
- [x] Die Demo-Ergebnisbuttons wurden aus dem Scanablauf entfernt.
- [x] Der Angular-Build läuft; bestehende Prerender- und Budget-Warnungen sind dokumentiert.

## Offene Fragen

| Frage | Entscheidet durch | Zwingend vor Umsetzung? | Status |
|---|---|---|---|
| Soll der bestehende normale Employee-Eintrag durch QR-Code-Erzeugung ersetzt oder zusätzlich angeboten werden? | Team | Ja | offen |
| Wird im ersten Stand ein echter Kamera-Scanner umgesetzt oder nur eine QR-Token-Eingabe als technischer Testflow? | Erik / Team | Ja | offen |
| Welche Fehlermeldungen liefert das Backend bei abgelaufenem oder falschem QR-Code zuverlässig zurück? | Backend / Team | Ja | offen |
| Soll ein QR-Code nur für ein bestimmtes Restaurant gültig sein und wie wird das im Frontend erklärt? | Team / Porsche später | Nein, für ersten technischen Stand Backendvertrag vorhanden | offen |
| Wie wird Replay beziehungsweise erneutes Scannen verhindert? | Backend / Team | Nein, aber sicherheitsrelevant | offen |
| Wie genau wird dieser QR-Flow später in der FSD als Porsche- oder SaaS-Umfang eingeordnet? | Team / Porsche | Nein | offen |

## Annahmen

- Der QR-Code enthält technisch einen signierten Backend-Token.
- Der Token ist laut Backendcode fünf Minuten gültig.
- Das Restaurant-Frontend sendet den gescannten Token als `text/plain` an das Backend.
- Der vorhandene Auth-Interceptor hängt den Restaurant-User-JWT an den Scan-Request an.
- Der WebSocket sendet im Erfolgsfall den Text `SCAN_SUCCESS`.
- Der technische Stand verwendet einen Browser-Kamera-Scan mit manueller Token-Eingabe als Alternative.

## Auswirkungen

- Benutzeroberfläche: Employee-Flow bekommt QR-Code-Anzeige; Restaurant-Scanseite wird funktional.
- API und Backend: vorhandene QR-Code-Endpunkte werden genutzt.
- Daten und Datenschutz: QR-Token enthält Employee-ID, Tenant-ID, Tier, Kostenstelle, Restaurant-ID und Datum als Claims. Der Token darf nicht unnötig geloggt werden.
- Offline-Verhalten: Offline-Einlösung wird nicht umgesetzt.
- Dokumentation: Change-Nachweis und spätere FSD-Fragen müssen aktualisiert werden.
- Andere Teammitglieder: Backendvertrag und Fehlerfälle müssen mit dem Backend-Teammitglied abgestimmt werden.

## Abstimmungen und Freigabestatus

| Gegenstand | Zuständige Stelle | Status | Nachweis |
|---|---|---|---|
| Backend-Endpunkte für QR-Code-Erzeugung und Scan | Backend-Teammitglied / Team | technisch vorhanden, noch nicht final reviewed | Repository-Code |
| Fachlicher QR-Code-Prozess | Team / Porsche später | offen | nicht vorhanden |
| Sicherheitsgrenzen des QR-Codes | Team | offen | nicht vorhanden |

Eine persönliche Freigabe durch Erik ist keine automatische Team-, Porsche- oder Schulfreigabe.

## Umsetzungsstand vom 2026-09-24

Der Frontend-Code ist im lokalen Haupt-Checkout umgesetzt. Ein echter End-to-End-Test mit Backend, Kamera und zwei angemeldeten Geräten steht aus. Es gibt keinen Commit und keinen Push. Technische Details und tatsächlich ausgeführte Prüfungen stehen in [evidence.md](evidence.md).

### Nachtrag vom 26.09.2026

Der zuvor beschriebene Commit-Stand gilt für den 24.09.2026. Inzwischen wurden die Code-Commits `15147f8` (Employee-QR) und `a6d73b8` (Restaurant-Kamera) im lokalen Verlauf festgestellt; der Push-Status wurde nicht geprüft. Ergänzende technische Quellen und Schreibnotizen sind nun über [evidence.md](evidence.md#ergänzende-quellenrecherche-vom-26092026) zugeordnet. Diese Dokumentationsarbeit liefert keinen zusätzlichen Live-Testnachweis.
