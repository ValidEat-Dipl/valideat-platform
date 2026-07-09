# Nachweis: Mitarbeiterfrontend für Porsche-Version vorbereiten

## Metadaten

| Feld                    | Wert                     |
| ----------------------- | ------------------------ |
| Change-ID               | `VAL-004`              |
| Status                  | `draft`                |
| Verantwortlich          | Erik Bergmair            |
| Beginn                  | 2026-07-09               |
| Abschluss               | noch nicht abgeschlossen |
| Tatsächlicher Zeitraum | ab 2026-07-09            |

## Git- und GitHub-Nachweise

| Nachweis     | Referenz             |
| ------------ | -------------------- |
| Issue        | nicht vorhanden      |
| Branch       | `main`             |
| Pull Request | nicht vorhanden      |
| Commits      | noch nicht vorhanden |

## Tatsächlich umgesetzte Funktionen

- Noch keine Produktfunktion in diesem Change umgesetzt.
- Bisher wurde nur der persönliche Change zur Vorbereitung des Mitarbeiterfrontends angelegt.

## Betroffene Dateien

| Datei                                                                            | Tatsächliche Änderung                                                                                              |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/proposal.md` | Ziel, Umfang, Nicht-Umfang, Akzeptanzkriterien und offene Fragen für das Mitarbeiterfrontend dokumentiert.          |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/design.md`   | geplante technische Umsetzung, Datenfluss, Benutzerablauf, Risiken und Teststrategie beschrieben.                    |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/tasks.md`    | überprüfbare Aufgaben für Vorbereitung, Klärung, Umsetzung, Tests, Dokumentation, Review und Abschluss angelegt. |
| `docs/members/erik/changes/active/VAL-004-build-employee-frontend/evidence.md` | Nachweisdatei für den tatsächlichen Stand angelegt.                                                                |

## Akzeptanzkriterien

| Kriterium                                                                                                                   | Ergebnis                    | Nachweis                                        |
| --------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ----------------------------------------------- |
| Der tatsächliche Angular-Ausgangsstand wurde geprüft und in `evidence.md` dokumentiert.                                 | nicht geprüft              | folgt vor der Umsetzung                         |
| Der Mitarbeiterbereich ist klar von HR-/Admin-Funktionen abgegrenzt.                                                        | teilweise erfüllt          | `proposal.md`, Abschnitt Nicht-Umfang         |
| Die umzusetzenden Figma-Screens sind im Design referenziert.                                                                | teilweise erfüllt          | `design.md`, Benutzerablauf                   |
| Offene fachliche Regeln sind als Annahmen oder offene Fragen dokumentiert.                                                  | teilweise erfüllt          | `proposal.md`, offene Fragen und Annahmen     |
| Die Hauptnavigation des Mitarbeiterflows ist geplant oder umgesetzt.                                                        | nicht erfüllt              | noch keine Umsetzung                            |
| Die Erfassung einer Markerlverwendung ist als UI-Flow umgesetzt oder als nächster konkreter Umsetzungsschritt vorbereitet. | vorbereitet                 | `tasks.md`, Implementierungsaufgaben          |
| Vorläufige Daten und Mockdaten sind klar als nicht produktiv gekennzeichnet.                                               | vorbereitet                 | `proposal.md` und `design.md`               |
| Bootstrap 5.3 und SCSS werden konsistent zur bisherigen Designentscheidung verwendet.                                       | vorbereitet                 | `design.md`, technische Lösung               |
| Nicht umgesetzte API-, Auth-, Offline- oder Porsche-Details werden nicht als erledigt dargestellt.                          | erfüllt für Planungsstand | `proposal.md`, Nicht-Umfang und offene Fragen |
| Ausgeführte Prüfungen sind mit tatsächlichem Ergebnis in `evidence.md` dokumentiert.                                   | nicht erfüllt              | noch keine Umsetzungsprüfungen ausgeführt     |

## Abweichungen vom Design

`Keine Abweichungen festgestellt. Es gibt noch keine technische Umsetzung in diesem Change.`

## Ausgeführte Prüfungen

| Datum      | Prüfung oder Befehl                                    | Umgebung | Ergebnis                  | Status    |
| ---------- | ------------------------------------------------------- | -------- | ------------------------- | --------- |
| 2026-07-09 | Anlage des Change-Ordners und der vier Change-Dokumente | lokal    | Dokumente wurden angelegt | bestanden |

Nicht ausgeführte Prüfungen:

- Angular-Build, Tests und Browserprüfung wurden noch nicht ausgeführt, weil in diesem Schritt noch kein Produktcode geändert wurde.
- Fachliche Prüfung durch Porsche wurde nicht durchgeführt.
- Review durch Teammitglieder wurde noch nicht dokumentiert.

## Bekannte Einschränkungen

- Die FSD ist noch nicht ausgearbeitet.
- Fachliche Regeln für Mitarbeitererfassung, Markerlstufen, Nachträge, Korrekturen und Status sind offen.
- API und Authentifizierung sind für diesen Change noch nicht verbindlich abgestimmt.
- HR-/Admin-Funktionen gehören nicht zu diesem Change.
- Offline-, Kamera-, Scanner- und Restaurantfunktionen werden nicht in diesem ersten Mitarbeiterfrontend-Change umgesetzt.

## Eigene Leistung von Erik

Erik plant und dokumentiert den Mitarbeiterfrontend-Change als persönlichen Arbeitsbereich. Die spätere technische Umsetzung betrifft Eriks Frontend- und UI/UX-Verantwortung. Backend, Authentifizierung und HR-/Admin-Funktionen werden getrennt betrachtet und müssen mit den zuständigen Teammitgliedern abgestimmt werden.

## Review

| Datum      | Prüfende Person | Gegenstand           | Ergebnis                               | Offene Punkte                       |
| ---------- | ---------------- | -------------------- | -------------------------------------- | ----------------------------------- |
| 2026-07-09 | Erik Bergmair    | erster Planungsstand | angelegt, noch nicht fachlich reviewed | FSD-Fragen, API, Auth, Teamabgleich |

## Verwendete Quellen

| Quellen-ID  | Quelle                                                                                                  | Verwendungszweck                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `SRC-006` | [Bootstrap-Entscheidung](../../../sources/sources.md#src-006--angular-material-vs-bootstrap-bei-bairesdev) | Kontext zur Bootstrap-Entscheidung gegenüber Angular Material.     |
| `SRC-008` | [Bootstrap 5.3 Introduction](../../../sources/sources.md#src-008--bootstrap-53-introduction)               | Grundlage für mobile-first und responsive Ausrichtung.             |
| `SRC-009` | [Bootstrap Sass](../../../sources/sources.md#src-009--bootstrap-sass)                                      | Grundlage für SCSS-Anpassungen.                                    |
| `SRC-011` | [Figma Components](../../../sources/sources.md#src-011--figma-components)                                  | Bezug zur komponentenorientierten Ableitung aus dem Figma-Prototyp. |

## KI-Unterstützung

| KI-ID | Gesprächsdatei | Unterstützung | Prüfung und Verwendung |
| ----- | --------------- | -------------- | ----------------------- |

## Abschlusscheckliste

- [ ] Tatsächlicher Umfang ist vollständig dokumentiert.
- [ ] Akzeptanzkriterien haben einen ehrlichen Prüfstatus.
- [ ] Ausgeführte und nicht ausgeführte Tests sind getrennt.
- [ ] Abweichungen und Einschränkungen sind sichtbar.
- [ ] Eigene und gemeinsame Leistungen sind getrennt.
- [ ] Quellen und KI-IDs sind vollständig eingetragen.
- [ ] Git- und Review-Nachweise sind eingetragen oder als nicht vorhanden markiert.
- [ ] Der Status entspricht dem tatsächlichen Stand.
