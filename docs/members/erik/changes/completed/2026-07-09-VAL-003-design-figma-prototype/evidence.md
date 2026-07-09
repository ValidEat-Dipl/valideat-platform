# Nachweis: ValidEat-Prototyp in Figma entwerfen

## Metadaten

| Feld                                      | Wert                                                     |
| ----------------------------------------- | -------------------------------------------------------- |
| Change-ID                                 | `VAL-003`                                              |
| Status                                    | `implemented`                                          |
| Verantwortlich                            | Erik Bergmair                                            |
| Beginn                                    | 2026-07-06                                               |
| Fertigstellung des Prototyps berichtet am | 2026-07-08                                               |
| Abschluss des Changes                     | 2026-07-09, als persönlicher Designnachweis abgeschlossen |

## Aktueller tatsächlicher Stand

- Change für die Figma-Arbeit wurde angelegt.
- Ziel, vorläufiger Umfang, Vorgehensweise und Aufgaben wurden dokumentiert.
- Eine Figma-Datei wurde erstellt und zentral unter `docs/members/erik/design/README.md` verlinkt.
- Ein erster User Flow wurde erstellt.
- Ein Moodboard wurde als visuelle Orientierung erstellt.
- Wireframe-Komponenten wurden ausgearbeitet und an Bootstrap 5.3 ausgerichtet.
- Bootstrap 5.3 mit eigener SCSS-Anpassung wurde als spätere UI-Grundlage gewählt; Angular Material wird nicht zusätzlich eingesetzt.
- Der HR-/Admin-Prototyp umfasst zwölf Screens.
- Der mobile Mitarbeiterprototyp umfasst neun Screens.
- Beide Prototypbereiche sind laut Erik vollständig in Figma verknüpft.
- Der Change wird als persönlicher Figma- und Designnachweis abgeschlossen. Das bedeutet keine fachliche Porsche-Freigabe und keine abgeschlossene technische Umsetzung.

## Designnachweis

