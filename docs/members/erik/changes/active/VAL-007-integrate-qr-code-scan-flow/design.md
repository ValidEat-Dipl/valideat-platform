# Design: QR-Code-Scanflow im Employee- und Restaurant-Frontend integrieren

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-007` |
| Status | `in_progress` |
| Verantwortlich | Erik Bergmair |
| Proposal | [proposal.md](proposal.md) |
| Zuletzt geändert | `2026-09-26` |

## Technische Lösung

Der QR-Code-Flow wird auf den bereits vorhandenen Backend-Endpunkten aufgebaut. Die Frontend-Umsetzung soll bewusst einfach bleiben und sich am bestehenden Employee- und Restaurant-Code orientieren. Es wird kein stark abstrahiertes Framework rund um QR-Codes gebaut.

Der Ablauf wird in zwei Frontend-Teile getrennt:

1. Employee erzeugt aus der geplanten Markerlverwendung einen QR-Code.
2. Restaurant-User scannt beziehungsweise erfasst den QR-Token und sendet ihn an das Backend.

Der WebSocket wird im Employee-Frontend genutzt, damit die Ansicht nach einem erfolgreichen Scan reagieren kann.

## Betroffene Komponenten

| Komponente | Geplante Änderung | Verantwortungsbereich |
|---|---|---|
| `EmployeeTicketService` | Methode für `POST /foodticket/empCreateTicketQRCode` ergänzen | Erik |
| Employee-Erstell-/Review-Flow | QR-Code-Erzeugung statt direkter finaler Speicherung prüfen und einbauen | Erik |
| Neue oder bestehende Employee-Erfolg/QR-Seite | QR-Code-SVG anzeigen und WebSocket öffnen | Erik |
| Restaurant-Scanseite | Demo-Buttons durch echten QR-Token-Scan beziehungsweise Token-Eingabe ersetzen | Erik |
| Restaurant-Service | Methode für `POST /foodticket/scanQRCode` ergänzen | Erik |
| Backend `FoodTicketResource` | vorhandene QR-Code-Endpunkte verwenden, nicht neu implementieren | Backend-Teammitglied |
| WebSocket `/qrCodeScan/{qrCodeId}` | vorhandenen Erfolgsstatus `SCAN_SUCCESS` verwenden | Backend-Teammitglied / Erik nutzt ihn |

## Datenfluss

1. Employee füllt Datum, Markerlstufe, Kostenstelle und Restaurant aus.
2. Frontend sendet diese Daten an `POST /foodticket/empCreateTicketQRCode`.
3. Backend erzeugt QR-Token, QR-SVG und `qrCodeId`.
4. Frontend öffnet `ws://localhost:8080/qrCodeScan/{qrCodeId}`.
5. Erst nach Verbindungsaufbau zeigt es das QR-SVG an, damit die Benachrichtigung nicht vor dem Öffnen des WebSockets verloren geht.
6. Restaurant-User scannt oder erfasst den QR-Token.
7. Restaurant-Frontend sendet den Token als Text an `POST /foodticket/scanQRCode`.
8. Backend prüft den QR-Token, erstellt die passenden Tickets und benachrichtigt den WebSocket.
9. Employee-Frontend bekommt `SCAN_SUCCESS`.
10. Beide Seiten zeigen einen passenden Status.

## Benutzerablauf

### Employee

1. Mitarbeitende Person erstellt eine Markerlverwendung.
2. System zeigt eine Prüfseite mit den Eingaben.
3. Nach Bestätigung wird ein QR-Code erzeugt.
4. QR-Code wird im Browser angezeigt.
5. Nach erfolgreichem Scan erscheint eine Erfolgsmeldung.
6. Wenn der QR-Code abläuft oder nicht gescannt wird, bleibt eine verständliche Meldung sichtbar.

### Restaurant User

