# FSD-Fragerunde

## Dokumentinformationen

| Feld                   | Wert                                                                                                |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| Status                 | `draft`                                                                                           |
| Change                 | `VAL-002-create-functional-specification`                                                         |
| Erstellt am            | 2026-07-05                                                                                          |
| Fachliche Grundlage    | [Ausgangsprompt AI-001](../members/erik/ai/conversations/2026-07-05-AI-001-repository-setup-prompt.md) |
| Antworten von Erik     | noch offen                                                                                          |
| Prüfung durch Julian  | noch offen                                                                                          |
| Prüfung durch Joschua | noch offen                                                                                          |
|                        | nicht vorhanden                                                                                     |

## Zweck und Vorgehen

Diese Fragerunde klärt die fachliche Grundlage für `docs/FSD.md`. Sie wurde aus dem gesamten bisher von Erik bereitgestellten Kontext abgeleitet: Projektauftrag, Verantwortungsaufteilung, verstandener Porsche-IST-Prozess, geplanter Porsche-Zielprozess, technische Leitplanken, spätere SaaS-Erweiterung, schulische Vorgaben und ausdrücklich offene Punkte.

Die Fragen werden zuerst von Erik beantwortet. Danach prüfen Julian und Joschua die Antworten aus ihren Verantwortungsbereichen. Eine Antwort von Erik oder eine Zustimmung im Team ist keine automatische Porsche-Freigabe. Punkte, die Porsche oder die Schule entscheiden müssen, bleiben bis zu einer echten Klärung offen.

Antworten können gesammelt nach Fragen-ID gegeben werden, zum Beispiel:

```text
Q-IST-001: Ja, der Ablauf stimmt grundsätzlich. Offen ist noch ...
Q-IST-002: Weiß ich nicht; muss Tobias Wagner bestätigen.
```

`Unbekannt` ist eine gültige und wichtige Antwort. Vermutungen sollen als Annahme gekennzeichnet werden.

## Kennzeichnungen

### Zeitpunkt

- **vor Porsche-Implementierung zwingend:** Ohne Antwort besteht ein hohes Risiko, den Porsche-Prozess falsch umzusetzen.
- **später klärbar:** Die Antwort wird benötigt, blockiert aber nicht zwingend die erste fachliche Abgrenzung.
- **nur SaaS:** Betrifft die spätere allgemeine Plattform und nicht automatisch die Porsche-Version.
- **Forschungsfrage:** Muss untersucht und sachlich bewertet werden; das Ergebnis ist noch offen.

### Entscheidung

- **durch Porsche zu entscheiden:** Fachliche oder betriebliche Vorgabe von Porsche erforderlich.
- **durch das Team zu entscheiden:** Projektinterne fachliche oder technische Entscheidung.
- **mit Lehrkraft/Schule abzustimmen:** Schulische, wissenschaftliche oder abgabebezogene Vorgabe.

Wenn mehrere Stellen beteiligt sind, sind mehrere Kennzeichnungen angegeben.

## 1. Grundlage, Ziel und Geltungsbereich

| ID        | Zeitpunkt                            | Entscheidung                     | Frage                                                                                                                                                                                 |
| --------- | ------------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Q-SCP-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Ist der im Ausgangsprompt beschriebene Zweck korrekt: Die bestehende Abrechnung physischer Essenmarkerl soll digital unterstützt, aber zunächst nicht vollständig ersetzt werden?  |
| Q-SCP-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Welches konkrete Problem soll Porsche mit ValidEat zuerst lösen: weniger Papieraufwand, weniger Abweichungen, schnellere Abrechnung, bessere Nachvollziehbarkeit oder etwas anderes? |
| Q-SCP-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Welche Organisationseinheit von Porsche ist Auftraggeberin beziehungsweise fachlich verantwortlich?                                                                                   |
| Q-SCP-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Für welchen Standort, welche Gesellschaft und welche Beschäftigtengruppe gilt die erste Porsche-Version?                                                                            |
| Q-SCP-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Welche Teile des beschriebenen Zielprozesses sind bereits vereinbart und welche sind bisher nur Projektideen?                                                                         |
| Q-SCP-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Was ist der verbindliche Mindestumfang der ersten Porsche-Auslieferung?                                                                                                               |
| Q-SCP-007 | später klärbar                     | durch Porsche zu entscheiden     | Gibt es bereits schriftliche Prozessbeschreibungen, Formulare, Beispielmarkerln oder Abrechnungen, die als Grundlage verwendet werden dürfen?                                        |
| Q-SCP-008 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden    | Welche Aussagen aus dem Antrag gelten als Projektauftrag, obwohl noch keine Porsche-Bestätigung vorliegt?                                                                            |
| Q-SCP-009 | später klärbar                     | mit Lehrkraft/Schule abzustimmen | Welche Teile des Systems müssen für die Diplomarbeit tatsächlich umgesetzt und welche dürfen nur evaluiert werden?                                                                |

## 2. Porsche-IST-Prozess

| ID        | Zeitpunkt                            | Entscheidung                 | Frage                                                                                                                  |
| --------- | ------------------------------------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Q-IST-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Stimmt die Reihenfolge des beschriebenen IST-Prozesses vom Mitnehmen des Markerls bis zur Bestätigung der Abrechnung? |
| Q-IST-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wer gibt die physischen Essenmarkerl aus und wo werden sie aufbewahrt?                                                 |
| Q-IST-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Angaben müssen heute tatsächlich auf das physische Markerl geschrieben werden?                                |
| Q-IST-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wer unterschreibt das einzelne Markerl und was bestätigt diese Unterschrift?                                          |
| Q-IST-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Was genau wird im persönlichen Papierbuch eingetragen und von wem?                                                    |
| Q-IST-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wird das Papierbuch bei jeder Verwendung sofort oder erst später ausgefüllt?                                         |
| Q-IST-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Aufgabe erfüllt das Restaurant außer der Annahme und späteren Rücksendung der Markerl?                      |
| Q-IST-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Sortiert, prüft oder ergänzt das Restaurant die Markerl vor der Rücksendung?                                        |
| Q-IST-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | In welchem Rhythmus und auf welchem Weg gelangen die Markerl vom Restaurant zu HR?                                     |
| Q-IST-010 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Daten vergleicht HR heute zwischen Markerln und persönlichen Büchern?                                         |
| Q-IST-011 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Abweichungen treten im aktuellen Prozess tatsächlich auf?                                                      |
| Q-IST-012 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wie werden Abweichungen heute geklärt und wer entscheidet im Streitfall?                                              |
| Q-IST-013 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Was bestätigt der Vorgesetzte am Ende genau und auf welchem Dokument?                                                 |
| Q-IST-014 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche nachgelagerten Schritte folgen nach der Bestätigung, beispielsweise Verrechnung oder Archivierung?             |
| Q-IST-015 | später klärbar                     | durch Porsche zu entscheiden | Welche typischen Bearbeitungszeiten, Fehlerquellen und manuellen Aufwände bestehen heute?                             |

