# Evidence: SaaS-Backendanbindung

> Historischer Stand vor Backendcommit f05fd08. Aktuelle Bewertung und noch notwendige Arbeiten: [VAL-010 Status](../VAL-010-adapt-saas-backend-fixes/status.md). Die folgenden alten Fehlerlisten sind nicht mehr die aktuelle Übergabe.

## Quellen und Ausgangslage

2026-09-27. Quellen: aktueller Repository-Code, insbesondere SaasAdminResource, SaaSAdminRepository, DTOs, Entities, import.sql sowie SaaS-/Employee-/Restaurant-Code. Nutzer bestätigte vorherigen Frontendcommit und neue Backendarbeit einer anderen Person. Keine externen Quellen oder Freigaben.

Change vor Implementierung angelegt. Auf nachfolgenden ausdrücklichen Wunsch darf nichts am Server geändert werden. Deshalb eigene zwischenzeitliche Backendkorrekturen vollständig zurückgenommen; Proposal/Design/Tasks aktualisiert. Vorbestehende Änderungen an allgemeinen Dokumenten und der Max-Rolle in import.sql erhalten. SaaS-Spec und separate Testkonfiguration bleiben auf Nutzerwunsch entfernt.

## Aktuelles Ergebnis

Vorhandene Verwaltungs-APIs im Frontend angebunden. Formulare und DTOs stimmen überein; bestehende Konfigurationen werden geladen und gespeichert. Lokale Draft-Modelle entfernt. Keine geschützten Leseaufrufe im SSR-Kontext, gemeinsamer Interceptor und API_BASE verwendet. Keine Optional Chains/Non-Null-Assertions im SaaS-TypeScript.

Fehlerhafte GETs bei Regeln/Branding sperren das Speichern. Insbesondere wird 500 nicht durch automatischen PUT umgangen und 404 beim Branding nicht als neuer Entwurf behandelt. Neue Organisationen können angelegt werden, Regeln/Branding bleiben bis zur serverseitigen Initialisierung im UI blockiert. Keine Behauptung einer vollständigen Plattformfunktion oder Produktionsfreigabe.

Backend-Diff nach Rücknahme: nur die bereits vorher vorhandene Änderung Max ADMIN → SAAS_ADMIN in import.sql. Keine eigene Änderung an Serverquellen verbleibt.

## Tatsächlich erneut ausgeführte Prüfungen

- `npm run build` in apps/web/web erfolgreich. Initial-Bundle 826,38 kB bei 500-kB-Warnbudget; Hinweis auf Node 23 als ungerade Version. Keine Templatefehler.
- `./mvnw -DskipTests package` in apps/api/backend erfolgreich, gegen zurückgesetzte Quellen. Kein Maven-Testlauf.
- 45 API-Requests/Prüfbedingungen in eigener Datenbank valideat_saas_val009_original und separatem Backend auf Port 8081: [Protokoll](api-checks.md). Erfolgreiche Speicher-/Ladevergleiche für Organisation, Module einschließlich leerer Auswahl, bestehende Regeln, Brandingentwurf/Publish und Employee-Zuweisung.
- Ebenfalls tatsächlich reproduziert: öffentliche und Employee-Lesezugriffe auf SaaS-Tenantliste liefern 200; öffentliche Registrierung akzeptiert SAAS_ADMIN; Login dieses Accounts ohne Tenant liefert 500; neue Regeln/Branding liefern bei GET 500; erster Regeln-PUT kollidiert mit Seed-ID; unbekannter Employee bei Zuweisung liefert 500. Serverlogs bestätigen NullPointerException, NoResultException und tenant_rules_pkey-Konflikt. Dies sind Fehlerbefunde, keine bestandenen Sicherheitstests.
- TypeScript-AST-Prüfung über 20 SaaS-Dateien: keine Optional Chains oder Non-Null-Assertions. `git diff --check` erfolgreich.
- Testbackend beendet, eigene Testdatenbank gelöscht. Laufendes Benutzerbackend nicht für Schreibtests benutzt. Keine neue Browserprüfung nach Rücknahme, keine Unit-Tests und keine SaaS-Specs hinzugefügt.

## Historische Prüfungen vor dem geänderten Auftrag

Vor Rücknahme wurden Angular-/Maven-Build, 67 API-Requests/Prüfbedingungen, Browserabläufe und Node-Auslieferung mit zwischenzeitlich korrigiertem Server durchgeführt. Diese Ergebnisse gelten NICHT als Nachweis für den jetzt wieder unveränderten Server, insbesondere nicht für Rollenprüfung, neue Konfigurationen oder Login ohne Tenant. Historisches Protokoll bleibt gekennzeichnet in [api-checks.md](api-checks.md), Details im [Bericht](report.md). Damalige temporäre Datenbank/Server entfernt; keine dauerhafte Screenshotdatei gespeichert.

## Offene Punkte

Serverperson muss notwendige Korrekturen selbst durchführen. Direkt weitergebbare Liste mit Routen, Befunden, Vorschlägen und Datenmodellgrenzen: [backend-handoff.md](backend-handoff.md). Restaurantmodi, Durchsetzung von Modulen/Regeln im Fachcode, Runtime-Branding, Logo-Upload und Setup-Aktivierung fehlen weiterhin. Keine vollständige Ticket-/QR-End-to-End-Prüfung, keine fachliche Abnahme. SaaS ist spätere Plattform-Erweiterung, nicht automatisch Porsche-Pflichtumfang. Kein Commit, Push oder PR.

## Folgeauftrag: Dashboard vereinfachen

Am 2026-09-27 auf Nutzerwunsch den gesamten Bereich „Nächste Schritte“ und den gelben Hinweis zu Setup-Fortschritt/Aktivierungsstatus aus dashboard-page.html entfernt. Plattform-Karte bleibt erhalten und rückt im Raster nach links. Ungenutzte .list-group-item- und .alert-Styles aus dashboard-page.scss entfernt. Keine TS- oder Serveränderung für diesen Folgeauftrag.

Prüfungen: `npm run build` in apps/web/web erfolgreich; Bundlewarnung 826,45 kB bei 500-kB-Warnbudget. `git diff --check` erfolgreich. Keine Unit-Tests oder Browserprüfung ausgeführt. Kein Commit/Push/PR.