1. Restaurant-User öffnet die Scan-Seite.
2. QR-Code wird gescannt oder der QR-Token wird im ersten technischen Stand eingefügt.
3. System sendet den Token ans Backend.
4. Bei Erfolg erscheint eine Erfolgsmeldung auf derselben Scan-Seite.
5. Bei Fehler erscheint eine verständliche Fehlermeldung.

## API-Nutzung und Daten

- Endpunkte:
  - `POST /foodticket/empCreateTicketQRCode`
  - `POST /foodticket/scanQRCode`
  - `ws://localhost:8080/qrCodeScan/{qrCodeId}`
- Eingabedaten QR-Erzeugung:
  - `date`
  - `employeeName`
  - `costOrder`
  - `tier`
  - `restaurantName`
- Ausgabedaten QR-Erzeugung:
  - `qrCode`
  - `token`
  - `qrCodeId`
- Eingabedaten Scan:
  - QR-Token als `text/plain`
- Ausgabedaten Scan:
  - nach aktuellem Backendcode ein Ticket-DTO bei Erfolg
  - bei Fehler aktuell HTTP 400 mit Fehlermeldung
- Validierung:
  - Frontend prüft leere Eingaben.
  - Backend parst Token und Claims und lädt Entitäten. Eine Zuordnungsprüfung des QR-Tenants und QR-Restaurants zum angemeldeten Restaurant-User ist im geprüften Code nicht zu sehen.
- Abhängigkeit vom Backend:
  - hoch, weil QR-Code, Signatur, Ablaufzeit und Ticketanlage serverseitig erfolgen.

Noch nicht abgestimmte Schnittstellen werden als aktueller Backendstand und nicht als finale Porsche-Anforderung behandelt.

## Zustände

| Zustand | Anzeige oder Verhalten | Übergang |
|---|---|---|
| Laden | QR-Code wird erzeugt oder Scan wird gesendet | Absenden |
| QR bereit | QR-Code sichtbar, WebSocket wartet | Backendantwort erfolgreich |
| Erfolgreich | Erfolgsmeldung im Employee- und Restaurant-Flow | Scan erfolgreich |
| Leer | kein Token oder keine Daten vorhanden | Seite ohne Eingabe |
| Fehler | verständliche Fehlermeldung | Backendfehler oder ungültiger Token |
| Abgelaufen | Token nicht mehr gültig, neuer QR-Code nötig | Backend lehnt Scan ab oder Timer läuft ab |
| Offline | Scan nicht möglich, weil Backend nicht erreichbar | HTTP- oder WebSocket-Fehler |

## Fehlerbehandlung

| Fehlerfall | Reaktion des Systems | Information für die nutzende Person |
|---|---|---|
| Backend bei QR-Erzeugung nicht erreichbar | Fehlerstatus setzen, keine QR-Anzeige | QR-Code konnte nicht erstellt werden |
| QR-Token leer | Scan nicht senden | Bitte QR-Code scannen oder Token einfügen |
| QR-Token ungültig | Backendfehler anzeigen | QR-Code ist ungültig |
| QR-Token abgelaufen | Backendfehler anzeigen | QR-Code ist abgelaufen, bitte neu erzeugen |
| WebSocket schließt | Status anzeigen, HTTP-Scan kann trotzdem erfolgt sein | Scanstatus konnte nicht live aktualisiert werden |
| Restaurant-User nicht angemeldet | zur Restaurant-Loginseite weiterleiten | Anmeldung erforderlich |

## Sicherheit und Datenschutz

- Authentifizierung und Berechtigung:
  - Employee muss angemeldet sein, um den QR-Code zu erzeugen.
  - Restaurant-User muss angemeldet sein, um `scanQRCode` aufzurufen.
- Personenbezogene Daten:
  - Der QR-Token enthält unter anderem Employee-ID und Tenant-ID als Claims.
  - Der Token wird im Frontend benötigt, darf aber nicht unnötig in Logs oder Doku kopiert werden.