## 3. Zielprozess und Systemgrenzen

| ID        | Zeitpunkt                            | Entscheidung                                                   | Frage                                                                                                                                   |
| --------- | ------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Q-TGT-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Soll die digitale Erfassung das persönliche Papierbuch vollständig ersetzen oder nur ergänzen?                                       |
| Q-TGT-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Bleibt das physische Markerl in jeder Phase der Porsche-Version verpflichtend?                                                          |
| Q-TGT-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wann genau soll eine beschäftigte Person die Verwendung digital erfassen: vor dem Essen, bei der Übergabe oder später am selben Tag? |
| Q-TGT-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Muss die digitale Erfassung vorgezeigt oder vom Restaurant kontrolliert werden?                                                         |
| Q-TGT-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche Arbeit soll HR nach Einführung weiterhin manuell durchführen?                                                                  |
| Q-TGT-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Soll der Vorgesetzte direkt in ValidEat freigeben oder weiterhin einen Ausdruck unterschreiben?                                         |
| Q-TGT-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche bestehenden Papierdokumente bleiben parallel bestehen?                                                                           |
| Q-TGT-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Was soll ausdrücklich außerhalb von ValidEat bleiben?                                                                                 |
| Q-TGT-009 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Soll die erste Porsche-Version Mitarbeiter-, HR- und Freigabebereich in einer gemeinsamen Angular-Anwendung enthalten?                  |
| Q-TGT-010 | später klärbar                     | durch Porsche zu entscheiden und durch das Team zu entscheiden | Welche Kennzahlen zeigen später, dass der Zielprozess besser als der IST-Prozess funktioniert?                                         |

## 4. Rollen und Verantwortlichkeiten im System

| ID        | Zeitpunkt                            | Entscheidung                  | Frage                                                                                                               |
| --------- | ------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Q-ROL-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Welche Benutzerrollen benötigt die Porsche-Version mindestens?                                                     |
| Q-ROL-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Sind Mitarbeitende, HR, Vorgesetzte und Systemadministration getrennte Rollen?                                      |
| Q-ROL-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Können Personen mehrere Rollen gleichzeitig besitzen?                                                              |
| Q-ROL-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Darf eine Führungskraft nur die eigene Kostenstelle beziehungsweise Organisationseinheit sehen?                    |
| Q-ROL-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Darf HR alle Beschäftigten und Abrechnungsperioden sehen oder gibt es organisatorische Einschränkungen?           |
| Q-ROL-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Wer darf Erfassungen anlegen, ändern, stornieren oder endgültig sperren?                                          |
| Q-ROL-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Wer darf Clearing-Konflikte bearbeiten und abschließen?                                                            |
| Q-ROL-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Wer darf Exporte erstellen und Freigaben erteilen?                                                                  |
| Q-ROL-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Benötigen Restaurants in der Porsche-Version eigene Benutzerkonten?                                                |
| Q-ROL-010 | später klärbar                     | durch das Team zu entscheiden | Wie wird Joschuas Admin-Dashboard-Verantwortung innerhalb einer gemeinsamen Angular-Anwendung technisch abgegrenzt? |
| Q-ROL-011 | später klärbar                     | durch das Team zu entscheiden | Welche technischen Administrationsrollen werden zusätzlich zu fachlichen Rollen benötigt?                         |

## 5. Mitarbeiterkonto und Stammdaten

| ID        | Zeitpunkt                            | Entscheidung                 | Frage                                                                                                                             |
| --------- | ------------------------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Q-EMP-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Stammdaten werden pro beschäftigter Person benötigt?                                                                     |
| Q-EMP-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Sind Name und Kostenstelle ausreichend oder werden Personalnummer, Standort, Führungskraft oder Beschäftigungsstatus benötigt? |
| Q-EMP-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche eindeutige Kennung darf für die technische Zuordnung verwendet werden?                                                    |
| Q-EMP-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Woher stammen die Stammdaten und wer ist für ihre Richtigkeit verantwortlich?                                                    |
| Q-EMP-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Dürfen Mitarbeitende eigene Stammdaten ansehen oder ändern?                                                                     |
| Q-EMP-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wie werden Wechsel der Kostenstelle oder Führungskraft innerhalb einer Abrechnungsperiode behandelt?                             |
| Q-EMP-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wie werden Eintritt, Austritt, Karenz, längere Abwesenheit oder gesperrte Konten behandelt?                                      |
| Q-EMP-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Muss der historische Stand von Name, Kostenstelle und Führungskraft je Eintrag erhalten bleiben?                                 |
| Q-EMP-009 | später klärbar                     | durch Porsche zu entscheiden | Werden Vertreterkonten oder Erfassungen im Auftrag einer anderen Person benötigt?                                                |
| Q-EMP-010 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche realen personenbezogenen Daten dürfen in Entwicklungs-, Test- und Abnahmeumgebungen verwendet werden?                     |

## 6. Markerlstufen, Anspruch und erlaubte Tage

| ID        | Zeitpunkt                            | Entscheidung                                                   | Frage                                                                                               |
| --------- | ------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Q-MRK-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche Essenmarkerlstufen gibt es und wie heißen sie offiziell?                                    |
| Q-MRK-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welchen Wert oder Zuschuss besitzt jede Stufe?                                                      |
| Q-MRK-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wer darf welche Markerlstufe verwenden?                                                             |
| Q-MRK-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Darf eine Person mehr als ein Markerl pro Tag verwenden?                                            |
| Q-MRK-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | An welchen Wochentagen, Feiertagen oder Arbeitstagen ist eine Erfassung erlaubt?                    |
| Q-MRK-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Hängt der Anspruch von Arbeitszeit, Schicht, Dienstreise, Homeoffice, Urlaub oder Krankenstand ab? |
| Q-MRK-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Darf ein Markerl an einem anderen Standort oder in mehreren Restaurants verwendet werden?           |
| Q-MRK-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Gibt es monatliche, jährliche oder andere Mengenlimits?                                            |
| Q-MRK-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Was passiert bei einer Erfassung ohne bestehenden Anspruch?                                         |
| Q-MRK-010 | später klärbar                     | durch Porsche zu entscheiden                                   | Können sich Stufen, Werte und Regeln zeitlich ändern und müssen sie historisiert werden?         |
| Q-MRK-011 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden und durch Porsche zu entscheiden | Werden Regeln im System konfigurierbar oder für die erste Porsche-Version fest hinterlegt?         |

