# Proposal: Fragerunde und Functional Specification erstellen

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-002` |
| Status | `draft` |
| Verantwortlich | Erik Bergmair |
| Erstellt am | 2026-07-05 |
| FSD-Referenz | `docs/FSD.md` |
| GitHub Issue | nicht vorhanden |

## Herkunft und Sicherheit

- Art: persönliche Vorbereitung einer gemeinsamen fachlichen Spezifikation
- Grundlage: [vollständiger Ausgangsprompt AI-001](../../../ai/conversations/2026-07-05-AI-001-repository-setup-prompt.md)
- Fachliche Prüfung: noch nicht erfolgt
- Teamfreigabe: noch nicht erfolgt
- Porsche-Freigabe: noch nicht erfolgt

## Ausgangslage

`docs/FSD.md` enthält bisher nur einen Platzhalter. Der Ausgangsprompt beschreibt Projektkontext, Verantwortungsbereiche, einen noch zu bestätigenden Porsche-IST-Prozess, einen geplanten Zielprozess, die Trennung zwischen Porsche-Version und späterer SaaS-Plattform sowie viele ausdrücklich offene Detailfragen.

Diese Angaben reichen nicht aus, um ohne Rückfragen verbindliche Anforderungen zu formulieren. Regeln zu Rollen, Daten, Markerlstufen, Fristen, Korrekturen, Clearing, Konflikten, Export, Freigabe, Datenschutz, Betrieb und Abnahme sind noch offen.

## Ziel

Aus dem gesamten bekannten Kontext wird zuerst eine umfassende und logisch gruppierte Fragerunde erstellt. Erik beantwortet die Fragen zunächst. Julian und Joschua prüfen danach die Antworten aus Sicht ihrer Verantwortungsbereiche. Widersprüche, Annahmen und ausstehende Porsche- oder Schulentscheidungen bleiben sichtbar.

Erst danach wird `docs/FSD.md` mit eindeutigen Anforderungs-IDs, Akzeptanzkriterien und klarer Abgrenzung zwischen Porsche-Pflichtumfang, Teamentscheidungen, persönlichen Vorschlägen und SaaS-Ideen ausgearbeitet.

## Umfang

- Ausgangsprompt vollständig als fachliche Ausgangsbasis verwenden.
- Fragen zu IST-Prozess, Zielprozess, Rollen, Daten und Regeln erstellen.
- Mitarbeiter-, HR-/Admin-, Clearing-, Export- und Freigabebereich abdecken.
- Sicherheit, Datenschutz, Auditierung, Authentifizierung und Schnittstellen abfragen.
- Hosting, Offline-Verhalten, Fehlerfälle und nichtfunktionale Anforderungen abfragen.
- Porsche-Version von SaaS, Branding, Modulen, Restaurant und Scanner trennen.
- Usability, Barrierefreiheit, Performance, Sicherheit und Abnahme abfragen.
- Jede Frage nach Dringlichkeit und zuständiger Entscheidungsstelle kennzeichnen.
- Antworten dokumentieren und durch Julian und Joschua prüfen lassen.
- Aus geprüften Antworten die FSD erstellen; offene Punkte offen lassen.

## Nicht-Umfang

- Produktcode oder technische Initialisierung
- erfundene Porsche-Anforderungen
- Gleichsetzung von Eriks Antworten mit Team- oder Porsche-Freigaben
- direkte GitHub-Änderungen
- Festlegung optionaler SaaS-Ideen als Porsche-Pflichtumfang

## Akzeptanzkriterien

- [ ] Die Fragerunde deckt alle Themen des Ausgangsprompts ab.
- [ ] Fragen sind logisch gruppiert und konkret auf ValidEat bezogen.
- [ ] Jede Frage ist nach Zeitpunkt und Entscheidungsstelle gekennzeichnet.
- [ ] Fakten, Annahmen, Vorschläge und offene Entscheidungen sind getrennt.
- [ ] Erik hat seine Antworten eingetragen, ohne externe Freigabe zu behaupten.
- [ ] Julian und Joschua konnten die Antworten prüfen; fehlende Reviews bleiben sichtbar.
- [ ] Widersprüche und ungeklärte Punkte sind dokumentiert.
- [ ] Die FSD verwendet konsistente IDs und überprüfbare Akzeptanzkriterien.
- [ ] Porsche-Pflichtumfang und SaaS-Ideen sind klar getrennt.

## Offene Fragen

- In welchem Format geben Julian und Joschua ihr Review ab?
- Welche Fragen kann nur Porsche verbindlich beantworten?
- Wer gibt den FSD-Entwurf als gemeinsame Teamgrundlage frei?
- Welche Schulvorgaben wirken sich auf Quellen und FSD aus?
