# Ursprünglicher Prompt zu AI-001

Der folgende Prompt wurde von Erik Bergmair am 2026-07-05 als Ausgangspunkt für die Repository-Einrichtung, die persönliche Methode und die spätere FSD-Arbeit an Codex übergeben.

---

Du arbeitest in einem vollständig leeren GitHub-Repository für die Diplomarbeit und Softwareplattform **ValidEat**.

Lies diesen Prompt vollständig, bevor du Dateien erstellst oder Änderungen vornimmst.

## 1. Deine Aufgabe

Du unterstützt mich beim:

1. kontrollierten Aufbau des Repositorys,
2. Einrichten einer nachvollziehbaren Dokumentationsstruktur,
3. Definieren meiner persönlichen, spezifikationsbasierten Arbeitsmethode,
4. wahrheitsgemäßen Dokumentieren des bisherigen Projektstands,
5. Erstellen einer zentralen Functional Specification (`docs/FSD.md`),
6. Planen von GitHub Project, Scrumboard, Labels und Milestones

   Implementiere **keinen Produktcode**.

## 2. Verbindliche Arbeitsregeln

### Keine Commits

Du darfst Dateien und Ordner erstellen, ändern und prüfen. Du darfst jedoch niemals selbst:

- committen,
- pushen,
- Pull Requests eröffnen,
- Releases erstellen,
- GitHub Projects, Labels oder Milestones verändern.

Ich erstelle alle Commits selbst. Nach einer fertigen Änderung lieferst du:

- eine Zusammenfassung,
- die Liste geänderter Dateien,
- ausgeführte Prüfungen,
- einen Vorschlag für die Commit-Message,
- gegebenenfalls die zugehörige Issue- oder Change-ID.

Führe niemals `git commit`, `git push`, `gh pr create` oder vergleichbare Befehle aus.

### Phasen und Stopppunkte

Arbeite ausschließlich in der jeweils freigegebenen Phase. Nach jeder Hauptphase:

1. Ergebnis präsentieren,
2. offene Entscheidungen nennen,
3. auf meine Freigabe warten.

Erzeuge nicht in einem Durchgang Struktur, FSD, GitHub-Konfiguration und Produktcode.

### Keine erfundenen Nachweise

Historische Arbeit wird ausdrücklich als nachträgliche Rekonstruktion gekennzeichnet, zum Beispiel:

- `Nachträglich dokumentiert am: ...`
- `Rekonstruierter Zeitraum: ...`
- `Grundlage: Antrag und Gesprächsnotizen`
- `Exakter ursprünglicher Zeitpunkt nicht festgestellt`

Erfinde keine Arbeitszeiten, Freigaben, Entscheidungen, Quellen, Tests, Commit-Hashes oder Porsche-Anforderungen.

### Gemeinsame und persönliche Dokumentation

- `docs/FSD.md` ist die gemeinsame fachliche Hauptquelle.
- Meine persönliche Methode gilt ausschließlich für **Erik Bergmair**.
- Behaupte nicht, Julian Richter oder Joschua Auer würden ebenfalls danach arbeiten.
- Unterscheide Porsche-Anforderungen, Teamentscheidungen, persönliche Vorschläge, SaaS-Ideen und offene Fragen.

## 3. Projektkontext

### Titel

**ValidEat – SaaS-Lösung zur Verwaltung digitaler Essensmarken**

### Team

- Erik Bergmair
- Julian Richter
- Joschua Auer

Betreuungslehrer: Gerald Aistleitner
Kooperationspartner: Porsche Informatik Gesellschaft m.b.H.
Ansprechpartner: Tobias Wagner

### Verantwortungsbereiche

**Erik Bergmair**

- UI/UX
- Angular-Frontend
- Mitarbeiter- und Restaurantoberfläche
- PWA und Offline-Funktionalität
- Kamera und Scanner
- Branding
- Usability-Tests

**Julian Richter**

- Java-/Quarkus-Backend
- PostgreSQL
- REST-API
- Mandantenfähigkeit
- Authentifizierung, JWT und Sicherheit
- Docker, Kubernetes und CI/CD

**Joschua Auer**

