# Proposal: JWT-Anmeldung im Mitarbeiterfrontend integrieren

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-005` |
| Status | `draft` |
| Verantwortlich | Erik Bergmair |
| Erstellt am | 2026-07-21 |
| Zuletzt geändert | 2026-07-21 |
| FSD-Referenz | `docs/FSD.md`, Authentifizierung derzeit noch nicht ausgearbeitet |
| GitHub Issue | nicht festgestellt |

## Herkunft und Sicherheit

- Art: Team-Zwischenstand und persönlicher Umsetzungsvorschlag für Eriks Frontend-Verantwortungsbereich
- Grundlage: vorhandene Login- und Registerseiten aus `VAL-004`, aktueller JWT-Login-Endpunkt im Backend und Abstimmung mit dem Backend-Teammitglied
- Bestätigt durch: Der aktuelle technische Backendvertrag ist im Repository vorhanden; die endgültige Authentifizierungs- und Berechtigungsstrategie ist noch nicht als Porsche-Anforderung bestätigt.

## Ausgangslage

Das Mitarbeiterfrontend besitzt bereits Login- und Registrierungsseiten. Der Login verwendet jedoch noch den früheren vorläufigen Endpunkt mit E-Mail-Adresse und Passwort im URL-Pfad und erwartet eine Textantwort. Das aktuelle Backend erwartet stattdessen einen JSON-Request an `POST /employee/login` und liefert bei erfolgreicher Anmeldung ein JWT sowie Mitarbeiterdaten zurück.

Mehrere Mitarbeiterseiten verwenden derzeit noch die fest eingetragene Entwicklungs-ID `1`. Dadurch werden auch nach einer Anmeldung Daten dieses Entwicklungsdatensatzes geladen und verändert. Der vom Backend gelieferte angemeldete Benutzer wird im Frontend noch nicht als Grundlage für Mitarbeiteranfragen verwendet.

## Ziel

Ziel ist eine einfache, nachvollziehbare Frontendintegration des aktuellen JWT-Loginvertrags. Nach erfolgreicher Anmeldung sollen Token und benötigte Benutzerdaten gespeichert werden. Mitarbeiteranfragen sollen die ID der angemeldeten Person statt der fest eingetragenen ID `1` verwenden. Ein Logout soll die lokal gespeicherten Anmeldedaten entfernen.

## Umfang

- aktuellen Login-Request auf `POST /employee/login` mit JSON-Body umstellen,
- aktuelle Login-Antwort durch ein begrenztes Angular-Model abbilden,
- JWT und benötigte Mitarbeiterdaten nach erfolgreicher Anmeldung lokal speichern,
- zentralen Zugriff auf die angemeldete Mitarbeiter-ID bereitstellen,
- hart codierte Mitarbeiter-ID in den Employee-Seiten ersetzen,
- Logout für das Mitarbeiterfrontend ergänzen,
- verständliche Fehlerzustände bei fehlgeschlagener Anmeldung behandeln,
- bestehende automatisierte Tests an den neuen Vertrag anpassen,
- den tatsächlichen Ablauf manuell mit dem lokalen Backend prüfen,
- Umgang mit der Registrierung auf den aktuellen Backendstand prüfen und offene Backendfragen dokumentieren.

## Nicht-Umfang

- Implementierung oder Änderung der JWT-Erzeugung im Quarkus-Backend,
- Festlegung der endgültigen Rollen- und Berechtigungsregeln,
- Keycloak-Integration,
- Mandantenfähigkeit und SaaS-Oberfläche,
- Passwort-zurücksetzen-Funktion,
- E-Mail-Verifikation,
- produktive Verwaltung sicherer Cookies,
- vollständige Absicherung aller Backend-Endpunkte,
- Offline-Anmeldung oder dauerhafte Offline-Sitzungen,
- HR-/Admin-Oberfläche.

## Akzeptanzkriterien

- [ ] Der Login sendet E-Mail-Adresse und Passwort als JSON-Body an `POST /employee/login` und nicht im URL-Pfad.
- [ ] Die erfolgreiche Login-Antwort wird durch ein begrenztes Frontendmodel abgebildet.
- [ ] Nach erfolgreicher Anmeldung sind JWT und Mitarbeiter-ID für nachfolgende Frontendanfragen verfügbar.
- [ ] Mitarbeiterseiten verwenden die ID der angemeldeten Person statt der hart codierten ID `1`.
- [ ] Ungültige oder fehlgeschlagene Anmeldungen zeigen eine verständliche Fehlermeldung und speichern keine Anmeldung.
- [ ] Logout entfernt die lokal gespeicherten Anmeldedaten.
- [ ] Es werden keine Passwörter im Local Storage, in URLs oder in eigenen Frontend-Logs gespeichert.
- [ ] Die bestehenden Employee-Tests sind an den neuen Loginvertrag angepasst und die tatsächlich ausgeführten Ergebnisse sind in `evidence.md` dokumentiert.
- [ ] Der zentrale Mitarbeiterflow wurde mit einem lokal angemeldeten Entwicklungsbenutzer manuell geprüft.
- [ ] Noch nicht backendseitig abgesicherte Endpunkte werden nicht als vollständig geschützt dargestellt.

## Offene Fragen

| Frage | Entscheidet durch | Zwingend vor Umsetzung? | Status |
|---|---|---|---|
| Welche Employee-Endpunkte verlangen bereits einen Bearer-Token? | Julian / Team | Nein für Login und lokale Speicherung, ja für den Interceptor | offen |
| Soll das JWT vorläufig im Local Storage oder langfristig in einem sichereren Cookie gespeichert werden? | Team / Backend / Security | Nein für lokalen Zwischenstand, ja vor produktiver Nutzung | offen |
| Welche Routen müssen durch einen Angular Route Guard geschützt werden? | Erik / Team | Ja vor Abschluss | offen |
| Wie signalisiert das Backend ungültige Zugangsdaten verbindlich? | Julian / Team | Ja für eindeutige Fehlerbehandlung | offen |
| Vergibt das Backend bei einer Registrierung die Rolle `EMPLOYEE` serverseitig? | Julian / Team | Ja vor funktionsfähiger Registrierung | offen |
| Soll eine Registrierung in der Porsche-Version überhaupt selbstständig möglich sein? | Porsche / Team | Nein für Login, ja vor finaler Registrierung | offen |

## Annahmen

- Der aktuell im Repository vorhandene JSON-Vertrag für `POST /employee/login` wird vorläufig als Integrationsgrundlage verwendet.
- Die Login-Antwort enthält `token`, `id`, `firstName`, `lastName`, `email` und `role`.
- Local Storage wird nur als vorläufige technische Lösung für die lokale Entwicklung betrachtet und nicht automatisch als produktive Sicherheitsentscheidung festgelegt.
- Die Rolle wird vom Backend geliefert und nicht vom Frontend frei festgelegt.

## Auswirkungen

- Benutzeroberfläche: Loginfehler und Logout werden sichtbar; der Mitarbeiterflow verwendet den angemeldeten Benutzer.
- API und Backend: Das Frontend richtet sich nach dem vorhandenen JSON-Loginvertrag. Backendänderungen liegen außerhalb dieses Changes.
- Daten und Datenschutz: JWT, Mitarbeiter-ID und begrenzte Kontodaten werden vorläufig lokal gespeichert. Passwörter werden nicht dauerhaft gespeichert.
- Offline-Verhalten: Eine Anmeldung benötigt eine Backendverbindung. Weiteres Offline-Verhalten wird in einem getrennten Change behandelt.
- Dokumentation: `tasks.md`, `evidence.md`, Tagesprotokoll und gegebenenfalls Quellen- beziehungsweise KI-Nachweise werden aktualisiert.
- Andere Teammitglieder: Der Backendvertrag und die serverseitige Rollenvergabe müssen mit Julian beziehungsweise dem zuständigen Backend-Teammitglied abgestimmt werden.

## Abstimmungen und Freigabestatus

| Gegenstand | Zuständige Stelle | Status | Nachweis |
|---|---|---|---|
| Aktueller JSON-Vertrag des Login-Endpunkts | Backend-Teammitglied / Team | technisch im Repository vorhanden | `EmployeeResource`, `LoginDTO`, `LoginResponseDTO` |
| Serverseitige Vergabe der Rolle bei Registrierung | Backend-Teammitglied / Team | offen | nicht vorhanden |
| Endgültige Token-Speicherung und Endpoint-Absicherung | Team | offen | nicht vorhanden |
| Fachliche Zulässigkeit einer Selbstregistrierung | Porsche / Team | offen | nicht vorhanden |

Eine persönliche Freigabe durch Erik ist keine automatische Team-, Porsche- oder Schulfreigabe.
