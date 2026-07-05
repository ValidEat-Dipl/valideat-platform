# Persönliche Arbeitsmethode von Erik Bergmair

## 1. Zweck

Diese Methode beschreibt, wie Erik Bergmair seine eigenen größeren Arbeiten an ValidEat plant, umsetzt, prüft und dokumentiert. Sie soll Entscheidungen und Eigenleistungen nachvollziehbar machen, ohne einen Arbeitsprozess für Julian Richter oder Joschua Auer vorzugeben.

Die Methode ist von spezifikationsbasierten Arbeitsweisen wie OpenSpec inspiriert. ValidEat verwendet dafür vorerst kein installiertes OpenSpec-Werkzeug und behauptet auch nicht, den offiziellen OpenSpec-Prozess vollständig zu übernehmen.

## 2. Geltungsbereich

Die Methode gilt für Eriks persönliche Aufgaben, besonders für:

- UI/UX und Branding,
- die Angular-Webanwendung,
- Mitarbeiter- und Restaurantoberflächen,
- PWA- und Offline-Funktionen,
- Kamera- und Scannerfunktionen,
- Usability-Tests,
- größere technische oder fachliche Änderungen in diesen Bereichen.

Kleine Korrekturen brauchen nicht immer einen eigenen Change. Ein Change ist sinnvoll, wenn mindestens einer dieser Punkte zutrifft:

- Die Arbeit betrifft mehrere Dateien oder Komponenten.
- Vor der Umsetzung müssen fachliche oder technische Fragen geklärt werden.
- Es gibt wichtige Alternativen, Risiken oder Auswirkungen auf andere Teammitglieder.
- Die Arbeit benötigt eigene Akzeptanzkriterien oder mehrere Prüfungen.
- Die Arbeit soll später in der Diplomarbeit als persönliche Leistung nachvollziehbar sein.

Auch ohne Change müssen relevante Arbeiten über Issue, Git-Verlauf, Tagesprotokoll oder andere passende Nachweise auffindbar bleiben.

## 3. Quellen der Wahrheit

Für Eriks Arbeit gelten verschiedene Dokumente mit unterschiedlichen Aufgaben:

- `docs/FSD.md` ist die gemeinsame fachliche Hauptquelle für abgestimmte Anforderungen.
- GitHub Issues beschreiben konkrete Arbeitspakete und ihre laufende Organisation.
- Ein persönlicher Change beschreibt Eriks geplante Lösung und den tatsächlichen Nachweis.
- Tagesprotokolle halten den bekannten Verlauf eines Arbeitstages fest.
- Architektur- und Projektentscheidungen dokumentieren gemeinsame Entscheidungen außerhalb eines persönlichen Changes.
- Git, Pull Requests und Testergebnisse liefern technische Nachweise.

Ein persönlicher Change darf die FSD nicht stillschweigend ändern. Widerspricht ein Change der FSD oder benötigt er eine neue fachliche Entscheidung, wird die Abweichung zuerst sichtbar gemacht und mit den zuständigen Personen geklärt.

## 4. Fakten, Annahmen und Vorschläge

Angaben werden nach ihrer Herkunft und Sicherheit getrennt. Besonders wichtig sind folgende Kennzeichnungen:

- **Porsche-Anforderung:** Von Porsche Informatik oder einer dazu berechtigten Kontaktperson ausdrücklich vorgegeben. Die Herkunft muss genannt werden.
- **Teamentscheidung:** Vom Projektteam gemeinsam beschlossen und nachvollziehbar dokumentiert.
- **Persönlicher Vorschlag:** Eine Idee oder Empfehlung von Erik, die noch nicht beschlossen ist.
- **SaaS-Idee:** Eine mögliche spätere Erweiterung, die nicht automatisch zum Porsche-Umfang gehört.
- **Annahme:** Eine vorläufig verwendete Aussage, die noch bestätigt werden muss.
- **Offene Frage:** Ein Punkt, zu dem noch keine belastbare Entscheidung vorliegt.
- **Forschungsfrage:** Ein Thema, das untersucht und sachlich bewertet werden soll.

