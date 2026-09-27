# Aufgaben: SaaS-Admin-Frontend

## Metadaten

- Change-ID: `VAL-008`
- Status: `in_progress`
- Verantwortlich: Erik Bergmair
- Zuletzt geändert: `2026-09-27`

## Vorbereitung

- [x] VAL-007 und bestehenden Employee-, Restaurant-, Admin- und Auth-Code lesen.
- [x] Screenshots und tatsächliche Backendverträge prüfen.
- [x] Change vor dem Programmieren anlegen.

## Implementierung und Prüfung

- [x] SaaS-Routing, Auth und Layout umsetzen.
- [x] Login und Organisationsregistrierung umsetzen.
- [x] Setup, Dashboard und Kundenübersicht umsetzen.
- [x] Module, Organisation/Regeln, Branding und Vorschau umsetzen.
- [x] Nutzerzuweisungsseite mit ehrlicher Backendgrenze umsetzen.
- [x] Build und gezielte Tests ausführen, Ergebnisse dokumentieren.
- [x] Abschlussreview und Evidence aktualisieren.

## Offen / Backend

- [ ] Liste unzugewiesener Nutzer bereitstellen (Backend-Team).
- [ ] Expliziten Ziel-Tenant bei Zuweisung unterstützen (Backend-Team).
- [ ] Update-/Publish-Routen für Organisation, Regeln, Module und Branding klären.
- [ ] Live-Test mit echtem SaaS-Konto und Backend durchführen.
- [ ] Fachliche Abstimmung der späteren Plattform-Erweiterung.

## Abschlussstand

Frontend-Umfang umgesetzt, Integrationslücken bleiben offen. Historischer Prüfstand nach der Nacharbeit: 13 gezielte Tests erfolgreich, Produktionsbuild erfolgreich mit Initial-Bundle-Warnung (826,20 kB). Der normale Testaufruf wurde durch einen bestehenden Admin-Testfehler blockiert; die SaaS-Tests hatten deshalb eine separate tsconfig. SaaS-Tests und separate Testkonfiguration wurden am 2026-09-27 auf ausdrücklichen Nutzerwunsch entfernt. Keine Live-Zuweisung möglich, keine Backendänderung in dieser Umsetzung vorgenommen.

## Nacharbeit: Schreibweise an Employee und Restaurant anpassen

Nutzerauftrag nach dem ersten Stand: vorhandenen Code exakt vergleichen und dessen Struktur übernehmen. Keine neue Backendfunktion oder Freigabe daraus ableiten.

- [x] Login/Registrierung, Datenlisten, Services, Formulare, Templates, SCSS und Restaurant-Sidebar erneut im Detail lesen.
- [x] Seitenordner mit lokalen TS-/HTML-/SCSS-Dateien und separate SaaS-Sidebar verwenden.
- [x] Reaktive Formulare, normale Methoden, passende Zustandsnamen und direkte subscribe-Aufrufe übernehmen.
- [x] Gemeinsame Tenant-Auswahl ohne HTTP-Aufrufe in effect() erhalten.
- [x] Tests anpassen, Build/Tests erneut ausführen und neue Ergebnisse dokumentieren.

## Backend-Übergabe am 2026-09-27

- [x] Aktuelles Datenmodell, Beziehungen, DTOs und Routen erneut mit dem Frontendbedarf vergleichen.
- [x] Globale Namens-Primärschlüssel bei Tier/CostOrder sowie fehlende Konfigurationsmodelle dokumentieren.
- [x] Weiterleitbare [Backend-Übergabe](backend-handoff.md) mit vorhandenen, fehlenden und zusätzlich vorgeschlagenen Routen erstellen.
- [ ] API-Verträge und fachliche Entscheidungen mit Backend-Team abstimmen.

Keine Backendimplementierung und keine neuen Tests in dieser Dokumentationsaufgabe.

## HTML-Platzhalter entfernen am 2026-09-27

- [x] Statische Beispieldaten und Erfolgsanzeigen in der Branding-Vorschau entfernen; vorhandene Tenant-Zahlen verwenden.
- [x] Eingabeplatzhalter und funktionslose Karten für spätere Optionen entfernen.
- [x] Templates per Build prüfen und Ergebnis in Evidence dokumentieren.

Leere Zustände, Auswahlaufforderungen und Hinweise auf fehlende Backendfunktionen bleiben erhalten.

## Formatierung anpassen am 2026-09-27

- [x] SaaS-HTML und TypeScript mit mehr Leerzeilen und weniger einheitlichen Umbrüchen an den gewünschten Stil anpassen; Logik und Texte erhalten.
- [x] Änderungen auf reine Formatierung prüfen und Produktionsbuild ausführen.

## SaaS-Tests entfernen am 2026-09-27

- [x] Auf ausdrücklichen Nutzerwunsch nur `saas.spec.ts` und `tsconfig.saas.spec.json` löschen.
- [x] Gemeinsame Testkonfiguration und Tests anderer Bereiche erhalten; historische Testnachweise als solche dokumentieren.


## Anschlussstand VAL-009 am 2026-09-27

Die zuvor fehlenden Employee-Zuweisungs- und Konfigurationsrouten wurden inzwischen im Backend ergänzt und unter [VAL-009](../VAL-009-connect-saas-admin-backend/report.md) angebunden. Die oben stehenden Aussagen zu fehlenden Listen-/Speicherrouten beschreiben den damaligen Stand. Aktueller Stand, tatsächlich ausgeführte Live-Prüfungen und weiterhin fehlende Plattformfunktionen stehen dort. Keine SaaS-Spec-Datei wieder eingeführt, kein Commit/Push/PR.

Ergänzung: Auf späteren ausdrücklichen Nutzerwunsch wurden eigene Serverkorrekturen aus VAL-009 zurückgenommen. Aktuell wird der unveränderte Server verwendet; Grenzen bei Erstkonfiguration, Login ohne Tenant und Berechtigungen sind in der [Backend-Übergabe](../VAL-009-connect-saas-admin-backend/backend-handoff.md) dokumentiert. Frühere Prüfergebnisse mit korrigiertem Server sind dort als historisch gekennzeichnet.