- Lokale Speicherung:
  - QR-Daten sollen nur im aktuellen Flow gehalten werden, nicht dauerhaft im Local Storage.
- Protokollierung:
  - Tokenwerte werden nicht bewusst durch eigenes Frontend-Logging ausgegeben.
- Besondere Risiken:
  - QR-Screenshot, Weitergabe und Replay müssen später fachlich und technisch bewertet werden.
  - Der aktuelle Backendstand erstellt beim Scan direkt Tickets; dadurch muss Fehlerverhalten sorgfältig geprüft werden.

## Offline-Verhalten

Offline-Einlösung wird in diesem Change nicht umgesetzt. Ohne Serververbindung darf der Restaurant-User keine erfolgreiche Einlösung anzeigen. Eine spätere Offline-Lösung wäre ein eigener Change.

## Alternativen

### Alternative 1: Manuelle Token-Eingabe als erster Stand

- Vorteile: schnell testbar, kein zusätzlicher Browser-Kamera-Aufwand, Backendvertrag kann zuerst geprüft werden.
- Nachteile: nicht so benutzerfreundlich wie echter QR-Scanner.
- Entscheidung: als Alternative zum Kamera-Scan umgesetzt.
- Grund: technische Tests und Nutzung bei fehlender Kamera bleiben möglich.

### Alternative 2: Echter Kamera-Scanner direkt

- Vorteile: näher am Zielprozess.
- Nachteile: zusätzliche Bibliothek oder Browser-API, Geräteberechtigungen, HTTPS-/Browser-Einschränkungen und mehr Fehlerfälle.
- Entscheidung: Browser-Kamera-Scan mit `@zxing/browser` umgesetzt.
- Grund: der Nutzer hat die Kamera-Umsetzung ausdrücklich angefordert. Der Gerätetest bleibt offen.

### Alternative 3: Employee erzeugt weiter normale Einträge und QR-Code nur zusätzlich

- Vorteile: bestehender Employee-Flow bleibt stabil.
- Nachteile: fachlich unklar, weil dadurch doppelte oder falsche Zustände entstehen könnten.
- Entscheidung: der QR-Code ersetzt im aktuellen Employee-Erstellflow die direkte Speicherung. Das Backend speichert erst beim Scan.
- Grund: ein zusätzlicher direkter Eintrag könnte zu doppelten oder falschen Zuständen führen; die fachliche Entscheidung muss noch im Team bestätigt werden.

## Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|---|---|---|---|
| Backendvertrag passt nicht exakt zu bestehendem Employee-Request | mittel | QR-Erzeugung schlägt fehl | Request-DTO genau abgleichen und manuell testen |
| QR-Code läuft während Test ab | hoch | Scan schlägt nach 5 Minuten fehl | Ablaufzeit im UI erklären und erneutes Erzeugen ermöglichen |
| Token wird versehentlich geloggt | mittel | Sicherheitsrisiko | keine Token-Logs im Frontend |
| WebSocket funktioniert im Browser nicht stabil | mittel | Employee bekommt keinen Live-Status | HTTP-Erfolg im Restaurant trotzdem anzeigen und Fehler klar markieren |
| Restaurant scannt Token für falsches Restaurant | unbekannt | fachlicher Fehler | Backendverhalten testen und als offene Frage dokumentieren |
| Kamera-Scanner dauert länger als geplant | mittel | Zeitverlust | zuerst einfache Token-Eingabe umsetzen |

## Teststrategie

| Ebene | Geplante Prüfung | Erwartetes Ergebnis |
|---|---|---|
| Statisch | `npm run build` | Angular kompiliert |
| Automatisiert | Service-Tests ergänzen, falls bestehende Teststruktur nicht blockiert | HTTP-Methoden und URLs stimmen |
| Manuell | Employee erzeugt QR-Code, Restaurant scannt Token | Backend erstellt Einlösung |
| Manuell | WebSocket meldet `SCAN_SUCCESS` | Employee sieht Erfolgsstatus |
| Manuell | abgelaufener oder falscher Token | Restaurant sieht Fehler |
| Usability | QR-Anzeige und Scanseite kurz im Browser prüfen | Ablauf verständlich |
| Barrierefreiheit | Grundlegende Labels und Buttontexte prüfen | Bedienung ohne reine Farbinformation |