Unbekannte Angaben bleiben unbekannt. Arbeitszeiten, Freigaben, Anforderungen, Quellen, Tests, Ergebnisse, Commit-Hashes und historische Zeitpunkte werden niemals erfunden.

## 5. Change-Kennung und Ordnername

Ein größerer persönlicher Change erhält eine eindeutige ID und einen kurzen englischen Namen:

```text
VAL-023-add-meal-entry
```

Aktive Changes liegen unter:

```text
docs/members/erik/changes/active/VAL-023-add-meal-entry/
```

Der Ordner enthält immer:

```text
proposal.md
design.md
tasks.md
evidence.md
```

Die Nummer soll nach Möglichkeit zur zugehörigen GitHub-Issue-Nummer passen. Ist das nicht möglich, wird die Beziehung zwischen Change und Issue ausdrücklich dokumentiert.

## 6. Ablauf eines Changes

### 6.1 Ausgangslage prüfen

Vor der Planung prüft Erik den tatsächlichen Stand im Repository, die relevante FSD-Stelle, bestehende Issues und vorhandene Entscheidungen. Uncommittete Änderungen anderer Personen werden nicht verworfen oder ungefragt überschrieben.

### 6.2 Proposal erstellen

`proposal.md` beschreibt, warum die Änderung gebraucht wird und was erreicht werden soll. Umfang, Nicht-Umfang, Akzeptanzkriterien, offene Fragen und notwendige Abstimmungen werden vor der Implementierung sichtbar gemacht.

### 6.3 Design ausarbeiten

`design.md` beschreibt die geplante Umsetzung. Dazu gehören Komponenten, Datenfluss, Benutzerablauf, Schnittstellen, Zustände, Fehlerbehandlung, Sicherheit, gegebenenfalls Offline-Verhalten, Alternativen, Risiken und Teststrategie.

Die Tiefe richtet sich nach der Änderung. Ein kleiner Change braucht keine künstlich aufgeblähte Architektur, muss aber die tatsächlich wichtigen Entscheidungen erklären.

### 6.4 Aufgaben planen

`tasks.md` zerlegt die Arbeit in überprüfbare Schritte. Aufgaben werden erst abgehakt, wenn sie wirklich erledigt sind. Teilweise erledigte oder nicht geprüfte Arbeiten bleiben offen oder erhalten eine ehrliche Anmerkung.

### 6.5 Freigabestatus prüfen

Vor der Implementierung wird geklärt, ob die notwendige Freigabe vorliegt. Eine Freigabe durch Erik ist keine automatische Freigabe durch das Team, Porsche Informatik, die Lehrkraft oder die Schule.

Wenn eine Entscheidung außerhalb von Eriks Zuständigkeit liegt, bleibt die betreffende Aufgabe blockiert oder wird ausdrücklich als Annahme umgesetzt. Kritische offene Punkte dürfen nicht stillschweigend entschieden werden.

### 6.6 Umsetzen und laufend dokumentieren

Während der Umsetzung werden Aufgaben, Abweichungen und neue Erkenntnisse zeitnah aktualisiert. Ändert sich die Lösung wesentlich, wird zuerst das Design angepasst oder die Abweichung nachvollziehbar festgehalten.

Codebezeichner, Branch-Namen und Commit-Messages werden grundsätzlich auf Englisch geschrieben. Projektdokumentation wird auf Deutsch geführt.

### 6.7 Prüfen

Die im Design geplanten Prüfungen werden passend zum Risiko ausgeführt. Ergebnisse werden mit Befehl, Umgebung und tatsächlichem Resultat dokumentiert. Ein Build ersetzt keine fachlichen Tests und eine Implementierung ist nicht automatisch verifiziert.

Nicht ausgeführte, abgebrochene oder fehlgeschlagene Tests werden genau so eingetragen. Manuelle Prüfungen werden von automatisierten Tests unterschieden.

### 6.8 Review und Abschluss

Vor dem Abschluss werden Akzeptanzkriterien, offene Aufgaben, Dokumentation, bekannte Einschränkungen und Nachweise geprüft. Der Change wird erst als abgeschlossen behandelt, wenn sein tatsächlicher Stand in `evidence.md` dokumentiert ist.

