# SaaS: aktueller Stand und noch notwendige Arbeiten

Stand: 27.09.2026, Backendcommit `f05fd08`, Frontendanpassung `VAL-010`. Diese Übersicht ersetzt die frühere offene Liste aus VAL-009. Keine Serverdateien durch diesen Change geändert. Keine fachliche Freigabe oder bestätigter Porsche-Pflichtumfang.

## Was aktuell funktioniert

Ein bestehender SAAS_ADMIN mit Tenant kann sich anmelden, Organisationen ansehen/anlegen/bearbeiten, Module auswählen, Regeln speichern, Branding bearbeiten/veröffentlichen und unzugewiesene Employees einem Tenant zuweisen. Auch neue Organisationen lassen sich jetzt konfigurieren. Das Frontend akzeptiert bei älteren Organisationen ohne Regeln den neuen Leerzustand `usageDays: null` und zeigt leere Checkboxen; Speichern sendet eine Liste. Branding übernimmt die Serverwerte; Namen bis 150 Zeichen passen jetzt auch zu den zulässigen Organisationsnamen. Vorhandene Fehlertexte, die bei neuen Organisationen grundsätzlich eine manuelle Einrichtung verlangen, wurden entfernt.

Nutzerzuweisung verarbeitet 404 für fehlende Ziele und 409 für bereits zugeordnete Employees. Bei 400 wird keine bereits erfolgte Zuordnung mehr behauptet. Ausgewählte Lade-/Zuweisungsaktionen und die Tenantliste melden 401/403 verständlich. Bestehender Auth-Interceptor, currentUser und SSR-Absicherungen bleiben erhalten. Keine nachgebaute Anmeldung oder erfundener Tenant für Punkt 3.

„Gespeichert“ bedeutet weiterhin nur, dass der Server die Konfiguration persistiert. Die normalen Employee-/Restaurant-/Clearing-Abläufe wenden Module, Regeln und Branding noch nicht automatisch an.

## Die fünf gemeldeten Punkte

| Nr. | Punkt | Geprüfter Stand | Was noch notwendig ist |
|---|---|---|---|
| 1 | GET Regeln/Branding für neue Organisation | **Behoben für Laden/Einrichten.** Tenantanlage erzeugt beide Datensätze. Bei Altbestand ohne Datensatz liefert GET 200 mit Standardwerten; unbekannter Tenant 404. Im API-Test bestätigt; Null-Tage im Browser bearbeitet und erstmals gespeichert. | Sonderfall: Direktes Branding-Publish bei Altbestand ohne Brandingzeile liefert weiter 500. Erst im Brandingformular speichern, dann veröffentlichen funktioniert. Serverseitig Publish ebenfalls robust behandeln, siehe unten. |
| 2 | ID-Konflikt beim ersten Regeln-Speichern | **Für frische Seed-Daten behoben.** IDs werden jetzt generiert. Tenantanlage und erstmaliger Regeln-PUT bei Altbestand ohne Datensatz funktionieren in der isolierten Datenbank. | Falls eine bestehende Datenbank noch eine alte zurückliegende Sequenz hat, muss sie dort separat korrigiert werden. Eine Migration bestehender Datenbanken wurde nicht geprüft. |
| 3 | SaaS-Admin-Login ohne Tenant | **Weiter offen.** Login greift unverändert auf employee.getTenant().getId() zu und liefert ohne Tenant 500. Im API-Test und Browser bestätigt. | Null-sichere JWT-Erstellung für SAAS_ADMIN; tenantId nur bei vorhandener Zuordnung setzen. Bis dahin muss das verwendete Admin-Konto bereits einem Tenant zugewiesen sein. |
| 4 | Rollenschutz / öffentliche Rollenvergabe | **Teilweise behoben.** Alle Methoden in SaasAdminResource besitzen RolesAllowed(SAAS_ADMIN). Geprüfte Lese- und Schreibzugriffe liefern ohne Token 401 und mit normalem Employee 403. **Öffentliche Rollenvergabe bleibt offen:** beide Registrierungsrouten persistieren weiterhin SAAS_ADMIN aus dem Request. | Öffentlich erlaubte Rollen serverseitig festlegen; insbesondere SAAS_ADMIN nicht aus frei eingesendeten Registrierungsdaten übernehmen. |
| 5 | Unbekannte IDs / parallele Zuweisung | **Teilweise behoben.** Fehlender Tenant/Employee liefert 404, bereits zugeordneter Employee 409; erfolgreicher Eintrag verschwindet aus der Liste. API-geprüft. **Gleichzeitige Zuweisungen bleiben ungesichert:** Code prüft und setzt weiterhin getrennt ohne Lock, Versionsprüfung oder bedingtes Update. | Prüfung und Änderung atomar absichern. Kein Nachweis einer behobenen Konkurrenzsituation; in diesem Change kein Parallelitätstest. |

## Konkrete Übergabe an die Serverperson

