# Übergabe an die Backendverantwortlichen: SaaS-Admin

> Historischer Stand vor Backendcommit f05fd08. Aktuelle Bewertung und noch notwendige Arbeiten: [VAL-010 Status](../VAL-010-adapt-saas-backend-fixes/status.md). Die folgenden alten Fehlerlisten sind nicht mehr die aktuelle Übergabe.

Stand: 27.09.2026. Das Frontend verwendet die vorhandenen SaaS-Routen. Alle eigenen zwischenzeitlichen Serveränderungen wurden zurückgenommen; dieser Change enthält ausschließlich Frontend und Dokumentation. Die schon vorher vorhandene Seed-Rolle SAAS_ADMIN für Max wurde erhalten.

Bestehende Organisationen, Module, Regeln, Brandingentwürfe/Veröffentlichung und Employee-Zuweisung konnten gegen diesen Server gespeichert und erneut geladen werden. Für vollständig nutzbares Onboarding und die gewünschten Restaurantvarianten fehlen aber die folgenden Serverteile. Keine fachliche Freigabe oder Porsche-Pflichtumfang wird behauptet.

## Konkrete Fehler in vorhandenen Routen

| Priorität | Betroffene Route / Stelle | Beobachteter Stand | Benötigte Änderung beim Server |
|---|---|---|---|
| Vor produktivem Einsatz | `/saas-admin/*`, SaasAdminResource | Kein serverseitiger SAAS_ADMIN-Rollenschutz. GET `/tenants` liefert ohne Token und mit normalem Employee-Token 200. Der Angular-Guard schützt keine API. | SaaS-Routen serverseitig auf SAAS_ADMIN begrenzen; ohne Token 401, ohne Rolle 403. Auch Schreibzugriffe entsprechend absichern. |
| Vor produktivem Einsatz | POST `/employee/register`, POST `/restaurantUser/register` | Angeforderte Rolle wird übernommen. Employee-Registrierung mit SAAS_ADMIN im isolierten Test angenommen; RestaurantUser-Pfad im Code ebenfalls ohne passende Einschränkung. | Öffentlich erlaubte Rollen festlegen und serverseitig erzwingen; keine öffentliche Selbstregistrierung als Plattformadmin. |
| Blockiert neue Organisationen | GET `/saas-admin/tenant/{id}/rules` und `/branding` | Für neuen Tenant ohne Konfigurationszeile jeweils 500 / NoResultException. Frontend kann fehlende Konfiguration nicht von anderem Serverfehler unterscheiden. | Bevorzugt beim Erstellen des Tenants gültige Standardkonfigurationen anlegen und über bestehende DTOs als 200 zurückgeben. Alternativ eindeutigen Status/Fehlercode für „noch nicht eingerichtet“ vereinbaren; unbekannten Tenant gesondert behandeln. |
| Blockiert erste Regeln | PUT `/saas-admin/tenant/{id}/rules`, import.sql / TenantRules-ID | Mit unverändertem Seed scheitert erster Regeln-Insert am Primärschlüssel (ID 1), da feste Seed-IDs die Identity-Sequenz nicht erhöhen. Im Test reproduziert. | Seed-IDs generieren lassen bzw. Sequenz passend nachführen. Bestehende Datenbanken über geeignete Migration korrigieren, nicht durch Löschen der Daten. |
| Blockiert tenantlosen Plattformadmin | POST `/employee/login` | `.getTenant().getId()` verursacht 500 bei SAAS_ADMIN ohne Tenant. Ein bereits zugewiesener SaaS-Admin kann sich anmelden. | SAAS_ADMIN ohne Tenant zulassen und tenantId-Claim nur bei vorhandener Zuordnung setzen. Verhalten anderer unzugewiesener Rollen definieren. RestaurantUser-Login hat im Code dieselbe Null-Annahme. |
| Robustheit | PUT `/saas-admin/assign/{tenantId}/{empId}` | Unbekannter Employee ergibt 500; bereits zugeordneter Employee 400. Prüfung und Zuweisung sind nicht gegen parallele Zugriffe abgesichert. | Fehlende IDs vor Zugriff prüfen (404); belegte Zuordnung konsistent als Konflikt melden, idealerweise 409. Gleichzeitige Zuordnung atomar verhindern. Frontend versteht bereits 400 und 409. |
| Robustheit | PUT `/saas-admin/tenant/{id}`, `/modules`, `/rules`, `/branding` | Unterschiedliche Fehlerverträge; fehlende IDs/ungültige Inhalte können 500 ergeben. Bei leerer Modulliste wird unbekannter Tenant nicht geprüft. | Tenant immer prüfen, DTOs und IDs validieren, 400/404 gezielt liefern und Änderungen bei Fehlern vollständig zurückrollen. Frontend sendet ausgewählte vorhandene Modul-IDs und validiert Formulare, ersetzt aber keine Servervalidierung. |

Das Frontend behandelt GET-Fehler als Fehler und sperrt das betroffene Speichern. Es erzeugt nach HTTP 500 keine vermeintlich fehlende Konfiguration durch PUT. Ein Branding-PUT kann technisch einen neuen Datensatz anlegen; ein allgemeiner GET-Fehler beweist aber nicht, dass der Datensatz fehlt. Wiederholte Regeln-PUTs zum zufälligen Überspringen kollidierender IDs sind ebenfalls keine sinnvolle Frontendlösung.

