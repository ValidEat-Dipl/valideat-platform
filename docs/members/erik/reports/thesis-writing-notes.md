# Arbeitsnotizen für meinen Diplomarbeitsteil

Diese Datei ist noch kein fertiger Text für die Diplomarbeit. Ich sammle hier während der Entwicklung Dinge, über die ich später sinnvoll schreiben kann. Dadurch muss ich am Ende nicht versuchen, alle Entscheidungen nur aus dem Gedächtnis zu rekonstruieren.

## Methodisches Vorgehen bei Spezifikation und Dokumentation

Am Anfang des Projekts habe ich mich bewusst noch nicht direkt auf die Implementierung gestürzt. Zuerst wurden das Repository, die Dokumentationsstruktur und die Arbeitsweise vorbereitet. Der interessante Punkt daran ist für die Diplomarbeit nicht, dass Ordner angelegt wurden. Wichtiger ist die Frage, warum Anforderungen, Entscheidungen und Nachweise von Anfang an getrennt und nachvollziehbar abgelegt werden.

ValidEat entsteht gemeinsam mit einem externen Kooperationspartner und soll später von einer abgegrenzten Porsche-Version zu einer allgemeineren SaaS-Plattform erweitert werden. Deshalb wäre es riskant gewesen, nur anhand einzelner Chatnachrichten oder eigener Annahmen mit der Implementierung zu beginnen. Ungeklärte Geschäftsregeln hätten sich sonst schnell im UI, im Backend oder im Datenmodell festgesetzt.

## Warum zuerst eine Functional Specification entsteht

Die FSD soll für ValidEat die gemeinsame fachliche Grundlage werden. Darin werden nicht nur einzelne Funktionen aufgezählt. Sie soll auch Rollen, Geschäftsprozesse, Daten, Fehlerfälle, Abgrenzungen, nichtfunktionale Anforderungen und Akzeptanzkriterien enthalten.

