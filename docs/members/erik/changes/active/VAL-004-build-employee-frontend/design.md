# Design: Mitarbeiterfrontend für Porsche-Version vorbereiten

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-004` |
| Status | `draft` |
| Verantwortlich | Erik Bergmair |
| Proposal | [proposal.md](proposal.md) |
| Zuletzt geändert | 2026-07-09 |

## Technische Lösung

Das Mitarbeiterfrontend soll im vorhandenen Angular-Projekt unter `apps/web/web` umgesetzt werden. Der Change setzt nicht voraus, dass das Projekt neu initialisiert wird. Zuerst wird der tatsächliche Stand geprüft, danach wird der Mitarbeiterbereich passend zur vorhandenen Struktur eingeordnet.

Die Oberfläche orientiert sich am Figma-Prototyp aus `VAL-003` und an der bisherigen Entscheidung für Bootstrap 5.3 mit SCSS. Fachlich noch offene Regeln werden nicht hart als endgültige Logik eingebaut. Wo Backend, Auth oder FSD noch fehlen, werden vorläufige UI-Zustände, Mockdaten oder klar gekennzeichnete Annahmen verwendet.

## Betroffene Komponenten

| Komponente | Geplante Änderung | Verantwortungsbereich |
|---|---|---|
| Angular-Webanwendung `apps/web/web` | Mitarbeiterbereich prüfen, planen und umsetzen | Erik |
| Routing / Navigation | Routen für mobile Mitarbeiteransichten vorbereiten | Erik |
| Mitarbeiter-Screens | Welcome, Login/Register, Start, Verwendung, Prüfung, Bestätigung, Verlauf und Detail aus Figma ableiten | Erik |
| Styles / SCSS | Bootstrap-nahe mobile-first Gestaltung verwenden | Erik |
| Authentifizierung | nur UI/Platzhalter oder vorbereitete Integration, solange Keycloak nicht geklärt ist | Team, technische Umsetzung später gemeinsam |
| API-Integration | zunächst Mockdaten oder Schnittstellenannahmen; echte Integration erst nach Abstimmung | Erik / Julian / Team |
| HR-/Adminbereich | keine Umsetzung in diesem Change | nicht Erik in diesem Change |

## Datenfluss

1. Eine mitarbeitende Person öffnet die Anwendung.
2. Die Anwendung zeigt den Einstieg beziehungsweise Login/Startbereich.
3. Die Person startet eine neue Markerlverwendung.
4. Die Person gibt die notwendigen Angaben ein oder bestätigt vorausgefüllte Werte.
5. Die Anwendung zeigt eine Prüfansicht.
6. Nach Bestätigung wird die Erfassung vorläufig gespeichert oder als Mock-Erfassung dargestellt.
7. Die Person sieht eine Bestätigung und kann letzte Erfassungen oder Details öffnen.

Solange keine echte API angebunden ist, ist der Datenfluss als UI- und Mockdatenfluss zu verstehen.

## Benutzerablauf

1. Welcome-Screen öffnen.
2. Anmelden oder registrieren beziehungsweise vorläufig in den Mitarbeiterbereich wechseln.
3. Startseite mit aktuellem Handlungsangebot sehen.
4. „Verwendung erstellen“ öffnen.
5. Markerlverwendung erfassen.
6. Angaben prüfen.
7. Erfassung bestätigen.
8. Bestätigungsseite sehen.
9. Letzte Erfassungen öffnen.
10. Erfassungsdetail ansehen.

Der Ablauf ist aus dem Figma-Prototyp übernommen, aber fachlich noch nicht als Porsche-Freigabe zu verstehen.

## API-Nutzung und Daten

- Endpunkte: noch nicht abgestimmt
- Eingabedaten: vorläufig Name, Datum, Kostenstelle, Markerlstufe und mögliche Zusatzinformationen; genaue Felder offen
- Ausgabedaten: vorläufig Erfassungs-ID, Datum, Status und Übersichtsdaten; genaue Felder offen
- Validierung: Pflichtfelder, Datum und Markerlstufe als Annahme; endgültige Regeln offen
- Abhängigkeit vom Backend: für echte Speicherung und Historie notwendig, für ersten UI-Stand mit Mockdaten ersetzbar

Noch nicht abgestimmte Schnittstellen werden als Vorschlag oder Annahme gekennzeichnet.

## Zustände

| Zustand | Anzeige oder Verhalten | Übergang |
|---|---|---|
| Laden | einfache Ladeanzeige oder Skeleton, falls Daten geladen werden | Öffnen von Start, Verlauf oder Detail |
| Erfolgreich | Bestätigung nach gespeicherter oder gemockter Erfassung | nach Absenden der Prüfansicht |
| Leer | Hinweis, wenn noch keine Erfassungen vorhanden sind | Verlauf ohne Daten |
| Fehler | verständliche Fehlermeldung mit erneuter Aktion | Validierung oder technischer Fehler |
| Offline | zunächst sichtbar als offener Punkt oder einfacher Hinweis; keine fertige Synchronisation | Verbindung fehlt oder PWA-Konzept später |

## Fehlerbehandlung

| Fehlerfall | Reaktion des Systems | Information für die nutzende Person |
|---|---|---|
| Pflichtfeld fehlt | Absenden verhindern und Feld markieren | verständlicher Hinweis beim Feld |
| ungültige oder offene Markerlstufe | Auswahl verhindern oder als offene Regel markieren | Hinweis, dass die Regel noch geklärt werden muss |
| API nicht verfügbar | bei Mockstand nicht betroffen; bei Integration Fehlerzustand zeigen | später: „Erfassung konnte nicht gespeichert werden“ |
| keine Verbindung | vorerst nicht als fertige Offline-Funktion behandeln | Hinweis, dass Offline-Verhalten noch nicht final umgesetzt ist |
| nicht angemeldet | Login oder Platzhalter anzeigen | Hinweis, dass Anmeldung erforderlich ist |

## Sicherheit und Datenschutz

- Authentifizierung und Berechtigung: Keycloak wird erwartet, ist für diesen Change aber noch nicht als fertige Integration angenommen.
- Personenbezogene Daten: Name, Kostenstelle und Erfassungshistorie können personenbezogen sein; keine echten Testdaten verwenden.
- Lokale Speicherung: vorerst vermeiden oder klar dokumentieren; Offline-Speicherung später gesondert prüfen.
- Protokollierung: keine sensiblen Daten unnötig in Logs ausgeben.
- Besondere Risiken: Mockdaten oder Platzhalter dürfen nicht mit produktiver Sicherheit verwechselt werden.

## Offline-Verhalten

Offline ist Teil von Eriks Verantwortungsbereich, aber nicht automatisch Umfang dieses ersten Mitarbeiterfrontend-Changes. Für den ersten Schritt kann Offline-Verhalten als offener Punkt sichtbar bleiben. Eine echte Offline-Erfassung mit späterer Synchronisation braucht eigene Regeln zu Speicherung, Konflikten, Sicherheit und Löschung.

## Alternativen

### Alternative 1: Erst komplette FSD fertigstellen

- Vorteile: weniger fachliche Annahmen in der Umsetzung
- Nachteile: sichtbare Frontend-Arbeit startet später
- Entscheidung: verworfen für diesen Zwischenschritt
- Grund: Der Mitarbeiterflow kann mit klar markierten Annahmen und Mockdaten vorbereitet werden.

### Alternative 2: Direkt vollständige API-Integration bauen

- Vorteile: früher Ende-zu-Ende-Nachweis
- Nachteile: hohes Risiko, wenn API und FSD noch nicht stabil sind
- Entscheidung: vorerst verworfen
- Grund: UI-Struktur und Flow können zuerst mit Mockdaten entstehen.

### Alternative 3: HR/Admin und Mitarbeiterfrontend gemeinsam umsetzen

- Vorteile: einheitlicheres Gesamtbild
- Nachteile: überschneidet sich mit anderer Zuständigkeit und macht den Change zu groß
- Entscheidung: verworfen
- Grund: Dieser Change bleibt bei Eriks Mitarbeiterfrontend.

## Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|---|---|---|---|
| Offene FSD-Regeln werden versehentlich als fix umgesetzt. | mittel | spätere fachliche Korrekturen nötig | Annahmen sichtbar dokumentieren und Mocklogik trennen |
| Mitarbeiterfrontend überschneidet sich mit HR/Admin-Arbeit. | mittel | doppelte oder widersprüchliche UI-Strukturen | Scope klar auf Mitarbeiterbereich beschränken |
| Authentifizierung wird falsch vorweggenommen. | mittel | spätere Umstellung auf Keycloak wird aufwendig | Login zunächst als Platzhalter oder klar isolierter Bereich |
| Mockdaten wirken wie echte Backendintegration. | mittel | falscher Projektstand in Doku | Mockdaten und fehlende API in Evidence markieren |
| Mobile Umsetzung passt nicht zu echten Zielgeräten. | unbekannt | Bedienprobleme | responsive Prüfung und spätere Geräteklärung |

## Teststrategie

| Ebene | Geplante Prüfung | Erwartetes Ergebnis |
|---|---|---|
| Statisch | Angular Lint/Typecheck oder vorhandene Projektprüfung ausführen, falls eingerichtet | keine Fehler oder dokumentierte Fehler |
| Automatisiert | vorhandene Angular-Tests ausführen oder Testbarkeit prüfen | Ergebnis ehrlich dokumentiert |
| Manuell | Mitarbeiterflow im Browser durchklicken | Hauptscreens erreichbar, keine offensichtlichen Sackgassen |
| Usability | eigene Sichtprüfung gegen Figma und einfache Bedienbarkeit | grobe Verständlichkeit nachgewiesen, kein formaler Test |
| Barrierefreiheit | grobe Prüfung von Labels, Kontrast, Fokus und Statusdarstellung | Auffälligkeiten dokumentiert |

Geplante Tests werden erst nach ihrer tatsächlichen Ausführung im Nachweis als bestanden oder fehlgeschlagen eingetragen.
