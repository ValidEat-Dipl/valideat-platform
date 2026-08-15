-- Tenant Setup
INSERT INTO Tenant (
    name,
    manager,
    email,
    country,
    companySize
) VALUES
      (
          'Porsche',
          'Max Mustermann',
          'max.mustermann@firma.at',
          'Austria',
          'Large'
      ),
      (
          'BMW',
          'Peter Maier',
          'peter.maier@htl.at',
          'Austria',
          'Medium'
      );

-- Porsche Test Daten

INSERT INTO ChangeLog (
    description,
    changeDate
) VALUES
      ('Employee created', '2026-07-01'),
      ('Employee data updated', '2026-07-03'),
      ('FoodTicket submitted', '2026-07-05'),
      ('FoodTicket checked by admin', '2026-07-06'),
      ('FoodTicket conflict detected', '2026-07-08'),
      ('Employee password changed', '2026-07-10'),
      ('FoodTicket approved', '2026-07-11');

INSERT INTO Employee (
    firstName,
    lastName,
    address,
    department,
    phoneNumber,
    email,
    passwordHash,
    role
) VALUES
      ('Max', 'Mustermann', 'Musterstraße 1, Linz', 'IT', '+43 660 1111111', 'max.mustermann@firma.at', '$2a$10$fpNwHdoPCIkfHjbOfnFoMueK6uLOzRqIK8jkFlFVRh2vogI8qNtQu', 'ADMIN'),

      ('Anna', 'Huber', 'Hauptplatz 5, Wels', 'HR', '+43 660 2222222', 'anna.huber@firma.at', '$2a$10$fpNwHdoPCIkfHjbOfnFoMueK6uLOzRqIK8jkFlFVRh2vogI8qNtQu', 'EMPLOYEE'),

      ('Lukas', 'Gruber', 'Bahnhofstraße 12, Steyr', 'Sales', '+43 660 3333333', 'lukas.gruber@firma.at', '$2a$10$fpNwHdoPCIkfHjbOfnFoMueK6uLOzRqIK8jkFlFVRh2vogI8qNtQu', 'EMPLOYEE'),

      ('Julia', 'Bauer', 'Schillerstraße 8, Linz', 'Finance', '+43 660 4444444', 'julia.bauer@firma.at', '$2a$10$fpNwHdoPCIkfHjbOfnFoMueK6uLOzRqIK8jkFlFVRh2vogI8qNtQu', 'EMPLOYEE'),

      ('David', 'Leitner', 'Kirchengasse 4, Enns', 'Administration', '+43 660 5555555', 'david.leitner@firma.at', '$2a$10$fpNwHdoPCIkfHjbOfnFoMueK6uLOzRqIK8jkFlFVRh2vogI8qNtQu', 'ADMIN'),

      ('Sarah', 'Wagner', 'Mozartstraße 22, Linz', 'Administration', '+43 660 6666666', 'sarah.wagner@firma.at', '$2a$10$fpNwHdoPCIkfHjbOfnFoMueK6uLOzRqIK8jkFlFVRh2vogI8qNtQu', 'ADMIN');


INSERT INTO CostOrder (name) VALUES
                                 ('1000 - Verwaltung'),
                                 ('1100 - Personal'),
                                 ('1200 - IT'),
                                 ('1300 - Buchhaltung'),
                                 ('2000 - Produktion'),
                                 ('2100 - Logistik'),
                                 ('2200 - Einkauf'),
                                 ('3000 - Vertrieb'),
                                 ('3100 - Marketing'),
                                 ('4000 - Forschung & Entwicklung');

INSERT INTO Restaurant (
    address,
    name
) VALUES
      ('Landstraße 10, 4020 Linz', 'Gasthaus zur Stadt'),
      ('Hauptplatz 3, 4600 Wels', 'Restaurant Adler'),
      ('Bahnhofstraße 15, 4400 Steyr', 'Zum Goldenen Löwen'),
      ('Mozartstraße 8, 4040 Linz', 'Café Mozart'),
      ('Industriestraße 20, 4060 Leonding', 'Bistro am Park');


INSERT INTO Tier (
    name,
    discount
) VALUES
      ('INTERN', 3.00),
      ('APPRENTICE', 5.00),
      ('EMPLOYEE', 4.00),
      ('TEAM_LEAD', 6.00),
      ('MANAGER', 8.00);


INSERT INTO FoodTicket (
    employee_id,
    useDate,
    matching_ticket_id,
    tier_name,
    costOrder_name,
    status,
    ticketType,
    restaurant_id,
    admin_id,
    checkDate,
    conflict
) VALUES

-- OPEN
(1, '2026-07-14', NULL, 'INTERN',      '1000 - Verwaltung', 'OPEN', 'EMPLOYEE', 1, NULL, NULL, null),
(2, '2026-07-15', NULL, 'APPRENTICE',  '1100 - Personal',   'OPEN', 'EMPLOYEE', 2, NULL, NULL, null),
(3, '2026-07-16', NULL, 'EMPLOYEE',    '1200 - IT',         'EXPIRED', 'ADMIN', 1, 2, '2026-07-10', null),