## 7. Erfassung durch Mitarbeitende

| ID        | Zeitpunkt                            | Entscheidung                  | Frage                                                                                                     |
| --------- | ------------------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| Q-ENT-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Welche Angaben muss eine beschäftigte Person bei einer Erfassung selbst auswählen oder eingeben?        |
| Q-ENT-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Werden Name, Kostenstelle und Datum automatisch übernommen und dürfen sie geändert werden?             |
| Q-ENT-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Muss ein Restaurant ausgewählt werden?                                                                   |
| Q-ENT-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Muss die konkrete Markerlstufe immer ausgewählt werden?                                                  |
| Q-ENT-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Braucht die Erfassung eine Bestätigung, Unterschrift, PIN oder andere zusätzliche Handlung?             |
| Q-ENT-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Welche Bestätigung sieht die Person nach erfolgreicher Erfassung?                                        |
| Q-ENT-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Darf eine Person ihre bisherigen Einträge und deren Clearing-Status sehen?                               |
| Q-ENT-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Welche Konflikt- oder Korrekturinformationen dürfen Mitarbeitende sehen?                                 |
| Q-ENT-009 | später klärbar                     | durch Porsche zu entscheiden  | Werden Erinnerungen benötigt, wenn an einem Arbeitstag noch keine Erfassung erfolgt ist?                 |
| Q-ENT-010 | später klärbar                     | durch das Team zu entscheiden | Welche minimale Anzahl an Schritten und welche Geräte sollen für den Erfassungsablauf optimiert werden? |

## 8. Nachträge, Änderungen und Stornierungen

| ID        | Zeitpunkt                            | Entscheidung                 | Frage                                                                                                  |
| --------- | ------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------ |
| Q-COR-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Darf eine Erfassung für einen vergangenen Tag nachgetragen werden?                                    |
| Q-COR-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wie lange ist ein Nachtrag möglich?                                                                   |
| Q-COR-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Darf eine bestehende Erfassung geändert oder nur storniert und neu angelegt werden?                   |
| Q-COR-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Bis zu welchem Prozessstatus sind Änderungen erlaubt?                                                 |
| Q-COR-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Änderungen benötigen eine Begründung oder Freigabe?                                          |
| Q-COR-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Darf HR im Namen einer beschäftigten Person korrigieren?                                              |
| Q-COR-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wie wird eine versehentliche doppelte Erfassung behandelt?                                             |
| Q-COR-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Was passiert, wenn eine Person „verwendet“ erfasst, das physische Markerl aber nicht bei HR ankommt? |
| Q-COR-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Was passiert, wenn HR ein Markerl erfasst, aber kein Mitarbeitereintrag vorhanden ist?                 |
| Q-COR-010 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Müssen alle alten und neuen Werte einer Korrektur im Audit-Log erhalten bleiben?                      |

## 9. Abrechnungsperioden und Fristen

| ID        | Zeitpunkt                            | Entscheidung                 | Frage                                                                          |
| --------- | ------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------ |
| Q-PER-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Abrechnungsperiode wird verwendet?                                      |
| Q-PER-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wann beginnt und endet eine Periode genau?                                     |
| Q-PER-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Gibt es getrennte Fristen für Mitarbeitende, Restaurants, HR und Vorgesetzte? |
| Q-PER-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wann wird eine Periode für weitere Änderungen gesperrt?                      |
| Q-PER-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wer darf eine gesperrte Periode wieder öffnen?                                |
| Q-PER-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wie werden verspätet eingetroffene physische Markerl behandelt?               |
| Q-PER-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Können Konflikte nach einer Freigabe noch korrigiert werden?                  |
| Q-PER-008 | später klärbar                     | durch Porsche zu entscheiden | Wie lange müssen abgeschlossene Perioden im System abrufbar bleiben?          |

## 10. HR-Erfassung der physischen Markerl

| ID       | Zeitpunkt                            | Entscheidung                                                   | Frage                                                                                           |
| -------- | ------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Q-HR-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche Daten liest HR von einem physischen Markerl ab und gibt sie ins System ein?              |
| Q-HR-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wird jedes Markerl einzeln erfasst oder wird eine Sammelerfassung benötigt?                    |
| Q-HR-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wie wird die beschäftigte Person eindeutig zum Markerl zugeordnet?                             |
| Q-HR-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wie werden unleserliche, unvollständige oder beschädigte Markerl erfasst?                     |
| Q-HR-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Muss HR das Restaurant oder das Eingangsdatum erfassen?                                         |
| Q-HR-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Muss HR eine Unterschrift auf dem Markerl prüfen und das Ergebnis dokumentieren?               |
| Q-HR-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wie werden HR-Eingabefehler korrigiert?                                                         |
| Q-HR-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Können mehrere HR-Personen gleichzeitig dieselbe Periode bearbeiten?                           |
| Q-HR-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Muss sichtbar sein, wer welches Markerl wann erfasst oder geändert hat?                        |
| Q-HR-010 | später klärbar                     | durch Porsche zu entscheiden und durch das Team zu entscheiden | Werden für die HR-Erfassung Tastatur-, Barcode-, QR-, Kamera- oder Stapelfunktionen benötigt? |

## 11. Clearing und automatische Zuordnung

| ID        | Zeitpunkt                            | Entscheidung                  | Frage                                                                                                     |
| --------- | ------------------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------- |
| Q-CLR-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Welche Felder müssen zwischen Mitarbeiter- und HR-Erfassung übereinstimmen?                             |
| Q-CLR-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Welche Felder identifizieren ein zusammengehöriges Paar eindeutig?                                       |
| Q-CLR-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Muss die Markerlstufe exakt übereinstimmen?                                                              |
| Q-CLR-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Wie werden unterschiedliche Schreibweisen, Namensänderungen oder Kostenstellenwechsel behandelt?         |
| Q-CLR-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Darf das Datum abweichen und wenn ja, um welchen Zeitraum?                                                |
| Q-CLR-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Wie wird entschieden, wenn mehrere Mitarbeitereinträge zu einem HR-Eintrag passen könnten?              |
| Q-CLR-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Wie wird entschieden, wenn mehrere HR-Einträge zu einem Mitarbeitereintrag passen könnten?              |
| Q-CLR-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Wann wird das Clearing ausgeführt: sofort, manuell, regelmäßig oder beim Periodenabschluss?            |
| Q-CLR-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Darf ein automatisches Match später manuell getrennt oder geändert werden?                              |
| Q-CLR-010 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Welche Statuswerte benötigt ein Clearing-Fall?                                                           |
| Q-CLR-011 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Welche Begründung muss bei einer manuellen Zuordnung gespeichert werden?                                 |
| Q-CLR-012 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Muss die ursprüngliche automatische Entscheidung nach einer manuellen Änderung nachvollziehbar bleiben? |
| Q-CLR-013 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden | Muss der Algorithmus deterministisch und mit denselben Eingaben reproduzierbar sein?                      |
| Q-CLR-014 | später klärbar                     | durch Porsche zu entscheiden  | Welche Kennzahlen zum Clearing werden benötigt, etwa Match-Quote oder offene Fälle?                     |

