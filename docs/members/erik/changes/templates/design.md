# Design: [Change-Titel]

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `[VAL-000]` |
| Status | `draft` |
| Verantwortlich | Erik Bergmair |
| Proposal | `[relativer Link zu proposal.md]` |
| Zuletzt geändert | `[YYYY-MM-DD]` |

## Technische Lösung

[Wie soll die Änderung umgesetzt werden und warum passt diese Lösung?]

## Betroffene Komponenten

| Komponente | Geplante Änderung | Verantwortungsbereich |
|---|---|---|
| [Komponente] | [Änderung] | [Erik / Julian / Joschua / gemeinsam] |

## Datenfluss

1. [Auslöser]
2. [Verarbeitung]
3. [Ergebnis]

## Benutzerablauf

1. [Schritt aus Sicht der nutzenden Person]
2. [Reaktion des Systems]
3. [Erwartetes Ergebnis]

## API-Nutzung und Daten

- Endpunkte: `[Endpunkt oder nicht betroffen]`
- Eingabedaten: `[Daten oder nicht betroffen]`
- Ausgabedaten: `[Daten oder nicht betroffen]`
- Validierung: `[Regeln oder noch offen]`
- Abhängigkeit vom Backend: `[Beschreibung oder keine]`

Noch nicht abgestimmte Schnittstellen werden als Vorschlag oder Annahme gekennzeichnet.

## Zustände

| Zustand | Anzeige oder Verhalten | Übergang |
|---|---|---|
| Laden | [Verhalten] | [Auslöser] |
| Erfolgreich | [Verhalten] | [Auslöser] |
| Leer | [Verhalten] | [Auslöser] |
| Fehler | [Verhalten] | [Auslöser] |
| Offline | [Verhalten oder nicht betroffen] | [Auslöser] |

## Fehlerbehandlung

| Fehlerfall | Reaktion des Systems | Information für die nutzende Person |
|---|---|---|
| [Fehlerfall] | [Technisches Verhalten] | [Verständliche Rückmeldung] |

## Sicherheit und Datenschutz

- Authentifizierung und Berechtigung: [Auswirkung oder nicht betroffen]
- Personenbezogene Daten: [betroffene Daten oder keine]
- Lokale Speicherung: [Daten, Schutz und Löschung oder keine]
- Protokollierung: [was protokolliert wird und was nicht]
- Besondere Risiken: [Risiko oder keine festgestellt]

## Offline-Verhalten

[Verhalten ohne Verbindung, Synchronisation und Konfliktbehandlung oder begründet nicht betroffen.]

## Alternativen

### Alternative 1: [Name]

- Vorteile: [Vorteile]
- Nachteile: [Nachteile]
- Entscheidung: [gewählt / verworfen / offen]
- Grund: [Begründung]

## Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|---|---|---|---|
| [Risiko] | [niedrig/mittel/hoch oder unbekannt] | [Auswirkung] | [Maßnahme] |

## Teststrategie

| Ebene | Geplante Prüfung | Erwartetes Ergebnis |
|---|---|---|
| Statisch | [Lint, Typecheck oder nicht betroffen] | [Ergebnis] |
| Automatisiert | [Unit-, Integrations- oder E2E-Test] | [Ergebnis] |
| Manuell | [Benutzerablauf oder Gerät] | [Ergebnis] |
| Usability | [Methode oder nicht vorgesehen] | [Ergebnis] |
| Barrierefreiheit | [Prüfung oder nicht vorgesehen] | [Ergebnis] |

Geplante Tests werden erst nach ihrer tatsächlichen Ausführung im Nachweis als bestanden oder fehlgeschlagen eingetragen.