| Priorität | Betroffene Stelle / Route | Benötigte Änderung |
|---|---|---|
| Vor produktivem Einsatz | POST `/employee/register` und `/restaurantUser/register` | Zulässige öffentliche Rollen beschränken. Im isolierten Test wurde SAAS_ADMIN bei beiden Routen nicht nur angenommen, sondern tatsächlich in der Datenbank gespeichert. Rollenprüfung auf SaaS-Routen allein genügt deshalb noch nicht. |
| Funktional offen | POST `/employee/login` | SAAS_ADMIN ohne Tenant zulassen, ohne einen erfundenen tenantId-Claim zu setzen. Unzugewiesene normale Nutzer gesondert behandeln. RestaurantUser-Login enthält im Code dieselbe Null-Annahme und sollte eine definierte Fehlerantwort erhalten. |
| Datenkonsistenz | PUT `/saas-admin/assign/{tenantId}/{empId}` und alte Variante `/assign/{empId}` | Gleichzeitige Zuweisung gegen verschiedene Tenants verhindern, z. B. atomar nur aktualisieren, wenn tenant_id noch null ist, oder geeignete Transaktionssperre verwenden. Reine Prüfung vor setTenant schützt nicht gegen zwei parallele Requests. |
| Altbestand / Fehlerbehandlung | POST `/saas-admin/tenant/{id}/branding/publish` | Fehlenden Branding-Datensatz und unbekannten Tenant definiert behandeln. GET kann nur berechnete Standardwerte zurückgeben; daraus kann das Frontend nicht erkennen, ob der Datensatz existiert. Direktes Publish ohne Zeile reproduziert weiterhin NoResultException/500. Einfacher Bedienweg bereits möglich: Entwurf vorher speichern. |
| Robustheit | PUT `/saas-admin/tenant/{id}` und `/modules`, `/rules`, `/branding` | DTO-/Pflichtfeld-/ID-Validierung und konsistente 400/404-Antworten ergänzen. Modulupdate mit leerer Liste und unbekanntem Tenant liefert aktuell 200; im Test reproduziert. Frontendauswahl gültiger IDs ersetzt keine serverseitige Prüfung. |

## Für die ursprünglich gewünschten Betriebsvarianten fehlt weiterhin

Die folgenden Punkte wurden durch die fünf Korrekturen nicht umgesetzt. Genannte neue Pfade sind Vorschläge zur Abstimmung, keine vorhandenen Routen.

| Funktion | Backend / Datenmodell | Frontend danach |
|---|---|---|
| Ohne Restaurantintegration, manuell, QR oder gemischter Betrieb | Betriebsarten und erlaubte Bestätigungsverfahren modellieren; Standard pro Tenant und bei Bedarf Einstellung pro Restaurant. Aktuell gibt es nur RESTAURANT als Modul und restaurantRequired als Boolean. Restaurantpflicht ist nicht dasselbe wie eine Bestätigungsart. | Passende Auswahl anbieten und Employee-/Restaurant-Abläufe nach Konfiguration anzeigen. |
| Module und Regeln wirken im Betrieb | TenantModule und TenantRules in Ticket-/QR-/Clearing-Operationen auswerten, etwa erlaubte Tage, Restaurantpflicht und verfügbare Funktionen. | Relevante Konfiguration laden und passende Aktionen anzeigen; entscheidende Regeln müssen auch serverseitig gelten. |
| Veröffentlichtes Branding in anderen Bereichen | Tenantbezogene Konfiguration für normal angemeldete Nutzer bereitstellen, z. B. GET `/tenant/config` mit ihren Modulen, Regeln und veröffentlichtem Branding. | Employee, Restaurant und HR mit diesen Werten verbinden. Derzeit wirkt Branding nur in der SaaS-Vorschau. |
| Globale Restaurant-/RestaurantUser-Zuweisung | Listen und explizite Ziel-Tenant-Zuordnung ergänzen. Bestehende Restaurant-Routen verwenden den JWT-Tenant; Employee-Liste enthält keine RestaurantUser. | Eigene Zuordnungsansichten ergänzen, sobald der Vertrag vorliegt. |
| Logo-Datei hochladen, falls gewünscht | Upload, Ablage und Größen-/Typprüfung anbieten. | Datei auswählen/hochladen. Eine vorhandene Logo-Adresse ist bereits unterstützt. |

Setup-Fortschritt, Aktivierungsstatus und „Nächste Schritte“ werden nach dem Nutzerauftrag nicht mehr als erforderliche Erweiterung aufgeführt. Der entfernte Dashboardbereich bleibt entfernt. Die bestehende Setup-Navigationsseite wurde in diesem Change nicht umgebaut.

## Datenmodell und Betrieb

Für die funktionierende SaaS-Verwaltung sind Tenant, TenantModule, TenantRules und TenantBranding bereits vorhanden. Für Restaurantvarianten fehlen zusätzliche Einstellungen; für die Durchsetzung bestehender Regeln vor allem Fachlogik. Separate weitergehende Punkte: Tenant.manager ist Text statt einer Admin-Mitgliedschaft; Tier/CostOrder verwenden globale Namensschlüssel; das Backend verwendet derzeit drop-and-create. Ein dauerhafter produktiver Betrieb braucht dazu eine passende Rechte-, Schlüssel- und Migrationsstrategie. Hier wurden weder Datenmodell noch Serverkonfiguration verändert.

Der Backendcommit initialisiert Branding auch unter published mit Standardwerten. Die Vorschau zeigt den gelieferten Stand; das ist kein Nachweis einer manuell erfolgten Veröffentlichung. Für eine getrennte fachliche Freigabe wäre ein eindeutiger Veröffentlichungsstatus erforderlich, falls diese Unterscheidung gewünscht wird.

## Prüfumfang

Angular-Produktionsbuild erfolgreich (bestehende Bundlewarnung). Backend unverändert mit Maven `-DskipTests package` gebaut. 64 API-Requests/Prüfbedingungen in einer separaten temporären Datenbank ausgeführt, einschließlich bewusst reproduzierter offener Fehler. Browser: Login als zugewiesener SaaS-Admin, leeres Regelformular mit null-Tagen, erstes Speichern und erneutes Laden, Tenantwechsel, Branding speichern/Vorschau/Veröffentlichen, Logout sowie Fehleranzeige beim Login ohne Tenant. Keine vollständige Ticket-/QR-End-to-End-Prüfung, kein Unit-Testlauf, keine fachliche Abnahme. Einzelheiten: [Evidence](evidence.md) und [API-Protokoll](api-checks.md).
