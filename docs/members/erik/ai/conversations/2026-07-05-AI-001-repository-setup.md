# AI-001 – Repository-Einrichtung und persönliche Methode

## Angaben

| Feld                          | Wert                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| Datum                         | 2026-07-05                                                                                   |
| Person                        | Erik Bergmair                                                                                |
| Werkzeug                      | Codex                                                                                        |
| Zweck                         | Kontrollierter Aufbau des Repositorys und Entwicklung von Eriks persönlicher Arbeitsmethode |
| Vollständiger Ausgangsprompt | [Siehe Prompt-Datei](2026-07-05-AI-001-repository-setup-prompt.md)                              |

## Wesentliche Vorgaben von Erik

Erik gab den Projektkontext, die Teamaufteilung, den geplanten technischen Rahmen und die schrittweise Arbeitsweise vor. Besonders wichtig waren dabei:

- zuerst nur den tatsächlichen Repository-Zustand prüfen,
- keine Commits, Pushes oder direkten GitHub-Änderungen durch Codex,
- keinen Produktcode vor der Klärung von Anforderungen und Architektur erstellen,
- Fakten, Annahmen, Vorschläge und Freigaben klar trennen,
- historische Angaben nicht erfinden,
- eine gemeinsame FSD und eine nur für Erik geltende persönliche Methode führen,

Erik legte anschließend fest, welche Grundordner bereits erstellt werden sollen. Dazu gehörten insbesondere Dokumentation, persönliche Bereiche, Thesis-Struktur, `apps/web`, `apps/api`, Infrastruktur und Skripte.

Danach gab Erik die Ausarbeitung seiner persönlichen Planungs- und Dokumentationsmethode frei. Diese sollte für größere Arbeiten mit Proposal, Design, Aufgabenliste und tatsächlichem Nachweis arbeiten.

Als nächster Schritt wurde die FSD-Arbeit vorbereitet. Der vollständige Ausgangsprompt enthält den bekannten Porsche-IST-Prozess, den geplanten Zielprozess, die Trennung zwischen Porsche-Version und späterer SaaS-Plattform, die Verantwortungsbereiche sowie die ausdrücklich offenen Themen. Aus diesem gesamten Kontext soll Codex eine zusammenhängende und logisch gruppierte Fragerunde erstellen. Erik beantwortet sie zunächst; danach prüfen Julian und Joschua die Antworten. Weder die Fragen noch Eriks Antworten gelten automatisch als Porsche-Freigabe.

## Unterstützung durch Codex

Codex unterstützte bei:

- der lesenden Prüfung des anfänglichen Repository-Zustands,
- einem Vorschlag für die Repository-Struktur,
- dem Erstellen der freigegebenen Ordner und kurzen Erklärungstexte,
- dem Formulieren von Eriks persönlicher Methode,
- den Vorlagen für Changes, Tagesprotokolle und Abschlussbericht,
- der Vorbereitung eines abgeschlossenen Changes für den bisherigen Aufbau,
- der Vorbereitung eines aktiven Changes für Fragerunde und FSD,
- dem Erstellen einer FSD-Fragerunde mit 307 gekennzeichneten Fragen in 30 Themenblöcken aus dem vollständigen Ausgangsprompt.

Codex führte keine Commits, Pushes, Pull Requests oder Änderungen an GitHub Projects durch.

## Verwendung

Die Ergebnisse wurden für die initiale Repository-Struktur und die Dokumente unter `docs/members/erik/` verwendet. Die Fragerunde liegt unter [docs/requirements/fsd-questionnaire.md](../../../../requirements/fsd-questionnaire.md). Die FSD selbst ist noch nicht ausgearbeitet. Im aktiven Change [VAL-002-create-functional-specification](../../changes/active/VAL-002-create-functional-specification/proposal.md) folgen als Nächstes Eriks Antworten, die Teamprüfung und erst danach die Formulierung der Anforderungen.

## Prüfung und Grenzen

Die erzeugten Dateien wurden technisch auf Struktur, Markdown-Probleme und relative Links geprüft. Die inhaltliche Verantwortung und Prüfung bleibt bei Erik und dem Team.

Der verlinkte Prompt enthält den vollständigen Ausgangstext für diese Unterhaltung. Spätere Rückfragen und Antworten sind hier nur zusammengefasst und noch nicht als vollständiges wortgetreues Transkript exportiert.
