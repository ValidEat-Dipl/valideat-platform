# Backend-Übergabe für den SaaS-Admin-Bereich

Stand der Codeprüfung: **27.09.2026**. Grundlage: aktueller lokaler Repository-Code und der vorhandene SaaS-Frontendstand. Keine Live-API-Prüfung, keine Backendänderung. Neue Modelle, DTOs und Routennamen unten sind **Implementierungsvorschläge**, keine bereits vorhandenen oder im Team freigegebenen Verträge. SaaS ist eine spätere Plattform-Erweiterung, keine behauptete Porsche-Pflichtanforderung.

## 1. Aktuelles Datenmodell und konkrete Lücken

| Bereich | Tatsächlicher Stand | Nötige Änderung / Entscheidung |
|---|---|---|
| `Tenant` | `id`, eindeutiger `name`, `manager` als Text, `email`, `country`, `companySize`, `primaryColor`, `accentColor` | Stammdaten können angelegt/gelesen, aber nicht aktualisiert werden. Für den vollständigen Setupablauf fehlen Status und Aktivierungszeitpunkt. |
| `Employee` | Eigene Tabelle mit Rolle und optionalem `tenant_id` | Nutzer ohne Tenant sind schon im Modell möglich. Keine zusätzliche Tabelle „unregistrierte Nutzer“ nötig. Es fehlt die globale Abfrage `tenant IS NULL` und die explizite Ziel-Tenant-Zuweisung. |
| `RestaurantUser` | Eigene Tabelle, optionaler Tenant und Restaurant | Nicht mit Employee gleichsetzen: getrennte IDs und Authentifizierung. Für spätere Verwaltung eigener Listen-/Zuordnungsablauf nötig. |
| `Restaurant` | Gehört über optionales `tenant_id` zu höchstens einem Tenant | Für die erste Umsetzung beibehalten. Falls ein Restaurant mehrere Unternehmen bedienen soll, ist eine zusätzliche Tenant-Restaurant-Zuordnung notwendig; das ist eine gesonderte fachliche Entscheidung. |
| `Tier` | **`name` ist globaler Primärschlüssel**, dazu `discount` und Tenant | Eigene technische ID, z. B. `Long id`, und Eindeutigkeit `(tenant_id, name)` vorsehen. Sonst können zwei Tenants nicht dieselbe Stufe unabhängig anlegen. |
| `CostOrder` | **`name` ist globaler Primärschlüssel**, dazu Tenant | Ebenfalls technische ID und Eindeutigkeit `(tenant_id, name)` vorsehen. |
| `FoodTicket` | Beziehungen auf Employee, Tier, CostOrder, Restaurant und Tenant | Bei neuen Tier-/CostOrder-IDs die Fremdschlüssel, Seed-Daten und vorhandenen Lookups berücksichtigen. Zugehörigkeiten müssen zum Ticket-Tenant passen. Bestehende namensbasierte Requests können zunächst über `(tenantId, name)` weiter aufgelöst werden. |
| Module | Keine Tenant-Modul-Konfiguration gefunden | Z. B. `TenantModule(tenant, moduleKey, enabled)`, eindeutig pro `(tenant_id, moduleKey)`. Modulschlüssel und erlaubte Module serverseitig festlegen. |
| Regeln | Keine Tenant-Regelkonfiguration gefunden | Z. B. `TenantRules(tenant, allowedDays, restaurantRequired, correctionNote)`, eine Konfiguration pro Tenant. `correctionNote` ist zunächst nur Text; ausführbare Korrekturfristen/-regeln müssen fachlich vereinbart werden. |
| Branding | Nur Primär-/Akzentfarbe in Tenant | Für vollständiges Branding zusätzlich `appName`, `initials`, optional Logo-Referenz und getrennte Entwurfs-/veröffentlichte Werte. Z. B. Branding-Datensätze pro `(tenant_id, DRAFT/PUBLISHED)`. Bestehende Tenant-Farbwerte müssen mit der veröffentlichten Konfiguration konsistent bleiben. |
| Setup | Keine Setup-Schritte / Aktivierungslogik gefunden | Für Figma-Setup z. B. `Tenant.status` (`SETUP`, `ACTIVE`), `activatedAt` und gespeicherte Prüfbestätigungen. Fortschritt aus Schritten berechnen, nicht unabhängig als beliebige Prozentzahl speichern. |
| Aktivitäten | `ChangeLog` bezieht sich auf Ticketänderungen und verwendet `LocalDate`; `/logs` liefert Blockchain-Logs | Für „Letzte Änderungen“ braucht es tenantbezogene SaaS-Ereignisse mit Zeitpunkt, Aktion, Akteur und Zusammenfassung. Separates einfaches Modell oder bewusste Erweiterung; vorhandene Logs nicht ungeprüft als SaaS-Aktivitäten darstellen. |
| Administratoren | `SAAS_ADMIN` existiert als Employee-Rolle; `Tenant.manager` ist nur ein Name | Plattformadmin und Organisationskontakt unterscheiden. Für einen globalen SaaS-Admin ist keine neue Admin-Tabelle notwendig. Falls tenantbegrenzte Organisationsadmins gewünscht sind, braucht es eine echte ID-Zuordnung und ein geklärtes Rollenmodell. `manager`/Namensvergleich ist keine Berechtigungsbeziehung. |