## 12. Konfliktarten und Konfliktlösung

| ID        | Zeitpunkt                            | Entscheidung                 | Frage                                                                                            |
| --------- | ------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------------ |
| Q-CFL-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Konfliktarten müssen unterschieden werden?                                               |
| Q-CFL-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Ist ein fehlender Mitarbeitereintrag ein eigener Konflikttyp?                                    |
| Q-CFL-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Ist ein fehlendes physisches Markerl ein eigener Konflikttyp?                                    |
| Q-CFL-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wie werden abweichendes Datum, falsche Stufe, falsche Person und falsche Kostenstelle behandelt? |
| Q-CFL-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wer ist für die erste Bearbeitung eines Konflikts zuständig?                                   |
| Q-CFL-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Muss die beschäftigte Person zur Klärung Stellung nehmen können?                              |
| Q-CFL-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wann wird ein Vorgesetzter oder eine andere Stelle eingebunden?                                  |
| Q-CFL-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche möglichen Ergebnisse kann eine Konfliktlösung haben?                                    |
| Q-CFL-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Sind Begründung, Kommentar oder Beleg für den Abschluss verpflichtend?                         |
| Q-CFL-010 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Darf ein abgeschlossener Konflikt wieder geöffnet werden und von wem?                           |
| Q-CFL-011 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Blockieren offene Konflikte den gesamten Export oder nur betroffene Einträge?                   |
| Q-CFL-012 | später klärbar                     | durch Porsche zu entscheiden | Werden Benachrichtigungen oder Eskalationsfristen für offene Konflikte benötigt?               |

## 13. Export, Abschluss und Freigabe

| ID        | Zeitpunkt                            | Entscheidung                 | Frage                                                                                           |
| --------- | ------------------------------------ | ---------------------------- | ----------------------------------------------------------------------------------------------- |
| Q-APR-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welchen Zweck hat der Export und welches nachgelagerte System oder welche Person verwendet ihn? |
| Q-APR-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Exportformate werden benötigt, beispielsweise PDF, CSV oder XLSX?                       |
| Q-APR-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Spalten, Summen, Gruppierungen und Metadaten muss der Export enthalten?                  |
| Q-APR-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Werden bestätigte Einträge, Konflikte und ausgeschlossene Einträge getrennt dargestellt?     |
| Q-APR-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Muss der Export je Person, Kostenstelle, Restaurant oder Periode aufgeteilt werden?             |
| Q-APR-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wer darf einen Export erzeugen, erneut erzeugen oder herunterladen?                             |
| Q-APR-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Muss jeder Export eine eindeutige Version und einen unveränderbaren Erstellungsstand besitzen? |
| Q-APR-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Erfolgt die Freigabe digital im System, durch Unterschrift am Ausdruck oder in beiden Formen?   |
| Q-APR-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Was bestätigt die freigebende Person fachlich und rechtlich?                                   |
| Q-APR-010 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Kann die Freigabe abgelehnt oder zurückgezogen werden?                                         |
| Q-APR-011 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Änderungen sind nach Freigabe noch möglich?                                            |
| Q-APR-012 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Muss ein erneut erzeugter Export frühere Versionen ersetzen oder zusätzlich aufbewahren?      |
| Q-APR-013 | später klärbar                     | durch Porsche zu entscheiden | Werden automatische Übertragung, E-Mail-Versand oder nur manueller Download benötigt?         |

## 14. Benutzerverwaltung und Authentifizierung

| ID        | Zeitpunkt                            | Entscheidung                                                   | Frage                                                                                                                            |
| --------- | ------------------------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Q-AUT-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden und durch das Team zu entscheiden | Soll tatsächlich Keycloak verwendet werden oder ist eine Porsche-Identitätslösung vorgeschrieben?                             |
| Q-AUT-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche Benutzerquelle liefert Konten, Gruppen und Rollen?                                                                        |
| Q-AUT-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wird Single Sign-on benötigt?                                                                                                   |
| Q-AUT-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Ist Mehrfaktor-Authentifizierung vorgeschrieben?                                                                                 |
| Q-AUT-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wer legt Konten und Rollen an, ändert oder deaktiviert sie?                                                                     |
| Q-AUT-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wie schnell müssen Austritte oder Rollenänderungen wirksam werden?                                                             |
| Q-AUT-007 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie werden Berechtigungen im Angular-Frontend und im Quarkus-Backend unabhängig voneinander durchgesetzt?                       |
| Q-AUT-008 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Welche Sitzungsdauer, Abmeldung und Token-Erneuerung sind vorgesehen?                                                            |
| Q-AUT-009 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie werden verlorene, abgelaufene oder widerrufene Tokens behandelt?                                                             |
| Q-AUT-010 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Welche Maßnahmen verhindern, dass eine sichtbare Bestätigung oder ein Screenshot als übertragbarer Nachweis missbraucht wird? |
| Q-AUT-011 | später klärbar                     | durch Porsche zu entscheiden                                   | Werden technische Servicekonten oder externe Zugriffe benötigt?                                                                 |

## 15. Datenschutz und Aufbewahrung

| ID        | Zeitpunkt                            | Entscheidung                 | Frage                                                                                        |
| --------- | ------------------------------------ | ---------------------------- | -------------------------------------------------------------------------------------------- |
| Q-DAT-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wer ist datenschutzrechtlich verantwortlich und wer darf verbindliche Vorgaben machen?       |
| Q-DAT-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche personenbezogenen Daten dürfen verarbeitet werden?                                   |
| Q-DAT-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Auf welcher fachlichen beziehungsweise rechtlichen Grundlage werden diese Daten verarbeitet? |
| Q-DAT-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Daten dürfen die einzelnen Rollen sehen?                                             |
| Q-DAT-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Aufbewahrungsfristen gelten für Einträge, Konflikte, Exporte und Audit-Logs?        |
| Q-DAT-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Daten müssen gelöscht, anonymisiert oder dauerhaft erhalten werden?                 |
| Q-DAT-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Wie werden Auskunft, Berichtigung, Löschung und andere Betroffenenrechte behandelt?         |
| Q-DAT-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Dürfen Daten außerhalb der Porsche- beziehungsweise Schulinfrastruktur verarbeitet werden? |
| Q-DAT-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Welche Daten dürfen in Logs, Fehlermeldungen und Monitoring erscheinen?                     |
| Q-DAT-010 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden | Müssen Testdaten vollständig synthetisch oder anonymisiert sein?                           |
| Q-DAT-011 | später klärbar                     | durch Porsche zu entscheiden | Ist eine Datenschutz-Folgenabschätzung oder formelle Sicherheitsprüfung erforderlich?      |

