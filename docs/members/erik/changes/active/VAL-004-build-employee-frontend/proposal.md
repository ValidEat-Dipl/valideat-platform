# Proposal: Mitarbeiterfrontend für Porsche-Version vorbereiten

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-004` |
| Status | `draft` |
| Verantwortlich | Erik Bergmair |
| Erstellt am | 2026-07-09 |
| Zuletzt geändert | 2026-07-09 |
| FSD-Referenz | `docs/FSD.md`, derzeit noch nicht ausgearbeitet |
| GitHub Issue | nicht vorhanden |

## Herkunft und Sicherheit

- Art: persönlicher Vorschlag / Umsetzungsvorbereitung für Eriks Verantwortungsbereich
- Grundlage: Eriks Verantwortungsbereich laut Antrag, aktueller Figma-Prototyp aus `VAL-003`, vorhandene Repository-Struktur und bisher bekannte Porsche-Zielidee
- Bestätigt durch: nicht als Porsche-Anforderung bestätigt

## Ausgangslage

Der Figma-Prototyp für ValidEat ist als persönlicher Designnachweis abgeschlossen. Für die Porsche-Version soll Erik als nächsten technischen Schwerpunkt das Mitarbeiterfrontend umsetzen. Die HR-/Admin-Oberfläche wird nicht als Eriks Hauptteil behandelt, weil daran eine andere Person arbeitet.

Im Repository existiert bereits eine Angular-Struktur unter `apps/web/web`. Der aktuelle Change initialisiert kein neues Angular-Projekt, sondern plant die erste gezielte Umsetzung des Mitarbeiterbereichs auf Basis des bestehenden Stands.

Die gemeinsame FSD ist noch nicht fertig ausgearbeitet. Deshalb dürfen offene fachliche Regeln nicht als bestätigte Porsche-Anforderungen umgesetzt werden. Wo Details fehlen, wird entweder mit klar markierten Annahmen, Platzhaltern oder Mockdaten gearbeitet.

## Ziel

Ziel ist eine erste lauffähige und nachvollziehbar dokumentierte Umsetzung des mobilen Mitarbeiterfrontends für die Porsche-Version. Die Umsetzung soll die zentralen Screens aus dem Figma-Prototyp in Angular vorbereiten beziehungsweise umsetzen und dabei fachliche Annahmen sichtbar halten.

Der Fokus liegt auf dem Mitarbeiterbereich:

- Einstieg beziehungsweise Welcome-Screen,
- Login/Register als vorläufige UI oder Weiterleitung, abhängig vom Auth-Stand,
- Startseite,
- Verwendung erstellen,
- Angaben prüfen,
- Bestätigung nach erfolgreicher Erfassung,
- letzte Erfassungen,
- Erfassungsdetail.

## Umfang

- tatsächlichen Angular-Stand im Repository prüfen,
- vorhandene Angular-Struktur verstehen und nicht unnötig neu aufsetzen,
- Mitarbeiterbereich als eigenen Frontend-Bereich planen,
- Figma-Screens aus `VAL-003` als Grundlage verwenden,
- mobile-first Layout mit Bootstrap 5.3 und SCSS berücksichtigen,
- Routing beziehungsweise Navigation für den Mitarbeiterflow vorbereiten,
- UI-Komponenten für die wichtigsten Mitarbeiteransichten erstellen oder einordnen,
- vorläufige Datenmodelle für Mitarbeitererfassung und Erfassungshistorie definieren,
- Mockdaten verwenden, solange API und Geschäftsregeln nicht stabil sind,
- offene FSD-Fragen direkt im Change sichtbar halten,
- Tests und manuelle Prüfungen passend zum tatsächlichen Umfang dokumentieren.

## Nicht-Umfang

- HR-/Admin-Oberfläche,
- Clearing-Algorithmus,
- Konfliktbearbeitung im Adminbereich,
- Exportfunktion,
- echte Porsche-Freigabe fachlicher Regeln,
- vollständige Authentifizierung mit Keycloak, falls diese noch nicht teamweit geklärt ist,
- produktive API-Integration ohne abgestimmte Schnittstelle,
- vollständige Offline-Synchronisation,
- Kamera-, Scanner- oder Restaurantfunktion,
- endgültiges Porsche-Branding,
- SaaS-Mandantenverwaltung.

## Akzeptanzkriterien

- [ ] Der tatsächliche Angular-Ausgangsstand wurde geprüft und in `evidence.md` dokumentiert.
- [ ] Der Mitarbeiterbereich ist klar von HR-/Admin-Funktionen abgegrenzt.
- [ ] Die umzusetzenden Figma-Screens sind im Design referenziert.
- [ ] Offene fachliche Regeln sind als Annahmen oder offene Fragen dokumentiert.
- [ ] Die Hauptnavigation des Mitarbeiterflows ist geplant oder umgesetzt.
- [ ] Die Erfassung einer Markerlverwendung ist als UI-Flow umgesetzt oder als nächster konkreter Umsetzungsschritt vorbereitet.
- [ ] Vorläufige Daten und Mockdaten sind klar als nicht produktiv gekennzeichnet.
- [ ] Bootstrap 5.3 und SCSS werden konsistent zur bisherigen Designentscheidung verwendet.
- [ ] Nicht umgesetzte API-, Auth-, Offline- oder Porsche-Details werden nicht als erledigt dargestellt.
- [ ] Ausgeführte Prüfungen sind mit tatsächlichem Ergebnis in `evidence.md` dokumentiert.

## Offene Fragen

| Frage | Entscheidet durch | Zwingend vor Umsetzung? | Status |
|---|---|---|---|
| Welche Daten muss eine Mitarbeitererfassung in der Porsche-Version exakt enthalten? | Porsche / Team | Ja, vor produktiver Umsetzung | offen |
| Welche Markerlstufen gibt es und wie werden sie benannt? | Porsche | Ja, vor produktiver Umsetzung | offen |
| Sind Nachträge oder Korrekturen durch Mitarbeitende erlaubt? | Porsche / Team | Ja, vor finalem Flow | offen |
| Wie sieht der echte Login aus und wann wird Keycloak integriert? | Team, vor allem Backend/Auth | Nein für UI-Prototyp, ja für echte Integration | offen |
| Welche API-Endpunkte liefert das Backend für Mitarbeitererfassungen? | Julian / Team | Nein für Mock-UI, ja für Integration | offen |
| Welche Zustände kann eine Mitarbeitererfassung haben? | Porsche / Team | Ja, vor finaler Umsetzung | offen |
| Welche Offline-Funktionalität ist für den Porsche-Startumfang wirklich nötig? | Porsche / Team | Nein für erste UI, ja vor PWA-Umsetzung | offen |
| Welche Geräte und Browser sollen vorrangig unterstützt werden? | Porsche / Team | Nein für ersten Stand, ja für finale Prüfung | offen |

## Annahmen

- Der Mitarbeiterbereich wird zuerst mobil gedacht, weil die Erfassung schnell und direkt im Alltag erfolgen soll.
- Login/Register können zunächst als UI oder Platzhalter umgesetzt werden, solange Authentifizierung und Keycloak noch nicht vollständig geklärt sind.
- Mockdaten sind erlaubt, solange sie klar als Entwicklungsdaten gekennzeichnet sind und keine echten personenbezogenen Daten enthalten.
- Die HR-/Admin-Oberfläche wird nicht in diesem Change umgesetzt.
- Die Umsetzung darf FSD-Fragen sichtbar machen, aber nicht stillschweigend beantworten.

## Auswirkungen

- Benutzeroberfläche: erster technischer Aufbau des mobilen Mitarbeiterbereichs.
- API und Backend: zunächst keine verbindliche API-Festlegung; spätere Integration muss mit Backend abgestimmt werden.
- Daten und Datenschutz: keine echten personenbezogenen Testdaten verwenden; mögliche lokale Speicherung gesondert prüfen.
- Offline-Verhalten: vorerst nur planen oder klar abgrenzen, nicht als vollständige PWA-Synchronisation behaupten.
- Dokumentation: Change, Evidence und ggf. Thesis Writing Notes aktualisieren.
- Andere Teammitglieder: Abstimmung mit HR/Admin- und Backend-Arbeit nötig, damit Rollen, API und Datenmodell nicht auseinanderlaufen.

## Abstimmungen und Freigabestatus

| Gegenstand | Zuständige Stelle | Status | Nachweis |
|---|---|---|---|
| Mitarbeiterfrontend als Eriks nächster Schwerpunkt | Erik / Team | offen | aktuelle Planung im Change |
| Fachliche Mitarbeiterdaten und Markerlregeln | Porsche / Team | offen | nicht vorhanden |
| Authentifizierung und Keycloak-Anbindung | Team | offen | nicht vorhanden |
| API für Mitarbeitererfassungen | Backend / Team | offen | nicht vorhanden |
| Abgleich mit Figma-Prototyp | Erik | offen | [VAL-003](../../completed/2026-07-09-VAL-003-design-figma-prototype/proposal.md) |

Eine persönliche Freigabe durch Erik ist keine automatische Team-, Porsche- oder Schulfreigabe.