## 2. Was bereits existiert und weiterverwendet werden kann

| Route | Stand / Grenze |
|---|---|
| `POST /employee/login` | Gemeinsamer Login auch für `SAAS_ADMIN`. Null-Tenant-Behandlung korrigieren, keine zusätzliche SaaS-Loginroute zwingend nötig. |
| `POST /saas-admin/tenant` | CreateTenantDTO mit `name`, `manager`, `email`, `country`, `companySize`, `primaryColor`, `accentColor`; Antwort Tenant/201. Erstellt **kein Konto** und weist dem Aufrufer keinen Tenant zu. |
| `GET /saas-admin/tenants` | Liste TenantOverviewDTO mit Stammdaten und Anzahl Employee/Admin/Restaurant/CostOrder/Tier/FoodTicket. Kundenübersicht und Dashboard verwenden diese Route bereits. |
| `GET /saas-admin/tenant/{id}` | Liefert vorhandene Tenantdaten und Farben. |
| `GET /saas-admin/tenant-overview` | Einzelne Übersicht, Ziel wird aus JWT gelesen. Für ausgewählten Tenant ist die globale Liste bereits eine Alternative. Keine zusätzliche Dashboardroute zwingend nötig. |
| `GET /saas-admin/tenantByManager/{id}` | Employee wird tenantgebunden geladen; Tenants werden über den zusammengesetzten Namen gesucht. Nicht als sichere Admin-Tenant-Zuordnung verwenden. |
| `PUT /saas-admin/assign/{empId}` | Vorhanden, aber Ziel ist ausschließlich JWT-Tenant. Ersetzt derzeit auch eine bestehende Employee-Zuordnung ohne eigene Konfliktprüfung. |
| `PUT /saas-admin/restaurant/{restaurantId}` | Vorhanden, ebenfalls JWT-Tenant. |
| `PUT /saas-admin/restaurant/{restaurantId}/user/{userId}` | Vorhanden; Restaurant und RestaurantUser müssen bereits zum JWT-Tenant gehören. Setzt lediglich die Restaurantbeziehung. |
| `POST /saas-admin/tier?discount=...` | Vorhanden mit Text-Body für den Namen, JWT-Tenant. |
| `POST /saas-admin/costorder` | Vorhanden mit Text-Body für den Namen, JWT-Tenant. |

`GET /employee`, `/restaurant`, `/tier` und `/costOrder` sind tenantgebunden. Diese Employee-/Restaurant-Endpunkte nicht für normale Nutzer global öffnen. Für die plattformweite Verwaltung eigene geschützte SaaS-Routen verwenden.

## 3. Zuerst benötigt: Zuweisung und Speichern des bestehenden Frontends

**Alle folgenden Routen fehlen in dieser Form.** Sie sollen nur für `SAAS_ADMIN` zugänglich sein. Bei explizitem `tenantId` ist dieser der Ziel-Tenant; der Tenant-Claim des SaaS-Admins darf ihn nicht still ersetzen.

