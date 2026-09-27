# Nachweis: QR-Code-Scanflow im Employee- und Restaurant-Frontend integrieren

## Metadaten

| Feld                    | Wert                    |
| ----------------------- | ----------------------- |
| Change-ID               | `VAL-007`               |
| Status                  | `in_progress`           |
| Verantwortlich          | Erik Bergmair           |
| Beginn                  | `2026-09-23`            |
| Abschluss               | noch nicht abgeschlossen |
| Tatsächlicher Zeitraum | ab `2026-09-23`, Codeübertragung in den Haupt-Checkout am `2026-09-24` |

## Git- und GitHub-Nachweise

| Nachweis     | Referenz |
| ------------ | -------- |
| Issue        | nicht festgestellt |
| Branch       | `main` |
| Pull Request | nicht vorhanden |
| Commits      | Im lokalen Git-Verlauf am 26.09.2026 festgestellt: `15147f8ef7b27f6fbff3bea2fbce37bc28b7d127` (Employee-QR und Status), `a6d73b85abf35deedf525562d7558d6294ca2b7b` (Restaurant-Kamera), außerdem `9fa9c7c` (SSR-/Auth-Korrektur). Der Remote-/Push-Status wurde dabei nicht geprüft. |

## Tatsächlich umgesetzte Funktionen

- Am 2026-09-23 wurde zuerst der vorhandene Backend- und Frontendstand geprüft und der Change geplant.
- Employee: `POST /foodticket/empCreateTicketQRCode` erhält die Daten des vorhandenen Formulars. Das Backend-SVG und der Token werden nur im Arbeitsspeicher gehalten. Die QR-Seite öffnet `/qrCodeScan/{qrCodeId}`, zeigt das Bild nach Verbindungsaufbau und aktualisiert sich bei `SCAN_SUCCESS`. Nach fünf Minuten zeigt sie einen Ablaufhinweis.
- Restaurant: Die Seite startet auf Knopfdruck eine Browser-Kamera mit `@zxing/browser` 0.1.5. Der erste decodierte QR-Text wird wie eine manuelle Token-Eingabe als `text/plain` an `POST /foodticket/scanQRCode` gesendet. Der bestehende HTTP-Interceptor ergänzt die Restaurant-Anmeldung. Erfolg erscheint nur nach erfolgreicher API-Antwort; Fehler werden angezeigt.
- Die Demo-Ergebnislinks sind aus dem aktiven Scanablauf entfernt. Die früheren Demo-Ergebnisseiten bleiben als nicht mehr erreichbarer Altcode im Repository.

## Bereits geprüfter Ausgangsstand

- Backend enthält `POST /foodticket/empCreateTicketQRCode`.
- Backend enthält `POST /foodticket/scanQRCode`.
- Backend enthält WebSocket `/qrCodeScan/{qrCodeId}`.
- Backend gibt bei QR-Code-Erzeugung `qrCode`, `token` und `qrCodeId` zurück.
- Backend erwartet beim Scan den QR-Token als `text/plain`.
- Restaurant-Scanseite war vor der Umsetzung ein Demo-/Platzhalterflow.
- Employee-Service enthielt vor der Umsetzung normale Ticketfunktionen, aber noch keine QR-Code-Erzeugung.

## Betroffene Dateien

| Datei | Tatsächliche Änderung |
| ----- | --------------------- |
| `docs/members/erik/changes/active/VAL-007-integrate-qr-code-scan-flow/proposal.md` | Planungsstand für QR-Code-Integration angelegt. |
| `docs/members/erik/changes/active/VAL-007-integrate-qr-code-scan-flow/design.md` | Technischen Ablauf, Datenfluss, Risiken und Teststrategie geplant. |
| `docs/members/erik/changes/active/VAL-007-integrate-qr-code-scan-flow/tasks.md` | Aufgabenliste für Umsetzung, Tests, Doku und Review angelegt. |
| `docs/members/erik/changes/active/VAL-007-integrate-qr-code-scan-flow/evidence.md` | Ersten Nachweis zum geprüften Ausgangsstand angelegt. |
| `apps/web/web/src/app/features/employee/` | Model, Service und Erstell-/Review-/QR-Seiten für Erzeugung und WebSocket angepasst. Die beiden betroffenen Seiten-Specs wurden auf Nutzerwunsch entfernt. |
| `apps/web/web/src/app/features/restaurant/` | Scanservice, Kamera-/Token-Seite, Übersichtstext und Routen angepasst. Die neue Scan-Spec wurde auf Nutzerwunsch wieder entfernt. |
| `apps/web/web/package.json`, `package-lock.json` | ZXing-Abhängigkeiten ergänzt. |
| `apps/web/web/src/app/features/employee/services/employee-ticket.service.spec.ts` | Der zwischenzeitlich ergänzte QR-Test wurde auf Nutzerwunsch entfernt; die älteren Service-Tests blieben erhalten. |

