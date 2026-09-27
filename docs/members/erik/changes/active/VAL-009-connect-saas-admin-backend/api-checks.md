# API-Prüfungen am unveränderten Backendcode

> Historischer Stand vor Backendcommit f05fd08. Aktuelle Bewertung und noch notwendige Arbeiten: [VAL-010 Status](../VAL-010-adapt-saas-backend-fixes/status.md). Die folgenden alten Fehlerlisten sind nicht mehr die aktuelle Übergabe.

2026-09-27 nach Rücknahme aller eigenen Serveränderungen. Eigene Datenbank `valideat_saas_val009_original`, isoliertes Backend Port 8081, zuvor neu gebaut mit `./mvnw -DskipTests package`. Die vorbestehende Max-Rolle SAAS_ADMIN im Seed bleibt erhalten. Keine Änderungen an Serverquellen für diese Prüfung.

45 Requests/Prüfbedingungen wurden tatsächlich ausgeführt. Das bedeutet NICHT 45 bestandene Fach-/Sicherheitstests: die erwarteten Ist-Ergebnisse umfassen bewusst reproduzierte Serverfehler. Normale Speichern/Laden-Vergleiche für bestehende Konfigurationen waren erfolgreich. Keine Unit-Tests. Temporäres Python-Skript, kein neues SaaS-Spec-File.

Die drei GET /tenants am Anfang verwenden nacheinander keine Anmeldung, einen normalen Employee-Token und einen SaaS-Token: alle liefern 200. Öffentliche Employee-Registrierung mit SAAS_ADMIN wird angenommen; der anschließende Login ohne Tenant scheitert mit 500. GET Regeln und Branding für neuen Tenant: NoResultException. Erster Regeln-PUT: Primärschlüsselkonflikt tenant_rules_pkey (ID 1). Unbekannter Employee bei Zuweisung: NullPointerException. Diese Ursachen wurden auch im isolierten Serverlog geprüft.

- POST /employee/login: 200
- Login with seeded SAAS_ADMIN and tenant
- POST /employee/login: 200
- GET /saas-admin/tenants: 200
- GET /saas-admin/tenants: 200
- GET /saas-admin/tenants: 200
- Two seeded tenants
- GET /saas-admin/tenant/1/modules: 200
- Six module definitions
- GET /saas-admin/tenant/2: 200
- PUT /saas-admin/tenant/2: 200
- GET /saas-admin/tenant/2: 200
- Organization saved and reloaded
- PUT /saas-admin/tenant/2/modules: 200
- GET /saas-admin/tenant/2/modules: 200
- Module selection saved and reloaded
- PUT /saas-admin/tenant/2/modules: 200
- GET /saas-admin/tenant/2/modules: 200
- Empty module selection saved
- PUT /saas-admin/tenant/2/rules: 200
- GET /saas-admin/tenant/2/rules: 200
- Existing rules saved and reloaded
- PUT /saas-admin/tenant/2/branding: 200
- GET /saas-admin/tenant/2/branding: 200
- Branding draft saved and reloaded
- POST /saas-admin/tenant/2/branding/publish: 200
- GET /saas-admin/tenant/2/branding: 200
- Published branding saved and reloaded
- POST /employee/register: 200
- GET /saas-admin/unassigned-employees: 200
- Unassigned employee DTO has expected fields
- PUT /saas-admin/assign/2/10: 200
- PUT /saas-admin/assign/1/10: 400
- GET /saas-admin/unassigned-employees: 200
- Assigned employee removed from list
- PUT /saas-admin/assign/2/99999: 500
- POST /saas-admin/tenant: 201
- GET /saas-admin/tenant/3/rules: 500
- GET /saas-admin/tenant/3/branding: 500
- PUT /saas-admin/tenant/3/rules: 500
- PUT /saas-admin/tenant/3/branding: 200
- GET /saas-admin/tenant/3/branding: 200
- Branding PUT can create row; preceding GET does not distinguish absent row from other server errors
- POST /employee/register: 200
- POST /employee/login: 500

