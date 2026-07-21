# Design: JWT-Anmeldung im Mitarbeiterfrontend integrieren

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-005` |
| Status | `draft` |
| Verantwortlich | Erik Bergmair |
| Proposal | [proposal.md](proposal.md) |
| Zuletzt geändert | 2026-07-21 |

## Technische Lösung

Der vorhandene `EmployeeAuthService` wird an den aktuellen JSON-Vertrag des Backends angepasst. Ein kleines Login-Request- und Login-Response-Model beschreibt nur die vom Frontend benötigten Felder. Der Service speichert nach erfolgreicher Anmeldung das JWT und die Mitarbeiter-ID vorläufig im Local Storage und stellt einfache Methoden zum Auslesen und Löschen dieser Werte bereit.

Die Employee-Seiten lesen die aktuelle Mitarbeiter-ID über diesen zentralen Service, statt jeweils `employeeId = 1` zu definieren. Dadurch bleibt der Code einfach und die Herkunft der ID ist an einer Stelle nachvollziehbar.

Ein HTTP-Interceptor wird erst eingebaut, wenn feststeht, welche Backend-Endpunkte bereits einen Bearer-Token verlangen. Ein Route Guard wird auf die geschützten Mitarbeiterseiten begrenzt und erst nach Klärung des gewünschten Weiterleitungsverhaltens umgesetzt.

## Betroffene Komponenten

| Komponente | Geplante Änderung | Verantwortungsbereich |
|---|---|---|
| `employee-auth.service.ts` | JSON-Login, lokale Sitzungsdaten, Logout und Zugriff auf Mitarbeiter-ID | Erik |
| Login-Models | Request und begrenzte Response typisieren | Erik |
| `login-page` | neue Antwort verarbeiten und Fehler anzeigen | Erik |
| Employee-Seiten mit `employeeId = 1` | angemeldete Mitarbeiter-ID verwenden | Erik |
| Employee-Navigation oder Header | einfachen Logout-Zugang ergänzen | Erik |
| Employee-Routing | gegebenenfalls geschützte Kindrouten definieren | Erik |
| HTTP-Konfiguration | gegebenenfalls Bearer-Token per Interceptor anhängen | Erik, abhängig vom Backendvertrag |
| `EmployeeResource` und JWT-Erzeugung | vorhandener Backendvertrag, keine geplante Änderung in diesem Change | Julian / Backend-Teammitglied |
| Registrierung | Frontendvertrag prüfen; serverseitige Rollenvergabe bleibt Backendaufgabe | Erik / Julian |

## Datenfluss

1. Die Person gibt E-Mail-Adresse und Passwort im Loginformular ein.
2. Die Loginseite validiert die Pflichtfelder.
3. Der `EmployeeAuthService` sendet beide Werte im JSON-Body an `POST /employee/login`.
4. Das Backend prüft die Zugangsdaten und liefert bei Erfolg JWT und begrenzte Kontodaten.
5. Das Frontend speichert Token und Mitarbeiter-ID vorläufig lokal.
6. Die Loginseite navigiert zur Employee-Startseite.
7. Employee-Seiten lesen die aktuelle ID aus dem Auth-Service und verwenden sie für ihre Requests.
8. Beim Logout werden die lokal gespeicherten Anmeldedaten entfernt und die Person wird zur Loginseite weitergeleitet.

## Benutzerablauf

1. Die Person öffnet die Anmeldung.
2. Sie gibt E-Mail-Adresse und Passwort ein und sendet das Formular ab.
3. Während des Requests wird ein Ladezustand angezeigt und mehrfaches Absenden verhindert.
4. Bei Erfolg wird die Startseite mit den Daten der angemeldeten Person geöffnet.
5. Bei falschen oder technisch fehlgeschlagenen Zugangsdaten bleibt die Loginseite geöffnet und zeigt eine verständliche Meldung.
6. Beim Logout wird die lokale Anmeldung beendet.

## API-Nutzung und Daten

- Endpunkt: `POST /employee/login`
- Eingabedaten: `{ "email": string, "password": string }`
- Erfolgsdaten: `{ "token": string, "id": number, "firstName": string, "lastName": string, "email": string, "role": "EMPLOYEE" | "ADMIN" | "SAAS_ADMIN" }`
- Validierung im Frontend: E-Mail ist erforderlich und muss dem E-Mail-Format entsprechen; Passwort ist erforderlich.
- Abhängigkeit vom Backend: Statuscode und Antwort bei ungültigen Zugangsdaten sind noch verbindlich zu klären. Der aktuelle Repository-Stand kann eine leere Antwort liefern.

Das Passwort wird nur für den Login-Request im Arbeitsspeicher gehalten und nicht lokal gespeichert.

## Zustände

| Zustand | Anzeige oder Verhalten | Übergang |
|---|---|---|
| Nicht angemeldet | Loginformular oder Weiterleitung zur Loginseite | keine gültigen lokalen Anmeldedaten |
| Formular ungültig | betroffene Felder als ungültig anzeigen | Absenden mit fehlenden oder ungültigen Werten |
| Anmeldung läuft | Ladezustand, erneutes Absenden verhindern | gültiges Formular wurde abgesendet |
| Angemeldet | Navigation zur Startseite, Mitarbeiter-ID verfügbar | erfolgreiche Login-Antwort |
| Login fehlgeschlagen | verständliche Fehlermeldung, keine Speicherung | Fehlerantwort oder unbrauchbare Antwort |
| Abgemeldet | lokale Daten entfernt, Navigation zur Loginseite | Logout |
| Offline | Login nicht möglich, Verbindungsfehler anzeigen | Backend nicht erreichbar |

## Fehlerbehandlung

| Fehlerfall | Reaktion des Systems | Information für die nutzende Person |
|---|---|---|
| Formular ungültig | Request nicht senden und Felder markieren | Hinweise an den betroffenen Feldern |
| Zugangsdaten abgelehnt | nichts speichern und Loginseite beibehalten | allgemeine Meldung ohne preiszugeben, ob die E-Mail existiert |
| Backend nicht erreichbar | Ladezustand beenden und nichts speichern | Anmeldung derzeit nicht möglich |
| Antwort enthält kein Token oder keine ID | Antwort als Fehler behandeln | Anmeldung konnte nicht abgeschlossen werden |
| Mitarbeiter-ID fehlt auf geschützter Seite | keine Anfrage mit Ersatz-ID senden | zur Loginseite weiterleiten oder Anmeldung erforderlich anzeigen |
| Token abgelaufen | lokale Anmeldung beenden | erneute Anmeldung erforderlich |

## Sicherheit und Datenschutz

- Authentifizierung und Berechtigung: Das JWT weist die Anmeldung nach. Die tatsächliche Berechtigung muss weiterhin vom Backend geprüft werden; ein Angular Guard ist kein Sicherheitsersatz.
- Personenbezogene Daten: Mitarbeiter-ID, Name und E-Mail-Adresse sind personenbezogene Daten. Nur tatsächlich benötigte Werte werden gespeichert.
- Lokale Speicherung: Das JWT und die minimale Sitzungsinformation werden vorläufig im Local Storage gespeichert und beim Logout entfernt. Das Risiko bei Cross-Site-Scripting wird als bekannte Einschränkung dokumentiert.
- Protokollierung: Passwörter und JWTs dürfen nicht durch eigene `console.log`-Ausgaben oder Dokumentationsbeispiele offengelegt werden.
- Besondere Risiken: Ein vom Frontend mitgesendeter Benutzerwert darf serverseitige Besitz- und Rollenprüfungen nicht ersetzen.

## Offline-Verhalten

Eine neue Anmeldung benötigt eine Verbindung zum Backend. Der Change implementiert keine Offline-Anmeldung und keine Token-Erneuerung ohne Verbindung. Bereits gespeicherte Sitzungsdaten werden nicht als Nachweis betrachtet, dass fachliche Schreibvorgänge offline erlaubt sind. Die allgemeine PWA- und Offline-Strategie wird getrennt geplant.

## Alternativen

### Alternative 1: Local Storage als vorläufige Speicherung

- Vorteile: einfach umzusetzen, nach einem Reload verfügbar und passend zum aktuellen Entwicklungsstand.
- Nachteile: JavaScript kann auf das JWT zugreifen; ein XSS-Problem könnte den Token offenlegen.
- Entscheidung: vorläufig gewählt.
- Grund: Das Backend liefert den Token aktuell direkt an das Frontend. Die produktive Strategie ist noch nicht abgestimmt.

### Alternative 2: HttpOnly-Cookie

- Vorteile: JavaScript kann den Token nicht direkt auslesen; besserer Schutz gegen Token-Diebstahl durch XSS.
- Nachteile: benötigt einen abgestimmten Backendvertrag sowie CSRF- und Cookie-Konfiguration.
- Entscheidung: für die produktive Lösung zu prüfen, nicht Teil dieses Changes.
- Grund: Die dafür notwendige Backendarbeit liegt außerhalb von Eriks Frontendumfang.

### Alternative 3: Mitarbeiter-ID weiterhin fest eintragen

- Vorteile: kein zusätzlicher Sitzungszustand.
- Nachteile: fachlich falsch und kann Daten einer anderen Person anzeigen oder verändern.
- Entscheidung: verworfen.
- Grund: Der aktuelle Login liefert die tatsächliche Mitarbeiter-ID.

## Risiken

| Risiko | Wahrscheinlichkeit | Auswirkung | Gegenmaßnahme |
|---|---|---|---|
| Backendantwort bei falschem Login ist nicht eindeutig | mittel | Frontend kann Fehler nicht sauber unterscheiden | Vertrag abstimmen und Fehlerfall automatisiert sowie live prüfen |
| JWT im Local Storage wird durch XSS ausgelesen | unbekannt | Konto kann missbraucht werden | keine unsicheren HTML-Einfügungen, Token nicht loggen, produktive Cookie-Alternative prüfen |
| Einzelne Seiten behalten die ID `1` | mittel | falsche Daten werden geladen oder verändert | Repository-Suche und Tests für alle Employee-Seiten |
| Frontend vertraut nur auf Rolle oder ID aus dem Browser | mittel | unzureichende Zugriffskontrolle | Besitz und Rolle serverseitig prüfen lassen |
| Registrierung erlaubt manipulierte Rollen | unbekannt | unberechtigte Adminrolle | Rolle serverseitig auf `EMPLOYEE` festlegen; Backendaufgabe dokumentieren |
| Token läuft während der Nutzung ab | mittel | Requests schlagen unerwartet fehl | 401 zentral behandeln und erneute Anmeldung verlangen |

## Teststrategie

| Ebene | Geplante Prüfung | Erwartetes Ergebnis |
|---|---|---|
| Statisch | Angular-Build beziehungsweise TypeScript-Kompilierung | geänderter Employee-Code kompiliert; fremde bekannte Buildfehler werden getrennt dokumentiert |
| Automatisiert | Service-Test für Loginrequest und Response-Typ | POST verwendet JSON-Body und erwartete URL |
| Automatisiert | Loginseiten-Test für Erfolg und Fehler | Speicherung und Navigation nur bei gültiger Erfolgsantwort |
| Automatisiert | Tests für Auth-Service und Logout | ID und Token werden ausgelesen beziehungsweise entfernt |
| Automatisiert | betroffene Employee-Seitentests | Requests verwenden die angemeldete ID statt `1` |
| Manuell | Login und zentraler Mitarbeiterflow mit lokalem Backend | Daten der angemeldeten Entwicklungsperson werden angezeigt und bearbeitet |
| Manuell | falsche Zugangsdaten und nicht erreichbares Backend | verständliche Fehlermeldung, keine gespeicherten Anmeldedaten |
| Usability | Lade- und Fehlermeldung auf mobiler Breite prüfen | Anmeldung bleibt verständlich und bedienbar |
| Barrierefreiheit | Labels, Tastaturbedienung, Fokus und Fehlermeldung prüfen | Formular ist ohne Maus bedienbar und Fehler sind wahrnehmbar |

Geplante Tests werden erst nach ihrer tatsächlichen Ausführung im Nachweis als bestanden oder fehlgeschlagen eingetragen.