## Akzeptanzkriterien

| Kriterium | Ergebnis | Nachweis |
| --------- | -------- | -------- |
| Employee-Frontend kann QR-Code vom Backend anfordern. | technisch umgesetzt | Code und Angular-Build; echter Backendaufruf offen |
| QR-Code wird sichtbar angezeigt. | technisch umgesetzt | Angular-Build; echte Geräteanzeige offen |
| Employee-Frontend öffnet WebSocket mit `qrCodeId`. | technisch umgesetzt | Code und Angular-Build; echter Backend-WebSocket offen |
| Restaurant-User kann QR-Token an das Backend senden. | technisch umgesetzt | Code und Angular-Build; echter Scan offen |
| Erfolgs- und Fehlerzustände werden verständlich angezeigt. | technisch umgesetzt | Angular-Build; manueller Browsercheck offen |
| Demo-Scanflow ist ersetzt. | umgesetzt | Routen und Scanseite im Code geprüft |

## Abweichungen vom Design

Der erste Plan bevorzugte manuelle Token-Eingabe. Auf ausdrücklichen Nutzerwunsch wurde zusätzlich ein Browser-Kamera-Scan umgesetzt. Die Kamera wird beim Treffer, Stoppen, manuellen Absenden und Verlassen der Seite freigegeben. Eine native App wurde nicht gebaut.

## Ausgeführte Prüfungen

| Datum | Prüfung oder Befehl | Umgebung | Ergebnis | Status |
| ----- | ------------------- | -------- | -------- | ------ |
| 2026-09-23 | `rg`-Suche nach QR-Code-, WebSocket- und Foodticket-Endpunkten | lokales Repository | vorhandene Backend-Endpunkte und Frontend-Platzhalter festgestellt | bestanden |
| 2026-09-23 | Lesen von `FoodTicketResource.java`, `QRCodeResponse.java`, `QRCodeScanWebSocket.java` und `foodTicket.http` | lokales Repository | Backendvertrag für QR-Erzeugung, Scan und WebSocket verstanden | bestanden |
| 2026-09-23 | Lesen von Employee-Service und Restaurant-Scanseite | lokales Repository | Frontend hat noch keine QR-Code-Integration | bestanden |
| 2026-09-24 | `npm ci --ignore-scripts` | Haupt-Checkout, Angular-Projekt | Abhängigkeiten aus Lockfile installiert | bestanden |
| 2026-09-24 | `tsc -p tsconfig.app.json --noEmit` und zwischenzeitlich `tsc -p tsconfig.qr.spec.json --noEmit` | Angular-Projekt | beide ohne TypeScript-Fehler; QR-Testkonfiguration wurde danach entfernt | bestanden zum Ausführungszeitpunkt |
| 2026-09-24 | `CI=true ng test --watch=false --ts-config=tsconfig.qr.spec.json` mit vier QR-bezogenen `--include`-Specs | Angular-Projekt im Haupt-Checkout | 4 Testdateien, 16 Tests bestanden; die QR-Specs und Testkonfiguration wurden danach auf Nutzerwunsch entfernt | bestanden zum Ausführungszeitpunkt |
| 2026-09-24 | `CI=true ng build` | Angular-Projekt im Haupt-Checkout | Build erfolgreich, 23 Routen prerendered; Prerendering meldet Verbindungsfehler zum nicht gestarteten Backend, Initial-Bundle-Budget wird überschritten | bestanden mit Warnungen |
| 2026-09-24 | `git diff --check` | Haupt-Checkout | keine Whitespace-Fehler | bestanden |
| 2026-09-25 | `npm run build` nach SSR-/Local-Storage-Korrektur | Angular-Projekt im Haupt-Checkout | Build erfolgreich; keine `localStorage.getItem is not a function`-Ausnahme und keine `tenantId claim: null`-Fehler während Prerendering; Initial-Bundle-Budget bleibt überschritten | bestanden mit Warnung |