## 16. Auditierung und Nachvollziehbarkeit

| ID        | Zeitpunkt                            | Entscheidung                                                   | Frage                                                                                                      |
| --------- | ------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Q-AUD-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche Aktionen müssen im Audit-Log nachvollziehbar sein?                                                 |
| Q-AUD-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Müssen Anmeldung, Ansicht und Export personenbezogener Daten protokolliert werden?                        |
| Q-AUD-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche Angaben braucht ein Audit-Eintrag mindestens?                                                       |
| Q-AUD-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wer darf Audit-Logs ansehen und exportieren?                                                               |
| Q-AUD-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wie lange werden Audit-Logs aufbewahrt?                                                                    |
| Q-AUD-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden und durch das Team zu entscheiden | Welcher technische Schutz vor unbemerkter Änderung von Audit-Daten ist erforderlich?                      |
| Q-AUD-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Müssen Vorher- und Nachher-Werte bei Änderungen gespeichert werden?                                      |
| Q-AUD-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wie wird eine Korrektur eines fehlerhaften Audit-relevanten Vorgangs nachvollzogen?                        |
| Q-AUD-009 | später klärbar                     | durch Porsche zu entscheiden                                   | Benötigt Porsche regelmäßige Audit-Berichte oder nur eine Such- und Exportmöglichkeit?                 |
| Q-AUD-010 | Forschungsfrage                      | durch das Team zu entscheiden                                  | Welche Form von Revisionssicherheit kann das Projekt realistisch technisch und organisatorisch nachweisen? |

## 17. Porsche-Schnittstellen und Datenübernahme

| ID        | Zeitpunkt                            | Entscheidung                  | Frage                                                                                                   |
| --------- | ------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| Q-INT-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Gibt es wirklich keine benötigten Porsche-Schnittstellen oder ist das nur der bisherige Kenntnisstand? |
| Q-INT-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Müssen Mitarbeitende, Kostenstellen, Vorgesetzte oder Organisationsdaten importiert werden?            |
| Q-INT-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Muss ValidEat Ergebnisse an Lohnverrechnung, HR oder ein anderes System übergeben?                     |
| Q-INT-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Welche Formate, Protokolle und Aktualisierungsintervalle wären dafür vorgegeben?                      |
| Q-INT-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Welche Stelle stellt Testzugänge, Beispieldaten und technische Dokumentation bereit?                   |
| Q-INT-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden  | Wie werden fehlerhafte oder unvollständige Importdaten behandelt?                                      |
| Q-INT-007 | später klärbar                     | durch das Team zu entscheiden | Braucht die erste Version einen manuellen CSV-Import als Übergangslösung?                             |
| Q-INT-008 | später klärbar                     | durch Porsche zu entscheiden  | Müssen Schnittstellenaufrufe und Datenimporte auditierbar sein?                                        |

## 18. Hosting, Umgebungen und Verfügbarkeit

| ID        | Zeitpunkt                            | Entscheidung                                                      | Frage                                                                                                |
| --------- | ------------------------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Q-OPS-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden und mit Lehrkraft/Schule abzustimmen | Wo soll die Porsche-Version für Entwicklung, Test, Abnahme und Betrieb laufen?                      |
| Q-OPS-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                      | Ist die schuleigene Kubernetes-Cloud nur Entwicklungsumgebung oder auch möglicher Produktivbetrieb? |
| Q-OPS-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                      | Darf Porsche-Produktivdaten in einer schulischen Umgebung speichern?                                 |
| Q-OPS-004 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                     | Welche getrennten Umgebungen werden mindestens benötigt?                                            |
| Q-OPS-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                      | Welche Verfügbarkeit und zulässigen Wartungszeiten werden erwartet?                                |
| Q-OPS-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                      | Welche Backup-, Wiederherstellungs- und Notfallanforderungen gelten?                                 |
| Q-OPS-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                      | Wer betreibt, überwacht und aktualisiert das System nach der Auslieferung?                          |
| Q-OPS-008 | später klärbar                     | durch das Team zu entscheiden                                     | Welche Monitoring-, Alarmierungs- und Diagnosefunktionen werden technisch vorgesehen?                |
| Q-OPS-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                      | Welche Browser, Geräte und Netzwerke müssen unterstützt werden?                                   |
| Q-OPS-010 | später klärbar                     | mit Lehrkraft/Schule abzustimmen                                  | Welche Ressourcen und Einschränkungen besitzt die schulische Cloud tatsächlich?                    |

## 19. Offline-Verhalten, PWA und Fehlerfälle

| ID        | Zeitpunkt                            | Entscheidung                                                   | Frage                                                                                                                 |
| --------- | ------------------------------------ | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Q-OFF-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Muss die Mitarbeitendenerfassung ohne Netzwerkverbindung funktionieren?                                               |
| Q-OFF-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Muss auch die HR-Erfassung offline funktionieren?                                                                     |
| Q-OFF-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche Daten dürfen dafür lokal auf dem Gerät gespeichert werden?                                                  |
| Q-OFF-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden und durch das Team zu entscheiden | Wann und wie werden Offline-Einträge synchronisiert?                                                                 |
| Q-OFF-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wie werden Konflikte zwischen lokalem und serverseitigem Stand gelöst?                                               |
| Q-OFF-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche Rückmeldung erhält eine Person, wenn eine Erfassung nur lokal gespeichert ist?                               |
| Q-OFF-007 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie wird eine doppelte Übertragung nach Wiederverbindung verhindert?                                                 |
| Q-OFF-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Was soll bei Serverausfall, Zeitüberschreitung oder ungültiger Sitzung passieren?                                   |
| Q-OFF-009 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Darf eine Erfassung bei unbekanntem Regel- oder Stammdatenstand offline angenommen werden?                            |
| Q-OFF-010 | später klärbar                     | durch das Team zu entscheiden                                  | Soll ValidEat als installierbare PWA angeboten werden?                                                                |
| Q-OFF-011 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie werden lokale personenbezogene Daten bei Abmeldung, Geräteverlust und gemeinsam verwendeten Geräten geschützt? |