TechTarget beschreibt eine Functional Specification als fortlaufenden Bezugspunkt für die Entwicklung und nennt unter anderem Umfang, Risiken, Annahmen, Anwendungsfälle, funktionale sowie nichtfunktionale Anforderungen und Fehlerbehandlung als mögliche Inhalte ([SRC-004](../sources/sources.md#src-004--functional-specification-bei-techtarget)). Die praktische Beschreibung von Alltena nennt zusätzlich Ausgangslage, Schnittstellen, Nachverfolgbarkeit, Abnahmekriterien, Lieferumfang und Glossar ([SRC-005](../sources/sources.md#src-005--functional-specification-bei-alltena)).

Diese Quellen geben keine überall verbindliche Definition einer FSD vor. Für ValidEat wird der Begriff deshalb im Projekt selbst abgegrenzt. Unsere FSD beschreibt den fachlich erwarteten Systemstand. Technische Detailentscheidungen für einzelne Umsetzungen gehören dagegen eher in Designs und Architekturentscheidungen.

## Orientierung an Spec-Driven Development

Meine persönliche Arbeitsmethode ist von Spec-Driven Development und OpenSpec inspiriert. Die Grundidee ist, Absicht, Umfang und Akzeptanzkriterien schriftlich festzuhalten, bevor beziehungsweise während implementiert wird. Dadurch liegt das wichtige Wissen nicht nur in einem flüchtigen KI-Chat ([SRC-001](../sources/sources.md#src-001--what-is-spec-driven-development-sdd)).

OpenSpec verwendet für Änderungen unter anderem Proposal, Specifications, Design und Tasks. Nach der Umsetzung wird ein Change archiviert und das dauerhafte Wissen in die Spezifikation übernommen ([SRC-002](../sources/sources.md#src-002--openspec-readme), [SRC-003](../sources/sources.md#src-003--openspec-workflow)).

Ich habe OpenSpec aber nicht installiert und auch nicht behauptet, dass das gesamte Team nach OpenSpec arbeitet. Stattdessen habe ich die Ideen für meine eigene Dokumentation angepasst.

## Vergleich zwischen OpenSpec und meiner Anpassung

| OpenSpec-Idee | Meine Anpassung für ValidEat |
|---|---|
| Proposal | `proposal.md` beschreibt Ziel, Ausgangslage, Umfang, Nicht-Umfang und Akzeptanzkriterien. |
| Specifications | Die gemeinsame fachliche Hauptquelle ist `docs/FSD.md`. |
| Design | `design.md` beschreibt technische Lösung, Alternativen, Risiken und Teststrategie. |
| Tasks | `tasks.md` enthält überprüfbare Aufgaben, die nur bei echter Erledigung abgehakt werden. |
| Archivierung | Laufende Changes liegen unter `active/`, abgeschlossene Changes erhalten unter `completed/` ein Datum. |
| Eigene Ergänzung | `evidence.md` hält den tatsächlichen Stand, Abweichungen, Tests und Einschränkungen fest. |
| Eigene Ergänzung | Tagesprotokolle dokumentieren den laufenden Arbeitsstand, ohne unbekannte Zeiten zu erfinden. |
| Eigene Ergänzung | Quellen und KI-Unterstützung werden über IDs mit der konkreten Verwendung verbunden. |
| Persönliche Abgrenzung | Die Methode gilt nur für Erik und wird nicht als Arbeitsweise von Julian oder Joschua ausgegeben. |

## Warum ich Evidence ergänzt habe

Eine Planung zeigt zunächst nur, was gemacht werden soll. Sie beweist aber noch nicht, was später wirklich umgesetzt oder getestet wurde. Deshalb gibt es zusätzlich `evidence.md`.

Diese Datei soll verhindern, dass `implementiert` und `verifiziert` miteinander verwechselt werden. Dort werden betroffene Dateien, tatsächliche Funktionen, Abweichungen vom Design, ausgeführte und nicht ausgeführte Tests, bekannte Einschränkungen, Quellen und KI-IDs eingetragen. Für mich ist das besonders wichtig, weil bei KI-Unterstützung schnell ein überzeugend formulierter Plan entstehen kann, obwohl eine Prüfung noch gar nicht stattgefunden hat.

Evidence ist meine eigene Erweiterung. Der dokumentierte Standardablauf von OpenSpec nennt keine identische `evidence.md`. Der OpenSpec-Workflow betont allerdings, dass vor der Archivierung getestet und die Umsetzung gegen die Spezifikation geprüft werden soll ([SRC-003](../sources/sources.md#src-003--openspec-workflow)).

## Warum ich Tagesprotokolle führe

Die Tagesprotokolle sollen später zeigen, wie sich meine Arbeit entwickelt hat. Sie enthalten Tätigkeiten, Erkenntnisse, Entscheidungen, Blockaden, Quellen, KI-Nutzung und Git-Nachweise.

Auch dieser Teil ist eine eigene Ergänzung und wird nicht als OpenSpec-Funktion dargestellt. Der Nutzen liegt vor allem darin, Entscheidungen später noch zeitlich einordnen und meine persönliche Leistung von gemeinsamen Arbeiten trennen zu können. Unbekannte Arbeitszeiten werden dabei nicht aus Commit-Zeitpunkten geschätzt.

## Umgang mit KI-Unterstützung

Codex unterstützt bei Strukturierung, Formulierung, Recherche und später teilweise bei technischen Arbeiten. Die inhaltliche Verantwortung bleibt trotzdem bei mir. Deshalb werden relevante Gespräche, Ausgangsprompts, Verwendungszweck und eigene Prüfungen dokumentiert.

Ein wichtiger Punkt für die spätere Reflexion ist der Unterschied zwischen Unterstützung und Eigenleistung. Die Projektidee, fachlichen Informationen, Freigaben und Entscheidungen dürfen nicht der KI zugeschrieben werden. Umgekehrt darf ich KI-generierte Formulierungen oder Strukturen nicht so darstellen, als wären sie ohne Unterstützung entstanden.

## Was daran später kritisch betrachtet werden sollte

Die Methode hat nicht nur Vorteile. Sie erzeugt zusätzliche Dokumentationsarbeit und kann bei kleinen Änderungen übertrieben sein. Außerdem können Spezifikation, Aufgaben und tatsächliche Umsetzung auseinanderlaufen, wenn die Dokumente nicht laufend gepflegt werden.

Die FSD-Fragerunde ist mit 307 Fragen sehr umfangreich. Das hilft bei der Vollständigkeit, kann aber das Team auch überfordern. Für die praktische Arbeit muss deshalb entschieden werden, welche Fragen zuerst für Porsche, UI/UX und Architektur gebraucht werden und welche später beantwortet werden können.

Auch die verwendeten OpenSpec-Quellen müssen richtig eingeordnet werden: Sie stammen vom OpenSpec-Projekt selbst und beschreiben dessen eigenes Vorgehen. Sie sind gute Primärquellen dafür, wie OpenSpec funktioniert, aber keine unabhängige wissenschaftliche Bewertung des Werkzeugs.

## Mögliche Gliederung für die Diplomarbeit

1. Ausgangslage und Problem der unklaren Anforderungen
2. Zweck und Abgrenzung der ValidEat-FSD
3. Grundidee von Spec-Driven Development
4. Arbeitsweise von OpenSpec
5. Anpassung für meine persönliche Dokumentation
6. Verbindung zwischen Proposal, Design, Tasks und Evidence
7. Dokumentation von Quellen und KI-Nutzung
8. Vorteile, Grenzen und tatsächliche Erfahrungen während der Umsetzung

## Was nicht in den Haupttext gehört

Lange Ordnerlisten, alle Vorlagen und die vollständigen 307 Fragen würden den Haupttext unnötig aufblähen. Diese Inhalte können im Repository oder gegebenenfalls im Anhang bleiben. Im Haupttext sollte ich erklären, warum die Struktur gewählt wurde, wie sie angewendet wurde und was dabei tatsächlich funktioniert oder nicht funktioniert hat.

## Punkte, die später mit echten Erfahrungen ergänzt werden müssen

- Hat die Methode falsche oder zu frühe Implementierungsentscheidungen verhindert?
- Waren Proposal und Design vor der Implementierung tatsächlich hilfreich?
- Wurden Tasks und Evidence ehrlich und laufend gepflegt?
- Welche Teile waren zu aufwendig oder redundant?
- Wie gut konnten Julian und Joschua die Dokumentation nachvollziehen?
- Welche Unterschiede gab es zwischen geplantem und tatsächlichem Ablauf?
- Welche Änderungen würde ich an der Methode nach dem Projekt vornehmen?