Danach wird der Ordner nach folgendem Muster nach `completed/` verschoben:

```text
docs/members/erik/changes/completed/2026-07-14-VAL-023-add-meal-entry/
```

Das Datum ist das tatsächliche Abschlussdatum. Ein abgebrochener oder ersetzter Change wird nicht als erfolgreich abgeschlossen dargestellt; sein Status und sein weiterer Umgang werden ausdrücklich dokumentiert.

## 7. Statuswerte

Für persönliche Changes und zugehörige Dokumente werden diese Statuswerte verwendet:

| Status | Bedeutung |
|---|---|
| `draft` | Der Inhalt wird vorbereitet und ist noch nicht zur Prüfung bereit. |
| `in-review` | Der Inhalt ist zur Prüfung vorgelegt, aber noch nicht freigegeben. |
| `approved` | Die dafür zuständige Stelle hat den beschriebenen Stand freigegeben. Wer freigegeben hat, muss genannt werden. |
| `implemented` | Die beschriebene Umsetzung wurde erstellt. Das sagt noch nichts über eine vollständige Prüfung aus. |
| `verified` | Die festgelegten Prüfungen und Akzeptanzkriterien wurden mit dokumentiertem Ergebnis erfüllt. |
| `superseded` | Der Inhalt wurde durch eine neuere Entscheidung oder einen neueren Change ersetzt. |
| `archived` | Der Inhalt wird nicht mehr aktiv bearbeitet und nur noch als Nachweis aufbewahrt. |

`approved`, `implemented` und `verified` sind bewusst getrennt. Eine persönliche Zustimmung von Erik wird als persönliche Freigabe bezeichnet und niemals als Porsche-Freigabe ausgegeben.

## 8. Die vier Change-Dokumente

### `proposal.md`

Das Proposal enthält mindestens:

- Metadaten und Status,
- FSD- und Issue-Referenz,
- Ausgangslage und Herkunft der Angaben,
- Ziel,
- Umfang und Nicht-Umfang,
- überprüfbare Akzeptanzkriterien,
- offene Fragen und Annahmen,
- erwartete Auswirkungen,
- notwendige Abstimmungen und Freigabestatus.

### `design.md`

Das Design enthält, soweit für den Change relevant:

- technische Lösung,
- betroffene Komponenten und Datenfluss,
- Benutzerablauf,
- API-Nutzung und Datenmodelle,
- Zustände und Fehlerbehandlung,
- Sicherheit, Datenschutz und Offline-Verhalten,
- betrachtete Alternativen,
- Risiken und Gegenmaßnahmen,
- Teststrategie.

### `tasks.md`

Die Aufgabenliste enthält überprüfbare Schritte aus den Bereichen:

- Vorbereitung,
- Klärung,
- Implementierung,
- Tests,
- Dokumentation,
- Review,
- Abschluss.

### `evidence.md`

Der Nachweis enthält den tatsächlichen Stand und mindestens:

- Zeitraum und Status,
- Issue, Branch, Pull Request und Commits, soweit vorhanden,
- tatsächlich umgesetzte Funktionen,
- betroffene Dateien,
- Abweichungen vom Design,
- ausgeführte Tests und Ergebnisse,
- bekannte Einschränkungen,
- Eriks eigene Leistung,
- Reviews,
- tatsächlich verwendete Quellen,
- zugehörige KI-IDs,
- Abschlusscheckliste.

## 9. Tagesprotokolle

Erik führt für relevante Arbeitstage eine Datei nach diesem Muster:

```text
docs/members/erik/worklogs/YYYY-MM-DD.md
```

Das Tagesprotokoll nennt nur bekannte Arbeitszeiten. Wenn keine verlässliche Dauer oder Uhrzeit festgehalten wurde, wird das offen gesagt. Ein später erstelltes Protokoll wird mit Dokumentationsdatum, rekonstruiertem Zeitraum, Grundlage und Unsicherheiten gekennzeichnet.