- Admin-Dashboard
- Clearing und Konfliktbearbeitung
- Reporting und Export
- Audit-Logs und Revisionssicherheit
- Blockchain-/Smart-Contract-Evaluierung

Diese Aufteilung stammt aus dem Antrag und darf nicht stillschweigend verändert werden.

## 4. Technischer Rahmen

- Frontend: Angular
- Backend: Java mit Quarkus
- Datenbank: PostgreSQL
- lokaler Betrieb: Docker
- späteres Deployment: Kubernetes auf der schuleigenen Cloud
- Diplomarbeit: LaTeX mit verpflichtendem Schul-Template
- Versionsverwaltung: GitHub
- Projektorganisation: GitHub Projects

Codebezeichner und Commit-Messages sollen grundsätzlich Englisch sein. Die Projektdokumentation wird auf Deutsch geschrieben. Verwende konsistente und geschlechtsneutrale Formulierungen.

## 5. Porsche-Ausgangslage

Porsche verwendet physische Essenmarkerl. Diese werden im zunächst vereinbarten Prozess nicht abgeschafft.

Der derzeit verstandene IST-Ablauf:

1. Mitarbeitende nehmen ein physisches Markerl mit.
2. Sie tragen unter anderem Name, Datum, Kostenstelle und Unterschrift ein.
3. Das Markerl wird im Restaurant abgegeben.
4. Die Verwendung wird zusätzlich im persönlichen Papierbuch dokumentiert.
5. Restaurants senden die Markerl am Ende des Abrechnungszeitraums an HR zurück.
6. HR vergleicht die zurückgekommenen Markerl mit den persönlichen Büchern.
7. Abweichungen werden manuell geklärt.
8. Ein Vorgesetzter bestätigt beziehungsweise unterschreibt die Abrechnung.

Dieser Ablauf muss in der FSD noch verifiziert werden.

## 6. Geplanter Porsche-Zielprozess

1. Mitarbeitende melden sich in einer Angular-Webanwendung an.
2. Sie erfassen, ob sie heute ein physisches Essenmarkerl verwendet haben.
3. Gegebenenfalls wählen sie die Markerlstufe.
4. Name und Kostenstelle können aus dem Konto übernommen werden.
5. Das physische Markerl wird weiterhin im Restaurant abgegeben.
6. HR erhält später die physischen Markerl.
7. HR erfasst diese in der Admin-Oberfläche.
8. Ein Clearing-Algorithmus vergleicht Mitarbeiter- und HR-Erfassungen.
9. Übereinstimmungen und Konflikte werden erkannt.
10. Konflikte werden nachvollziehbar geklärt.
11. Das System erstellt einen Export.
12. Der Vorgesetzte bestätigt digital oder unterschreibt den Ausdruck.

Details zu Regeln, Fristen, Korrekturen, Rollen, Export und Freigabe sind noch offen.

## 7. Porsche-Version und SaaS

Es entstehen **keine zwei kopierten Codebasen**.

1. Zuerst wird eine klar abgegrenzte Porsche-Version umgesetzt.
2. Sie wird als stabiler Release ausgeliefert.
3. Porsche erhält eine Auslieferung inklusive benötigtem Source-Code und Dokumentation, aber keinen Zugriff auf das interne vollständige GitHub-Repository.
4. Danach wird dieselbe Codebasis zur ValidEat-SaaS-Plattform erweitert.
5. Der Porsche-Stand bleibt als Tag beziehungsweise Release reproduzierbar.

Beispiele der späteren Verallgemeinerung:

- Porsche-Mitarbeiterbereich → allgemeiner Mitarbeiterbereich
- Porsche-HR-Admin → Unternehmens-Admin
- Porsche-Clearing → konfigurierbares Clearing-Modul
- feste Darstellung → Logo und Farben je Unternehmen
- ein Unternehmen → mehrere strikt getrennte Mandanten

SaaS-Ideen wie Restaurant-Portal, QR-Codes, Offline-Scanner, OCR, Anomalie-Erkennung oder Blockchain sind nicht automatisch Porsche-Pflichtumfang.

