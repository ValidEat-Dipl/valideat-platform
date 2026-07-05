# Design: Repository und Dokumentation initial aufbauen

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-001` |
| Status | `implemented` |
| Verantwortlich | Erik Bergmair |

## Lösung

Das Repository wurde in klar getrennte Bereiche gegliedert:

- `apps/` für spätere Webanwendung und API,
- `docs/` für gemeinsame und persönliche Dokumentation,
- `infrastructure/` für spätere Betriebs- und Deploymentdateien,
- `scripts/` für spätere Hilfsskripte.

Vorbereitete Arbeitsbereiche erhielten kurze README-Dateien. Frameworks und ausführbare Konfigurationen wurden bewusst nicht initialisiert.

Eriks persönliche Methode liegt unter `docs/members/erik/`. Größere Arbeiten werden mit Proposal, Design, Aufgaben und Evidence geplant. Diese Methode verändert weder die Verantwortungsaufteilung noch die Arbeitsweise anderer Teammitglieder.

## Vorgehen

1. Tatsächlichen Git- und Dateistand lesen.
2. Strukturvorschlag erstellen und mit Erik abstimmen.
3. Nur freigegebene Ordner und Erklärungstexte anlegen.
4. Eriks Methode und Vorlagen ausarbeiten.
5. Struktur, Inhalte und Links technisch prüfen.
6. Änderungen nicht durch Codex committen.

## Risiken und Behandlung

| Risiko | Behandlung |
|---|---|
| Platzhalter werden als fertige Dokumentation verstanden. | Dateien erklären ihren vorläufigen Zweck. |
| Persönliche Methode wird als Teamprozess verstanden. | Geltungsbereich ausdrücklich auf Erik beschränkt. |
| Produktarchitektur wird zu früh festgelegt. | Keine Frameworks oder ausführbaren Konfigurationen initialisiert. |
| Unbekannte Arbeit oder Freigaben werden erfunden. | Nur Git-Angaben und konkrete Vorgaben dokumentiert. |

## Prüfstrategie

- Git-Status vor und nach Änderungen prüfen.
- Leere Markdown-Dateien und Formatfehler suchen.
- Relative Links in Eriks Methodenbereich prüfen.
- Kontrollieren, dass kein Produktcode entstanden ist.