Nicht ausgeführte Prüfungen:

- Kein manueller Browser-Test mit echter Kamera und zwei angemeldeten Geräten ausgeführt.
- Kein End-to-End-Test mit laufendem Backend und echtem QR-Code ausgeführt.
- Die reguläre Testkonfiguration scheitert vor Testausführung am vorhandenen Tippfehler `InfloFlexServiceExport` in einer Admin-Spec. Die zwischenzeitlich verwendete `tsconfig.qr.spec.json` wurde auf Nutzerwunsch entfernt.
- Auf ausdrücklichen Nutzerwunsch sind keine QR-bezogenen `*.spec.ts`-Tests oder eigene QR-Testkonfiguration mehr Bestandteil dieses Changes. Die früheren Testergebnisse dokumentieren nur den Stand vor ihrer Entfernung.
- `CI=true` deaktivierte beim Angular-Build und Test die lokale Build-Cache-Nutzung. Die bereits vorhandenen, unversionierten `.angular`-Dateien im Haupt-Checkout wurden nicht bereinigt.

## Bekannte Einschränkungen

- Der aktuelle Employee-Erstellflow erzeugt den QR-Code statt sofort ein Ticket zu speichern. Diese fachliche Entscheidung muss noch im Team bestätigt werden.
- Der Browser-Kamera-Scan ist implementiert, aber nicht auf echter Hardware geprüft. Kamerazugriff erfordert HTTPS oder `localhost`.
- Auf einem Smartphone zeigt die derzeitige API-Adresse `http://localhost:8080` auf das Smartphone selbst. Für einen temporären Android-Gerätetest kann `adb reverse` verwendet werden, um `localhost:4200` und `localhost:8080` vom Gerät auf den Entwicklungsrechner weiterzuleiten. Das ist nur ein lokaler Testaufbau und kein Deployment.
- QR-Code ist laut Backend fünf Minuten gültig.
- Der QR-Token darf nicht als sicher gegen Screenshots, Weitergabe oder Replay bezeichnet werden.
- Im geprüften Backendcode fehlt sichtbar ein Abgleich von QR-Restaurant und QR-Tenant mit dem eingeloggten Restaurant-User sowie eine Prüfung auf erneutes Einlösen derselben `ticketId`. Diese Regeln gehören ins Backend.
- Der WebSocket-Status ist nur verfügbar, solange die Employee-Seite geöffnet und verbunden ist. Ein Reload verwirft die QR-Daten aus dem Arbeitsspeicher.
- Fachliche Porsche-Freigabe für QR-Code-Einlösung ist nicht vorhanden.
- Serverseitiges Rendering wurde für die App-Routen auf Client Rendering umgestellt, weil die ValidEat-Oberflächen login- und tenantabhängig sind. Geschützte API-Requests sollen nicht während SSR/Prerendering ohne Browser-Token ausgelöst werden.

## Eigene Leistung von Erik

Erik verantwortet die geplante Frontend-Integration, UI-Zustände und Prüfung im Browser. Die vorhandene Backend-QR-Code-Erzeugung, Signatur, WebSocket-Benachrichtigung und Ticketanlage stammen aus der Backendarbeit eines Teammitglieds.

## Review

| Datum | Prüfende Person | Gegenstand | Ergebnis | Offene Punkte |
| ----- | --------------- | ---------- | -------- | ------------- |
| 2026-09-23 | Erik Bergmair / Codex-Unterstützung | Planungsstand | Backendvertrag und Frontend-Ausgangslage wurden geprüft | Implementierung und Teamabgleich offen |

## Verwendete Quellen

