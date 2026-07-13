INSERT INTO ChangeLog (
    description
) VALUES
      ('Employee created'),
      ('Employee data updated'),
      ('FoodTicket submitted'),
      ('FoodTicket checked by admin'),
      ('FoodTicket conflict detected'),
      ('Employee password changed'),
      ('FoodTicket approved');

INSERT INTO Employee (
    firstName,
    lastName,
    address,
    department,
    phoneNumber,
    email,
    passwordHash,
    changeLog_id
) VALUES
      ('Max', 'Mustermann', 'Musterstraße 1, Linz', 'IT', '+43 660 1111111', 'max.mustermann@firma.at', 'password123', NULL),

      ('Anna', 'Huber', 'Hauptplatz 5, Wels', 'HR', '+43 660 2222222', 'anna.huber@firma.at', 'password123', NULL),

      ('Lukas', 'Gruber', 'Bahnhofstraße 12, Steyr', 'Sales', '+43 660 3333333', 'lukas.gruber@firma.at', 'password123', NULL),

      ('Julia', 'Bauer', 'Schillerstraße 8, Linz', 'Finance', '+43 660 4444444', 'julia.bauer@firma.at', 'password123', NULL),

      ('David', 'Leitner', 'Kirchengasse 4, Enns', 'Administration', '+43 660 5555555', 'david.leitner@firma.at', 'password123', 1),

      ('Sarah', 'Wagner', 'Mozartstraße 22, Linz', 'Administration', '+43 660 6666666', 'sarah.wagner@firma.at', 'password123', 2);


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
    tier_name,
    costOrder_name,
    status,
    restaurant_id,
    admin_id,
    checkDate,
    changeLog_id
) VALUES

-- Offene Anträge
(1, '2026-07-14', 'INTERN',      '1000 - Verwaltung', 'OPEN',     1, NULL, NULL, NULL),
(2, '2026-07-15', 'APPRENTICE',  '1100 - Personal',   'OPEN',     2, NULL, NULL, NULL),
(3, '2026-07-16', 'EMPLOYEE',    '1200 - IT',         'OPEN',     1, NULL, NULL, NULL),

-- Geprüfte Anträge
(1, '2026-07-10', 'APPRENTICE',  '1000 - Verwaltung', 'CHECKED',  2, 5, '2026-07-10', 4),
(2, '2026-07-09', 'EMPLOYEE',    '1100 - Personal',   'CHECKED',  3, 5, '2026-07-09', 4),
(4, '2026-07-08', 'INTERN',      '2000 - Produktion', 'CHECKED',  1, 6, '2026-07-08', 4),
(3, '2026-07-07', 'APPRENTICE',  '1200 - IT',         'CHECKED',  2, 6, '2026-07-07', 4),

-- Konflikte
(1, '2026-07-17', 'EMPLOYEE',    '1100 - Personal',   'CONFLICT', 3, 5, '2026-07-17', 5),
(4, '2026-07-18', 'APPRENTICE',  '2000 - Produktion', 'CONFLICT', 1, 6, '2026-07-18', 5),
(2, '2026-07-19', 'INTERN',      '1000 - Verwaltung', 'CONFLICT', 2, 5, '2026-07-19', 5);