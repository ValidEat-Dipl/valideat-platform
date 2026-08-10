# Meilensteinbericht 1 und 2 – ValidEat

## Berichtsmetadaten

| Feld | Angabe |
|---|---|
| Projekt | ValidEat – SaaS-Lösung zur Verwaltung digitaler Essensmarken |
| Team | Erik Bergmair, Julian Richter, Joschua Auer |
| Betreuungslehrer | Gerald Aistleitner |
| Kooperationspartner | Porsche Informatik Gesellschaft m.b.H. |
| Ansprechpartner | Tobias Wagner |
| Berichtsdatum | 22.07.2026 |
| Betrachteter Zeitraum | Projektbeginn bis einschließlich 22.07.2026 |
| Meilenstein 1 | 10.07.2026 – Datenbankmodell und User-Interfaces für das manuelle Tracking sind fertiggestellt |
| Meilenstein 2 | 22.07.2026 – Porsche-Grundplattform für Tracking und Admin-Eingabe ist implementiert und bereit |
| Nächster Meilenstein | 31.07.2026 – SaaS-Erweiterung auf Mandantenfähigkeit und JWT-Schnittstellen sind fertiggestellt |

## Zusammenfassung

Die ersten beiden Projektmeilensteine wurden erreicht.

Zum ersten Meilenstein lagen das für die Grundplattform benötigte Datenmodell, die zugehörigen Entities und ER-Diagramme sowie die User-Interface-Entwürfe für Mitarbeiter- und HR/Adminbereich vor. Der gemeinsame Figma-Prototyp umfasst 21 miteinander verknüpfte Screens und bildet die zentralen Abläufe beider Bereiche ab.

Zum zweiten Meilenstein ist die Grundplattform für die manuelle Erfassung umgesetzt. Mitarbeitende können eine Markerlverwendung erfassen, ihre Erfassungen anzeigen und offene Einträge bearbeiten oder löschen. HR/Admin kann physische Markerl erfassen, Daten in den vorgesehenen Übersichten anzeigen, Einträge korrigieren und Konflikte bearbeiten. Frontend, Backend und lokale Datenbank sind für diesen Ablauf miteinander verbunden.

Der zentrale Ablauf wurde vom Team manuell getestet: Eine Markerlverwendung wurde im Mitarbeiterbereich angelegt, anschließend wurde die entsprechende physische Marke im HR-Bereich erfasst. Der bereits implementierte Clearing-Algorithmus verglich beide Einträge, erkannte die Übereinstimmung und setzte sie auf den bestätigten Status. Damit ist der für Meilenstein 2 vorgesehene Kernprozess nachgewiesen. Der Clearing-Algorithmus stellt zugleich einen Vorgriff auf einen späteren Meilenstein dar.

Nach Teamangabe wurden bis zum Stichtag gemeinsam rund 175 Arbeitsstunden in Analyse, Design, Frontend, Backend, Datenmodell, Integration, Tests und Dokumentation investiert.

Die derzeit laufende Umstellung des Logins auf JWT gehört zum nächsten Meilenstein. Login und Registrierung waren vor dieser Umstellung funktionsfähig. Das Backend wurde bereits auf den neuen Loginvertrag und die JWT-Erzeugung vorbereitet; die Anpassung des Mitarbeiterfrontends folgt im nächsten Sprint. Für die Entwicklung und das Testen des Trackingablaufs wird derzeit weiterhin die bekannte Entwicklungsidentität verwendet.

## Einordnung des Projektumfangs

Die Bewertung erfolgt nach dem jeweils geplanten Meilensteinumfang. Funktionen späterer Meilensteine werden nicht als fehlende Bestandteile der ersten beiden Meilensteine gewertet.

Insbesondere gehören folgende Arbeiten in die nächsten Projektphasen:

- vollständige JWT-Integration im Frontend sowie Rollen- und Endpunktabsicherung,
- Mandantenfähigkeit und Datenisolation,
- PDF- beziehungsweise finaler Export- und Freigabeablauf,
- Blockchain-Archivierung,
- produktive Datenbank- und Deploymentkonfiguration mit PostgreSQL, Docker und Kubernetes,
- PWA-, Offline-, Kamera- und Scannerfunktionen.

## Meilenstein 1 – Datenbankmodell und User-Interfaces

### Ziel

Bis zum 10.07.2026 sollten das Datenbankmodell und die User-Interfaces für das manuelle Tracking fertiggestellt sein. Der Schwerpunkt lag auf der fachlichen und technischen Grundlage, auf der die anschließende Implementierung aufbauen konnte.