## 20. Porsche-Release und Auslieferung

| ID        | Zeitpunkt                            | Entscheidung                                                   | Frage                                                                                                                   |
| --------- | ------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Q-REL-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden und durch das Team zu entscheiden | Welche Bestandteile gehören zur Porsche-Auslieferung?                                                                  |
| Q-REL-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welcher Source-Code muss Porsche übergeben werden?                                                                     |
| Q-REL-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche technische, betriebliche und fachliche Dokumentation wird erwartet?                                              |
| Q-REL-004 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie wird der Porsche-Stand mit Tag, Release und Versionsnummer reproduzierbar markiert?                                 |
| Q-REL-005 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie wird sichergestellt, dass später keine zweite kopierte Codebasis entsteht?                                         |
| Q-REL-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche Lizenz- und Nutzungsrechte gelten für Porsche und für die spätere SaaS-Weiterentwicklung?                     |
| Q-REL-007 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wie erhält Porsche die Auslieferung, wenn kein Zugriff auf das interne vollständige GitHub-Repository vorgesehen ist? |
| Q-REL-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Muss Porsche spätere Fehlerbehebungen oder Sicherheitsupdates für seinen Release erhalten?                            |
| Q-REL-009 | später klärbar                     | durch das Team zu entscheiden                                  | Wie werden spätere allgemeine Änderungen bei Bedarf auf den Porsche-Stand zurückgeführt?                            |
| Q-REL-010 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Welche Abnahme ist erforderlich, bevor ein Release als stabil bezeichnet werden darf?                                   |

## 21. SaaS-Mandantenfähigkeit

| ID        | Zeitpunkt | Entscheidung                  | Frage                                                                                             |
| --------- | --------- | ----------------------------- | ------------------------------------------------------------------------------------------------- |
| Q-SAA-001 | nur SaaS  | durch das Team zu entscheiden | Welche Arten von Unternehmen soll die spätere SaaS-Plattform unterstützen?                      |
| Q-SAA-002 | nur SaaS  | durch das Team zu entscheiden | Was ist fachlich ein Mandant und kann ein Unternehmen mehrere Organisationen besitzen?            |
| Q-SAA-003 | nur SaaS  | durch das Team zu entscheiden | Welche Daten müssen zwischen Mandanten strikt getrennt werden?                                   |
| Q-SAA-004 | nur SaaS  | durch das Team zu entscheiden | Wird die Trennung über Datenbank, Schema, Zeilen oder eine andere Architektur umgesetzt?         |
| Q-SAA-005 | nur SaaS  | durch das Team zu entscheiden | Wer legt Mandanten an und verwaltet globale Einstellungen?                                        |
| Q-SAA-006 | nur SaaS  | durch das Team zu entscheiden | Welche Rollen existieren global und welche nur innerhalb eines Mandanten?                         |
| Q-SAA-007 | nur SaaS  | durch das Team zu entscheiden | Welche Clearing-Regeln können je Mandant konfiguriert werden?                                    |
| Q-SAA-008 | nur SaaS  | durch das Team zu entscheiden | Können Markerlstufen, Währungen, Perioden und Freigaben je Mandant variieren?                   |
| Q-SAA-009 | nur SaaS  | durch das Team zu entscheiden | Welche Datenexport- und Löschmöglichkeiten braucht ein Mandant?                                 |
| Q-SAA-010 | nur SaaS  | durch das Team zu entscheiden | Wie wird verhindert und geprüft, dass Daten zwischen Mandanten sichtbar werden?                  |
| Q-SAA-011 | nur SaaS  | durch das Team zu entscheiden | Welche Verfügbarkeits-, Backup- und Skalierungsziele gelten für SaaS?                           |
| Q-SAA-012 | nur SaaS  | durch das Team zu entscheiden | Welches Geschäfts- oder Preismodell wird später geprüft, ohne es zum Porsche-Umfang zu machen? |

## 22. Branding und optionale Module

| ID        | Zeitpunkt        | Entscheidung                  | Frage                                                                                                   |
| --------- | ---------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| Q-BRN-001 | nur SaaS         | durch das Team zu entscheiden | Welche Branding-Elemente sollen je Unternehmen konfigurierbar sein?                                     |
| Q-BRN-002 | nur SaaS         | durch das Team zu entscheiden | Wer darf Logo, Farben, Texte und Kontaktinformationen ändern?                                          |
| Q-BRN-003 | nur SaaS         | durch das Team zu entscheiden | Welche Barrierefreiheits- und Kontrastregeln müssen trotz Branding eingehalten werden?                 |
| Q-BRN-004 | später klärbar | durch Porsche zu entscheiden  | Benötigt bereits die Porsche-Version ein bestimmtes Logo, Farbschema oder verbindliche Designvorgaben? |
| Q-MOD-001 | nur SaaS         | durch das Team zu entscheiden | Welche Funktionen sollen als aktivierbare Module angeboten werden?                                      |
| Q-MOD-002 | nur SaaS         | durch das Team zu entscheiden | Können Module Abhängigkeiten voneinander besitzen?                                                    |
| Q-MOD-003 | nur SaaS         | durch das Team zu entscheiden | Was passiert mit Daten, wenn ein Modul deaktiviert wird?                                                |
| Q-MOD-004 | nur SaaS         | durch das Team zu entscheiden | Müssen Rollen und Navigation automatisch an aktive Module angepasst werden?                            |

## 23. Restaurant, Scanner, QR und OCR

