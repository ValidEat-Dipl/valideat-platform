# Evidence

## Ausgangslage

2026-09-27. Geprüfter Backendcommit: f05fd08 (#26 Saas Routen fix und Schutz durch Role). Quellen ausschließlich Repository-Code und Nutzerauftrag. Bereits vorhandene lokale Änderungen an Dashboard, Modulen, Organisation, Setup und Nutzerzuweisung sowie sonstigen Dokumenten erhalten. Backend zu Beginn ohne lokalen Diff.

## Prüfungen

- `npm run build` in apps/web/web erfolgreich, Initial-Bundle 826,45 kB bei 500-kB-Warnbudget. Keine Templatefehler. Node 23 meldet den Hinweis auf eine ungerade, nicht für Produktion empfohlene Version.
- `./mvnw -DskipTests package` in apps/api/backend erfolgreich. Keine Maven-Tests, keine Serverquellen verändert.
- 64 API-Requests/Prüfbedingungen gegen isoliertes Backend auf 8081 und eigene Datenbank valideat_saas_val010. Exaktes Protokoll: [api-checks.md](api-checks.md). Erfolgreiche Tenantanlage, Modul-/Regel-/Brandingspeicherung und Publish. Auch Alt-Tenant ohne Konfigurationszeilen, erste Regelnanlage, 401/403-Rollenschutz und 404/409-Zuweisung geprüft.
- Bewusst reproduzierte Restfehler: öffentliche Registrierungen Employee UND RestaurantUser speichern SAAS_ADMIN, tenantloser Employee-Login 500, Branding-Publish ohne Datensatz 500, leere Modulliste für unbekannten Tenant 200. Die 64 Prüfbedingungen sind deshalb keine Behauptung von 64 erfolgreichen Fach-/Sicherheitstests.
- Browserprüfung mit dem tatsächlichen Produktionsbundle und lokalem /api-Proxy auf das isolierte Backend: Login mit zugewiesenem SaaS-Admin; Organisation ohne Regeln auswählen; alle Tage leer statt Templateabsturz bei null; Montag/Samstag auswählen, erstmals speichern, neu laden und erhaltene Auswahl prüfen; Tenantwechsel; Brandingentwurf ändern, speichern und Vorschau öffnen; veröffentlichen und geladenen veröffentlichten Stand prüfen; Logout; tenantlosen Login versuchen und passende Fehlermeldung sehen. Regelformular zusätzlich visuell per Screenshot geprüft; keine dauerhafte Screenshotdatei gespeichert.
- AST-Prüfung über 20 SaaS-TypeScriptdateien ohne Optional Chains und Non-Null-Assertions. `git diff --check` erfolgreich.
- `git diff HEAD -- apps/api/backend` leer. Bestehende lokale Änderungen außerhalb dieses Folgeauftrags erhalten. Testbackend und Preview beendet, eigener Browser-Tab geschlossen und eigene Testdatenbank gelöscht. Keine Schreibtests an der Datenbank des laufenden Benutzerbackends.

Keine entfernten SaaS-Specs neu eingeführt, kein Unit-Testlauf, keine vollständige Ticket-/QR-End-to-End-Prüfung, kein Parallelitätstest für Zuweisungen, keine bestehende Produktionsdatenbank migriert. Keine Freigabe, kein Commit/Push/PR.


## Geänderte Dateien dieses Folgeauftrags

Unter apps/web/web/src/app/features/saas:

- models/saas-settings.model.ts: nullable usageDays im tatsächlichen Antwortvertrag.
- pages/organization-page/organization-page.ts: null in leere Formularliste umwandeln; aktuellen GET-Fehlervertrag berücksichtigen.
- pages/branding-page/branding-page.ts und .html: Serverstandard-Namen bis 150 Zeichen; veraltete 500-Erklärung entfernen, 401/403 unterscheiden.
- pages/branding-preview-page/branding-preview-page.ts: aktualisierte Ladefehler.
- pages/login-page/login-page.ts: Zugangsfehler und weiterhin offenen Serverfehler ohne Tenant unterscheiden.
- pages/user-assignment-page/user-assignment-page.ts: 409 als Zuordnungskonflikt; 400 nicht mehr falsch als bereits zugewiesen deuten; Berechtigungsfehler melden.
- services/saas-state.service.ts: 401/403 bei Tenantliste verständlich anzeigen.

Dokumentation: VAL-010 proposal.md, design.md, tasks.md, evidence.md, api-checks.md und zentrale status.md neu. Die sieben Dokumente von VAL-009 mit einem Hinweis auf den neueren Stand versehen; historische Ergebnisse bleiben erhalten. Frühere uncommittete Dashboard-/Modul-/Setup-/Organisation-/Zuweisungsänderungen wurden nicht als neue Arbeit dieses Folgeauftrags ausgegeben.

## Ergebnis und Grenzen

Aktuelle weitergebbare Übersicht: [status.md](status.md). Punkte 1 und 2 für neue/erstmalige Einrichtung erfolgreich, Punkt 3 offen, Punkte 4 und 5 nur teilweise erledigt. Bestehende Funktionslücken (Restaurantvarianten, Durchsetzung von Konfiguration, Runtime-Branding, globale RestaurantUser-Zuordnung) bleiben getrennt aufgeführt. Keine Serverkorrektur vorweggenommen.