Geplante Tests werden erst nach ihrer tatsächlichen Ausführung im Nachweis als bestanden oder fehlgeschlagen eingetragen.

## Konkret umgesetzter Kameraablauf

Die Restaurant-Seite lädt ZXing erst nach „Kamera starten“. Der Browser fordert die Umgebungskamera an und zeigt das Video an. Beim ersten erkannten QR-Code stoppt die Seite die Kamera und übergibt den decodierten Text an dieselbe Methode wie bei manueller Eingabe. Diese sendet `POST /foodticket/scanQRCode` mit `Content-Type: text/plain`. Die Kamera wird auch beim Stoppen, beim manuellen Absenden und beim Verlassen der Seite freigegeben. Fehlende Berechtigung oder fehlende Kamera werden angezeigt.

Kamerazugriff braucht HTTPS oder `localhost`. Auf einem Smartphone zeigt das bisherige `http://localhost:8080` der Frontend-Services auf das Smartphone selbst. Für einen Test auf einem anderen Gerät sind eine erreichbare API-Adresse und eine sichere Frontend-URL erforderlich. Dieser Umgebungsaufbau ist noch offen.

## Quellenbezug der technischen Entscheidungen

Am 26.09.2026 ergänzte Erklärung des vorhandenen Codes; die Recherche ist kein Geräte- oder Sicherheitstest.

| Bereich | Quellenbezug | Konkrete Anwendung in ValidEat |
| --- | --- | --- |
| Kamera-Voraussetzungen | [SRC-029](../../../sources/sources.md#src-029--mdn-getusermedia) | startCamera prüft Browser-Unterstützung und sicheren Kontext; separate Meldungen behandeln verweigerte Berechtigung und fehlende Kamera. |
| QR-Erkennung | [SRC-030](../../../sources/sources.md#src-030--zxing-browser-v015) | BrowserQRCodeReader liefert Text an checkToken; erst die Backend-Antwort führt zur Erfolgsmeldung. |
| Rückmeldung | [SRC-031](../../../sources/sources.md#src-031--mdn-websocket-api) | SCAN_SUCCESS aktualisiert die Employee-Ansicht. Ein Verbindungsabbruch wird angezeigt; eine Wiederaufnahme per Statusabfrage ist nicht implementiert. |
| Tokenformat | [SRC-032](../../../sources/sources.md#src-032--rfc-7519-json-web-token) | Fünf-Minuten-Token mit eigenem ticketId-Claim. Eine backendseitige Einmalprüfung bleibt offen. |
| SVG-Vertrauen | [SRC-033](../../../sources/sources.md#src-033--angular-security) | bypassSecurityTrustUrl setzt Vertrauen in das vom eigenen Backend erzeugte SVG voraus. |
| HTTP-Vertrag | [SRC-034](../../../sources/sources.md#src-034--angular-making-requests) | JSON bei der Erstellung, text/plain beim Scan; TypeScript-Typen ersetzen keine Laufzeitprüfung der Antwort. |
| Ressourcen | [SRC-035](../../../sources/sources.md#src-035--mdn-mediastreamtrack-stop) | Die Seite verwendet ZXing-Controls zum Stoppen. cameraRunId verwirft verspätete Starts nach einem Abbruch. |

Die ausführlicheren Formulierungsvorschläge für den Diplomarbeitsteil stehen in den [Arbeitsnotizen](../../../reports/thesis-writing-notes.md#qr-code-erstellung-und-einlösung-als-getrennte-schritte). Der tatsächliche Prüfstatus bleibt im Nachweis dokumentiert.
