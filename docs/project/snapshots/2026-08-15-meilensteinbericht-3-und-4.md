ValidEat Meilensteinbericht | 15.08.2026 | Seite 1/2

ERREICHT
Meilenstein 3 - SaaS Erweiterung und JWT

Ziel:
SaaS-Erweiterung auf Mandantenfähigkeit und JWT-Schnittstellen sind fertiggestellt.

Erreichter Stand
Der Login wurde auf die JWT-basierte Authentifizierung angepasst, inklusive einer aktuellen User-Session im Frontend.
Das Backend wurde auf das Mandantenmodell erweitert, sodass Mitarbeiter, Admins, Restaurants, CostOrders, FoodTickets und weitere Daten nicht mehr global, sondern mandantenbezogen verarbeitet werden.

Datenmodell und Backend
- Tenant-Entity eingeführt und zentrale Entitäten mit Tenant-Bezug erweitert
- SaaS-Logik in die Datenbankabfragen integriert
- Tenant-Abgrenzung in den Queries ergänzt, damit Daten isoliert und mandantenfähig verarbeitet werden
- REST-Endpunkte für Tenant-Erzeugung und Tenant-Übersichten ergänzt
- Login und Registrierung auf das SaaS-/JWT-Modell angepasst

SaaS-/Authentifizierungsstand
- JWT-Token mit Benutzer- und Tenant-Kontext erzeugt
- aktuelle Nutzer-Session im Frontend integriert
- Login- und Rollenmodell in die Mandantenlogik überführt
- Design- und Architekturdokumentation für Authentifizierung und SaaS erweitert

Ergebnis
Meilenstein 3 wurde erreicht. Das System ist damit nicht mehr nur eine lokale Grundplattform, sondern eine mandantenfähige SaaS-Architektur mit JWT-basierter Authentifizierung und tenantbezogenem Datenzugriff.

Projektteam: Erik Bergmair, Julian Richter, Joschua Auer
Stand 15.08.2026 | 1/2

---

ValidEat Meilensteinbericht | 15.08.2026 | Seite 2/2

ERREICHT
Meilenstein 4 - Clearing und Blockchain-Archivierung

Ziel:
Clearing-Algorithmus und Blockchain-Archivierung sind vollständig integriert und getestet.

Erreichter Stand
Der Clearing-Prozess wurde erweitert, sodass archivierte bzw. abgelaufene Einträge nicht mehr wie normale offene Tickets behandelt werden. Der Status wurde entsprechend in der fachlichen Logik berücksichtigt.

Blockchain und Audit
- Blockchain-Setup und Verbindung zum Quarkus-Backend umgesetzt
- erste Kommunikation mit der Smart-Contract-Schicht erfolgreich aufgebaut
- Speicherung von Erstellen, Bearbeiten und Löschen auf der Blockchain integriert
- Änderungen und Audit-Aktionen werden damit nachvollziehbar und unveränderbar archiviert

Fachliche Integration
- Clearing berücksichtigt nun den archivierten bzw. abgelaufenen Status
- Statuslogik für „Archiviert/Verjährt“ im Prozess vereinheitlicht
- Ablauf zwischen Ticketprüfung, Statusklärung und Blockchain-Archivierung fachlich verbunden

Ergebnis
Meilenstein 4 wurde erreicht. Die Plattform ist damit nicht nur mandantenfähig und JWT-gesichert, sondern auch um eine prüfbare Blockchain-Archivierung und eine verbesserte Statuslogik im Clearing erweitert.

Projektteam: Erik Bergmair, Julian Richter, Joschua Auer
Stand 15.08.2026 | 2/2