| Methode und vorgeschlagene Route | Eingabe | Erwartete Antwort / Verhalten |
|---|---|---|
| `GET /saas-admin/unassigned-employees` | Kein Body | `200` Liste `{id, firstName, lastName, email, role, tenantId: null}`. Nur nicht zugewiesene, zuweisbare Employees (`EMPLOYEE`/`ADMIN`); absichtlich globale `SAAS_ADMIN`-Konten nicht als offene Mitarbeiterzuordnung anzeigen. Leerer Bestand: `[]`. Keine Passwort-Hashes. |
| `PUT /saas-admin/assign/{tenantId}/{empId}` | Kein Body | `200` Employee-Zuordnungs-DTO `{id, firstName, lastName, email, role, tenantId}`. Tenant/Employee müssen existieren. Bereits beim gleichen Tenant: idempotenter Erfolg. Bereits bei anderem Tenant: `409`, keine automatische Verschiebung. Prüfung und Änderung atomar ausführen. |
| `PUT /saas-admin/tenant/{tenantId}` | `{name, manager, email, country, companySize}` | `200` aktualisierte Tenantdaten. Farben werden über Branding verwaltet. Validierung, doppelte Namen als `409`. |
| `GET /saas-admin/tenant/{tenantId}/modules` | Kein Body | `200` Liste `{moduleKey, name, enabled}`. Anfangsauswahl serverseitig definieren; keine erfundenen Aktivierungszustände. |
| `PUT /saas-admin/tenant/{tenantId}/modules` | `{enabledModules: [moduleKey, ...]}` | `200` gespeicherte Modulliste. Vollständige Auswahl ersetzen, unbekannte Schlüssel ablehnen. Vorschlagskeys: `EMPLOYEE_APP`, `HR_ADMIN`, `CLEARING`, `RESTAURANT_SCANNER`, `BRANDING`, `REPORTING_EXPORT`. Offline/OCR nicht als nutzbar aktivieren. |
| `GET /saas-admin/tenant/{tenantId}/rules` | Kein Body | `200` `{allowedDays, restaurantRequired, correctionNote}` mit gültiger Ausgangskonfiguration. |
| `PUT /saas-admin/tenant/{tenantId}/rules` | `{allowedDays: ["MONDAY", ...], restaurantRequired: true, correctionNote: "..."}` | `200` gespeicherte Regeln. Tage als feste Enumwerte, nicht als UI-Text `Mo–Fr`. Die Frontendwerte werden beim Anschluss entsprechend übersetzt. |
| `GET /saas-admin/tenant/{tenantId}/branding` | Kein Body | `200` `{draft, published, publishedAt}`. Beide Konfigurationen enthalten `appName`, `initials`, `primaryColor`, `accentColor`, optional `logoUrl`; `published` darf vor Erstveröffentlichung `null` sein. |
| `PUT /saas-admin/tenant/{tenantId}/branding` | `{appName, initials, primaryColor, accentColor, logoUrl?}` bzw. serverseitig vergebene Logo-Referenz | `200` gespeicherter Entwurf. Verändert nicht automatisch die veröffentlichte App. Keine beliebigen externen Logo-URLs ungeprüft übernehmen. |
| `POST /saas-admin/tenant/{tenantId}/branding/publish` | Kein Body | `200` veröffentlichte Konfiguration mit Zeitpunkt. Vorhandenen gültigen Entwurf atomar übernehmen. |

Für die **Nutzerzuweisungsseite allein** reichen die ersten beiden Routen, die schon vorhandene Tenantliste und die Authkorrekturen aus Abschnitt 6. Eine neue User-Tabelle oder eine neue Kundenlistenroute ist dafür nicht nötig.

## 4. Für den vollständigen Figma-Ablauf

Diese Funktionen sind aktuell sichtbar als offen markiert. Die Routen werden benötigt, wenn Logo, Setup-Aktivierung und Änderungshistorie vollständig funktionieren sollen.

