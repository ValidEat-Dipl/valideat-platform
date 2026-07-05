# Design: Fragerunde und Functional Specification erstellen

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-002` |
| Status | `draft` |
| Verantwortlich | Erik Bergmair |

## Dokumentationslösung

Die FSD wird nicht direkt aus dem Ausgangsprompt geschrieben. Der Ablauf besteht aus vier getrennten Stufen:

1. Kontext aus dem vollständigen Ausgangsprompt erfassen.
2. Eine umfassende Fragerunde in `docs/requirements/fsd-questionnaire.md` erstellen.
3. Eriks Antworten und die Prüfung durch Julian und Joschua dokumentieren.
4. Erst danach bestätigte oder klar offene Inhalte in `docs/FSD.md` überführen.

## Gruppen der Fragerunde

1. Herkunft, Ziele und Abnahme
2. Porsche-IST-Prozess
3. Rollen und Verantwortlichkeiten
4. Mitarbeiterdaten, Markerlstufen und erlaubte Tage
5. Nachträge, Korrekturen und Abrechnungsperioden
6. HR-Erfassung
7. Clearing-Regeln und Konfliktlösung
8. Export, Bestätigung und Unterschrift
9. Benutzerverwaltung, Authentifizierung und Berechtigungen
10. Datenschutz, Aufbewahrung und Auditierung
11. Porsche-Schnittstellen
12. Hosting, Verfügbarkeit und Betrieb
13. Offline-Verhalten und Fehlerfälle
14. Porsche-Release und Auslieferung
15. SaaS-Mandantenfähigkeit, Branding und Module
16. Restaurant, Scanner und optionale Erweiterungen
17. Usability, Barrierefreiheit, Performance und Sicherheit
18. Forschungsfragen, besonders Blockchain
19. Team-, Porsche- und Schulentscheidungen

Jede Frage erhält eine Kennzeichnung für den Zeitpunkt (`vor Porsche-Implementierung zwingend`, `später klärbar`, `nur SaaS` oder `Forschungsfrage`) und die Entscheidungsstelle (`Porsche`, `Team` oder `Lehrkraft/Schule`). Mehrere beteiligte Stellen werden ausdrücklich genannt.

## Umgang mit Antworten

Eriks erste Antwort wird als solche gekennzeichnet. Das Teamreview erhält getrennte Angaben für Julian und Joschua. Eine Porsche-Antwort oder Freigabe wird nur mit echtem Nachweis eingetragen. Widersprüche werden sichtbar gehalten und der zuständigen Entscheidungsstelle zugeordnet.

## Überführung in die FSD

Anforderungen erhalten passende IDs wie `F-EMP-001`, `F-HR-001`, `F-CLR-001`, `F-APR-001`, `F-SAA-001`, `F-RES-001`, `F-OFF-001`, `F-SEC-001` und `NF-PERF-001`.

Jede Anforderung nennt Aussage, Herkunft, Status, Geltungsbereich, Akzeptanzkriterien und offene Abhängigkeiten.

## Risiken

| Risiko | Gegenmaßnahme |
|---|---|
| Ausgangsprompt wird als Porsche-Freigabe verstanden. | Inhalte als Ausgangslage kennzeichnen. |
| Eriks Antwort wird als Teamentscheidung behandelt. | getrennte Review- und Statusangaben verwenden. |
| SaaS-Ideen rutschen in den Porsche-Umfang. | Geltungsbereich je Frage und Anforderung ausweisen. |
| Unbekannte Regeln werden ergänzt. | Lücken ausdrücklich offen lassen. |

## Prüfstrategie

- Abdeckung aller Themen des Ausgangsprompts prüfen.
- Kennzeichnung jeder Frage prüfen.
- Antworten auf Widersprüche und Entscheidungsbefugnis prüfen.
- Markdown, Links und eindeutige Anforderungs-IDs prüfen.
- Akzeptanzkriterien auf Prüfbarkeit kontrollieren.
