# Nachweis: Restaurant- und SaaS-Plattform im Figma-Prototyp erweitern

## Metadaten

| Feld                    | Wert                      |
| ----------------------- | ------------------------- |
| Change-ID               | `VAL-006`               |
| Status                  | `implemented`           |
| Verantwortlich          | Erik Bergmair             |
| Beginn                  | 2026-07-30                |
| Abschluss               | noch nicht abgeschlossen  |
| Tatsächlicher Zeitraum | 2026-07-30 bis 2026-08-10 |

## Herkunft und Sicherheit

- Nachträglich dokumentiert am: `2026-08-10`
- Rekonstruierter Zeitraum: `2026-07-30 bis 2026-08-10`
- Grundlage: Eriks Angaben im Gespräch, vorhandener Figma-Link, vorhandener Change-Ordner, Screenshot der Zeiterfassung und bestehende ValidEat-Dokumentation
- Exakter ursprünglicher Zeitpunkt: nur für die im Screenshot sichtbaren Zeiteinträge bekannt

## Git- und GitHub-Nachweise

| Nachweis     | Referenz                                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------- |
| Issue        | nicht festgestellt                                                                                              |
| Branch       | `main`                                                                                                        |
| Pull Request | nicht vorhanden                                                                                                 |
| Commits      | nicht vorhanden; Figma-Arbeit selbst erzeugt keinen Git-Commit                                                  |
| Figma-Datei  | [ValidEat in Figma](https://www.figma.com/design/VBtBtXDB2mzApytOZSV2oi/ValidEat?node-id=0-1&t=NBOaTKoaEOCxzTvz-1) |

## Zeiterfassung laut Screenshot

Diese Zeiten stammen aus dem von Erik bereitgestellten Screenshot der Zeiterfassung. Sie werden nicht als automatisch verifizierte Git-Zeiten behandelt.

| Datum      | Bereich laut Screenshot | Zeitraum     | Dauer   | Einordnung                                      |
| ---------- | ----------------------- | ------------ | ------- | ----------------------------------------------- |
| 2026-07-30 | Figma #22 – ValidEat   | 17:37–21:30 | 3:53:42 | Restaurant-/SaaS-Figmaarbeit                    |
| 2026-07-31 | Figma #22 – ValidEat   | 16:49–19:53 | 3:04:06 | Restaurant-/SaaS-Figmaarbeit                    |
| 2026-08-01 | Figma #22 – ValidEat   | 14:49–18:05 | 3:15:48 | Restaurant-/SaaS-Figmaarbeit                    |
| 2026-08-03 | Figma #22 – ValidEat   | 10:04–14:23 | 4:19:00 | Restaurant-/SaaS-Figmaarbeit                    |
| 2026-08-09 | Figma #22 – ValidEat   | 09:39–17:28 | 7:48:35 | Restaurant-/SaaS-Figmaarbeit                    |
| 2026-08-10 | Figma #22 – ValidEat   | 09:40–09:52 | 0:11:42 | kurzer Abschluss- beziehungsweise Nachziehstand |

Sichtbare Figma-Zeit für diesen Change: `22:32:53`.

## Tatsächlich umgesetzte Funktionen

- Der Change-Ordner für die Restaurant- und SaaS-Erweiterung wurde angelegt.
- Proposal, Design, Aufgabenliste und Nachweisdatei wurden als Planungsgrundlage erstellt.
- Der Umfang wurde als spätere Plattform- und Prototyperweiterung abgegrenzt.
- Offene Fragen zu Restaurant-Scan, Datenschutz, Restaurant-Admin, SaaS-Modulen und Branding wurden festgehalten.
- Der Restaurant-Scan wurde für den ersten Konzeptstand als QR-Code-Flow ohne manuelle Codeeingabe gestaltet.
- Die Restaurant-Oberfläche wurde auf serverseitige Echtzeitprüfung und direkte Ergebnisanzeige ausgerichtet.
- Für den Restaurant-Scan wurde Datenminimierung festgehalten: keine vollständigen personenbezogenen Daten, sondern Status, Stufe, Standort, Zeitpunkt und Begründung.
- Mehrere Restaurants beziehungsweise Standorte wurden im Konzept berücksichtigt.
- Der Restaurant-Adminbereich wurde bewusst auf Übersicht, Einlösungen, Abrechnung und Einstellungen begrenzt.
- Die SaaS-Plattform wurde als assistierter Setup- und Verwaltungsbereich beschrieben.
- Modulverwaltung, Organisation und Regeln, Branding und Kundenübersicht wurden als SaaS-Seiten ausgearbeitet.
- Branding wurde mit Konfiguration und Vorschau dargestellt.
- Es wurden Figma-Seiten erstellt, aber kein vollständiger klickbarer Gesamtprototyp berichtet.
- Es wurde kein Produktcode im Rahmen dieses Changes umgesetzt.

## Tatsächlich erstellte Figma-Seiten

### Restaurant User

1. Login
2. Restaurant wählen
3. Overview
4. QR-Code scannen
5. Ergebnis: erfolgreich
6. Ergebnis: bereits eingelöst
7. Ergebnis: ungültig oder abgelaufen
8. Ergebnis: für diesen Standort nicht gültig
9. Ergebnis: Prüfung nicht möglich, zum Beispiel ohne Serververbindung
10. Verlauf
11. Detailansicht eines Falls

### Restaurant Admin

1. Übersicht
2. Einlösungen als Übersicht aller eingelösten Markerl
3. Abrechnung
4. Einstellungen

### SaaS

1. Login
2. Register
3. Setup mit Schritt-für-Schritt-Anleitung
4. Dashboard
5. Module verwalten
6. Organisation und Regeln
7. Branding
8. Branding-Vorschau
9. Kundenübersicht

## Betroffene Dateien

| Datei                                                                                     | Tatsächliche Änderung                                                                                    |
| ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `docs/members/erik/changes/active/VAL-006-design-restaurant-saas-prototype/proposal.md` | Ziel, Umfang, Nicht-Umfang, tatsächlichen Figma-Stand, Akzeptanzkriterien und offene Fragen aktualisiert. |
| `docs/members/erik/changes/active/VAL-006-design-restaurant-saas-prototype/design.md`   | tatsächlich ausgearbeitete Restaurant- und SaaS-Seiten ergänzt.                                          |
| `docs/members/erik/changes/active/VAL-006-design-restaurant-saas-prototype/tasks.md`    | erledigte Figma-Aufgaben abgehakt und nicht erledigte Prüfungen offen gelassen.                           |
| `docs/members/erik/changes/active/VAL-006-design-restaurant-saas-prototype/evidence.md` | tatsächlichen Figma-Stand, Zeiterfassung, Einschränkungen und Nachweise dokumentiert.                    |
| `docs/members/erik/design/README.md`                                                    | zentralen Designverweis um Restaurant- und SaaS-Figma-Stand ergänzt.                                      |

## Akzeptanzkriterien

| Kriterium                                                                                                  | Ergebnis                          | Nachweis                                                                                          |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------- |
| Die Restaurant-Plattform ist klar als spätere beziehungsweise optionale Erweiterung beschrieben.          | erfüllt                          | Proposal, Design und Nicht-Umfang                                                                 |
| Der mobile QR-Scanflow ist als zusammenhängender Benutzerablauf geplant.                                  | erfüllt                          | Restaurant-User-Screens in Figma                                                                  |
| Die wichtigsten Scan-Ergebniszustände sind im Design berücksichtigt.                                     | erfüllt                          | erfolgreich, bereits eingelöst, ungültig/abgelaufen, falscher Standort, Prüfung nicht möglich |
| Der Restaurant-Adminbereich ist bewusst klein gehalten und auf Einlösungen sowie Abrechnung ausgerichtet. | erfüllt                          | Restaurant-Admin-Screens                                                                          |
| Die SaaS-Plattform enthält einen verständlichen Onboarding- und Verwaltungsablauf für Unternehmen.      | erfüllt                          | Setup, Dashboard, Module, Organisation und Regeln, Branding                                       |
| Die Modulverwaltung unterscheidet zwischen Verwaltungs- und Einrichtungszuständen.                        | teilweise erfüllt                | Seite „Module verwalten“ vorhanden; genaue Modulzustände nicht fachlich geprüft               |
| Die Branding-Konfiguration zeigt Logo, App-Name, Farben und Vorschau ohne reales Kundenbranding.           | teilweise erfüllt                | Branding und Branding-Vorschau vorhanden; genaue erlaubte Optionen offen                          |
| Offene fachliche Fragen sind als offene Fragen oder Annahmen markiert.                                     | erfüllt für den aktuellen Stand | Proposal und bekannte Einschränkungen                                                            |
| Der geplante Screenumfang ist realistisch für einen Figma-Prototyp und spätere Angular-Umsetzung.        | erfüllt als Entwurfsstand        | Seitenumfang dokumentiert; Review offen                                                           |
| Es wird kein Produktcode erstellt und keine fachliche Freigabe behauptet.                                  | erfüllt                          | nur Dokumentation geändert; Figma-Arbeit bleibt UI/UX-Entwurf                                    |

## Abweichungen vom Design

- Es wurde kein vollständiger klickbarer Gesamtprototyp erstellt. Die Seiten wurden einzeln ausgearbeitet.
- Ein separates Einlösungsdetail im Restaurant-Adminbereich wurde nicht als eigener finaler Screen berichtet; Detailansicht wurde nur für Restaurant User genannt.
- Ein separates Moduldetail im SaaS-Bereich wurde nicht als eigener finaler Screen berichtet; es gibt die Seite „Module verwalten“.
- Ein interner ValidEat-Adminbereich wurde im Konzept erwähnt, aber in der tatsächlich berichteten Screenliste nicht als eigener ausgearbeiteter Bereich genannt.
- Open-Questions- oder Variantenbereich wurde nicht als eigener Figma-Bereich berichtet.

## Ausgeführte Prüfungen

| Datum      | Prüfung oder Befehl                                        | Umgebung          | Ergebnis                                                          | Status    |
| ---------- | ----------------------------------------------------------- | ----------------- | ----------------------------------------------------------------- | --------- |
| 2026-07-30 | Prüfung bestehender Change-Ordner und Templates            | lokal             | vorhandene Struktur und nächste freie Change-ID geprüft         | bestanden |
| 2026-07-30 | Anlage der vier Change-Dokumente                            | lokal             | Dokumente wurden angelegt                                         | bestanden |
| 2026-07-30 | Ergänzung der Restaurant- und SaaS-Konzeptentscheidungen   | lokal             | Proposal, Design, Tasks und Evidence wurden aktualisiert          | bestanden |
| 2026-08-10 | Abgleich des tatsächlichen Figma-Standes mit Eriks Angaben | lokal / Gespräch | Screenlisten, Figma-Link und sichtbare Zeiterfassung dokumentiert | bestanden |

Nicht ausgeführte Prüfungen:

- Der Restaurant-Scanflow wurde nicht als vollständiger klickbarer Gesamtprototyp durchgeklickt.
- Fachliches Teamreview wurde noch nicht durchgeführt.
- Porsche-Freigabe wurde nicht durchgeführt und ist für diesen SaaS-/Restaurant-Erweiterungsstand nicht behauptet.
- Usability- oder Barrierefreiheitsprüfung wurde noch nicht durchgeführt.
- Technische Angular-Umsetzung wurde nicht begonnen.

## Bekannte Einschränkungen

- Die FSD enthält noch keine ausgearbeiteten Anforderungen für Restaurant- und SaaS-Erweiterungen.
- Restaurant und SaaS sind spätere beziehungsweise optionale Plattformbereiche und nicht automatisch Porsche-Pflichtumfang.
- QR-Code-Inhalt, Gültigkeitslogik und Sicherheitsregeln sind noch nicht verbindlich abgestimmt.
- Datenschutzumfang im Restaurant-Scan ist vorläufig auf minimale Ergebnisdaten reduziert, aber noch nicht formal geprüft.
- Modulverwaltung, Mandantenfähigkeit und Branding-Regeln sind noch nicht teamweit beschlossen.
- Restaurant-Abrechnung und Export können Joschuas Reporting- und Exportbereich berühren.
- Backend-Endpunkte und Datenmodelle sind noch nicht verbindlich festgelegt.
- Es gibt Figma-Seiten, aber keinen vollständig klickbaren End-to-End-Prototyp.
- Der Porsche-Kernstand wurde laut Erik fertiggestellt und als Release ausgeliefert. Der genaue Release-Link, Tag oder Hash wurde in diesem Change nicht festgestellt.

## Eigene Leistung von Erik

Erik verantwortet die UI/UX-Konzeption und Figma-Ausarbeitung der Restaurant- und SaaS-Erweiterung. Dazu gehören Restaurant User, Restaurant Admin und SaaS-Verwaltungsseiten. Backend, Mandantenfähigkeit, Sicherheit, Reporting, Export und endgültige fachliche Freigaben müssen mit den zuständigen Teammitgliedern abgestimmt werden.

## Review

| Datum      | Prüfende Person | Gegenstand                 | Ergebnis                                       | Offene Punkte                                                |
| ---------- | ---------------- | -------------------------- | ---------------------------------------------- | ------------------------------------------------------------ |
| 2026-07-30 | Erik Bergmair    | erster Planungsstand       | angelegt, noch nicht fachlich reviewed         | Restaurant-Scan, Datenschutz, Module, Branding, Teamabgleich |
| 2026-08-10 | Erik Bergmair    | tatsächlicher Figma-Stand | Screenlisten und Einschränkungen dokumentiert | Teamreview, vollständiger Klickprototyp, FSD-Abgleich       |

## Verwendete Quellen

Keine neuen externen Quellen verwendet. Grundlage waren der bestehende Figma-Prototyp, Eriks Angaben und der sichtbare Zeiterfassungsscreenshot.

## KI-Unterstützung

| KI-ID | Gesprächsdatei | Unterstützung | Prüfung und Verwendung |
| ----- | --------------- | -------------- | ----------------------- |

## Abschlusscheckliste

- [X] Tatsächlicher Umfang ist für den aktuellen Figma-Stand dokumentiert.
- [X] Akzeptanzkriterien haben einen ehrlichen Prüfstatus.
- [X] Ausgeführte und nicht ausgeführte Prüfungen sind getrennt.
- [X] Abweichungen und Einschränkungen sind sichtbar.
- [X] Eigene und gemeinsame Leistungen sind getrennt.
- [X] Quellen und KI-Unterstützung sind eingetragen oder als nicht vorhanden markiert.
- [X] Git- und Review-Nachweise sind eingetragen oder als nicht vorhanden markiert.
- [X] Der Status entspricht dem tatsächlichen Stand `implemented`; vollständiger Klickprototyp, Review und fachliche Freigabe stehen noch aus.