| Methode und vorgeschlagene Route | Eingabe / Antwort |
|---|---|
| `POST /saas-admin/tenant/{tenantId}/branding/logo` | Multipart `file`, Antwort `201 {logoUrl}` oder `{logoId}`; als Entwurfslogo ablegen. Figma nennt PNG/SVG bis 200 KB. SVG nur mit sicherer Bereinigung unterstützen; sonst zunächst PNG vereinbaren. |
| `GET /saas-admin/tenant/{tenantId}/branding/logo/{logoId}` | Sicheres Ausliefern eines Entwurfslogos an berechtigten SaaS-Admin. Veröffentlichte Logos müssen zusätzlich für die berechtigten Tenantnutzer erreichbar sein, z. B. über die unten zurückgegebene Asset-URL. Ein bestehender sicherer Assetdienst kann diese Route ersetzen. |
| `GET /saas-admin/tenant/{tenantId}/setup` | `{status, progressPercent, steps: [{key, status}], canActivate, blockingReasons}`. Voraussetzungen im Backend bestimmen. |
| `PUT /saas-admin/tenant/{tenantId}/setup/{stepKey}` | Für manuelle Prüfbestätigungen, z. B. `{confirmed: true}`. Nur bekannte, manuell bestätigbare Schritte akzeptieren; Datenvoraussetzungen nicht dadurch umgehen. Antwort aktualisierter Setupstand. |
| `POST /saas-admin/tenant/{tenantId}/activate` | Kein Body. Voraussetzungen prüfen, bei fehlenden Schritten `409` mit Gründen; sonst `200` aktualisierter Tenantstatus. Wiederholte Aktivierung darf keine doppelten Nebenwirkungen auslösen. |
| `GET /saas-admin/tenant/{tenantId}/activities?limit=10` | Liste `{id, occurredAt, actorName, action, summary}`; Ereignisse für Organisations-, Modul-, Regel-, Branding- und Zuweisungsänderungen tatsächlich speichern. |
| `GET /tenant/config` | Für angemeldete Employee-/HR-/Restaurant-Nutzer: ausschließlich Konfiguration des berechtigten JWT-Tenants mit veröffentlichtem Branding, Modulstatus und nötigen Regeln. Keine Entwürfe und keine globale Auswahl fremder Tenants. Für fehlenden Tenant kontrollierter Fehler. Veröffentlichte Logo-URL oder geschützte Assetroute bereitstellen. |

Die vorhandene Antwort von `GET /saas-admin/tenants` kann optional um `status`, `activeModuleCount`, `setupProgress` und `lastActivityAt` ergänzt werden. Die bestehenden Felder beibehalten; Kennzahlen müssen aus gespeicherten Daten bzw. Setupregeln stammen. `employeeCount` zählt derzeit alle Employee-Datensätze des Tenants, einschließlich Admins: Bezeichnung/Definition mit dem Frontend abstimmen. Ein eigener SaaS-Admin-Zähler fehlt, falls der Figma-Rollenkasten benötigt wird.

## 5. Zusätzliche Basisdatenverwaltung – wenn im SaaS-Bereich gewünscht

Das jetzige Frontend zeigt Basisdatenzahlen. Vollständige CRUD-Masken für Kostenstellen, Stufen und Restaurants sind dort noch nicht implementiert. Die folgenden Routen sind daher ein **zusätzliches Arbeitspaket**, nicht Voraussetzung für die vorhandene Kundenliste.

