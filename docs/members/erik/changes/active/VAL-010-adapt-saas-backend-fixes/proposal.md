# Proposal: SaaS-Frontend an Backendkorrekturen anpassen

## Metadaten

- Change-ID: `VAL-010`
- Status: `in_progress`
- Verantwortlich: Erik Bergmair
- Erstellt am: `2026-09-27`

## Auftrag

Backendcommit `f05fd08` prüfen und das vorhandene SaaS-Frontend daran anpassen. Laut Nutzer bleibt Login ohne Tenant (Punkt 3) offen. Keine Serverdateien ändern, kein Commit/Push/PR. Bestehende lokale und gestagte Änderungen erhalten. Einfache direkte subscribe-Logik, ausdrückliche Nullprüfungen, keine Optional Chains oder Non-Null-Assertions im SaaS-TypeScript. Keine entfernten SaaS-Tests wieder einführen.

## Umfang

Regeln mit nullable usageDays sicher anzeigen/bearbeiten, neue Branding-Standardwerte übernehmen, veraltete Fehlerhinweise entfernen und neue 401/403-/404-/409-Antworten berücksichtigen. Die fünf gemeldeten Korrekturen anhand Code und soweit möglich isolierten API-Prüfungen bewerten. Eine aktuelle weitergebbare Liste trennt funktionierende Verwaltung, verbleibende Fehler und fehlende Plattformfunktionen. Keine erfundenen Freigaben oder Tests. SaaS bleibt eine spätere Plattform-Erweiterung, kein automatisch bestätigter Porsche-Pflichtumfang.