-- CHECKED Paar
(1, '2024-07-10', NULL, 'APPRENTICE', '1000 - Verwaltung', 'CHECKED', 'EMPLOYEE', 2, 5, '2026-07-10', null),
(1, '2026-07-10', NULL, 'APPRENTICE', '1000 - Verwaltung', 'CHECKED', 'ADMIN', 2, 5, '2026-07-10', null),

-- CONFLICT Paar
(2, '2024-07-09', NULL, 'EMPLOYEE', '1100 - Personal', 'NEEDS_FIXING', 'EMPLOYEE', 3, 5, '2026-07-09', 'Kostenstelle passt nicht zusammen'),
(2, '2024-07-09', NULL, 'EMPLOYEE', '1000 - Verwaltung', 'NEEDS_FIXING', 'ADMIN', 3, 5, '2026-07-09', 'Kostenstelle passt nicht zusammen');

UPDATE FoodTicket
SET matching_ticket_id = 5
WHERE id = 4;

UPDATE FoodTicket
SET matching_ticket_id = 4
WHERE id = 5;


UPDATE FoodTicket
SET matching_ticket_id = 7
WHERE id = 6;

UPDATE FoodTicket
SET matching_ticket_id = 6
WHERE id = 7;

UPDATE ChangeLog
SET employee_id = 5
WHERE id = 1;

UPDATE ChangeLog
SET foodTicket_id = 4
WHERE id = 4;

UPDATE ChangeLog
SET foodTicket_id = 3
WHERE id = 2;

UPDATE Employee
SET tenant_id = (SELECT id FROM Tenant WHERE name = 'Porsche');

UPDATE CostOrder
SET tenant_id = (SELECT id FROM Tenant WHERE name = 'Porsche');

UPDATE Restaurant
SET tenant_id = (SELECT id FROM Tenant WHERE name = 'Porsche');

UPDATE Tier
SET tenant_id = (SELECT id FROM Tenant WHERE name = 'Porsche');

UPDATE FoodTicket
SET tenant_id = (SELECT id FROM Tenant WHERE name = 'Porsche');

UPDATE ChangeLog
SET tenant_id = (SELECT id FROM Tenant WHERE name = 'Porsche');




-- BMW Test Daten

INSERT INTO Employee (
    firstName,
    lastName,
    address,
    department,
    phoneNumber,
    email,
    passwordHash,
    role,
    tenant_id
) VALUES
      (
          'Thomas',
          'Müller',
          'BMW-Straße 1, München',
          'IT',
          '+49 170 1111111',
          'thomas.mueller@bmw.de',
          '$2a$10$fpNwHdoPCIkfHjbOfnFoMueK6uLOzRqIK8jkFlFVRh2vogI8qNtQu',
          'ADMIN',
          2
      ),
      (
          'Laura',
          'Schmidt',
          'Hauptstraße 20, München',
          'HR',
          '+49 170 2222222',
          'laura.schmidt@bmw.de',
          '$2a$10$fpNwHdoPCIkfHjbOfnFoMueK6uLOzRqIK8jkFlFVRh2vogI8qNtQu',
          'EMPLOYEE',
          2
      ),
      (
          'Felix',
          'Weber',
          'BMW-Allee 5, München',
          'Sales',
          '+49 170 3333333',
          'felix.weber@bmw.de',
          '$2a$10$fpNwHdoPCIkfHjbOfnFoMueK6uLOzRqIK8jkFlFVRh2vogI8qNtQu',
          'EMPLOYEE',
          2
      );


INSERT INTO ChangeLog (
    description,
    changeDate,
    tenant_id
) VALUES
      (
          'BMW Employee created',
          '2026-07-15',
          2
      ),
      (
          'BMW FoodTicket submitted',
          '2026-07-16',
          2
      ),
      (
          'BMW FoodTicket checked',
          '2026-07-17',
          2
      );


INSERT INTO FoodTicket (
    employee_id,
    useDate,
    matching_ticket_id,
    tier_name,
    costOrder_name,
    status,
    ticketType,
    restaurant_id,
    admin_id,
    checkDate,
    conflict,
    tenant_id
) VALUES

(
    8,
    '2026-07-15',
    NULL,
    'EMPLOYEE',
    '1100 - Personal',
    'OPEN',
    'EMPLOYEE',
    2,
    NULL,
    NULL,
    NULL,
    2
),

(
    9,
    '2026-07-16',
    NULL,
    'APPRENTICE',
    '3000 - Vertrieb',
    'OPEN',
    'EMPLOYEE',
    1,
    NULL,
    NULL,
    NULL,
    2
),

(
    9,
    '2026-07-16',
    NULL,
    'APPRENTICE',
    '3000 - Vertrieb',
    'CHECKED',
    'ADMIN',
    1,
    7,
    '2026-07-17',
    NULL,
    2
);

INSERT INTO CostOrder (name, tenant_id) VALUES
                                            ('BMW - Verwaltung', 2),
                                            ('BMW - Produktion', 2),
                                            ('BMW - Vertrieb', 2);

INSERT INTO Restaurant (address, name, tenant_id) VALUES
                                                      ('BMW-Straße 10, München', 'BMW Mitarbeiterrestaurant', 2),
                                                      ('Parkstraße 5, München', 'BMW Kantine Nord', 2);

INSERT INTO Tier (name, discount, tenant_id) VALUES
                                                 ('BMW INTERN', 3.00, 2),
                                                 ('BMW EMPLOYEE', 5.00, 2);