| Vorgeschlagene Route | Zweck / Vertrag |
|---|---|
| `GET /saas-admin/tenant/{tenantId}/employees` | Liste zugeordneter Employees als DTOs ohne Passwort-Hash. |
| `GET /saas-admin/tenant/{tenantId}/restaurants` | Liste `{id, name, address, tenantId}`. |
| `GET /saas-admin/unassigned-restaurants` | Restaurants ohne Tenant für eine Zuweisung auswählen. |
| `PUT /saas-admin/tenant/{tenantId}/restaurant/{restaurantId}` | Vorhandenes Restaurant dem expliziten Tenant zuordnen. Bestehende fremde Zuordnung nicht still überschreiben. |
| `GET /saas-admin/restaurant-users?tenantId={tenantId}&unassignedRestaurant=true` | Benutzer des Tenants ohne Restaurant. Für Benutzer ohne Tenant zusätzlich `unassignedTenant=true` ohne Tenantfilter anbieten. DTO: `{id, firstName, lastName, email, role, tenantId, restaurantId}`. |
| `PUT /saas-admin/tenant/{tenantId}/restaurant-user/{userId}` | Unzugewiesenen RestaurantUser zunächst dem Tenant zuordnen; keine fremde Restaurantbeziehung übernehmen. |
| `PUT /saas-admin/tenant/{tenantId}/restaurant/{restaurantId}/user/{userId}` | RestaurantUser mit Restaurant verknüpfen; beide müssen zum expliziten Tenant gehören. |
| `GET /saas-admin/tenant/{tenantId}/costorders` | Kostenstellenliste `{id, name}` nach Modellkorrektur. |
| `POST /saas-admin/tenant/{tenantId}/costorder` | JSON `{name}`, Antwort `201 {id, name}`. Tenantexplizite Variante der vorhandenen Text-Body-Route. |
| `PUT /saas-admin/tenant/{tenantId}/costorder/{id}` | JSON `{name}`, Antwort aktualisierte Kostenstelle; nur Datensatz dieses Tenants bearbeiten. |
| `GET /saas-admin/tenant/{tenantId}/tiers` | Stufenliste `{id, name, discount}`; Einheit von `discount` entsprechend bestehender Backendlogik ausdrücklich dokumentieren. |
| `POST /saas-admin/tenant/{tenantId}/tier` | JSON `{name, discount}`, Antwort `201 {id, name, discount}`. Tenantexplizite Variante der vorhandenen Route. |
| `PUT /saas-admin/tenant/{tenantId}/tier/{id}` | JSON `{name, discount}`, Antwort aktualisierte Stufe; Wertebereich und Umgang mit historischen Tickets klären. |

Soll „Restaurant anlegen“ Teil des Setups sein, zusätzlich `POST /saas-admin/tenant/{tenantId}/restaurant` mit `{name, address}` und `201 {id, name, address, tenantId}` vorsehen. Ohne diese Funktion können nur bereits vorhandene Restaurants zugeordnet werden. Löschen, Tenantwechsel mit historischen Tickets und beliebige Rollenumstellungen sind nicht Bestandteil dieses Vorschlags.

## 6. Änderungen an vorhandener Logik – ebenfalls erforderlich

