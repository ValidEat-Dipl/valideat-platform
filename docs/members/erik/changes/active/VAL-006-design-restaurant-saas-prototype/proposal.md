# Proposal: Restaurant- und SaaS-Plattform im Figma-Prototyp erweitern

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-006` |
| Status | `implemented` |
| Verantwortlich | Erik Bergmair |
| Erstellt am | 2026-07-30 |
| Zuletzt geändert | 2026-08-10 |
| FSD-Referenz | `docs/FSD.md`, Restaurant- und SaaS-Erweiterung derzeit noch nicht ausgearbeitet |
| GitHub Issue | nicht festgestellt |

## Herkunft und Sicherheit

- Art: persönlicher Vorschlag / SaaS-Idee / Umsetzungsvorbereitung für Eriks UI/UX-Verantwortungsbereich
- Grundlage: bisheriger ValidEat-Prototyp, geplanter SaaS-Ausbau nach der Porsche-Version und Eriks Verantwortungsbereich für UI/UX, Restaurantoberfläche, Kamera und Scanner
- Bestätigt durch: nicht als Porsche-Anforderung bestätigt

## Ausgangslage

Der bisherige ValidEat-Prototyp behandelt den Mitarbeiterbereich und HR-/Admin-Abläufe für den Porsche-Kernprozess. Für die spätere SaaS-Plattform fehlen noch konzeptionelle und visuelle Entwürfe für zwei Erweiterungsbereiche:

- eine Restaurant-Plattform, über die Restaurant-Mitarbeitende digitale Markerl per QR-Code prüfen und einlösen können,
- eine SaaS-Verwaltung, über die ein Unternehmen seine ValidEat-Umgebung, Module, Organisation, Regeln und Branding verwalten kann.

Diese Erweiterungen gehören nicht automatisch zum ersten Porsche-Pflichtumfang. Sie sollen als spätere Plattformfähigkeit dargestellt werden und müssen deshalb klar von bestätigten Porsche-Funktionen getrennt bleiben.

## Ziel

Ziel ist ein nachvollziehbares Konzept und ein darauf aufbauender Figma-Prototyp für Restaurant- und SaaS-Funktionen. Der Prototyp soll zeigen, wie die später erweiterbare ValidEat-Plattform funktionieren kann, ohne bereits ungeklärte Geschäftsregeln als endgültig darzustellen.

Der Fokus liegt auf:

- mobilem QR-Scan-Ablauf für Restaurant-Mitarbeitende,
- kleinem Restaurant-Adminbereich für Einlösungen und Abrechnung,
- SaaS-Onboarding für Unternehmen,
- Modulverwaltung für buchbare ValidEat-Funktionen,
- Branding-Konfiguration für mandantenspezifisches Erscheinungsbild,
- verständlicher Trennung zwischen aktivem Kernumfang, späteren Modulen und offenen Annahmen.

## Tatsächlicher Figma-Stand am 2026-08-10

Der Figma-Stand wurde von Erik weiter ausgearbeitet. Es wurde kein vollständig klickbarer Gesamtprototyp für Restaurant und SaaS erstellt, aber die relevanten Seiten wurden als visuelle Figma-Entwürfe angelegt.

Figma-Datei:

- [ValidEat in Figma](https://www.figma.com/design/VBtBtXDB2mzApytOZSV2oi/ValidEat?node-id=0-1&t=NBOaTKoaEOCxzTvz-1)

Umgesetzte Bereiche:

- Restaurant User mit Login, Standortauswahl, Übersicht, QR-Code-Scan, Ergebnisfällen, Verlauf und Detailansicht.
- Restaurant Admin mit Übersicht, Einlösungen, Abrechnung und Einstellungen.
- SaaS-Bereich mit Login, Registrierung, Setup, Dashboard, Modulverwaltung, Organisation und Regeln, Branding, Branding-Vorschau und Kundenübersicht.

Dieser Stand ist ein persönlicher UI/UX-Entwurf von Erik. Er ist keine Porsche-Freigabe, keine Teamfreigabe und kein Nachweis einer technischen Umsetzung.

## Aktueller Konzeptstand

Für den nächsten Figma-Stand gelten vorläufig diese Entscheidungen:

- Restaurant-Mitarbeitende scannen ausschließlich QR-Codes. Eine manuelle Codeeingabe bleibt als spätere Fallback-Variante offen, wird aber im ersten Prototyp nicht als Hauptfunktion gestaltet.
- Der QR-Code wird auf dem Smartphone der beschäftigten Person angezeigt und vom Restaurant mit der mobilen Restaurant-Oberfläche gescannt.
- Das Restaurant-Frontend wertet den QR-Code nicht eigenständig fachlich aus, sondern sendet den QR-Inhalt an den Server. Der Server prüft in Echtzeit und liefert zurück, ob die Einlösung erfolgreich war oder warum sie abgelehnt wurde.
- Die Markerlstufe und weitere für die Prüfung nötige Informationen kommen aus dem QR-Code beziehungsweise aus der serverseitigen Prüfung. Das Restaurant ändert diese Daten nicht.
- Das Restaurant sieht im ersten Konzept keine vollständigen personenbezogenen Daten der beschäftigten Person. Angezeigt werden nur der Einlösungsstatus und die für das Restaurant notwendige Information, zum Beispiel Markerlstufe, Restaurant/Standort und Zeitpunkt.
- Mehrere Restaurants beziehungsweise Standorte sollen im Konzept berücksichtigt werden, sofern dies später technisch und fachlich sinnvoll umsetzbar ist.
- Der Restaurant-Adminbereich bleibt klein und dient vor allem zum Ansehen von Einlösungen und Abrechnungsinformationen. Korrektur-, Export- und Verwaltungsfunktionen werden vorerst nicht überladen.
- Die SaaS-Plattform ist keine Verkaufsplattform mit Warenkorb oder Checkout. Sie ist ein assistierter Verwaltungsbereich, in dem Unternehmen ihre ValidEat-Umgebung einrichten, Module aktivieren oder deren Einrichtung anstoßen können.
- Branding wird zuerst als Vorschau geprüft, dann gespeichert und anschließend veröffentlicht.
- Firmeninhaber beziehungsweise verantwortliche Organisations-Admins verwalten Organisation, Module, Regeln, Branding und zentrale Daten. Andere Rollen arbeiten hauptsächlich mit den für sie freigegebenen Bereichen.
- Ein interner ValidEat-Bereich für die Verwaltung von Kundenmandanten wird als eigener Konzeptbereich aufgenommen.

## Umfang

- Restaurant-Rollen und zentrale Aufgaben klären,
- mobilen Restaurant-Scanflow entwerfen,
- Ergebniszustände für gültige, ungültige, bereits eingelöste und nicht prüfbare QR-Codes planen,
- Restaurant-Adminbereich mit Tagesübersicht, Einlösungen, Einlösungsdetails und Abrechnungsvorschau konzipieren,
- SaaS-Einstieg mit Login, Organisationsregistrierung und Setup-Start planen,
- Firmen-Adminbereich mit Dashboard, Modulen, Organisation, Regeln, Branding und Integrationen entwerfen,
- Branding-Konfiguration mit Logo, App-Name, Primärfarbe und Vorschau darstellen,
- notwendige offene Fragen und Annahmen sichtbar halten,
- Figma-Screens in Richtung Bootstrap 5 und SCSS-Umsetzbarkeit gestalten,
- Benutzerabläufe, Fehlerzustände, Leerzustände und Berechtigungszustände berücksichtigen.

## Nicht-Umfang

- Umsetzung von Produktcode,
- Initialisierung neuer Angular-, Backend- oder Infrastrukturprojekte,
- produktive QR-Code- oder Kamera-Implementierung,
- echter Zahlungs-, Checkout- oder Verkaufsprozess,
- verbindliche Modulpreise,
- endgültige Mandanten-, Rollen- oder Berechtigungslogik,
- echte Porsche-Freigabe für Restaurant- oder SaaS-Erweiterungen,
- vollständiges Restaurant-OCR- oder Offline-Scanner-Modul,
- Blockchain-, Anomalie- oder Reporting-Spezialfunktionen,
- vollständige API-Verträge,
- finales Corporate Branding eines konkreten Kunden.

## Akzeptanzkriterien

- [x] Die Restaurant-Plattform ist klar als spätere beziehungsweise optionale Erweiterung beschrieben.
- [x] Der mobile QR-Scanflow ist als zusammenhängender Benutzerablauf geplant.
- [x] Die wichtigsten Scan-Ergebniszustände sind im Design berücksichtigt.
- [x] Der Restaurant-Adminbereich ist bewusst klein gehalten und auf Einlösungen sowie Abrechnung ausgerichtet.
- [x] Die SaaS-Plattform enthält einen verständlichen Onboarding- und Verwaltungsablauf für Unternehmen.
- [x] Die Modulverwaltung unterscheidet zwischen aktiven, angefragten, nicht aktiven und später verfügbaren Modulen.
- [x] Die Branding-Konfiguration zeigt Logo, App-Name, Farben und Vorschau ohne reales Kundenbranding.
- [x] Offene fachliche Fragen sind als offene Fragen oder Annahmen markiert.
- [x] Der geplante Screenumfang ist realistisch für einen Figma-Prototyp und spätere Angular-Umsetzung.
- [x] Es wird kein Produktcode erstellt und keine fachliche Freigabe behauptet.

## Offene Fragen

| Frage | Entscheidet durch | Zwingend vor Wireframes? | Status |
|---|---|---|---|
| Darf das Restaurant beim Scan den Namen der beschäftigten Person sehen oder nur die Gültigkeit und Markerlstufe? | Team / Datenschutz / später Kunde | Ja | vorläufig beantwortet: keine vollständigen personenbezogenen Daten anzeigen |
| Wird ein Markerl nach erfolgreichem Scan sofort eingelöst oder muss eine zusätzliche Bestätigung durch das Restaurant erfolgen? | Team / später Kunde | Ja | vorläufig beantwortet: Scan löst serverseitige Prüfung und Einlösung aus; Bestätigung bleibt spätere Variante |
| Muss es neben dem Kamerascan eine manuelle Codeeingabe als Fallback geben? | Erik / Team | Nein, aber vor finalem Prototyp sinnvoll | vorläufig beantwortet: nicht im ersten Hauptflow, später als Variante |
| Kann ein Restaurant mehreren Unternehmen beziehungsweise Mandanten zugeordnet sein? | Team / Backend | Nein für ersten Wireframe, ja vor Datenmodell | vorläufig beantwortet: mehrere Restaurants und Standorte berücksichtigen |
| Welche Informationen braucht ein Restaurant für die Abrechnung wirklich? | Team / später Kunde / Restaurant | Ja für Restaurant-Admin | vorläufig beantwortet: nur Ansicht von Einlösungen, Tageszahlen und Periodensummen |
| Darf ein Restaurant Einlösungen korrigieren oder stornieren? | Team / später Kunde | Nein für ersten Wireframe, ja vor finalem Detailflow | offen; vorerst nicht als Hauptfunktion |
| Werden Module in der SaaS-Verwaltung direkt aktiviert oder nur angefragt und später freigeschaltet? | Team | Ja | vorläufig beantwortet: assistierter Self-Service mit Status `Einrichtung erforderlich` für komplexe Module |
| Welche Module sollen im ersten SaaS-Prototyp sichtbar sein? | Team | Ja | vorläufig beantwortet im Design |
| Welche Branding-Optionen dürfen Unternehmen selbst ändern? | Team / Design / Barrierefreiheit | Ja | vorläufig beantwortet: Logo, App-Name, Primärfarbe und Vorschau; Statusfarben kontrolliert |
| Gibt es eine getrennte interne ValidEat-Verwaltung für alle Kundenmandanten? | Team | Nein, kann später geklärt werden | vorläufig beantwortet: als eigener Konzeptbereich aufnehmen |

## Annahmen

- Restaurant-Mitarbeitende nutzen die Scan-Oberfläche überwiegend mobil.
- Restaurant-Admins nutzen die Verwaltungsansichten eher auf Tablet oder Desktop.
- Der QR-Code wird auf dem Smartphone der beschäftigten Person angezeigt.
- Der Restaurant-Scan prüft und speichert die Einlösung vorläufig online gegen das System.
- QR-Codes werden im Frontend als undurchsichtiger QR-Inhalt behandelt und nicht lokal fachlich ausgewertet.
- Die Restaurant-Oberfläche zeigt keine vollständigen Personendaten.
- Die SaaS-Plattform dient zunächst der Verwaltung und Konfiguration, nicht dem öffentlichen Verkauf.
- Die SaaS-Einrichtung soll assistiert wirken und die jeweils nächsten sinnvollen Schritte anzeigen.
- Branding ist mandantenspezifisch, aber Statusfarben und Warnfarben bleiben aus Gründen der Verständlichkeit und Barrierefreiheit kontrolliert.
- Die Erweiterung wird im bestehenden ValidEat-Stil und mit Bootstrap-5-/SCSS-naher Gestaltung geplant.

## Auswirkungen

- Benutzeroberfläche: Erweiterung des Figma-Prototyps um Restaurant- und SaaS-Bereiche.
- API und Backend: spätere Schnittstellen für QR-Prüfung, Einlösung, Module, Mandanten, Branding und Abrechnung werden berührt, aber noch nicht umgesetzt.
- Daten und Datenschutz: Restaurantansichten dürfen nur die für die Einlösung notwendigen Daten anzeigen; personenbezogene Informationen sind zu minimieren.
- Offline-Verhalten: für Restaurant-Scan grundsätzlich relevant, aber im ersten Konzept nur als offener Zustand oder spätere Variante.
- Dokumentation: dieser Change dokumentiert Planung, Annahmen, offene Fragen und später tatsächliche Figma-Ergebnisse.
- Andere Teammitglieder: Backend, Mandantenfähigkeit, Sicherheit, Reporting, Export und Admin-Funktionen müssen mit Julian und Joschua abgestimmt werden.

## Abstimmungen und Freigabestatus

| Gegenstand | Zuständige Stelle | Status | Nachweis |
|---|---|---|---|
| Restaurant-Scan als späteres SaaS-Modul | Erik / Team | offen | nicht vorhanden |
| Datenschutzumfang beim Scan | Team / später Kunde | offen | nicht vorhanden |
| Restaurant-Abrechnungsansicht | Erik / Team / Joschua bei Reporting-Überschneidung | offen | nicht vorhanden |
| Modulverwaltung und Mandantenfähigkeit | Team / Julian | offen | nicht vorhanden |
| SaaS-Branding und UI-Richtung | Erik / Team | offen | nicht vorhanden |
| Figma-Prototyp als Review-Grundlage | Erik / Team | offen | nicht vorhanden |

Eine persönliche Freigabe durch Erik ist keine automatische Team-, Porsche- oder Schulfreigabe.