| Nachweis      | Referenz                                                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Figma-Datei   | [ValidEat in Figma](https://www.figma.com/design/VBtBtXDB2mzApytOZSV2oi/ValidEat?node-id=0-1)                                 |
| Figma-Seiten  | User Flow, Moodboard, Komponenten, HR/Admin-Prototyp und mobiler Mitarbeiterprototyp vorhanden                             |
| Prototyp-Link | [ValidEat klickbarer Prototyp](https://www.figma.com/proto/VBtBtXDB2mzApytOZSV2oi/ValidEat?node-id=110-453&p=f&viewport=811%2C-2824%2C0.45&t=c5HMaP9FdWinVE8m-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=110%3A453&page-id=0%3A1&show-proto-sidebar=1) |

## Tatsächlich erstellte Screens

### HR-/Admin-Plattform – 12 Screens

1. Login
2. Register
3. Übersicht
4. Zuletzt erstellte Markerl
5. Markerl hinzufügen
6. Markerl-Detail
7. Markerl korrigieren
8. Markerl-Korrektur prüfen
9. Clearing
10. Clearing-Konflikt
11. Konflikte
12. Export

### Mobile Webanwendung – 9 Screens

1. Welcome
2. Login
3. Register
4. Start
5. Verwendung erstellen
6. Angabe prüfen
7. Daten erfasst
8. Letzte Erfassungen
9. Erfassungsdetail

## Git- und GitHub-Nachweise

| Nachweis       | Referenz                                                                                                                                                                                                   |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Branch         | `main`                                                                                                                                                                                                   |
| Issue          | [#2 – Figma Prototyp](https://github.com/ValidEat-Dipl/valideat-platform/issues/2)                                                                                                                           |
| GitHub Project | [Project-Eintrag zu Issue #2](https://github.com/orgs/ValidEat-Dipl/projects/2/views/1?pane=issue&itemId=209171820&issue=ValidEat-Dipl%7Cvalideat-platform%7C2)                                               |
| Pull Request   | nicht vorhanden                                                                                                                                                                                            |
| Commit         | [`620937a5f9297c6ddfcbe66e18ef02fa5a96d2b8`](https://github.com/ValidEat-Dipl/valideat-platform/commit/620937a5f9297c6ddfcbe66e18ef02fa5a96d2b8) – `docs: record Figma progress and close daily worklog` |

Der Commit vom 2026-07-06 dokumentiert den damaligen Zwischenstand des Changes. Die später fertiggestellten 21 Screens und ihre Verknüpfung wurden erst danach berichtet und werden daher nicht rückwirkend diesem Commit zugeschrieben.

## Ausgeführte Prüfungen

| Prüfung                          | Ergebnis                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| Struktur der Change-Dokumente     | am 2026-07-06 technisch geprüft; keine fehlerhaften relativen Links festgestellt           |
| Inhaltliche Prüfung des Umfangs  | durch Erik im Rahmen des Prototypabschlusses durchgeführt; fachliche Porsche-Prüfung offen |
| Vollständigkeit der Screenlisten | anhand von Eriks Angaben am 2026-07-08 dokumentiert                                         |
| Klickbarer Prototyp               | laut Erik vollständig verknüpft und auf die Hauptflows geprüft; unabhängige Durchklick-Prüfung nicht gesondert nachgewiesen |
| Teamreview                        | laut Aufgabenliste eingeholt; konkrete Reviewnotizen sind nicht als eigenes Protokoll dokumentiert |
| Usability-Test                    | noch nicht durchgeführt                                                                    |

## Bekannte Einschränkungen

- Die FSD und viele Porsche-Geschäftsregeln sind noch nicht bestätigt.
- Der vorläufige Prototyp kann deshalb Annahmen und Varianten enthalten.
- Annahmen zu Rollen, Clearing, Konfliktbearbeitung, Markerlstufen, Export und Freigabe müssen später mit FSD, Team und Porsche abgeglichen werden.
- Porsche-Branding und tatsächliche Zielgeräte sind noch nicht geklärt.
- Separate Fehler-, Leer- und Berechtigungszustände sind anhand der genannten Screenliste nicht vollständig nachgewiesen.
- Eine eigene Freigabe-, Ablehnungs- oder Ausdrucksansicht wurde nicht als separater Screen genannt; der umgesetzte Umfang endet bei der Exportansicht.
- Es wurde kein formaler Usability-Test durchgeführt.
- Es wurde kein vollständiger Barrierefreiheitstest durchgeführt.

## Quellen

- [SRC-006](../../../sources/sources.md#src-006--angular-material-vs-bootstrap-bei-bairesdev): Vergleich von Angular Material und Bootstrap einschließlich Vor- und Nachteilen.
- [SRC-007](../../../sources/sources.md#src-007--bootstrap-5-ui-kit-fuer-figma): praktische Referenz für Bootstrap-Komponenten in Figma.
- [SRC-008](../../../sources/sources.md#src-008--bootstrap-53-introduction): offizielle Grundlage für Mobile-first und responsive Bootstrap-Layouts.
- [SRC-009](../../../sources/sources.md#src-009--bootstrap-sass): offizielle Grundlage für die Anpassung über Sass-Variablen, Maps, Mixins und selektive Imports.
- [SRC-010](../../../sources/sources.md#src-010--bootstrap-accessibility): offizielle Einordnung der vorhandenen Accessibility-Unterstützung und ihrer Grenzen.
- [SRC-011](../../../sources/sources.md#src-011--figma-components): offizielle Figma-Grundlage für wiederverwendbare Komponenten.
- [SRC-012](../../../sources/sources.md#src-012--figma-design-systems): Orientierung für den Designsystem-Gedanken und konsistente Gestaltung.
- [SRC-013](../../../sources/sources.md#src-013--paper-prototyping-bei-nielsen-norman-group): Begründung für frühes Prototyping vor der technischen Umsetzung.
- [SRC-014](../../../sources/sources.md#src-014--designing-for-web-accessibility): Grundlage für frühe Accessibility-Überlegungen im UI-Design.
- [SRC-015](../../../sources/sources.md#src-015--wcag-2-overview): Einordnung von WCAG als späterer Accessibility-Prüfmaßstab.

## Abschlusscheckliste

- [X] Tatsächlicher Figma-Umfang dokumentiert.
- [X] Hauptflows laut Eriks Fertigmeldung im Prototyp verknüpft.
- [X] Annahmen und offene Fragen sind sichtbar.
- [X] Reviews sind mit dem aktuellen Nachweisstand dokumentiert.
- [X] Prüfungen und Einschränkungen sind ehrlich eingetragen.
- [X] Status entspricht dem aktuell berichteten Stand `implemented`.
