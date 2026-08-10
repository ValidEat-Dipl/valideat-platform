# Design: Restaurant- und SaaS-Plattform im Figma-Prototyp erweitern

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-006` |
| Status | `implemented` |
| Verantwortlich | Erik Bergmair |
| Proposal | [proposal.md](proposal.md) |
| Zuletzt geändert | 2026-08-10 |

## Konzeptionelle Lösung

Die Erweiterung wird in drei getrennte, aber zusammenhängende Bereiche gegliedert:

1. **Restaurant Mobile:** operative Scan-Oberfläche für Restaurant-Mitarbeitende.
2. **Restaurant Admin:** kleine Verwaltungsansicht für Restaurant-Leitung oder Abrechnungskontrolle.
3. **SaaS-Plattform:** assistierte Einrichtung und Verwaltung einer ValidEat-Organisation inklusive Modulen, Regeln, Branding und internem Mandantenbereich.

Der bestehende ValidEat-Stil wird weiterverwendet. Die Gestaltung soll Bootstrap-5-nah bleiben, damit eine spätere Angular-Umsetzung mit SCSS realistisch bleibt. Restaurant Mobile wird mobile-first entworfen. Restaurant Admin, SaaS Company Admin und der interne ValidEat-Bereich werden desktop-first entworfen.

## Tatsächlich ausgearbeitete Figma-Bereiche

Der tatsächliche Figma-Stand umfasst am 2026-08-10 einzelne ausgearbeitete Seiten für Restaurant User, Restaurant Admin und SaaS. Es wurde kein vollständiger klickbarer Gesamtprototyp für diese Erweiterung erstellt. Die Seiten dienen deshalb als visueller Konzeptstand und spätere Umsetzungsgrundlage, nicht als vollständig geprüfter End-to-End-Prototyp.

### Restaurant User

- Login
- Restaurant wählen
- Overview
- QR-Code scannen
- Ergebnis: erfolgreich
- Ergebnis: bereits eingelöst
- Ergebnis: ungültig oder abgelaufen
- Ergebnis: für diesen Standort nicht gültig
- Ergebnis: Prüfung nicht möglich, zum Beispiel ohne Serververbindung
- Verlauf
- Detailansicht eines Falls

### Restaurant Admin

- Übersicht
- Einlösungen als Übersicht aller eingelösten Markerl
- Abrechnung
- Einstellungen

### SaaS

- Login
- Register
- Setup mit Schritt-für-Schritt-Anleitung
- Dashboard
- Module verwalten
- Organisation und Regeln
- Branding
- Branding-Vorschau
- Kundenübersicht

## Grundprinzipien

- QR-Scan und Einlösung müssen im Restaurant sehr schnell funktionieren.
- Das Restaurant sieht nur die Informationen, die für die Einlösung notwendig sind.
- Der QR-Code wird serverseitig in Echtzeit geprüft. Das Frontend entscheidet nicht lokal über Gültigkeit.
- Restaurant-Mitarbeitende können Markerlstufe, Person oder andere fachliche Daten nicht ändern.
- Restaurant Admin bleibt bewusst lesend und schlank.
- SaaS ist keine Verkaufsplattform, sondern eine geführte Verwaltungs- und Setup-Oberfläche.
- Der Setup-Assistent soll aktiv helfen: nächster Schritt, Fortschritt, Warnungen, Vorschau und klare Handlungsempfehlungen.
- Module können möglichst selbstständig aktiviert werden. Wenn ein Modul zusätzliche Einrichtung braucht, wird das sichtbar als `Einrichtung erforderlich` dargestellt.
- Branding wird als Entwurf konfiguriert, in einer Vorschau geprüft und danach veröffentlicht.
- Spätere SaaS-Ideen werden sichtbar von sicher geplanten Kernfunktionen getrennt.

## Betroffene Komponenten

| Komponente | Geplante Änderung | Verantwortungsbereich |
|---|---|---|
| Figma-Prototyp | neue Bereiche für Restaurant und SaaS ergänzen | Erik |
| Restaurant Mobile UI | Login, Standortauswahl, Scan, Ergebnis, Historie und Detail entwerfen | Erik |
| Restaurant Admin UI | Dashboard, Einlösungen, Detail und Abrechnungsvorschau entwerfen | Erik, Review mit Team |
| SaaS Company Admin UI | Setup-Assistent, Dashboard, Module, Organisation, Regeln, Branding und Integrationen entwerfen | Erik, Review mit Julian und Joschua |
| ValidEat interner Admin | Mandantenübersicht, Mandantendetail, Modulfreischaltung und Systemstatus als Konzept entwerfen | Erik / Team |
| QR-Scan-Konzept | serverseitige Echtzeitprüfung und Ergebniszustände sichtbar machen | Erik / Team |
| Branding-Konzept | mandantenspezifische Anpassung mit Vorschau und Veröffentlichung darstellen | Erik |

## Informationsarchitektur

### Restaurant Mobile

Vorgesehene Navigation:

- `Scan`
- `Verlauf`
- `Konto`

Die Startansicht soll direkt auf den Scan führen. Verlauf und Konto bleiben sekundär.

### Restaurant Admin

Vorgesehene Navigation:

- `Übersicht`
- `Einlösungen`
- `Abrechnung`
- `Einstellungen`

Nicht vorgesehen im ersten Stand:

- Bearbeitung von Einlösungen,
- Export durch das Restaurant,
- umfangreiche Mitarbeitendenverwaltung,
- manuelle QR-Code-Eingabe als Hauptfunktion.

### SaaS Company Admin

Vorgesehene Navigation:

- `Setup`
- `Dashboard`
- `Module`
- `Organisation`
- `Regeln`
- `Branding`
- `Integrationen`
- `Audit`

Die SaaS-Oberfläche soll nach dem ersten Login nicht leer wirken, sondern mit einer Setup-Checkliste, Fortschritt und empfohlenen nächsten Schritten starten.

### ValidEat interner Admin

Vorgesehene Navigation:

- `Kunden`
- `Aktivierungen`
- `Module`
- `Systemstatus`
- `Audit`

Dieser Bereich ist für das ValidEat-Team gedacht und nicht für Restaurant- oder Firmenkunden sichtbar.

## Restaurant Mobile

### Rolle und Ziel

Restaurant-Mitarbeitende verwenden die mobile Oberfläche am Ausgabepunkt. Das Ziel ist nicht Verwaltung, sondern eine schnelle Antwort auf die Frage:

> Kann dieses digitale Markerl jetzt in diesem Restaurant eingelöst werden?

### Datenminimierung

Das Restaurant sieht im ersten Konzept keine vollständigen Personendaten. Angezeigt werden:

- Status der Einlösung,
- Markerlstufe oder Leistungsart, falls für die Ausgabe nötig,
- Restaurant oder Standort,
- Zeitpunkt der Prüfung,
- kurze Begründung bei Ablehnung.

Nicht angezeigt werden im ersten Konzept:

- vollständiger Name der beschäftigten Person,
- Personalnummer,
- Kostenstelle,
- interne HR- oder Clearingdaten.

### Hauptflow: QR-Code scannen und einlösen

1. Restaurant-Mitarbeitende melden sich an.
2. Falls der Account mehrere Standorte bedienen darf, wird ein Standort ausgewählt.
3. Die Startseite zeigt `QR-Code scannen` als primäre Aktion.
4. Die Kameraansicht öffnet sich.
5. Der QR-Code vom Smartphone der beschäftigten Person wird erkannt.
6. Das Frontend sendet den QR-Inhalt, die Restaurant-/Standort-ID und den Zeitpunkt an den Server.
7. Der Server prüft den QR-Code in Echtzeit und speichert die Einlösung, falls der QR-Code gültig ist.
8. Das Frontend zeigt `Einlösung erfolgreich` oder einen Ablehnungsgrund.
9. Nach dem Ergebnis kann direkt erneut gescannt oder der Eintrag im Verlauf geöffnet werden.

### Wichtige technische Annahme

Der QR-Code wird im Frontend als undurchsichtiger Inhalt behandelt. Auch wenn der QR-Code später fachliche Informationen enthält, darf die Restaurant-Oberfläche diese nicht selbst als vertrauenswürdige Quelle auswerten. Die Entscheidung kommt vom Server.

### Spätere Variante

Eine zusätzliche Aktion `Einlösung bestätigen` kann später geprüft werden, falls versehentliche Scans verhindert werden sollen. Für den ersten Prototyp wird diese Variante nicht als Hauptflow gestaltet, damit der Restaurantablauf schnell bleibt.

## Restaurant Mobile: Seitenkonzept

### RM-01 Restaurant Login

Zweck:

- Restaurant-Mitarbeitende melden sich mit ihrem Restaurantkonto an.

Inhalte:

- ValidEat Restaurant Logo-Platzhalter,
- Hinweis `Für Restaurants`,
- Felder `E-Mail` und `Passwort`,
- Button `Anmelden`,
- Link `Problem beim Anmelden?`,
- neutraler Hinweis, dass der Zugriff nur für berechtigte Restaurantkonten gedacht ist.

Zustände:

- Standard,
- falsche Zugangsdaten,
- fehlende Berechtigung,
- Laden.

### RM-02 Standort auswählen

Zweck:

- Bei mehreren Restaurants oder Standorten wird der aktive Standort festgelegt.

Inhalte:

- Titel `Standort auswählen`,
- Liste verfügbarer Standorte,
- Standortname,
- Adresse oder Kurzbezeichnung,
- Status `Aktiv`,
- Button `Mit diesem Standort fortfahren`.

Regel:

- Wenn nur ein Standort verfügbar ist, kann diese Seite später übersprungen werden.

### RM-03 Scan Start

Zweck:

- Schnellzugriff auf den nächsten Scan.

Inhalte:

- aktueller Standort,
- heutige Einlösungen als kleine Zahl,
- primärer Button `QR-Code scannen`,
- sekundärer Link `Verlauf ansehen`,
- kurzer Hinweis `Scannen Sie den QR-Code auf dem Smartphone der beschäftigten Person.`,
- Verbindungstatus, zum Beispiel `Online`.

UX:

- Die Seite darf nicht wie ein Dashboard wirken. Der Scan ist die Hauptaktion.

### RM-04 Kamera Scan

Zweck:

- QR-Code mit der Kamera erfassen.

Inhalte:

- Kamera-Vorschau mit Scan-Rahmen,
- Standortanzeige,
- Button `Scan abbrechen`,
- Hinweis bei schlechter Erkennung,
- Ladezustand `QR-Code wird geprüft ...` nach erfolgreichem Erfassen.

Nicht im ersten Stand:

- manuelle Codeeingabe als sichtbare Hauptfunktion.

### RM-05 Ergebnis: Einlösung erfolgreich

Zweck:

- Positives Ergebnis eindeutig bestätigen.

Inhalte:

- Status `Einlösung erfolgreich`,
- Markerlstufe, zum Beispiel `Stufe A`,
- Restaurant/Standort,
- Zeitpunkt,
- technische Referenz oder kurze Scan-ID,
- Button `Nächsten QR-Code scannen`,
- Link `Einlösung ansehen`.

UX:

- Der Screen muss schnell erfassbar sein: großes positives Icon, kurzer Text, keine unnötigen Details.

### RM-06 Ergebnis: Bereits eingelöst

Zweck:

- Doppelte Einlösung verhindern.

Inhalte:

- Status `Bereits eingelöst`,
- erklärender Text `Dieses Markerl wurde bereits verwendet.`,
- falls zulässig: Zeitpunkt der ersten Einlösung und Restaurant/Standort,
- Button `Erneut scannen`,
- Link `Eintrag im Verlauf ansehen`, falls der Eintrag zum aktuellen Restaurant gehört.

Datenschutz:

- Keine vollständigen Personendaten anzeigen.

### RM-07 Ergebnis: Ungültig oder abgelaufen

Zweck:

- Ungültige Codes verständlich ablehnen.

Inhalte:

- Status `Ungültig oder abgelaufen`,
- möglicher Grund: abgelaufen, unbekannt, falscher Tag oder nicht einlösbar,
- Button `Erneut scannen`,
- Hinweis `Die beschäftigte Person soll den QR-Code in der Mitarbeiter-App erneut öffnen.`

### RM-08 Ergebnis: Falscher Standort

Zweck:

- Zeigen, dass der QR-Code nicht für diesen Standort gültig ist.

Inhalte:

- Status `Für diesen Standort nicht gültig`,
- aktueller Standort,
- Button `Standort wechseln`,
- Button `Erneut scannen`.

### RM-09 Ergebnis: Verbindung nicht verfügbar

Zweck:

- Fehler bei der Echtzeitprüfung erklären.

Inhalte:

- Status `Prüfung nicht möglich`,
- Erklärung `Die Verbindung zum Server ist gerade nicht verfügbar.`,
- Button `Erneut versuchen`,
- Button `Zurück zum Scan`,
- Hinweis, dass keine erfolgreiche Einlösung gespeichert wurde.

Regel:

- Im ersten Konzept gibt es keine echte Offline-Einlösung, damit doppelte Einlösungen nicht als gelöst dargestellt werden.

### RM-10 Scan-Verlauf

Zweck:

- Restaurant-Mitarbeitende sehen die zuletzt gescannten Einlösungen des aktuellen Standorts.

Inhalte:

- Datum `Heute`,
- Liste mit Uhrzeit, Status, Stufe und kurzer Referenz,
- Filter `Heute`, `Letzte 7 Tage`, `Status`,
- Link zu Scan-Details.

Nicht im ersten Stand:

- Export,
- Korrektur,
- Löschen.

### RM-11 Scan-Detail

Zweck:

- Einen Scan nachvollziehen, ohne Bearbeitung zu erlauben.

Inhalte:

- Status,
- Zeitpunkt,
- Restaurant/Standort,
- Markerlstufe,
- Scan-ID,
- verarbeitet durch,
- Serverantwort,
- Link `Zurück zum Verlauf`.

UX:

- Detail dient der Nachvollziehbarkeit, nicht der aktiven Bearbeitung.

## Restaurant Admin

### Rolle und Ziel

Restaurant-Admin oder Restaurant-Leitung prüft, welche Einlösungen stattgefunden haben und wie die aktuelle Abrechnung aussieht. Der Bereich ist lesend ausgerichtet und soll nicht zu einer vollständigen Unternehmensverwaltung werden.

### Hauptflow: Einlösungen ansehen

1. Restaurant-Admin meldet sich an.
2. Dashboard zeigt Tageszahlen und aktuelle Periode.
3. Admin öffnet `Einlösungen`.
4. Tabelle wird nach Zeitraum, Status, Stufe und Standort gefiltert.
5. Ein Eintrag wird geöffnet.
6. Detail zeigt nachvollziehbare Einlösungsdaten.

### Hauptflow: Abrechnung prüfen

1. Restaurant-Admin öffnet `Abrechnung`.
2. Zeitraum wird ausgewählt.
3. Summen nach Stufe und Status werden angezeigt.
4. Admin sieht, ob die Periode vollständig oder noch offen ist.
5. Export oder Korrektur wird im ersten Stand nicht angeboten.

## Restaurant Admin: Seitenkonzept

### RA-01 Restaurant Dashboard

Zweck:

- Schneller Überblick über den aktuellen Restaurantbetrieb.

Inhalte:

- aktueller Standort,
- heutige Einlösungen,
- erfolgreiche Einlösungen,
- abgelehnte Scans,
- aktuelle Abrechnungsperiode,
- letzte fünf Einlösungen,
- primäre Aktion `Einlösungen ansehen`.

### RA-02 Einlösungen

Zweck:

- Alle Einlösungen eines Restaurants oder Standorts ansehen.

Inhalte:

- Filterleiste: Zeitraum, Status, Markerlstufe, Standort,
- Tabelle mit Uhrzeit, Stufe, Status, Standort, Scan-ID,
- Aktion `Details`.

Nicht anzeigen:

- vollständige Personendaten,
- Kostenstelle, sofern nicht zwingend für Restaurantabrechnung nötig.

### RA-03 Einlösungsdetail

Zweck:

- Einzelne Einlösung nachvollziehen.

Inhalte:

- Statuskarte,
- Scan-ID,
- Zeitpunkt,
- Standort,
- Markerlstufe,
- Serverentscheidung,
- kurzer Verlauf: gescannt, geprüft, eingelöst oder abgelehnt,
- Button `Zurück zur Übersicht`.

Nicht im ersten Stand:

- Korrigieren,
- Stornieren,
- Löschen.

### RA-04 Abrechnung

Zweck:

- Restaurant sieht periodische Summen, ohne selbst abzurechnen.

Inhalte:

- Zeitraum,
- Summe erfolgreicher Einlösungen,
- Summen nach Markerlstufe,
- abgelehnte Scans als separate Information,
- Status `In Bearbeitung`, `Bereit zur Prüfung` oder `Abgeschlossen`,
- Hinweis `Die endgültige Abrechnung erfolgt über die Unternehmensverwaltung.`

### RA-05 Einstellungen

Zweck:

- Grunddaten des Restaurants ansehen.

Inhalte:

- Restaurantname,
- Standort,
- zugeordnete Organisationen oder Mandanten,
- aktive Scan-Geräte oder Sitzungen als spätere Variante,
- Kontaktinformation,
- Button `Änderung anfragen`.

UX:

- Im ersten Stand keine freie Selbstbearbeitung. Dadurch bleibt der Bereich klein und risikoarm.

## SaaS-Plattform

### Rollen

| Rolle | Aufgabe |
|---|---|
| Firmeninhaber / Verantwortliche Person | Organisation erstellen, Module aktivieren, zentrale Regeln und Branding verwalten |
| Organisations-Admin | Organisation, Mitarbeitende, Kostenstellen, Restaurants und Regeln im freigegebenen Umfang verwalten |
| HR/Admin des Unternehmens | arbeitet mit Erfassungen, Clearing, Export und Freigabe |
| Mitarbeitende | nutzen die Mitarbeiter-App und ändern nur erlaubte eigene Angaben |
| Restaurant-Rolle | scannt QR-Codes und sieht eigene Einlösungen |
| ValidEat interner Admin | betreut Kundenmandanten, Modulfreischaltungen und Systemstatus |

### Grundentscheidung für Module

Das Ziel ist ein möglichst selbstständig nutzbares System. Trotzdem werden nicht alle Module sofort ohne Einrichtung funktionieren. Deshalb wird ein hybrider Aktivierungsflow vorgesehen:

- einfache Module können direkt im Assistenten aktiviert werden,
- komplexe Module wechseln in `Einrichtung erforderlich`,
- das System zeigt dann konkrete Setup-Schritte,
- falls Unterstützung nötig ist, erscheint `Freischaltung wird geprüft` oder `Kontakt erforderlich`.

Keine Shop-Sprache:

- kein Warenkorb,
- keine Preise im ersten Prototyp,
- kein Checkout,
- keine Kaufbestätigung.

Stattdessen:

- `Modul aktivieren`,
- `Einrichtung starten`,
- `Vorschau ansehen`,
- `Freischaltung anfragen`,
- `Setup abschließen`.

## SaaS Company Admin: Userflows

### Flow: Organisation registrieren und einrichten

1. Verantwortliche Person öffnet ValidEat.
2. `Organisation registrieren` wird gewählt.
3. Organisationsdaten werden eingegeben.
4. Admin-Konto wird erstellt.
5. Setup-Assistent startet mit Fortschrittsanzeige.
6. Basisdaten werden eingerichtet: Organisation, Mitarbeitende, Kostenstellen, Restaurants.
7. Module werden ausgewählt.
8. Regeln werden vorläufig konfiguriert.
9. Branding wird erstellt und in der Vorschau geprüft.
10. Umgebung wird aktiviert oder als `Setup unvollständig` markiert.

### Flow: Modul aktivieren

1. Admin öffnet `Module`.
2. Modulkarte zeigt Nutzen, Status und Setup-Aufwand.
3. Admin öffnet ein Moduldetail.
4. System zeigt Voraussetzungen.
5. Admin startet die Einrichtung.
6. Je nach Modul wird es direkt aktiviert oder in `Einrichtung erforderlich` versetzt.
7. Das Dashboard zeigt den nächsten empfohlenen Schritt.

### Flow: Branding veröffentlichen

1. Admin öffnet `Branding`.
2. Logo, App-Name und Primärfarbe werden angepasst.
3. Vorschau zeigt Mitarbeiter-App, Restaurant-Scanner und Adminbereich.
4. System prüft grob Kontrast und Lesbarkeit.
5. Admin speichert den Entwurf.
6. Admin öffnet Vorschau.
7. Admin veröffentlicht das Branding.
8. System zeigt, dass die Änderung live für die Organisation gilt.

### Flow: Organisationsdaten verwalten

1. Admin öffnet `Organisation`.
2. Admin sieht Mitarbeitende, Rollen, Kostenstellen, Restaurants und Einladungen.
3. Je nach Rolle und aktivem Modul können Datensätze erstellt oder bearbeitet werden.
4. Änderungen werden protokolliert.
5. Nutzer mit eingeschränkten Rollen sehen nur ihre freigegebenen Bereiche.

## SaaS Company Admin: Seitenkonzept

### SA-01 SaaS Login

Zweck:

- Firmenkunden und interne Admins melden sich an.

Inhalte:

- ValidEat Logo-Platzhalter,
- Felder `E-Mail` und `Passwort`,
- Button `Anmelden`,
- Link `Organisation registrieren`,
- Link `Passwort vergessen`,
- Hinweis auf getrennte Rollenbereiche nach Login.

### SA-02 Organisation registrieren

Zweck:

- Eine neue ValidEat-Organisation anlegen.

Inhalte:

- Organisationsname,
- Kontaktperson,
- geschäftliche E-Mail,
- Land oder Region,
- Anzahl Mitarbeitende als grobe Größenordnung,
- Button `Organisation anlegen`,
- Hinweis `Die Module werden im nächsten Schritt eingerichtet.`

Nicht enthalten:

- Preise,
- Zahlungsdaten,
- Checkout.

### SA-03 Setup Willkommen

Zweck:

- Nach der Registrierung Orientierung geben.

Inhalte:

- Begrüßung mit Organisationsname,
- kurzer Text `Wir richten ValidEat Schritt für Schritt ein.`,
- Fortschritt 0 Prozent,
- nächste Aktion `Setup starten`,
- Übersicht der kommenden Schritte.

UX:

- Diese Seite soll sich assistierend anfühlen und nicht wie eine leere Adminseite.

### SA-04 Setup-Assistent

Zweck:

- Zentrale, lebendige Einrichtungsseite.

Inhalte:

- Fortschrittsanzeige,
- empfohlener nächster Schritt,
- Checkliste:
  - Organisation prüfen,
  - Module auswählen,
  - Mitarbeitende vorbereiten,
  - Kostenstellen anlegen,
  - Restaurants hinzufügen,
  - Markerlstufen definieren,
  - Branding prüfen,
  - Umgebung aktivieren,
- Karten mit Status `Offen`, `In Arbeit`, `Erledigt`,
- Hilfetext pro Schritt,
- Button zur jeweils nächsten Aktion.

### SA-05 Firmen-Dashboard

Zweck:

- Überblick nach oder während der Einrichtung.

Inhalte:

- Setup-Fortschritt,
- aktive Module,
- offene Setup-Aufgaben,
- Mitarbeitende,
- Restaurants,
- aktuelle Periode,
- offene Konflikte,
- letzte Aktivitäten,
- Hinweis, falls die Umgebung noch nicht vollständig aktiviert ist.

### SA-06 Module verwalten

Zweck:

- Module aktivieren, einrichten oder deaktivierte Module ansehen.

Inhalte:

- Modulgruppen:
  - Kernmodule,
  - Erweiterungen,
  - spätere Optionen,
- Karten je Modul,
- Status-Badge,
- kurze Beschreibung,
- nächster Schritt,
- Button `Modul ansehen`.

Modulzustände:

- `Aktiv`,
- `Nicht aktiv`,
- `Einrichtung erforderlich`,
- `Freischaltung wird geprüft`,
- `Später verfügbar`.

### SA-07 Moduldetail: Restaurant QR-Scanner

Zweck:

- Restaurant-Modul erklären und einrichten.

Inhalte:

- Modulname `Restaurant QR-Scanner`,
- Nutzenbeschreibung,
- Voraussetzungen:
  - Restaurantdaten,
  - berechtigte Restaurantkonten,
  - QR-Code-Erzeugung in Mitarbeiter-App,
  - Online-Prüfung,
- Setup-Schritte,
- Status,
- Vorschau des mobilen Scanflows,
- Button `Einrichtung starten` oder `Modul aktivieren`.

### SA-08 Organisation und Benutzer

Zweck:

- Zentrale Organisationsdaten verwalten.

Inhalte:

- Organisationsdaten,
- Admins und Rollen,
- Mitarbeitende,
- Einladungen,
- Kostenstellen,
- Restaurants/Standorte,
- Rollenhinweise.

UX:

- Firmeninhaber und Organisations-Admins dürfen zentrale Daten bearbeiten.
- Eingeschränkte Rollen sehen nur benötigte Daten.

### SA-09 Regeln und Markerlstufen

Zweck:

- Fachliche Regeln der Organisation konfigurieren.

Inhalte:

- Markerlstufen,
- erlaubte Tage,
- Restaurantpflicht,
- Korrekturregeln,
- Sichtbarkeit für Mitarbeitende,
- Freigabeprozess,
- Warnhinweis `Diese Regeln beeinflussen Mitarbeiter-App, Restaurant-Scan und Clearing.`

Status:

- Regeln sind im SaaS-Konzept konfigurierbar, aber fachliche Standardwerte sind nicht als Porsche-Regeln zu verstehen.

### SA-10 Branding konfigurieren

Zweck:

- Mandantenspezifisches Erscheinungsbild festlegen.

Inhalte:

- App-Name,
- Logo-Upload oder Platzhalter,
- Primärfarbe,
- optionale Akzentfarbe,
- Button-Vorschau,
- Navigationsvorschau,
- Status-Badge-Vorschau,
- Kontrasthinweis,
- Button `Entwurf speichern`,
- Button `Vorschau öffnen`.

Regel:

- Erfolg, Warnung und Fehler bleiben kontrollierte Systemfarben oder werden nur innerhalb sicherer Grenzen angepasst.

### SA-11 Branding-Vorschau

Zweck:

- Vor Veröffentlichung sehen, wie das Branding in mehreren Bereichen wirkt.

Inhalte:

- mobile Mitarbeiter-App-Vorschau,
- Restaurant-Scanner-Vorschau,
- Admin-Dashboard-Vorschau,
- Hinweis auf betroffene Bereiche,
- Button `Zurück bearbeiten`,
- Button `Branding veröffentlichen`.

### SA-12 Integrationen und Export

Zweck:

- Technische Anschlussfähigkeit darstellen, ohne API-Verträge vorwegzunehmen.

Inhalte:

- Exportformate als vorläufige Karten,
- API-Zugang als späterer Bereich,
- Webhooks oder Schnittstellen als spätere Variante,
- Status `Nicht eingerichtet`, `In Einrichtung`, `Aktiv`.

### SA-13 Audit

Zweck:

- Nachvollziehbarkeit wichtiger Änderungen zeigen.

Inhalte:

- Änderungsliste,
- Datum,
- Person oder Rolle,
- Bereich,
- Aktion,
- Filter.

Nicht im ersten Stand:

- tiefes Forensik- oder Compliance-Reporting.

## ValidEat interner Admin

### Ziel

Der interne Bereich dient dazu, Kundenmandanten und deren Aktivierungsstand zu sehen. Er wird nicht mit dem Firmen-Adminbereich vermischt.

### Flow: Kundenmandant betreuen

1. Interner Admin meldet sich an.
2. Kundenübersicht zeigt alle Organisationen.
3. Admin öffnet einen Kundenmandanten.
4. Detail zeigt aktive Module, Setup-Status, Brandingstatus und letzte Systemereignisse.
5. Bei Bedarf kann ein Modul freigeschaltet oder als `Einrichtung erforderlich` markiert werden.
6. Änderungen werden protokolliert.

## ValidEat interner Admin: Seitenkonzept

### VI-01 Interne Kundenübersicht

Zweck:

- Alle Kundenmandanten auf einen Blick sehen.

Inhalte:

- Suchfeld,
- Filter nach Status,
- Tabelle mit Organisation, Status, aktive Module, Setup-Fortschritt, letzter Aktivität,
- Aktion `Mandant öffnen`.

### VI-02 Mandantendetail

Zweck:

- Einen Kundenmandanten betreuen.

Inhalte:

- Organisationsdaten,
- aktive Module,
- Setup-Fortschritt,
- Brandingstatus,
- Restaurantanzahl,
- Mitarbeitendenanzahl als Kennzahl,
- letzte Aktivitäten,
- Aktionen `Modulstatus prüfen`, `Supportnotiz hinzufügen`.

### VI-03 Modulfreischaltung

Zweck:

- Komplexe Module intern freigeben oder in Einrichtung halten.

Inhalte:

- Modul,
- aktueller Status,
- Voraussetzungen,
- technische Hinweise,
- Entscheidung `Freischalten`, `Einrichtung erforderlich`, `Zurückstellen`,
- Begründungsfeld.

### VI-04 Systemstatus

Zweck:

- Grobe Betriebsübersicht für den Prototyp.

Inhalte:

- aktive Mandanten,
- aktive Module,
- fehlgeschlagene Prüfungen,
- offene Aktivierungen,
- einfache Statusliste.

## Vorgesehene Figma-Struktur

```text
00 Cover & Hinweise
01 Restaurant – User Flows
02 Restaurant – Mobile Scanner
03 Restaurant – Admin
04 SaaS – User Flows
05 SaaS – Onboarding
06 SaaS – Company Admin
07 SaaS – Modules
08 SaaS – Branding
09 ValidEat Internal Admin
10 States & Edge Cases
11 Open Questions & Variants
```

## Priorisierter Screenumfang

### Priorität 1

- RM-01 Restaurant Login,
- RM-02 Standort auswählen,
- RM-03 Scan Start,
- RM-04 Kamera Scan,
- RM-05 Ergebnis: Einlösung erfolgreich,
- RM-06 Ergebnis: Bereits eingelöst,
- RM-07 Ergebnis: Ungültig oder abgelaufen,
- SA-02 Organisation registrieren,
- SA-04 Setup-Assistent,
- SA-06 Module verwalten,
- SA-07 Moduldetail Restaurant QR-Scanner,
- SA-10 Branding konfigurieren,
- SA-11 Branding-Vorschau.

### Priorität 2

- RM-10 Scan-Verlauf,
- RM-11 Scan-Detail,
- RA-01 Restaurant Dashboard,
- RA-02 Einlösungen,
- RA-04 Abrechnung,
- SA-05 Firmen-Dashboard,
- SA-08 Organisation und Benutzer,
- SA-09 Regeln und Markerlstufen.

### Priorität 3

- RA-03 Einlösungsdetail,
- RA-05 Einstellungen,
- SA-12 Integrationen und Export,
- SA-13 Audit,
- VI-01 Interne Kundenübersicht,
- VI-02 Mandantendetail,
- VI-03 Modulfreischaltung,
- VI-04 Systemstatus.

## API-Nutzung und Daten

### Restaurant-Scan

- Eingabedaten: QR-Inhalt, Restaurant-ID, Standort-ID, Zeitstempel, Geräte- oder Sitzungskennung.
- Ausgabedaten: Ergebnisstatus, Markerlstufe, Einlösungs-ID, Zeitpunkt, Ablehnungsgrund, optionale Retry-Information.
- Validierung: vollständig serverseitig.
- Frontend-Regel: QR-Inhalt nicht lokal als fachliche Wahrheit interpretieren.

### Restaurant Admin

- Eingabedaten: Zeitraum, Statusfilter, Standortfilter.
- Ausgabedaten: Einlösungsliste, Periodensummen, Einlösungsdetail.
- Bearbeitung: im ersten Konzept nicht vorgesehen.

### SaaS Company Admin

- Eingabedaten: Organisation, Module, Mitarbeitende, Kostenstellen, Restaurants, Regeln, Branding.
- Ausgabedaten: Setup-Fortschritt, Modulstatus, Vorschaukonfiguration, Audit-Einträge.
- Validierung: Pflichtfelder, Rollenrechte, Kontrastprüfung und Modulvoraussetzungen.

### ValidEat interner Admin

- Eingabedaten: Mandantenfilter, Modulstatusänderungen, Supportnotizen.
- Ausgabedaten: Mandantenliste, Mandantendetail, Aktivierungsstatus, Systemhinweise.

Noch nicht abgestimmte Schnittstellen werden als Vorschlag oder Annahme gekennzeichnet.

## Zustände

| Zustand | Restaurant Mobile | Restaurant Admin | SaaS |
|---|---|---|---|
| Laden | QR wird geprüft | Einlösungen werden geladen | Setupdaten werden geladen |
| Erfolgreich | Einlösung erfolgreich | Einlösungen vorhanden | Schritt abgeschlossen |
| Leer | noch keine Scans heute | keine Einlösungen im Zeitraum | noch keine Module eingerichtet |
| Fehler | QR ungültig, bereits eingelöst oder Server nicht erreichbar | Liste kann nicht geladen werden | Setupschritt kann nicht gespeichert werden |
| Offline | keine Einlösung ohne Serverprüfung | Hinweis auf fehlende Aktualität | Bearbeitung eingeschränkt |
| Keine Berechtigung | Standort nicht erlaubt | Bereich nicht verfügbar | Modul oder Einstellung nicht freigegeben |

## Fehlerbehandlung

| Fehlerfall | Reaktion des Systems | Information für die nutzende Person |
|---|---|---|
| Kamera nicht verfügbar | Scan kann nicht gestartet werden | `Kamera konnte nicht geöffnet werden.` |
| QR-Code nicht lesbar | erneuten Scan anbieten | `Der QR-Code konnte nicht gelesen werden.` |
| QR-Code ungültig | Einlösung ablehnen | `Dieses Markerl ist ungültig oder abgelaufen.` |
| Markerl bereits eingelöst | doppelte Einlösung blockieren | `Dieses Markerl wurde bereits eingelöst.` |
| Falscher Standort | Einlösung blockieren | `Dieses Markerl ist für diesen Standort nicht gültig.` |
| Keine Verbindung | keine erfolgreiche Einlösung speichern | `Die Prüfung ist gerade nicht möglich.` |
| Keine Berechtigung | Zugriff verweigern | `Für diesen Bereich fehlt die Berechtigung.` |
| Setup unvollständig | Aktivierung blockieren oder warnen | `Dieser Schritt ist noch nicht vollständig eingerichtet.` |
| Branding-Kontrast zu niedrig | Veröffentlichung blockieren oder warnen | `Der Kontrast ist für gute Lesbarkeit zu niedrig.` |

## Sicherheit und Datenschutz

- Authentifizierung und Berechtigung: Restaurant-, Firmen-Admin- und interne Rollen müssen getrennt werden.
- QR-Code: Der QR-Inhalt darf nicht als dauerhaft wiederverwendbarer Klartext-Code gestaltet werden.
- Personenbezogene Daten: Restaurantansichten zeigen keine vollständigen Personendaten.
- Lokale Speicherung: QR-Inhalte und personenbezogene Daten werden nicht unnötig dauerhaft gespeichert.
- Protokollierung: Einlösungen, Modulaktivierungen, Regeländerungen und Branding-Veröffentlichungen werden nachvollziehbar protokolliert.
- Rollen: Firmeninhaber und Organisations-Admins verwalten zentrale Daten. Andere Rollen erhalten nur ihre jeweiligen Arbeitsbereiche.
- Besondere Risiken: Doppelte Einlösungen, falscher Standort, zu weitreichende Rollenrechte und schlechtes Branding müssen sichtbar abgesichert werden.

## Offline-Verhalten

Offline-Verhalten ist besonders beim Restaurant-Scan relevant. Im ersten Konzept wird keine echte Offline-Einlösung gestaltet, weil dadurch doppelte Einlösungen entstehen könnten. Ohne Serververbindung zeigt die App einen Fehlerzustand und speichert keine erfolgreiche Einlösung.

Eine spätere Variante kann prüfen:

- kurzzeitige Reservierung,
- signierte QR-Codes,
- lokale Warteschlange,
- spätere Synchronisation,
- Konfliktbehandlung bei doppelter Einlösung.

Diese Punkte gehören nicht zum ersten Figma-Hauptflow.

## Alternativen

### Alternative 1: Restaurant-App nur als Scanner ohne Verlauf

- Vorteile: sehr kleiner Umfang, klarer Fokus.
- Nachteile: Restaurant-Mitarbeitende können letzte Scans nicht nachvollziehen.
- Entscheidung: verworfen.
- Grund: Ein kleiner Verlauf ist für Fehlerfälle am Tresen hilfreich.

### Alternative 2: Restaurant-Admin mit Bearbeitung und Export

- Vorteile: mehr Selbstständigkeit für Restaurants.
- Nachteile: höheres Risiko für falsche Korrekturen und Überschneidung mit Unternehmensabrechnung.
- Entscheidung: vorerst verworfen.
- Grund: Der erste Stand soll nur Ansicht und Nachvollziehbarkeit bieten.

### Alternative 3: SaaS-Plattform als Shop

- Vorteile: Module wären leicht als Produktangebot erkennbar.
- Nachteile: widerspricht dem Ziel einer ruhigen Verwaltungsplattform.
- Entscheidung: verworfen.
- Grund: Module werden über einen assistierten Setup- und Aktivierungsbereich verwaltet.

### Alternative 4: Alle Module vollständig automatisch aktivieren

- Vorteile: idealer Self-Service.
- Nachteile: komplexe Module benötigen vermutlich Daten, Rollen, Restaurants, Regeln oder technische Prüfung.
- Entscheidung: teilweise gewählt.
- Grund: einfache Aktivierung ist Ziel, aber komplexe Module erhalten den Status `Einrichtung erforderlich`.

## Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|---|---|---|---|
| SaaS-Ideen wirken wie Porsche-Pflichtumfang | mittel | falsche Erwartung im Review | Bereiche klar kennzeichnen |
| Restaurant sieht zu viele personenbezogene Daten | mittel | Datenschutzrisiko | Anzeige auf Status, Stufe, Standort und Zeitpunkt reduzieren |
| Direkter Scan verbraucht QR-Code versehentlich | mittel | falsche Einlösung | spätere Bestätigungsvariante dokumentieren |
| Offline-Scan wird zu früh als sicher dargestellt | mittel | fachlich falscher Ablauf | Offline nur als Fehlerzustand zeigen |
| Modulverwaltung wirkt wie Verkaufsshop | niedrig bis mittel | falsche Produktwirkung | keine Preise, kein Warenkorb, keine Checkout-Sprache |
| Branding verschlechtert Kontrast | mittel | schlechte Bedienbarkeit | Kontrasthinweise und kontrollierte Statusfarben |
| Prototyp wird zu groß | mittel | unübersichtlicher Review | Prioritäten verwenden und interne Bereiche trennen |

## Teststrategie

| Ebene | Geplante Prüfung | Erwartetes Ergebnis |
|---|---|---|
| Statisch | keine Codeprüfung, da Design-Change | nicht betroffen |
| Automatisiert | keine automatisierten Tests im Figma-Konzept | nicht betroffen |
| Manuell | Figma-Flows vollständig durchklicken | keine Sackgassen in Kernflows |
| Usability | kurzer Review mit typischen Aufgaben | Scan-, Setup- und Modulflows sind verständlich |
| Barrierefreiheit | Kontrast, Textgrößen, Statuskommunikation und Touch-Ziele prüfen | keine Information nur über Farbe |
| Datenschutz | Restaurantansichten auf Datenminimierung prüfen | keine unnötigen Personendaten im Restaurantbereich |

Geplante Tests werden erst nach ihrer tatsächlichen Ausführung im Nachweis als bestanden oder fehlgeschlagen eingetragen.