Testbackend beendet und eigene Testdatenbank gelöscht. Keine Schreibtests am laufenden Benutzerbackend.

---

**Historisch / für den aktuellen Serverstand nicht gültig:** Die folgenden 67 Prüfbedingungen wurden zuvor mit eigenen Backendkorrekturen ausgeführt. Diese Korrekturen wurden anschließend auf ausdrücklichen Nutzerwunsch zurückgenommen. Insbesondere 401/403-Rollenschutz, 404 für fehlende Konfiguration, 409 bei Doppelzuweisung und Login ohne Tenant sind damit KEINE Zusagen des aktuellen Servers.

# Historisches Protokoll vor Rücknahme der Serveränderungen

2026-09-27, temporäres Backend auf Port 8081, eigene PostgreSQL-Datenbank `valideat_saas_val009`. 67 Requests/Prüfbedingungen erfolgreich. Dies sind keine 67 Unit-Tests. Ausgeführt mit einem temporären Python-HTTP-Skript; keine entfernten SaaS-Specs wieder eingeführt. Testdatenbank anschließend entfernt.

- GET /saas-admin/tenants: 401
- POST /employee/login: 200
- SaaS login role
- POST /employee/login: 200
- GET /saas-admin/tenants: 403
- GET /saas-admin/tenants: 200
- Seed tenants present
- GET /saas-admin/tenant-overview: 200
- GET /saas-admin/tenant/1/modules: 200
- Six backend modules
- GET /saas-admin/tenant/2/rules: 200
- Non-contiguous usage days retained
- GET /saas-admin/tenant/1/branding: 200
- Existing short name longer than three chars
- POST /saas-admin/tenant: 201
- GET /saas-admin/tenant/3/rules: 404
- GET /saas-admin/tenant/3/branding: 404
- POST /saas-admin/tenant/3/branding/publish: 404
- GET /saas-admin/tenant/3/modules: 200
- PUT /saas-admin/tenant/3: 200
- GET /saas-admin/tenant/3: 200
- Organisation update round trip
- PUT /saas-admin/tenant/3/modules: 200
- GET /saas-admin/tenant/3/modules: 200
- Module selection round trip
- PUT /saas-admin/tenant/3/modules: 400
- PUT /saas-admin/tenant/3/modules: 400
- GET /saas-admin/tenant/3/modules: 200
- Invalid module update rolls back
- PUT /saas-admin/tenant/99999/modules: 404
- PUT /saas-admin/tenant/3/modules: 200
- GET /saas-admin/tenant/3/modules: 200
- Empty module selection persisted
- PUT /saas-admin/tenant/3/rules: 200
- GET /saas-admin/tenant/3/rules: 200
- First rules save and read for new tenant
- PUT /saas-admin/tenant/3/rules: 400
- PUT /saas-admin/tenant/3/branding: 200
- GET /saas-admin/tenant/3/branding: 200
- Draft remains separate from unpublished data
- POST /saas-admin/tenant/3/branding/publish: 200
- GET /saas-admin/tenant/3/branding: 200
- Publish copies saved draft
- PUT /saas-admin/tenant/3/branding: 200
- GET /saas-admin/tenant/3/branding: 200
- Later draft does not change publication
- PUT /saas-admin/tenant/3/branding: 400
- POST /employee/register: 200
- GET /saas-admin/unassigned-employees: 200
- Unassigned DTO has correct field names, no password hash
- PUT /saas-admin/assign/3/10: 403
- PUT /saas-admin/assign/99999/10: 404
- PUT /saas-admin/assign/3/99999: 404
- PUT /saas-admin/assign/3/10: 200
- PUT /saas-admin/assign/1/10: 409
- GET /saas-admin/unassigned-employees: 200
- Assigned user removed from unassigned list
- GET /saas-admin/tenants: 200
- Target tenant count increased
- POST /employee/register: 200
- POST /employee/login: 403
- POST /employee/register: 403
- POST /restaurantUser/register: 403
- POST /employee/login: 200
- SaaS admin login without tenant
- GET /saas-admin/tenants: 200
- PUT /saas-admin/tenant/3/modules: 200
