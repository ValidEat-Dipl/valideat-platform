# Proposal: SaaS-Frontend mit neuen Backendrouten verbinden

> Historischer Stand vor Backendcommit f05fd08. Aktuelle Bewertung und noch notwendige Arbeiten: [VAL-010 Status](../VAL-010-adapt-saas-backend-fixes/status.md). Die folgenden alten Fehlerlisten sind nicht mehr die aktuelle Übergabe.

## Metadaten

- Change-ID: `VAL-009`
- Status: `in_progress`
- Verantwortlich: Erik Bergmair
- Erstellt am: `2026-09-27`

## Auftrag

Neue SaaS-Routen und DTOs vollständig prüfen und im bestehenden Frontend verwenden. Einfache Komponenten, direkte subscribe-Aufrufe und ausdrückliche Nullprüfungen; keine Optional Chains oder Non-Null-Assertions im SaaS-TypeScript. Bestehende uncommittete Änderungen erhalten. Kein Commit, Push oder PR.

## Umfang

Unzugewiesene Employees laden und einem ausdrücklich gewählten Tenant zuweisen; Organisation bearbeiten; Module, Regeln und Branding laden/speichern; Brandingentwurf veröffentlichen und gespeicherte Vorschau anzeigen. Aktualisierter Auftrag: ausschließlich Frontend und Dokumentation ändern. Eigene Backendkorrekturen werden vollständig zurückgenommen. Bestehende Serverfehler werden als Übergabe dokumentiert; keine erfundenen APIs oder unsicheren Ersatzabläufe.

SaaS bleibt spätere Plattform-Erweiterung, nicht automatisch Porsche-Pflichtumfang. Keine fachliche Freigabe wird behauptet. Restaurantmodi, Runtime-Konfiguration anderer Appbereiche, Setup-Aktivierung und Logo-Upload sind gesondert auf vorhandene Verträge zu prüfen.

## Dashboard vereinfachen (Folgeauftrag)

Auf Nutzerwunsch den Bereich „Nächste Schritte“ und den gelben Hinweis zu Setup-Fortschritt/Aktivierungsstatus aus dem Dashboard entfernen. Keine entsprechende Funktion für diesen Bereich vorsehen. Plattform-Karte und übrige Dashboardfunktionen erhalten. Nur Frontend und Dokumentation ändern.