Bei Umsetzung der bevorzugten Standardkonfiguration (gleiche DTOs, erfolgreicher GET) kann das Frontend direkt weiterarbeiten. Ein neuer Fehlervertrag muss kurz abgestimmt und anschließend im Frontend berücksichtigt werden.

## Fehlende Funktionen für den vollständigen SaaS-Umfang

Diese Pfade/DTO-Erweiterungen sind Vorschläge, keine bereits gefundenen Routen.

| Thema | Was existiert | Was noch benötigt wird |
|---|---|---|
| Restaurantvarianten | Modul RESTAURANT, Regel restaurantRequired | Fachlich getrennte Einstellungen: Nutzung ohne Restaurantintegration, manuelle Bestätigung, QR-Bestätigung sowie gemischter Betrieb mit Einstellung pro Restaurant. Modusfeld/erlaubte Verfahren und Standard pro Tenant vereinbaren; bestehende Rules-DTO erweitern oder eigene Einstellungsroute anbieten. Restaurantpflicht bleibt davon unabhängig. |
| Wirksame Module und Regeln | TenantModule, TenantRules und ihre Verwaltungsrouten | Im Ticket-/QR-/Clearing-Code Aktivierung, erlaubte Tage und Restaurantvorgaben tatsächlich auswerten. Bisher werden die Verwaltungswerte gespeichert, aber schalten diese Abläufe noch nicht um. |
| Konfiguration im normalen Betrieb | TenantBranding mit Entwurf und veröffentlichten Werten | Eine tenantbezogene Leseschnittstelle für angemeldete Employee-/Restaurant-/HR-Nutzer, z. B. GET `/tenant/config` mit freigegebenen Modulen, Regeln und veröffentlichtem Branding. Danach zusätzliche Frontendanbindung in diesen Bereichen. Kein Zugriff normaler Nutzer auf globale SaaS-Adminrouten als Ersatz. |
| Restaurantzuordnung | PUT `/saas-admin/restaurant/{restaurantId}` verwendet Tenant aus JWT | Expliziten Ziel-Tenant und globale/unzugewiesene Restaurantliste anbieten. Vorschlag: PUT `/saas-admin/tenant/{tenantId}/restaurant/{restaurantId}` und GET `/saas-admin/unassigned-restaurants`. |
| RestaurantUser-Zuordnung | Vorhandene Restaurant-/User-Route verlangt bereits denselben JWT-Tenant; Employee-Liste enthält keine RestaurantUser | Separate Liste unzugewiesener RestaurantUser und eine Zuordnung mit klarer Restaurant-/Tenant-Prüfung, z. B. GET `/saas-admin/unassigned-restaurant-users`; bestehenden Zuordnungsvertrag erweitern. |
| Setup und Aktivierung | Nur Navigationsübersicht im Frontend | Persistenter Setup-/Aktivierungsstatus, Voraussetzungen und Aktionen, falls fachlich gewünscht; z. B. GET `/saas-admin/tenant/{id}/setup`, POST `/saas-admin/tenant/{id}/activate`. Fortschritt aus echten Voraussetzungen ableiten. |
| Logo-Datei | Branding.logo als String, derzeit Logo-Adresse bis 255 Zeichen | Nur falls Upload gewünscht: Upload/Ablage/Lesepfad und Größen-/Typprüfung. Aktuelles Frontend unterstützt eine vorhandene Logo-Adresse und Vorschau. |

## Datenmodell

Für die bereits vorhandenen CRUD-Formulare sind keine neuen Entities nötig: Tenant, Module/TenantModule, TenantRules/UsageDay und TenantBranding existieren. Die ersten Fehler sind hauptsächlich Initialisierung, ID-Sequenz, Authentifizierung, Berechtigungen und Fehlerbehandlung.

Für die Restaurantvarianten werden zusätzliche Felder/Zuordnungen gebraucht. Setup-/Aktivierungsstatus muss ebenfalls gespeichert werden, wenn diese Funktion umgesetzt wird. Weitere im Code erkennbare Punkte zur Abstimmung: `Tenant.manager` ist nur Text, keine Admin-Mitgliedschaft; Tier und CostOrder verwenden globale Namensschlüssel, wodurch gleiche Namen in verschiedenen Tenants kollidieren können. Das Backend ist aktuell auf `drop-and-create` eingestellt; ein dauerhafter Betrieb braucht eine passende Migrations-/Schema-Strategie. Keine dieser Änderungen wurde hier vorgenommen.

## Nachweis

Siehe [aktuelles API-Protokoll](api-checks.md): 45 ausgeführte Requests/Prüfbedingungen gegen zurückgesetzte Serverquellen in eigener temporärer Datenbank, einschließlich der oben ausdrücklich als reproduziert beschriebenen Fehler. Erfolgreiche Antworten auf unberechtigte Zugriffe sind Befunde, keine bestandenen Sicherheitstests. Testbackend beendet, Testdatenbank gelöscht.