| ID        | Zeitpunkt        | Entscheidung                                                   | Frage                                                                                                  |
| --------- | ---------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Q-RES-001 | später klärbar | durch Porsche zu entscheiden                                   | Benötigt Porsche in der ersten Version überhaupt einen digitalen Restaurantbereich?                  |
| Q-RES-002 | nur SaaS         | durch das Team zu entscheiden                                  | Welche Aufgaben hätte ein allgemeines Restaurant-Portal?                                              |
| Q-RES-003 | nur SaaS         | durch das Team zu entscheiden                                  | Können Restaurants mehreren Unternehmen oder Mandanten zugeordnet sein?                               |
| Q-RES-004 | nur SaaS         | durch das Team zu entscheiden                                  | Welche Daten dürfen Restaurants über Mitarbeitende oder Abrechnungen sehen?                          |
| Q-SCN-001 | später klärbar | durch Porsche zu entscheiden und durch das Team zu entscheiden | Welches konkrete Problem soll ein Scanner gegenüber manueller Eingabe lösen?                         |
| Q-SCN-002 | später klärbar | durch Porsche zu entscheiden                                   | Befindet sich bereits ein maschinenlesbarer Code auf den physischen Markerln?                          |
| Q-SCN-003 | nur SaaS         | durch das Team zu entscheiden                                  | Soll ein QR-Code einen einzelnen Vorgang, eine Person, ein Restaurant oder ein Markerl identifizieren? |
| Q-SCN-004 | später klärbar | durch das Team zu entscheiden                                  | Welche Geräte, Browser und Kameraberechtigungen müssen unterstützt werden?                          |
| Q-SCN-005 | später klärbar | durch das Team zu entscheiden                                  | Muss der Scanner offline arbeiten und wie werden doppelte Scans verhindert?                            |
| Q-SCN-006 | Forschungsfrage  | durch das Team zu entscheiden                                  | Ist OCR bei den tatsächlichen Handschriften und Markerln ausreichend zuverlässig?                    |
| Q-SCN-007 | Forschungsfrage  | durch das Team zu entscheiden                                  | Welche Fehlerquote und manuelle Nachkontrolle wären bei OCR akzeptabel?                               |
| Q-SCN-008 | später klärbar | durch Porsche zu entscheiden                                   | Dürfen Fotos physischer Markerl gespeichert werden und falls ja, wie lange?                           |

## 24. Usability und Barrierefreiheit

| ID       | Zeitpunkt                            | Entscheidung                                                       | Frage                                                                                                           |
| -------- | ------------------------------------ | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Q-UX-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                       | Welche Benutzergruppen und typischen Nutzungssituationen müssen in der Porsche-Version berücksichtigt werden? |
| Q-UX-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                       | Welche Geräte verwenden Mitarbeitende, HR und Vorgesetzte tatsächlich?                                        |
| Q-UX-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                       | Welche Sprachen muss die Oberfläche unterstützen?                                                             |
| Q-UX-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                       | Gibt es Porsche-interne UX-, Design- oder Barrierefreiheitsvorgaben?                                            |
| Q-UX-005 | später klärbar                     | durch das Team zu entscheiden                                      | Welche Kernaufgaben werden in Usability-Tests geprüft?                                                         |
| Q-UX-006 | später klärbar                     | durch das Team zu entscheiden und mit Lehrkraft/Schule abzustimmen | Mit welchen Personen und unter welchen Datenschutzbedingungen dürfen Usability-Tests durchgeführt werden?     |
| Q-UX-007 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                      | Welches Barrierefreiheitsniveau wird angestrebt, beispielsweise WCAG 2.2 AA?                                    |
| Q-UX-008 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                      | Müssen alle Kernabläufe per Tastatur und mit Screenreader bedienbar sein?                                     |
| Q-UX-009 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                      | Wie werden verständliche Fehlermeldungen, Fokusführung und Statusrückmeldungen geprüft?                     |
| Q-UX-010 | später klärbar                     | durch das Team zu entscheiden                                      | Welche messbaren Usability-Ziele gelten für Erfassungsdauer, Fehlerquote oder benötigte Schritte?             |

## 25. Performance, Skalierung und technische Qualität

| ID        | Zeitpunkt                            | Entscheidung                                                   | Frage                                                                                                |
| --------- | ------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Q-NFR-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wie viele Beschäftigte, Restaurants und Einträge werden für die Porsche-Version erwartet?         |
| Q-NFR-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Mit welchen Spitzenlasten ist am Tages- oder Periodenende zu rechnen?                                |
| Q-NFR-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden und durch das Team zu entscheiden | Welche maximale Antwortzeit ist für Erfassung, Suche, Clearing und Export akzeptabel?               |
| Q-NFR-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Wie lange darf ein Perioden-Clearing oder Export dauern?                                             |
| Q-NFR-005 | später klärbar                     | durch das Team zu entscheiden                                  | Welche Skalierungsziele gelten für die spätere SaaS-Plattform?                                     |
| Q-NFR-006 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Welche automatisierten Tests sind für Frontend, Backend, Clearing und Berechtigungen verpflichtend? |
| Q-NFR-007 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Welche Browser- und Gerätekompatibilität wird technisch getestet?                                  |
| Q-NFR-008 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Welche Qualitätsprüfungen müssen vor einem Porsche-Release erfolgreich sein?                      |
| Q-NFR-009 | später klärbar                     | durch das Team zu entscheiden                                  | Welche Wartbarkeit, Dokumentation und Aktualisierbarkeit wird für die Übergabe gefordert?          |

## 26. Sicherheit

| ID        | Zeitpunkt                            | Entscheidung                                                   | Frage                                                                                                      |
| --------- | ------------------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Q-SEC-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Gibt es verbindliche Porsche-Sicherheitsrichtlinien oder einen vorgeschriebenen Prüfprozess?              |
| Q-SEC-002 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Welche Bedrohungen werden für Konten, Sessions, APIs, Exporte und lokale PWA-Daten betrachtet?            |
| Q-SEC-003 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie wird jede API-Operation serverseitig autorisiert?                                                      |
| Q-SEC-004 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie werden Eingaben validiert und typische Webangriffe verhindert?                                         |
| Q-SEC-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden und durch das Team zu entscheiden | Welche Verschlüsselung ist bei Übertragung, Speicherung und Backups erforderlich?                        |
| Q-SEC-006 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie werden Secrets verwaltet und aus Repository, Logs und Images ferngehalten?                             |
| Q-SEC-007 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie werden Abhängigkeiten, Container und Images auf bekannte Schwachstellen geprüft?                     |
| Q-SEC-008 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden                                   | Ist vor Abnahme ein Penetrationstest oder eine andere externe Sicherheitsprüfung nötig?                  |
| Q-SEC-009 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden                                  | Wie werden Replay, Weitergabe und Screenshot-Missbrauch bei digitalen Nachweisen verhindert oder begrenzt? |
| Q-SEC-010 | später klärbar                     | durch Porsche zu entscheiden                                   | Wie werden Sicherheitsvorfälle gemeldet, behandelt und nachverfolgt?                                      |

## 27. Abnahme und Freigaben