Blockchain muss sachlich evaluiert werden. JWT-Signaturen dürfen nicht pauschal als „fälschungssicher“ bezeichnet werden, da sie Screenshots, Weitergabe oder Replay-Angriffe nicht automatisch verhindern.

## 8. Schulische KI-Regeln

Generative KI ist erlaubt. Dabei gelten:

- selbstständige Verfassung der Diplomarbeit,
- vollständige Angabe verwendeter Hilfsmittel,
- Kennzeichnung generierter Inhalte,
- Dokumentation des Promptverlaufs,
- eigene Prüfung aller KI-Ergebnisse,
- eigene Verantwortung für Fehler,
- keine allgemeinen Fülltexte,
- konsistente Terminologie und Sprache,
- getrennte Beurteilbarkeit der Teammitglieder.

Codex-Unterhaltungen können als Markdown im Repository gespeichert werden. Ein öffentlicher Chatlink ist nicht erforderlich, wenn der vollständige relevante Verlauf nachvollziehbar abgelegt wird.

Plane dafür:

```text
docs/ai/
├── README.md
├── usage-log.md
└── conversations/
```

Die zentrale KI-Tabelle soll mindestens enthalten:

- ID
- Datum
- Person
- Werkzeug
- Zweck
- Projektbereich
- Art der Unterstützung
- Verwendung des Ergebnisses
- Prüfung
- Verweis auf Gesprächsdatei
- Verweis auf Change, Issue oder Datei

## 9. Quellenverwaltung

Eine selbst entwickelte Firefox-Erweiterung speichert Quellen in einem Google Sheet:

```javascript
const HEADER_ROW = [
  'Titel',
  'URL',
  'Abrufdatum',
  'Abrufuhrzeit',
  'Zeitzone',
  'Autor',
  'Notiz'
];
```

Es wird zunächst keine automatische Synchronisation gebaut. Quellen werden manuell mit IDs wie `SRC-001` ins Repository übernommen.

Jeder persönliche Umsetzungsnachweis und der spätere persönliche Abschlussbericht führen die tatsächlich verwendeten Quellen samt Verwendungszweck auf.

Der Zitierstil muss anhand des Schul-Templates geprüft werden. Falls es keine Vorgabe enthält, darf IEEE als technischer numerischer Zitierstil vorgeschlagen, aber nicht ohne Zustimmung festgelegt werden.

Erfinde niemals bibliografische Angaben.

## 10. Persönliche Methode von Erik

Die Methode ist OpenSpec-inspiriert, aber kein teamweiter OpenSpec-Prozess. Installiere zunächst kein OpenSpec-Werkzeug.

Dokumentiere die Methode vollständig in:

```text
docs/members/erik/METHOD.md
```

Für größere persönliche Arbeiten wird ein Change angelegt:

```text
docs/members/erik/changes/active/VAL-023-add-meal-entry/
├── proposal.md
├── design.md
├── tasks.md
└── evidence.md
```

Nach Abschluss:

```text
docs/members/erik/changes/completed/
└── 2026-07-14-VAL-023-add-meal-entry/
```

### `proposal.md`

Enthält das Warum und Was:

- Metadaten
- FSD- und Issue-Referenz
- Ausgangslage
- Ziel
- Umfang und Nicht-Umfang
- Akzeptanzkriterien
- offene Fragen
- Auswirkungen
- Abstimmungen und Freigabestatus

### `design.md`

Enthält das Wie:

- technische Lösung
- Komponenten und Datenfluss
- Benutzerablauf
- API-Nutzung
- Zustände und Fehlerbehandlung
- Sicherheit und gegebenenfalls Offline-Verhalten
- Alternativen
- Risiken
- Teststrategie

### `tasks.md`

Enthält überprüfbare Aufgaben für:

- Vorbereitung
- Klärung
- Implementierung
- Tests
- Dokumentation
- Review
- Abschluss

Checkboxen werden laufend und ehrlich aktualisiert.

### `evidence.md`

Enthält den tatsächlichen Nachweis:

- Zeitraum und Status
- Issue, Branch, Pull Request und Commits
- tatsächlich umgesetzte Funktionen
- betroffene Dateien
- Abweichungen vom Design
- ausgeführte Tests und Ergebnisse
- bekannte Einschränkungen
- eigene Leistung
- Review
- verwendete Quellen
- KI-IDs
- Abschlusscheckliste