- **Autorisierung:** Im geprüften SaaS-Resource fehlen Rollenannotationen; auch keine entsprechende HTTP-Policy gefunden. Alle Verwaltungsrouten serverseitig auf `SAAS_ADMIN` beschränken. Frontend-Guard ersetzt dies nicht. Globale Plattformrolle darf keinen Tenant benötigen, um Tenants zu listen oder zu verwalten.
- **Null-Tenant-Login:** Employee- und RestaurantUser-Login greifen direkt auf `getTenant().getId()` zu. Optionalen Tenant abfangen; unzugewiesene normale Nutzer dürfen keine tenantgebundenen Geschäftsdaten erhalten. `TenantService.getCurrentTenantId()` muss fehlende Claims kontrolliert behandeln statt mit NullPointerException zu scheitern.
- **Registrierung:** Eigene Request-DTOs, Rolle serverseitig setzen. Öffentliches Registrieren darf kein `SAAS_ADMIN` ermöglichen. Bestehende Logins liefern bei falschem Passwort teilweise `null`; stattdessen konsistent `401` verwenden.
- **Kontoanlage:** `POST /saas-admin/tenant` bleibt Organisationsanlage. Das erste Plattformadmin-Konto muss kontrolliert angelegt werden, z. B. per Entwicklungs-Seed oder administrativem Prozess. Keine öffentliche SaaS-Admin-Registrierung erforderlich. Selbstregistrierung von Kunden mit eigenem Organisationsadmin wäre ein gesonderter, noch abzustimmender Flow.
- **DTOs:** Keine Employee-/RestaurantUser-Entities mit Passwort-Hashes als Listenantwort verwenden. Beide Modelle besitzen öffentliche PasswordHash-Getter; `tenant` wird bei Entityantworten dagegen per `@JsonIgnore` ausgeblendet. Zuordnungs-DTOs müssen `tenantId` ausdrücklich ausgeben.
- **Zuweisungen:** Existenz, erlaubte Rolle, bisherige Zuordnung und Ziel-Tenant prüfen. Keine unbemerkten Transfers zwischen Unternehmen; atomare Konfliktprüfung bei parallelen Requests. Nach erfolgreicher Zuordnung braucht ein bereits angemeldeter Nutzer eine neue Anmeldung bzw. aktualisierte Claims. Für den ersten Stand genügt erneutes Anmelden; eine Refreshroute ist nicht zwingend nötig.
- **Regeln/Module anwenden:** Speicherung allein genügt nicht für wirksame Steuerung. Relevante Ticket-/QR-/Export-Endpunkte müssen freigegebene Regeln und deaktivierte Module berücksichtigen. Restaurantpflicht `false` betrifft auch die heutige Pflichtsuche nach Restaurantnamen; zulässige Kombinationen mit QR-Einlösung fachlich klären.
- **Persistenz:** `application.properties` verwendet derzeit `quarkus.hibernate-orm.schema-management.strategy=drop-and-create`. Für dauerhafte Kunden- und Konfigurationsdaten auf Entwicklungsprofil begrenzen; außerhalb davon Schemaänderungen ohne Löschen der Daten vorsehen. Tier-/CostOrder-Änderungen benötigen eine kontrollierte Daten-/FK-Anpassung.
- **Fehlervertrag:** Vorschlag JSON `{code, message}`; `400` ungültige Daten, `401` nicht angemeldet, `403` nicht berechtigt/kein nötiger Tenant, `404` unbekannter Datensatz, `409` Konflikt. Erfolg bei Zuweisung erst nach gespeicherter Änderung melden.

## 7. Abnahme und Reihenfolge

1. Auth/Rollen/Registrierung und Null-Tenant-Verhalten korrigieren.
2. Unzugewiesene Employees listen und explizit zuweisen – höchste Priorität für das aktuelle Frontend.
3. Tier-/CostOrder-Schlüssel korrigieren, bevor mehrere Tenants dieselben Basisdatennamen verwenden.
4. Stammdaten-, Modul-, Regel- und Brandingrouten umsetzen.
5. Danach Logo, Setupaktivierung und Aktivitäten; zusätzliche Basisdatenmasken gesondert abstimmen.

Mindestens prüfen: Admin ohne Tenant, normale Rollen ohne globalen Zugriff, zwei Tenants mit gleichen Stufen-/Kostenstellennamen, leere Nutzerliste, erfolgreiche Zuweisung, wiederholte Zuweisung, Konflikt bei anderem Tenant/parallelem Request, ungültige IDs, Draft bleibt vor Publish unsichtbar, Konfiguration nach Neustart weiterhin vorhanden. Tests sind hier **geplant, nicht ausgeführt**.

Sobald die Verträge feststehen und die Routen existieren, muss das Frontend noch angeschlossen werden. Allein das Hinzufügen der Backendrouten aktiviert die bisher gesperrten/local-only Funktionen nicht automatisch.

## Geprüfte Quellen im Repository

- `apps/api/backend/src/main/java/at/htl/model/`: Tenant, Employee, RestaurantUser, Restaurant, Tier, CostOrder, FoodTicket, ChangeLog und Role.
- `apps/api/backend/src/main/java/at/htl/boundary/`: SaasAdminResource, TenantService, EmployeeResource, RestaurantUserResource, TierResource, CostOrderResource, RestaurantResource, FoodTicketResource und LogResource.
- `apps/api/backend/src/main/java/at/htl/repository/`: SaaSAdminRepository, EmployeeRepository, RestaurantUserRepository, RestaurantRepository, TierRepository, CostOrderRepository und ChangeLogRepository.
- DTOs: CreateTenantDTO, TenantOverviewDTO und LoginResponseDTO.
- `apps/api/backend/src/main/resources/application.properties`.
- Aktuelle SaaS-Modelle, Auth-/API-Service und Seiten unter `apps/web/web/src/app/features/saas/`.
