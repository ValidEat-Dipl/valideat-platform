# Proposal: ValidEat-Prototyp in Figma entwerfen

## Metadaten

| Feld           | Wert                                              |
| -------------- | ------------------------------------------------- |
| Change-ID      | `VAL-003`                                       |
| Status         | `implemented`                                   |
| Verantwortlich | Erik Bergmair                                     |
| Erstellt am    | 2026-07-06                                        |
| FSD-Referenz   | `docs/FSD.md`, derzeit noch nicht ausgearbeitet |
| GitHub Issue   | [#2 – Figma Prototyp](https://github.com/ValidEat-Dipl/valideat-platform/issues/2) |

## Herkunft und Sicherheit

- Art: persönliche UI/UX-Planung von Erik
- Grundlage: bisher bekannter Porsche-Zielprozess und Eriks Verantwortungsbereich laut Antrag
- Fachliche Prüfung durch das Team: noch offen
- Porsche-Freigabe: nicht vorhanden

## Ausgangslage

Für ValidEat gibt es noch keinen zusammenhängenden visuellen Prototyp. Der grundsätzliche Zielprozess ist bekannt, viele fachliche Details aus der FSD-Fragerunde sind aber noch offen.

Der Prototyp wird deshalb zunächst als Arbeits- und Diskussionsgrundlage erstellt. Ungeklärte Geschäftsregeln dürfen im Design nicht so dargestellt werden, als wären sie bereits von Porsche bestätigt.

## Ziel

In Figma soll ein verständlicher klickbarer Prototyp für die wichtigsten Abläufe der Porsche-Version entstehen. Er soll dem Team helfen, Benutzerführung, benötigte Informationen, Zustände und noch offene fachliche Fragen früh sichtbar zu machen.

## Umfang

- grundlegende Informationsarchitektur und Navigation,
- Anmeldung beziehungsweise Einstieg als vorläufiger Ablauf,
- Mitarbeiterbereich zur Erfassung einer Markerlverwendung,
- Übersicht bisheriger Erfassungen und ihrer Zustände,
- HR-/Adminbereich zur Erfassung physischer Markerl,
- Übersicht für Übereinstimmungen und Konflikte,
- beispielhafter Ablauf zur Konfliktbearbeitung,
- beispielhafte Export- und Freigabeansicht,
- wichtige Lade-, Leer-, Fehler- und Bestätigungszustände,
- wiederverwendbare visuelle Grundlagen und Komponenten,
- Orientierung der Komponenten an Bootstrap 5.3 mit eigener Anpassung über SCSS,
- klickbare Verbindung der wichtigsten Abläufe.

## Nicht-Umfang

- fertige technische Implementierung,
- verbindliche Festlegung noch ungeklärter Porsche-Regeln,
- vollständige SaaS-Mandantenverwaltung,
- Restaurant-Portal, OCR, Blockchain oder Anomalie-Erkennung,
- vollständige Offline-Synchronisationslogik,
- endgültiges Porsche-Branding ohne bestätigte Vorgaben,
- automatische Übernahme des Designs in Angular.

## Akzeptanzkriterien

- [X] Die zentralen Benutzergruppen und Einstiege sind im Prototyp erkennbar.
- [X] Der Mitarbeiterablauf kann durchgeklickt werden.
- [X] Der HR-Erfassungsablauf kann durchgeklickt werden.
- [X] Clearing-Ergebnisse und mindestens ein Konfliktfall sind dargestellt.
- [X] Export ist als vorläufiger Ablauf sichtbar.
- [X] Wichtige Fehler-, Leer- und Bestätigungszustände sind berücksichtigt.
- [X] Wiederkehrende Elemente sind als konsistente Figma-Komponenten angelegt.
- [X] Die Komponenten sind realistisch mit Bootstrap 5.3 und projektspezifischem SCSS umsetzbar.
- [X] Ungeklärte fachliche Punkte sind im Design oder den Begleitnotizen als Annahmen markiert.
- [X] Das Design wurde von Erik selbst geprüft.
- [X] Rückmeldungen von Julian und Joschua sind als ausständig gekennzeichnet.

## Offene Fragen

| Frage                                                         | Zuständige Stelle | Auswirkung                           |
| ------------------------------------------------------------- | ------------------ | ------------------------------------ |
| Welche Screens gehören wirklich zum ersten Porsche-Umfang?   | Team und Porsche   | Umfang des Prototyps                 |
| Welche Daten muss eine Mitarbeitererfassung enthalten?        | Porsche            | Formular und Bestätigung            |
| Welche Markerlstufen und Regeln werden dargestellt?           | Porsche            | Auswahl und Validierung              |
| Welche Rollen und Berechtigungen braucht der Adminbereich?    | Porsche und Team   | Navigation und sichtbare Aktionen    |
| Wie sehen Clearing-Status und Konfliktarten aus?              | Porsche und Team   | Tabellen, Filter und Detailansichten |
| Wie erfolgt die Freigabe tatsächlich?                        | Porsche            | Abschlussansicht                     |
| Gibt es Porsche-Brandingvorgaben?                             | Porsche            | Farben, Logo und Typografie          |
| Welche Geräte sind für Mitarbeitende und HR am wichtigsten? | Porsche            | Breakpoints und Bedienkonzept        |

## Auswirkungen

Der Prototyp kann neue FSD-Fragen sichtbar machen und bestehende Annahmen konkretisieren. Änderungen an der gemeinsamen FSD erfolgen dadurch nicht automatisch, sondern werden getrennt mit dem Team geklärt.