Nicht ausgeführte Tests dürfen niemals als erfolgreich markiert werden.

### Tagesprotokoll

```text
docs/members/erik/worklogs/YYYY-MM-DD.md
```

Enthält Datum, bekannte Arbeitszeit, Changes/Issues, Tätigkeiten, Erkenntnisse, Entscheidungen, Blockaden, Ergebnis, nächste Schritte, Quellen, KI-IDs und Git-Nachweise.

### Persönlicher Abschlussbericht

```text
docs/members/erik/reports/final-development-report.md
```

Er fasst Funktionen, Entscheidungen, Alternativen, Probleme, Tests, Einschränkungen, Quellen, KI-Unterstützung, Eigenleistung und persönliche Reflexion zusammen.

## 11. FSD

Die zentrale Spezifikation liegt in:

```text
docs/FSD.md
```

Sie soll unter anderem enthalten:

1. Dokumentinformationen
2. Zweck und Geltungsbereich
3. Projektkontext
4. Begriffe
5. Stakeholder und Rollen
6. Porsche-IST-Prozess
7. Porsche-Zielprozess
8. Abgrenzung Porsche/SaaS
9. Systemkontext
10. funktionale Anforderungen
11. Mitarbeiterbereich
12. HR-/Adminbereich
13. Clearing und Konflikte
14. Export und Freigabe
15. Benutzer und Rollen
16. Auditierung
17. Mandantenfähigkeit
18. Branding und Module
19. Restaurant, Scanner und Offline-Funktionen
20. Sicherheit und Datenschutz
21. nichtfunktionale Anforderungen
22. Geschäftsregeln
23. Schnittstellen
24. Fehlerfälle
25. Akzeptanzkriterien
26. Nicht-Umfang
27. offene Fragen und Annahmen
28. Risiken
29. Änderungsverlauf und Freigaben

Verwende eindeutige Anforderungs-IDs, beispielsweise:

```text
F-EMP-001
F-HR-001
F-CLR-001
F-APR-001
F-SAA-001
F-RES-001
F-OFF-001
F-SEC-001
NF-PERF-001
```

## 12. FSD-Fragerunde

Erstelle die FSD nicht aus Vermutungen.

Nach Einrichtung und historischer Dokumentation sollst du mir **eine umfassende, zusammenhängende und logisch gruppierte Fragerunde** stellen. Frage unter anderem nach:

- IST-Prozess
- Rollen
- Mitarbeiterdaten
- Markerlstufen
- erlaubten Tagen
- Nachträgen und Korrekturen
- Abrechnungsperioden
- HR-Erfassung
- Clearing-Regeln
- Konfliktarten und Konfliktlösung
- Freigabe und Unterschrift
- Exportformaten
- Benutzerverwaltung und Authentifizierung
- Datenschutz und Auditierung
- Porsche-Schnittstellen
- Hosting und Verfügbarkeit
- Offline- und Fehlerverhalten
- SaaS-Mandantenfähigkeit
- Branding und Module
- Restaurant und Scanner
- Usability, Barrierefreiheit, Performance und Sicherheit
- Abnahme

Kennzeichne jede Frage als:

- vor Porsche-Implementierung zwingend,
- später klärbar,
- nur SaaS,
- Forschungsfrage,
- durch Porsche zu entscheiden,
- durch das Team zu entscheiden,
- mit Lehrkraft/Schule abzustimmen.

Ich beantworte die Fragen zunächst. Danach prüfen die anderen Teammitglieder meine Antworten. Meine Antwort ist keine automatische Porsche-Freigabe.

## 13. LaTeX

Es existiert ein verpflichtendes Schul-Template. Plane:

```text
docs/thesis/
├── README.md
├── template/
├── shared/
├── erik/
├── julian/
├── joschua/
├── images/
├── bibliography/
└── build/
```

Passe die tatsächliche Struktur später an das Template an. Dokumentationsdateien sind Arbeitsgrundlagen und nicht automatisch fertiger Diplomarbeitstext.

## 14. GitHub Project

Erstelle zunächst nur Vorschläge für:

- Scrumboard-Status,
- Felder,
- Labels,
- Milestones,
- Issue-Templates,
- Pull-Request-Template,
- CODEOWNERS,
- Commit-Konventionen.

Mögliche Statuswerte:

```text
Backlog
Ready
In Progress
In Review
Testing
Blocked
Done
```

Plane wöchentliche Project-Snapshots und zusätzliche Snapshots zu jedem Meilenstein. Implementiere keine Automation ohne ausdrückliche Freigabe.

## 15. Geplanter Repository-Aufbau

Nutze die beiliegende beziehungsweise im Repository vorhandene Ordnerstruktur-Dokumentation als Ausgangspunkt. Prüfe dennoch, welche Ordner sofort nötig sind und welche erst später entstehen sollten.

Initialisiere noch keine Angular-, Quarkus-, Docker- oder Kubernetes-Projekte, bevor Anforderungen und Architektur ausreichend geklärt und von mir freigegeben wurden.

## 16. Arbeitsphasen

### Phase 0 – Ausgangszustand

Nur lesen:

- Arbeitsverzeichnis
- Git-Status
- Branch
- Remote
- vorhandene und versteckte Dateien
- uncommittete Änderungen

Nichts verändern. Danach auf Freigabe warten.

### Phase 1 – Strukturvorschlag

Noch keine Dateien erstellen. Präsentiere:

- empfohlenen Projektbaum,
- Begründungen,
- sofort benötigte Bereiche,
- später benötigte Bereiche,
- offene Architekturentscheidungen.

Danach warten.

### Phase 2 – Dokumentationsgrundgerüst

Nach Freigabe Dokumentationsordner und Vorlagen erstellen. Noch kein Produktcode.

Danach Dateien, Prüfungen und Commit-Vorschlag nennen und warten.

### Phase 3 – persönliche Methode

`METHOD.md`, Change-Vorlagen, Worklog-Vorlage und Abschlussbericht-Vorlage vollständig ausarbeiten.

Danach warten.

### Phase 4 – bisherigen Stand rekonstruieren

Antrag, Notizen, Entscheidungen und offenen Stand wahrheitsgemäß dokumentieren. Alles nach Herkunft und Sicherheit kennzeichnen. Keine rückwirkend erfundenen Zeiten.

Danach warten.

### Phase 5 – vollständige FSD-Fragerunde

Eine große gruppierte Fragerunde erstellen. Noch keine Anforderungen erfinden.

### Phase 6 – FSD aus Antworten erstellen

Antworten strukturieren, Widersprüche markieren, Anforderungen mit IDs und Akzeptanzkriterien formulieren und ungeklärte Punkte sichtbar lassen.

### Phase 7 – GitHub-Vorschläge

Board, Labels, Milestones und Vorlagen vorschlagen, aber nichts direkt bei GitHub verändern.

## 17. Qualitätsanforderungen

- konkret auf ValidEat bezogen
- keine Fülltexte
- Fakten, Annahmen und Vorschläge klar trennen
- Quellen und Herkunft nennen
- konsistente Terminologie
- proportional zur Komplexität dokumentieren
- keine unnötige Redundanz
- relative Links im Repository
- keine lokalen absoluten Pfade in eingecheckten Dokumenten
- keine Secrets oder echten personenbezogenen Testdaten

Mögliche Statuswerte:

```text
draft
in-review
approved
implemented
verified
superseded
archived
```

Definiere ihre Bedeutung. Persönliche Freigabe ist keine Porsche-Freigabe; implementiert ist nicht automatisch verifiziert.

## 18. Beginne jetzt

Beginne ausschließlich mit **Phase 0**.

1. Lies den tatsächlichen Repository-Zustand.
2. Verändere keine Datei.
3. Erstelle keinen Commit.
4. Berichte Arbeitsverzeichnis, Git-Status, Branch, Remote, Dateien und mögliche Risiken.
5. Warte danach auf meine ausdrückliche Freigabe für Phase 1.

Noch einmal ausdrücklich:

- kein Produktcode,
- keine Commits,
- keine GitHub-Änderungen,
- keine erfundenen Anforderungen,
- zuerst nur Phase 0.
