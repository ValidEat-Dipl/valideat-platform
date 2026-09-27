# Proposal: SaaS-Admin-Frontend umsetzen

## Metadaten

| Feld | Wert |
|---|---|
| Change-ID | `VAL-008` |
| Status | `in_progress` |
| Verantwortlich | Erik Bergmair |
| Erstellt am | `2026-09-26` |
| Zuletzt geändert | `2026-09-26` |
| FSD-Referenz / Issue | nicht festgestellt |

## Herkunft und Sicherheit

Grundlage sind der Nutzerauftrag, fünf übergebene Figma-Screenshots und der vorhandene Repository-Code. Die Screenshots dienen als Gestaltungsreferenz; Beispielzahlen und Freigabehinweise darin sind keine bestätigten Projektdaten. SaaS-Admin ist eine spätere Plattform-Erweiterung, nicht automatisch Porsche-Pflichtumfang. Eine Porsche-, Team- oder Schulfreigabe wird nicht behauptet.

## Ziel und Umfang

Ein einfacher Bootstrap/SCSS-Bereich mit Login, Organisationsregistrierung, Setup, Dashboard, Modulen, Organisation und Regeln, Branding, Vorschau, Kundenübersicht und eigener Nutzer-Tenant-Zuweisung. Vorhandene APIs sollen genutzt, fehlende APIs sichtbar benannt werden. Die Nutzerzuweisung ist fachlich wichtig, weil registrierte Nutzer nicht automatisch einem Tenant zugeordnet werden können.

## Akzeptanzkriterien

- Alle zehn Seiten sind über `/saas` erreichbar; Verwaltungsseiten prüfen die Rolle `SAAS_ADMIN`.
- Echte Kunden- und Organisationsdaten stammen aus vorhandenen APIs; keine erfundenen Kennzahlen.
- Lokale Entwürfe sind als solche gekennzeichnet; kein vorgetäuschtes Veröffentlichen.
- Nutzerzuweisung hat Nutzerliste, Tenant-Auswahl und Zuweisungsaktion; fehlende Backendverträge werden nicht umgangen.
- Bestehender Auth-Interceptor und `currentUser` werden verwendet; keine geschützten Requests im SSR-Kontext.
- Prüfungen und Backendlücken werden ehrlich dokumentiert.

## Nicht-Umfang / offene Punkte

Keine Backendänderung, keine automatische Erstellung von SaaS-Admin-Konten, kein Commit, Push oder PR. Tenantübergreifende Nutzerliste und explizite Tenant-Zuweisung fehlen derzeit. Live-Integration und fachliche Abnahme bleiben gesondert zu prüfen.

## Umsetzungsstand vom 2026-09-26

Alle zehn Frontendseiten sind umgesetzt. Kundenliste, Tenantdetails, Organisationsanlage und Login verwenden vorhandene Routen. Module, Regeln und Brandingänderungen sind lokale Entwürfe. Die Nutzerzuweisung bleibt wegen der dokumentierten Backendlücken gesperrt. Details und tatsächlich ausgeführte Prüfungen stehen in [evidence.md](evidence.md). Der Change bleibt bis zur Backendklärung und Live-Prüfung `in_progress`.


## Nacharbeit: Bestehende Frontend-Schreibweise

Auf ausdrücklichen Nutzerwunsch wurden Employee- und Restaurant-Code erneut detailliert verglichen und SaaS daran angepasst: eigene Seitenordner, lokale Styles, separate Sidebar, reaktive Formulare und direkter Service-/Subscribe-Ablauf. Der fachliche Umfang und die dokumentierten Backendgrenzen bleiben unverändert. Kein Commit, Push oder PR.