| ID        | Zeitpunkt                            | Entscheidung                     | Frage                                                                               |
| --------- | ------------------------------------ | -------------------------------- | ----------------------------------------------------------------------------------- |
| Q-ACC-001 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Wer ist fachlich berechtigt, Anforderungen für Porsche zu bestätigen?             |
| Q-ACC-002 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Wer nimmt die Porsche-Version fachlich und technisch ab?                            |
| Q-ACC-003 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Welche Testfälle, Daten und Szenarien gehören zur Abnahme?                        |
| Q-ACC-004 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Welche Fehlerklassen verhindern eine Abnahme?                                       |
| Q-ACC-005 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Muss ein Pilotbetrieb durchgeführt werden und mit welchem Umfang?                  |
| Q-ACC-006 | vor Porsche-Implementierung zwingend | durch Porsche zu entscheiden     | Welche Dokumente oder Protokolle belegen eine Abnahme?                              |
| Q-ACC-007 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden    | Wann gilt eine Anforderung intern als `implemented` und wann als `verified`?    |
| Q-ACC-008 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden    | Wie werden Änderungen an einer bereits geprüften FSD nachvollziehbar freigegeben? |
| Q-ACC-009 | später klärbar                     | mit Lehrkraft/Schule abzustimmen | Welche Nachweise braucht die Schule zusätzlich zur Porsche-Abnahme?                |

## 28. Forschung und Blockchain

| ID        | Zeitpunkt        | Entscheidung                                                       | Frage                                                                                                                |
| --------- | ---------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| Q-RSH-001 | Forschungsfrage  | durch das Team zu entscheiden und mit Lehrkraft/Schule abzustimmen | Welche konkrete Forschungsfrage soll die Blockchain- oder Smart-Contract-Evaluierung beantworten?                    |
| Q-RSH-002 | Forschungsfrage  | durch das Team zu entscheiden                                      | Welches reale Problem würde Blockchain lösen, das eine klassische Datenbank mit Audit-Log nicht ausreichend löst? |
| Q-RSH-003 | Forschungsfrage  | durch das Team zu entscheiden                                      | Welche Alternativen werden anhand welcher Kriterien verglichen?                                                      |
| Q-RSH-004 | Forschungsfrage  | durch das Team zu entscheiden                                      | Welche Auswirkungen hätten Blockchain-Lösungen auf Datenschutz, Löschung, Betrieb und Kosten?                     |
| Q-RSH-005 | Forschungsfrage  | durch das Team zu entscheiden                                      | Welche Evidenz wäre nötig, um Blockchain zu empfehlen oder sachlich abzulehnen?                                    |
| Q-RSH-006 | später klärbar | durch Porsche zu entscheiden                                       | Hat Porsche überhaupt einen fachlichen Bedarf an einer Blockchain-Lösung?                                          |
| Q-RSH-007 | Forschungsfrage  | durch das Team zu entscheiden                                      | Welche Sicherheitsgrenzen digitaler Signaturen und JWTs müssen im Bericht ausdrücklich erklärt werden?            |

## 29. Schulische Dokumentation, Quellen und KI

| ID        | Zeitpunkt                            | Entscheidung                     | Frage                                                                                                              |
| --------- | ------------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Q-SCH-001 | später klärbar                     | mit Lehrkraft/Schule abzustimmen | Welche Struktur schreibt das LaTeX-Schul-Template tatsächlich vor?                                                |
| Q-SCH-002 | später klärbar                     | mit Lehrkraft/Schule abzustimmen | Welcher Zitierstil ist vorgeschrieben oder zulässig?                                                              |
| Q-SCH-003 | später klärbar                     | mit Lehrkraft/Schule abzustimmen | Ist ein technischer numerischer Zitierstil wie IEEE zulässig, falls das Template nichts festlegt?                 |
| Q-SCH-004 | vor Porsche-Implementierung zwingend | mit Lehrkraft/Schule abzustimmen | Wie vollständig müssen KI-Prompts und Gesprächsverläufe im Repository abgelegt werden?                         |
| Q-SCH-005 | später klärbar                     | mit Lehrkraft/Schule abzustimmen | Welche Kennzeichnung wird für KI-generierte oder KI-überarbeitete Inhalte verlangt?                              |
| Q-SCH-006 | später klärbar                     | mit Lehrkraft/Schule abzustimmen | Welche Nachweise sind nötig, damit die Leistungen von Erik, Julian und Joschua getrennt beurteilt werden können? |
| Q-SCH-007 | später klärbar                     | durch das Team zu entscheiden    | Wie werden Quellen aus dem Google Sheet geprüft und mit `SRC-`-IDs ins Repository übernommen?                  |
| Q-SCH-008 | später klärbar                     | durch das Team zu entscheiden    | Wie wird der tatsächliche Verwendungszweck einer Quelle in Changes und Berichten dokumentiert?                    |

## 30. Teamprüfung und Entscheidungsprozess

| ID        | Zeitpunkt                            | Entscheidung                  | Frage                                                                                                |
| --------- | ------------------------------------ | ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| Q-GOV-001 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden | Wie geben Julian und Joschua ihr Review zu Eriks Antworten nachvollziehbar ab?                       |
| Q-GOV-002 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden | Müssen beide Teammitglieder jede Antwort prüfen oder nur ihren Verantwortungsbereich?              |
| Q-GOV-003 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden | Wie werden unterschiedliche Meinungen im Team dokumentiert und entschieden?                          |
| Q-GOV-004 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden | Wer darf den Status einer FSD-Anforderung auf `approved` setzen und für wessen Freigabe gilt das? |
| Q-GOV-005 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden | Wie werden Porsche-Antworten und Freigaben mit Datum, Person und Grundlage nachgewiesen?             |
| Q-GOV-006 | später klärbar                     | durch das Team zu entscheiden | Wie werden spätere FSD-Änderungen mit Issues, Changes und Git-Verlauf verbunden?                   |
| Q-GOV-007 | vor Porsche-Implementierung zwingend | durch das Team zu entscheiden | Welche Antworten müssen zwingend vor Architektur- oder Produktcode geklärt sein?                   |
| Q-GOV-008 | später klärbar                     | durch das Team zu entscheiden | In welchem Rhythmus wird die FSD überprüft und aktualisiert?                                       |

## Antwort- und Reviewstatus

Dieser Abschnitt wird nach Eriks erster Antwortrunde aktualisiert.

| Schritt                                 | Status | Nachweis             |
| --------------------------------------- | ------ | -------------------- |
| Fragen durch Erik beantwortet           | offen  | noch nicht vorhanden |
| Antworten durch Julian geprüft         | offen  | noch nicht vorhanden |
| Antworten durch Joschua geprüft        | offen  | noch nicht vorhanden |
| Widersprüche gesammelt                 | offen  | noch nicht vorhanden |
| Porsche-Fragen zur Klärung vorbereitet | offen  | noch nicht vorhanden |
| Schulfragen zur Klärung vorbereitet    | offen  | noch nicht vorhanden |
| FSD aus geprüftem Stand erstellt       | offen  | noch nicht vorhanden |