Tagesprotokolle enthalten je nach Arbeitstag Tätigkeiten, Changes und Issues, Erkenntnisse, Entscheidungen, Blockaden, Ergebnis, nächste Schritte, Quellen, KI-IDs und Git-Nachweise. Sie ersetzen weder einen Change noch den Git-Verlauf.

## 10. Quellen

Verwendete Quellen werden mit ihren IDs aus `docs/sources/sources.md` referenziert. Im Change-Nachweis und im Abschlussbericht wird zusätzlich erklärt, wofür die jeweilige Quelle verwendet wurde.

Bibliografische Angaben werden nicht ergänzt, wenn sie nicht bekannt sind. Der Zitierstil richtet sich nach dem verpflichtenden Schul-Template; ein technischer numerischer Stil kann vorgeschlagen werden, gilt aber erst nach entsprechender Entscheidung.

## 11. Einsatz von KI

Relevante KI-Nutzung wird im zentralen Protokoll `docs/ai/usage-log.md` erfasst. Eriks zugehörige Gesprächsdateien liegen unter `docs/members/erik/ai/conversations/`.

Generierte Inhalte werden von Erik selbst geprüft. Im Change-Nachweis, Tagesprotokoll oder Abschlussbericht werden die passenden KI-IDs genannt. KI-Ausgaben gelten nicht als Quelle für unbekannte Porsche-Anforderungen, nicht als Freigabe und nicht als Beleg für ausgeführte Tests.

## 12. Git und GitHub

Issues, Branches, Pull Requests und Commits werden verlinkt, wenn sie tatsächlich existieren. Fehlende Nachweise bleiben als `nicht vorhanden` oder `nicht festgestellt` sichtbar.

Commits sollen klein genug sein, um die Änderung nachvollziehen zu können, und eine englische Commit-Message tragen. Diese persönliche Methode legt nicht ohne Teamentscheidung den verbindlichen GitHub-Prozess für alle Teammitglieder fest.

## 13. Historische Rekonstruktionen

Frühere Arbeit darf nachträglich dokumentiert werden, wenn klar erkennbar bleibt, dass es sich um eine Rekonstruktion handelt. Dafür werden mindestens diese Angaben verwendet:

- `Nachträglich dokumentiert am: ...`
- `Rekonstruierter Zeitraum: ...`
- `Grundlage: ...`
- `Exakter ursprünglicher Zeitpunkt: nicht festgestellt`, falls unbekannt

Unsichere Erinnerungen werden als unsicher bezeichnet. Später erstellte Dokumente werden nicht auf ein früheres Datum zurückdatiert.

## 14. Persönlicher Abschlussbericht

Der persönliche Abschlussbericht fasst Eriks tatsächlichen Beitrag zusammen. Er beschreibt umgesetzte Funktionen, wichtige Entscheidungen, verworfene Alternativen, Probleme, Tests, Einschränkungen, Quellen, KI-Unterstützung, Eigenleistung und persönliche Reflexion.

Der Bericht wird aus vorhandenen Nachweisen erstellt und nicht mit allgemeinen Fülltexten ergänzt. Gemeinsame Leistungen und Beiträge anderer Teammitglieder werden von Eriks eigener Leistung getrennt dargestellt.

## 15. Qualitätscheck

Vor dem Abschluss eines Changes prüft Erik:

- Sind Fakten, Annahmen, Vorschläge und offene Fragen getrennt?
- Stimmen Change, FSD und tatsächliche Umsetzung überein oder sind Abweichungen erklärt?
- Sind Akzeptanzkriterien überprüfbar formuliert?
- Sind nur tatsächlich erledigte Aufgaben abgehakt?
- Sind Tests mit ihrem echten Ergebnis dokumentiert?
- Sind bekannte Einschränkungen sichtbar?
- Sind Quellen und KI-Nutzungen vollständig referenziert?
- Ist Eriks eigene Leistung klar von Teamleistungen getrennt?
- Sind Freigaben mit der tatsächlich zuständigen Stelle bezeichnet?
- Enthalten die Dokumente keine Secrets oder echten personenbezogenen Testdaten?
- Funktionieren relative Links innerhalb des Repositorys?
