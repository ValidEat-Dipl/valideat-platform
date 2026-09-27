# Design: SaaS-Backendanbindung

> Historischer Stand vor Backendcommit f05fd08. Aktuelle Bewertung und noch notwendige Arbeiten: [VAL-010 Status](../VAL-010-adapt-saas-backend-fixes/status.md). Die folgenden alten Fehlerlisten sind nicht mehr die aktuelle Übergabe.

## Bestehende Struktur

SaaS-Service kapselt konkrete HTTP-Aufrufe. SaasState hält Tenantübersicht und Auswahl, keine vermeintlich gespeicherten lokalen Konfigurationen mehr. Jede Seite lädt ihre eigenen API-Daten und verarbeitet Erfolg/Fehler mit einfachen subscribe-Aufrufen. Beim Tenantwechsel werden alte Leseanfragen beendet. Schreibaktionen dürfen keine Daten einer anderen Auswahl überschreiben.

## Verträge

- UnassignedEmpDTO: `id`, `firstname`, `lastname`, `email`, `role` (kleingeschriebenes firstname/lastname beachten).
- EditTenantDTO: `organisationName`, `contactPerson`, `email`, `country`, `primaryColor`, `accentColor`, `companySize`.
- TenantModuleDTO: `id`, `name`, `description`, `enabled`; PUT erwartet `{moduleIds: number[]}`.
- TenantRulesDTO: `usageDays: MONDAY..SUNDAY[]`, `restaurantRequired`, `correctionHints` (Boolean, keine Freitextnotiz).
- TenantBrandingDTO: `draft`, `published`; beide enthalten `appName`, `shortName`, `primaryColor`, `accentColor`, `logo`. Publish ist separater POST.

## Festgestellte API-Probleme vor Umsetzung

GET Regeln/Branding verwendet getSingleResult und scheitert ohne Konfiguration. Zuweisung dereferenziert einen unbekannten Employee. Neue SaaS-Routen haben keinen RolesAllowed-Schutz. Modulupdate prüft Tenant bei leerer Liste nicht. Diese Fehler werden auf ausdrücklichen Nutzerwunsch NICHT im Server geändert. GET-Fehler sperren betroffene Formulare, statt eine fehlende Konfiguration anzunehmen. Insbesondere bedeutet Branding-404 im aktuellen Server „Tenant unbekannt“, nicht „neuer Entwurf“. HTTP 500 wird niemals durch einen automatischen PUT umgangen. Die Zuweisung verarbeitet den bestehenden Konfliktstatus 400 und zusätzlich 409. Konkrete Serveraufgaben stehen in backend-handoff.md.

SSR: geschützte Leseaufrufe nur im Browser. Bestehenden Interceptor und currentUser nutzen. Formularwerte mit nonNullable FormControls/getRawValue beziehungsweise ausdrücklichen Prüfungen verarbeiten. Keine zusätzlichen Frameworkstrukturen.

## Dashboard ohne nächste Schritte

Die statische Schrittliste und der Hinweis zu künftigem Setup-/Aktivierungsstatus entfallen auf Nutzerwunsch. Die Plattform-Karte bleibt im Bootstrap-Raster und rückt an die erste Position. Keine TS- oder API-Änderung erforderlich.
