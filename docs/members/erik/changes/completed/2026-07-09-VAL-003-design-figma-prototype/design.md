# Design: ValidEat-Prototyp in Figma entwerfen

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-003` |
| Status | `implemented` |
| Verantwortlich | Erik Bergmair |
| Proposal | [proposal.md](proposal.md) |

## Vorgehensweise

Der Prototyp wird schrittweise aufgebaut. Zuerst werden Benutzergruppen, Kernaufgaben und Seitenstruktur geklärt. Danach entstehen einfache Wireframes. Erst wenn die Abläufe verständlich sind, werden visuelle Gestaltung, Komponenten und ein klickbarer Prototyp ausgearbeitet.

Diese Reihenfolge soll verhindern, dass zu früh Zeit in Farben und Details investiert wird, obwohl der Ablauf noch falsch oder unvollständig sein könnte.

## Vorgesehene Figma-Struktur

```text
00 Cover & Hinweise
01 Grundlagen
02 Komponenten
03 Mitarbeiterbereich
04 HR & Admin
05 Clearing & Konflikte
06 Export & Freigabe
07 Prototyp-Flows
08 Offene Varianten
```

## Benutzerabläufe

### Mitarbeitende

1. Anwendung öffnen und anmelden.
2. Aktuellen Status beziehungsweise Startseite sehen.
3. Verwendung eines physischen Markerls erfassen.
4. Gegebenenfalls Markerlstufe auswählen.
5. Eingabe prüfen und bestätigen.
6. Erfolgs- oder Fehlerrückmeldung erhalten.
7. Frühere Erfassungen und deren Zustand ansehen.

### HR/Admin

1. Abrechnungsperiode oder Arbeitsbereich öffnen.
2. Physisches Markerl erfassen.
3. Erfasste Daten prüfen und speichern.
4. Clearing-Ergebnis ansehen.
5. Konflikte filtern und öffnen.
6. Konflikt mit Begründung bearbeiten.
7. Export beziehungsweise Freigabe vorbereiten.

Die Schritte sind vorläufig und werden nicht als bestätigte Porsche-Anforderung behandelt.

## Zustände

Für zentrale Ansichten werden mindestens diese Zustände geprüft:

- normaler Inhalt,
- Laden,
- noch keine Daten,
- erfolgreiche Aktion,
- Validierungsfehler,
- technischer Fehler,
- fehlende Berechtigung,
- noch ungeklärter beziehungsweise konfliktbehafteter Zustand.

Offline-Zustände werden als Konzept berücksichtigt, aber erst nach Klärung der fachlichen Offline-Anforderungen vollständig gestaltet.

## Komponenten

Wiederkehrende Elemente sollen als Komponenten aufgebaut werden, beispielsweise:

- Buttons und Links,
- Eingabefelder und Auswahlfelder,
- Navigation,
- Karten und Statusanzeigen,
- Tabellenzeilen beziehungsweise Listeneinträge,
- Filter,
- Dialoge und Bestätigungen,
- Hinweise, Warnungen und Fehlermeldungen,
- Status-Badges für Erfassung und Clearing.

Varianten werden nur angelegt, wenn sie im Prototyp wirklich gebraucht werden.

## Entscheidung zur UI-Grundlage

Für die spätere Angular-Umsetzung wird Bootstrap 5.3 als CSS-Framework verwendet und über SCSS an ValidEat angepasst. Angular Material wird nicht zusätzlich eingesetzt. Gemeint ist damit nicht „SCSS statt CSS“: Die SCSS-Dateien werden später zu CSS kompiliert. Bootstrap liefert die Grundlage für Grid, responsive Breakpoints, Utilities und häufig benötigte Komponenten.

Die Entscheidung wurde aus folgenden Gründen getroffen:

- Der Mitarbeiterbereich soll mobil und der HR-/Adminbereich für größere Bildschirme gestaltet werden. Bootstraps Mobile-first-Ansatz und responsive Breakpoints passen zu dieser Aufteilung.
- Formulare, Buttons, Navigation, Tabellen, Dialoge und Statusanzeigen können auf einer bekannten Grundlage aufgebaut werden.
- Sass-Variablen, Maps und Mixins ermöglichen eigene Farben, Typografie, Abstände und weitere Anpassungen, ohne Bootstrap-Quelldateien direkt zu verändern.
- Das spätere SaaS-Ziel benötigt flexibleres Branding je Mandant. Eine über SCSS anpassbare Grundlage ist dafür hilfreich.
- Bootstrap ist nicht an die visuelle Sprache von Material Design gebunden. Dadurch kann ValidEat eine eigenständigere Gestaltung erhalten.
- Das Bootstrap-UI-Kit in Figma kann als Referenz dienen, damit Designkomponenten und spätere Umsetzung nicht unnötig auseinanderlaufen.

Die Entscheidung besitzt auch Nachteile:

- Bootstrap ist weniger eng in Angular integriert als Angular Material.
- Nicht benötigte Bestandteile müssen vermieden beziehungsweise später beim Build berücksichtigt werden.
- Zu viele Utility-Klassen können Templates unübersichtlich machen.
- Barrierefreiheit entsteht nicht automatisch. Semantisches Markup, ARIA, Fokusführung, Tastaturbedienung und Farbkontraste müssen weiterhin bewusst umgesetzt und geprüft werden.
- Interaktive Bootstrap-JavaScript-Komponenten sollen nicht ungeprüft neben Angular verwendet werden. Das konkrete Interaktionsverhalten wird später passend zur Angular-Architektur entschieden.

Die Figma-Komponenten werden deshalb nicht einfach unverändert aus dem Community-UI-Kit kopiert. Sie werden an ValidEat angepasst und auf tatsächlichen Bedarf, Zustände und Barrierefreiheit geprüft.

## Responsive Ausrichtung

Der Mitarbeiterbereich wird zunächst mobil gedacht, weil eine schnelle tägliche Erfassung wahrscheinlich auf kleineren Geräten relevant ist. HR-, Clearing- und Exportansichten werden zunächst für größere Bildschirme entworfen. Diese Annahme muss später mit den tatsächlichen Porsche-Geräten abgeglichen werden.

## Barrierefreiheit und Usability

- ausreichende Kontraste,
- verständliche Bezeichnungen,
- Status nicht nur über Farbe vermitteln,
- erkennbare Fokus- und Interaktionszustände mitdenken,
- ausreichend große Interaktionsflächen,
- Fehler direkt und verständlich erklären,
- kritische Aktionen bestätigen lassen,
- Abläufe mit möglichst wenigen unnötigen Schritten gestalten.

## Alternativen

| Alternative | Entscheidung |
|---|---|
| Direkt mit High-Fidelity-Screens beginnen | Verworfen, weil Abläufe und Geschäftsregeln noch nicht ausreichend geklärt sind. |
| Porsche- und SaaS-Oberfläche gleichzeitig vollständig entwerfen | Vorerst verworfen, um den ersten Prototyp klar abzugrenzen. |
| Mitarbeiter- und Adminbereich als völlig getrennte Produkte gestalten | Noch offen; zunächst werden sie innerhalb einer gemeinsamen Produktstruktur gedacht. |

## Risiken

| Risiko | Gegenmaßnahme |
|---|---|
| Annahmen wirken wie bestätigte Anforderungen. | Annahmen und offene Varianten sichtbar kennzeichnen. |
| Zu viele Screens verhindern einen prüfbaren Kernflow. | Zuerst nur zentrale Porsche-Abläufe umsetzen. |
| Visuelle Details verdecken Prozessprobleme. | Wireframes vor High-Fidelity gestalten. |
| Adminbereich überschneidet sich mit Joschuas Verantwortung. | Früh Feedback einholen und Beiträge klar abgrenzen. |
| Prototyp passt nicht zu realen Geräten. | Gerätefrage offen halten und später mit Porsche prüfen. |

## Teststrategie

- jeden Hauptflow vollständig durchklicken,
- Sackgassen und nicht verbundene Interaktionen suchen,
- Texte und Status auf Verständlichkeit prüfen,
- mobile Mitarbeiteransichten auf typischen Breiten prüfen,
- Adminansichten auf einem Desktop-Layout prüfen,
- erste Reviewrunde mit Julian und Joschua durchführen,
- offene fachliche Fragen aus dem Review sammeln,
- später einen kleinen Usability-Test vorbereiten.
