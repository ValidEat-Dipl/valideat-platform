# Design: bestehende Komponenten und neue Antwortverträge

- GET Regeln liefert bei fehlender Konfiguration 200 mit usageDays null und beiden Booleans false. Modell bildet null ab; das Formular verwendet ausdrücklich eine leere Liste. PUT sendet weiter eine Liste.
- Beim Erstellen eines Tenants legt der Server Regeln und Branding an. Branding wird direkt mit Tenantname und Farben auch im published-Objekt initialisiert. Für ältere Tenants ohne Datensatz liefert GET entsprechende Standardwerte ohne Speicherung. Keine Aussage über vorherige manuelle Veröffentlichung aus diesen Werten ableiten.
- GET Regeln/Branding prüft unbekannten Tenant und liefert 404. Ein sonstiger Ladefehler bleibt ein Fehler; kein automatischer PUT nach 500.
- Alle SaasAdminResource-Methoden tragen jetzt RolesAllowed(SAAS_ADMIN). Vorhandenen Interceptor verwenden, explizite Meldungen für fehlende/abgelaufene Anmeldung bzw. fehlende Berechtigung.
- Explizite Employee-Zuweisung liefert 404 bei fehlender ID und 409 bei schon zugewiesenem Nutzer. Kein automatischer Wiederholungsversuch einer Mutation.
- Login ohne Tenant bleibt serverseitig defekt. Frontend darf weder Tenant noch Token erfinden oder die Rollenprüfung umgehen.

Bestätigter Restbefund (API-Prüfung und bei Konkurrenzsicherung Codeprüfung): Registrierung übernimmt Rolle weiterhin ungeprüft; Zuweisung hat keine atomare Konkurrenzsicherung; Branding-Publish ohne persistierte Konfiguration bleibt problematisch. Nach Prüfung konkret im Status dokumentieren. Keine neuen abstrakten Helfer, keine Serveränderung.

Branding-Appname und Kurzname erlauben wie die Organisationsregistrierung bis 150 Zeichen, da der Server den Organisationsnamen automatisch in beide Felder übernimmt. Keine Kürzung empfangener Werte.