### Umgesetzte Arbeiten

#### Datenmodell und Backendgrundlage

- Quarkus-Backend als eigenständige Anwendung angelegt
- zentrale Entities für Mitarbeitende, Essenmarkerl, Restaurants, Kostenstellen und Markerlstufen erstellt
- Beziehungen zwischen den fachlichen Entitäten modelliert
- ER-Diagramme erstellt und mit Beispieldaten ergänzt
- erste Repositories und CRUD-Funktionen aufgebaut
- Login- und Registrierungsgrundlage mit Passwort-Hashing umgesetzt
- erste Mitarbeiter-REST-Routen einschließlich Markerl-Erfassung angelegt

Das Datenmodell wurde im weiteren Projektverlauf erwartungsgemäß verfeinert. Diese Weiterentwicklung ändert nichts daran, dass zum ersten Stichtag eine vollständige und implementierbare Modellgrundlage vorhanden war.

#### User-Interface-Entwürfe

Der ValidEat-Prototyp wurde in einer gemeinsamen Figma-Datei fertiggestellt. Er umfasst:

- 12 Screens für die HR-/Adminplattform,
- 9 Screens für die mobile Mitarbeiteroberfläche,
- insgesamt 21 verknüpfte Screens,
- User Flow, Moodboard und wiederverwendbare Komponenten,
- Abläufe für Anmeldung, Registrierung, Erfassung, Übersicht, Korrektur, Clearing, Konfliktbearbeitung und Export.

Figma-Verweise:

- [ValidEat – Designdatei](https://www.figma.com/design/VBtBtXDB2mzApytOZSV2oi/ValidEat?node-id=0-1)
- [ValidEat – klickbarer Prototyp](https://www.figma.com/proto/VBtBtXDB2mzApytOZSV2oi/ValidEat?node-id=110-453&p=f&viewport=811%2C-2824%2C0.45&t=c5HMaP9FdWinVE8m-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=110%3A453&page-id=0%3A1&show-proto-sidebar=1)

Parallel dazu wurde die Angular-Grundlage für den HR-Bereich angelegt. Erste HR-Seiten, Layouts, Tabellen und Konfliktansichten waren bereits als Code vorhanden.

### Nachweise

- ER-Diagramme und Backend-Entities im Repository
- abgeschlossener Change `VAL-003-design-figma-prototype`
- [GitHub-Issue #2 – Figma-Prototyp](https://github.com/ValidEat-Dipl/valideat-platform/issues/2)
- Commit [`30d44b0`](https://github.com/ValidEat-Dipl/valideat-platform/commit/30d44b0) – fertiggestellter Figma-Prototyp dokumentiert
- Commit [`8241716`](https://github.com/ValidEat-Dipl/valideat-platform/commit/8241716) – Entities an das ER-Diagramm angepasst
- Commit [`33af0f1`](https://github.com/ValidEat-Dipl/valideat-platform/commit/33af0f1ae453f3fd5107f5067854ae1bbe6fa47a) – REST-Route für die Mitarbeitererfassung

### Bewertung

**Meilenstein 1 ist erreicht.**

Das Datenmodell, die technische Backendgrundlage und die vollständigen UI-Entwürfe für das manuelle Tracking waren zum Stichtag vorhanden. Der Figma-Prototyp bildete die gemeinsame Grundlage für die nachfolgende Angular-Implementierung.

## Meilenstein 2 – Grundplattform für Tracking und Admin-Eingabe

### Ziel

Bis zum 22.07.2026 sollte die Porsche-Grundplattform für das manuelle Tracking durch Mitarbeitende und die Erfassung der physischen Markerl durch HR/Admin implementiert und lokal nutzbar sein.

### Mitarbeiterbereich

Folgende Ansichten und Abläufe sind implementiert:

- Willkommensseite
- Login und Registrierung
- mobile Startseite
- Formular zur Erfassung einer Markerlverwendung
- Laden der Restaurants, Kostenstellen und Markerlstufen aus dem Backend
- Prüfseite vor dem Speichern
- Erfolgsbestätigung
- Verlauf der eigenen Erfassungen
- Detailansicht einer Erfassung
- Bearbeiten offener Erfassungen
- Löschen offener Erfassungen
- responsive Navigation und mobile Gestaltung mit Angular, Bootstrap 5.3 und SCSS

Die REST-Anbindung deckt Anlegen, Laden, Bearbeiten und Löschen ab. Das Frontend erhält nach dem Anlegen die ID des neuen Eintrags und kann zur gespeicherten Erfassung navigieren.

Für den Mitarbeiterbereich bestehen 15 automatisierte Testdateien mit insgesamt 32 erfolgreichen Tests. Dabei werden unter anderem Formulare, Navigation sowie GET-, POST-, PUT- und DELETE-Aufrufe geprüft.

### HR-/Adminbereich

Der HR-/Adminbereich enthält die für den Grundprozess vorgesehenen Seiten:

- Adminübersicht mit Statusinformationen
- Übersicht der zuletzt erfassten Markerl
- Erfassung einer physischen Marke
- Ticketdetails
- Korrektur von Einträgen
- Löschen von Einträgen
- Clearingübersicht
- Übersicht offener Konflikte
- Vergleich und Bearbeitung eines Konflikts
- vorbereitete Exportseite

Die Seiten sind an die zugehörigen REST-Endpunkte angebunden. HR kann physische Markerl erfassen, bestehende Daten aufrufen, korrigieren und Konflikte bearbeiten. Die Exportseite bildet den vorgesehenen späteren Exportprozess bereits im UI ab; die PDF-Erzeugung folgt in einem späteren Sprint.

### Backend und Datenhaltung

Für den Trackingablauf sind insbesondere folgende Funktionen vorhanden:

- Mitarbeiter- und Adminerfassungen anlegen
- Erfassungen nach Mitarbeiter laden
- Einzelerfassungen und Übersichten laden
- offene Mitarbeitererfassungen bearbeiten
- Einträge löschen
- Adminerfassungen filtern und korrigieren
- Statistiken und Statusinformationen für die Adminübersicht laden
- Clearingdaten und Konflikte laden
- Mitarbeiter- und Adminerfassungen miteinander verknüpfen
- Änderungsinformationen über `ChangeLog` speichern

Die lokale Entwicklung verwendet H2 und reproduzierbare Seed-Daten. PostgreSQL ist für den späteren produktionsnahen Build- und Deploymentstand vorgesehen und war kein Ziel dieses Meilensteins.

### Clearing und Audit

Der Clearing-Algorithmus ist bereits implementiert, obwohl seine vollständige Integration und systematische Testabdeckung erst für einen späteren Meilenstein geplant ist.

Aktuell vergleicht er Mitarbeiter- und Adminerfassungen anhand von:

- Mitarbeiter,
- Verwendungsdatum,
- Restaurant,
- Kostenstelle,
- Markerlstufe.

Bei vollständiger Übereinstimmung werden beide Datensätze auf `CHECKED` gesetzt und miteinander verknüpft. Abweichungen können als korrekturbedürftig beziehungsweise konfliktbehaftet gekennzeichnet und in der HR-Oberfläche bearbeitet werden.

Der erfolgreiche Kernfall wurde vom Team manuell geprüft. Zusätzlich sind ChangeLogs für Adminerfassungen und Korrekturen im Datenmodell und Backend vorhanden.

### Authentifizierungsstand

Login und Registrierung waren im bisherigen Entwicklungsstand funktionsfähig. Während der Vorbereitung des nächsten Meilensteins wurde das Backend bereits auf einen neuen JSON-basierten Loginvertrag mit JWT-Antwort umgestellt. Deshalb befindet sich die Employee-Anmeldung am 22.07. in einem bewusst vorübergehenden Integrationszustand:

- der neue Backend-Login und die JWT-Erzeugung sind vorhanden,
- das Mitarbeiterfrontend verwendet vorübergehend noch den bisherigen Vertrag,
- die Registrierung im Employee-Frontend muss an den neuen Rollen- und Requestvertrag angepasst werden,
- für lokale Trackingtests wird die Entwicklungs-Mitarbeiter-ID `1` verwendet.

Dieser Übergang ist Bestandteil der bereits begonnenen Arbeit für den Meilenstein vom 31.07. und schränkt die Bewertung des zuvor funktionsfähigen Tracking- und Adminprozesses für Meilenstein 2 nicht ein.

### Technische Verifikation

| Prüfung | Ergebnis |
|---|---|
| Lokaler Angular-Start mit `npm start -- --host 127.0.0.1 --port 4201` am 22.07.2026 | erfolgreich; Browser- und Server-Bundles erzeugt, Development-Server gestartet |
| Mitarbeiter-Tests mit `npx ng test --watch=false --include='src/app/features/employee/**/*.spec.ts'` | 15 Testdateien und 32 Tests erfolgreich |
| Quarkus-Kompilierung und Paketierung ohne Testausführung | erfolgreich |
| Manueller Gesamtflow Mitarbeitererfassung → HR-Erfassung → Clearing → Bestätigung | laut Teamtest erfolgreich |

Die automatisierte Testabdeckung des HR-Bereichs und des Clearing-Algorithmus wird in den kommenden Integrations- und Testphasen weiter ausgebaut. Für den zweiten Meilenstein dient der erfolgreiche manuelle Gesamtflow als zentraler Integrationsnachweis.

### Abgleich mit den Teilzielen

| Teilziel | Status zum 22.07.2026 | Nachweis |
|---|---|---|
| Mitarbeitende können eine Verwendung erfassen | erfüllt | mehrstufiger Angular-Flow, REST-POST und erfolgreicher manueller Ablauf |
| Mitarbeitende können ihre Erfassungen sehen | erfüllt | Verlauf, Detailansicht und REST-GET |
| Offene Erfassungen können bearbeitet und gelöscht werden | erfüllt | Angular-Seiten, PUT-/DELETE-Endpunkte und Frontendtests |
| HR/Admin kann physische Markerl erfassen | erfüllt | HR-Formular, REST-POST und manueller Gesamtflow |
| Admin kann relevante Daten anzeigen | erfüllt | Übersicht, letzte Erfassungen, Details, Clearing und Konflikte |
| Mitarbeiter- und Adminfrontend sind mit dem Backend verbunden | erfüllt | implementierte Services und manueller Integrationsablauf |
| Notwendige Backendendpunkte sind vorhanden | erfüllt | Employee-, FoodTicket-, Restaurant-, Tier- und CostOrder-Ressourcen |
| Daten können lokal gespeichert und wieder geladen werden | erfüllt | JPA/Hibernate, H2, Seed-Daten und manueller Test |
| Der zentrale Flow ist lokal ausführbar | erfüllt | bestätigter manueller Teamtest |
| Clearing erkennt eine vollständige Übereinstimmung | erfüllt und vorgezogen | Algorithmus im Backend und erfolgreicher manueller Kernfall |
| Änderungen im HR-Bereich werden protokolliert | erfüllt | `ChangeLog` bei Adminerfassung und Korrektur |
| Der Stand ist nachvollziehbar dokumentiert | erfüllt | Git-Historie, Issues, Changes, Evidence, Worklogs und dieser Snapshot |

### Bewertung

**Meilenstein 2 ist erreicht.**

Die Grundplattform für Tracking und Admin-Eingabe ist implementiert und lokal nutzbar. Der zentrale Ablauf von der Mitarbeitererfassung über die HR-Erfassung bis zur automatischen Bestätigung einer übereinstimmenden Marke funktioniert im manuellen Test. Zusätzlich wurden mit Clearing und JWT-Backend bereits Arbeiten für spätere Meilensteine begonnen.

## Seit Meilenstein 1 umgesetzte Schwerpunkte

### Frontend

- vollständiger mobiler Mitarbeiterablauf in Angular
- responsive Umsetzung auf Basis des Figma-Prototyps
- vollständige HR-/Adminseiten für Erfassung, Übersicht, Korrektur und Konfliktbearbeitung
- gemeinsame REST-Anbindung der Oberflächen

### Backend und Datenbank

- REST-Schnittstellen für Mitarbeiter- und Adminabläufe
- DTOs für begrenzte und passende Frontendantworten
- Seed-Daten für lokale Entwicklung
- Bearbeiten, Löschen, Filtern und Statusauswertungen
- ChangeLog-Beziehungen und Auditinformationen
- automatisches Clearing und Verknüpfen passender Tickets
- JWT-Erzeugung als Vorarbeit für den nächsten Sprint

### Dokumentation

- laufende Git- und Issue-Dokumentation
- strukturierte Changes und Evidence für Figma und Mitarbeiterfrontend
- Arbeitsprotokolle und technische Entscheidungsgrundlagen
- zusätzliche FSD-Fragensammlung als freiwillige Vorbereitung der späteren Projektdokumentation

## Ausblick auf Meilenstein 3 – 31.07.2026

### Ziel

Der nächste Meilenstein konzentriert sich auf JWT-Schnittstellen und die technische Grundlage der Mandantenfähigkeit. Diese Punkte werden ab jetzt als eigener Sprintumfang behandelt.

### Bereits vorhandene Vorarbeiten

- Passwort-Hashing und Benutzerrollen im Backend
- JSON-basierter Backend-Login
- JWT-Erzeugung mit Benutzer-ID, Kontodaten und Rolle
- Rollen `EMPLOYEE`, `ADMIN` und `SAAS_ADMIN` im Datenmodell
- vorbereiteter Change `VAL-005-integrate-employee-jwt-authentication`
- GitHub-Issues für Backend-JWT und Employee-JWT-Integration

### Nächste Arbeitsschritte

1. Employee-Login auf den neuen JSON-Vertrag umstellen.
2. JWT und angemeldete Benutzer-ID im Frontend verwalten.
3. fest eingetragene Entwicklungs-ID durch die angemeldete Identität ersetzen.
4. Registrierung an den neuen Vertrag anpassen und die Rolle serverseitig sicher vergeben.
5. Bearer-Token bei geschützten Anfragen mitsenden.
6. Rollen-, Besitz- und Endpunktprüfungen im Backend ergänzen.
7. minimalen fachlichen Umfang eines Mandanten verbindlich definieren.
8. Tenant-/Organisationszuordnung im Datenmodell ergänzen.
9. Datenzugriffe auf den jeweiligen Mandanten begrenzen.
10. JWT- und Mandantentrennung automatisiert sowie manuell prüfen.

### Planung und Risiko

Die JWT-Arbeit ist bereits begonnen und hat eine konkrete Backendgrundlage. Die Mandantenfähigkeit startet im nächsten Sprint. Wegen der vom Team mitgeteilten eingeschränkten Verfügbarkeit wird der Umfang priorisiert:

1. funktionsfähiger JWT-Login und sichere Benutzerzuordnung,
2. Rollen- und Endpointabsicherung,
3. minimales Mandantenmodell und Datenisolation,
4. weiterführende SaaS-Oberflächen, Module und Branding anschließend.

So bleibt der nächste Meilenstein auf seine technisch notwendigen Kernergebnisse fokussiert. Detaillierte SaaS-Pakete, buchbare Module und mandantenspezifisches Branding werden erst umgesetzt, sobald ihr fachlicher Umfang abgestimmt ist.

## Weitere geplante Meilensteine

### 14.08.2026 – Clearing und Blockchain

Der vorhandene Clearing-Algorithmus wird systematisch erweitert, mit Konfliktfällen geprüft und durch automatisierte Tests abgesichert. Die Blockchain-Archivierung wird als eigener Integrationsbaustein ergänzt.

### 04.09.2026 – Deployment und Integrationstests

In der abschließenden Projektphase folgen produktionsnahe Datenbankkonfiguration, Containerisierung, Kubernetes-Deployment und vollständige Integrationstests. In diesem Zusammenhang erfolgt auch die Umstellung auf PostgreSQL.

## Hinweis zum verspäteten Bericht für Meilenstein 1

Der Bericht zum ersten Meilenstein vom 10.07.2026 wurde nicht separat zum Stichtag versendet. Der vorliegende Bericht holt diese Dokumentation transparent nach und rekonstruiert den damaligen Stand anhand der Git-Historie, der ER-Diagramme, des abgeschlossenen Figma-Changes und der vorhandenen Implementierung. Er deckt anschließend den Fortschritt bis zum zweiten Meilenstein am 22.07.2026 ab.

## Gesamteinschätzung

ValidEat besitzt zum 22.07.2026 eine funktionierende lokale Grundplattform für die manuelle digitale Erfassung und die HR-seitige Gegenprüfung von Essenmarkerln. Beide bisher geplanten Meilensteine sind erreicht.

Das Team hat nicht nur die für Meilenstein 2 erforderlichen Mitarbeiter- und Adminabläufe umgesetzt, sondern mit automatischem Clearing, Auditinformationen und JWT-Erzeugung bereits Vorarbeiten späterer Projektphasen geleistet. Der nächste Sprint kann deshalb auf einer funktionsfähigen Trackingplattform aufbauen und sich gezielt auf Authentifizierung, Autorisierung und Mandantenfähigkeit konzentrieren.

## Nachweisbasis

- Repository-Stand auf `main` am 22.07.2026, Commit `59d2d5fe52756f718b81e8547357006705ddbac7`
- Git-Historie vom Projektbeginn bis zum Stichtag
- Angular- und Quarkus-Quellcode
- ER-Diagramme und Datenbankentitäten
- Figma-Datei und klickbarer Prototyp
- GitHub-Issues und relevante Commits
- Changes, Evidence und Worklogs im Repository
- erfolgreiche Employee-Tests und lokaler Angular-Start
- erfolgreicher manueller Teamtest des zentralen Tracking- und Clearingablaufs, bestätigt am 22.07.2026
- kumulierter Aufwand von rund 175 Stunden laut Teamangabe