Grundlage waren der aktuelle Repository- und Backendstand. Für die Browser-Kamera-API wurde die [offizielle ZXing-Browser-Dokumentation](https://github.com/zxing-js/browser) verwendet.

| Quellen-ID | Verwendungszweck |
| ---------- | ---------------- |
| [SRC-024](../../../sources/sources.md#src-024--angular-server-side-rendering) | Einordnung von SSR, Prerendering und Client Rendering und Begründung, warum ValidEat-Routen mit Login- und Tenantbezug clientseitig gerendert werden. |
| [SRC-025](../../../sources/sources.md#src-025--angular-isplatformbrowser) | Absicherung von Browser-Code gegen serverseitige Ausführung, besonders für Auth-Interceptor und lokalen Benutzerspeicher. |
| [SRC-026](../../../sources/sources.md#src-026--mdn-windowlocalstorage) | Einordnung von `localStorage` als Browser-Speicher und Grenze gegenüber serverseitiger Ausführung. |
| [SRC-027](../../../sources/sources.md#src-027--android-debug-bridge) | Grundlage für den temporären Test mit einem Android-Gerät und `adb devices`. |
| [SRC-028](../../../sources/sources.md#src-028--adb-manpage-zu-reverse) | Grundlage für `adb reverse` zur Weiterleitung von `localhost:4200` und `localhost:8080` beim lokalen QR-Test am Handy. |

### Ergänzende Quellenrecherche vom 26.09.2026

Die Einträge [SRC-029 bis SRC-035](../../../sources/sources.md#src-029--mdn-getusermedia) wurden auf Nutzerwunsch recherchiert und mit den betroffenen Codeabschnitten abgeglichen. Sie ergänzen die technische Erklärung nach der Implementierung. Bestehende Quellen zu SSR und Android bleiben erhalten.

| Quellen-ID | Verwendungszweck |
| --- | --- |
| [SRC-029](../../../sources/sources.md#src-029--mdn-getusermedia) | Kameraberechtigung und Verhalten eines noch offenen Starts erklären. |
| [SRC-030](../../../sources/sources.md#src-030--zxing-browser-v015) | Verwendete ZXing-API passend zur installierten Version 0.1.5 belegen. |
| [SRC-031](../../../sources/sources.md#src-031--mdn-websocket-api) | WebSocket-Rückmeldung im Employee-Frontend einordnen. |
| [SRC-032](../../../sources/sources.md#src-032--rfc-7519-json-web-token) | JWT-Begriffe und die Grenze zwischen Ablaufzeit und Einmaligkeit erläutern. |
| [SRC-033](../../../sources/sources.md#src-033--angular-security) | Die bewusste Vertrauensentscheidung bei der SVG-Anzeige dokumentieren. |
| [SRC-034](../../../sources/sources.md#src-034--angular-making-requests) | HTTP-Verträge und Grenzen der TypeScript-Antworttypen erklären. |
| [SRC-035](../../../sources/sources.md#src-035--mdn-mediastreamtrack-stop) | Hintergrund zum Stoppen von Kameraressourcen ergänzen. |

Ergebnis: Quellenverzeichnis, Design und Diplomarbeitsnotizen wurden ergänzt. Dabei wurden keine neuen Backend-, Kamera- oder End-to-End-Tests ausgeführt und keine neue fachliche Freigabe festgestellt. Die alten Testergebnisse behalten ihren ursprünglichen Geltungsbereich.

## KI-Unterstützung

| KI-ID | Gesprächsdatei | Unterstützung | Prüfung und Verwendung |
| ----- | --------------- | -------------- | ---------------------- |
| noch einzutragen | noch nicht abgelegt | Unterstützung beim Prüfen des Repository-Stands und beim Anlegen des Change-Plans | Erik prüft und verwendet den Plan vor der Umsetzung |
| AI-002 | [Gesprächsnotiz vom 26.09.2026](../../../ai/conversations/2026-09-26-AI-002-qr-sources.md) | Recherche von sieben technischen Quellen und Formulierung von QR-bezogenen Dokumentationsabschnitten | Quellen und Code durch Codex abgeglichen; persönliche Endprüfung und Übernahme in die Diplomarbeit durch Erik stehen aus. |

## Abschlusscheckliste

- [ ] Tatsächlicher Umfang ist vollständig dokumentiert.
- [ ] Akzeptanzkriterien haben einen ehrlichen Prüfstatus.
- [ ] Ausgeführte und nicht ausgeführte Tests sind getrennt.
- [ ] Abweichungen und Einschränkungen sind sichtbar.
- [ ] Eigene und gemeinsame Leistungen sind getrennt.
- [ ] Quellen und KI-IDs sind vollständig eingetragen.
- [ ] Git- und Review-Nachweise sind eingetragen oder als nicht vorhanden markiert.
- [ ] Der Status entspricht dem tatsächlichen Stand.
