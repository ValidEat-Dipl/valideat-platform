package at.htl.repository;

import at.htl.boundary.dto.*;
import at.htl.model.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;

import java.util.*;

@ApplicationScoped
public class FoodTicketRepository {

    @Inject
    EntityManager entityManager;

    public List<FoodTicket> listAll() {
        return entityManager.createQuery("select f from FoodTicket f", FoodTicket.class).getResultList();
    }

    public FoodTicket findById(Long id) {
        return entityManager.find(FoodTicket.class, id);
    }

    public EmployeeGetTicketsDTO findEmployeeTicketDTOById(Long id) {
        return entityManager.createQuery("select new at.htl.boundary.dto.EmployeeGetTicketsDTO(f.id, f.employee.firstName, f.employee.lastName, f.useDate, f.tier.name, f.costOrder.name, f.restaurant.name, f.status, f.checkDate, admin.firstName, admin.lastName) from FoodTicket f left join f.admin admin where f.id = :id ", EmployeeGetTicketsDTO.class).setParameter("id", id).getSingleResult();
    }

    public List<EmployeeGetTicketsDTO> findByEmployee(Long id) {
        return entityManager.createQuery("""
                select new at.htl.boundary.dto.EmployeeGetTicketsDTO(f.id, f.employee.firstName, f.employee.lastName, f.useDate, f.tier.name, f.costOrder.name, f.restaurant.name, f.status, f.checkDate, admin.firstName, admin.lastName) from FoodTicket f left join f.admin admin where f.employee.id = :id""", EmployeeGetTicketsDTO.class)
                .setParameter("id", id).getResultList();
    }


    public List<FoodTicket> findAll(boolean last12Months) {

        if (last12Months) {
            return entityManager.createQuery("""
            select f
            from FoodTicket f
            where f.useDate >= :date
            """, FoodTicket.class)
                    .setParameter("date", LocalDate.now().minusYears(1))
                    .getResultList();
        }

        return entityManager.createQuery("""
        select f
        from FoodTicket f
        """, FoodTicket.class)
                .getResultList();
    }

    public int countByTicketType(String type, boolean last12Months) {
        String jpql = """
            select count(f)
            from FoodTicket f
            where f.ticketType = :type
            """;

        if (last12Months) {
            jpql += " and f.useDate >= :date";
        }

        TypedQuery<Long> query = entityManager.createQuery(jpql, Long.class)
                .setParameter("type", TicketType.valueOf(type));

        if (last12Months) {
            query.setParameter("date", LocalDate.now().minusYears(1));
        }

        return Math.toIntExact(query.getSingleResult());
    }

    public int countByStatus(String status, boolean last12Months) {
        String jpql = """
            select count(f)
            from FoodTicket f
            where f.status = :status
            """;

        if (last12Months) {
            jpql += " and f.useDate >= :date";
        }

        TypedQuery<Long> query = entityManager.createQuery(jpql, Long.class)
                .setParameter("status", Status.valueOf(status));

        if (last12Months) {
            query.setParameter("date", LocalDate.now().minusYears(1));
        }

        return Math.toIntExact(query.getSingleResult());
    }

    public void save(FoodTicket foodTicket) {
        //TODO Automatic Clearing
        entityManager.persist(foodTicket);
    }

    public boolean checkIfAmountOfTicketsOnSpecificDayFromOnePersonIsValid (LocalDate date, Employee emp) {
        List<FoodTicket> ticketsList = entityManager.createQuery("""
                                                      select f
                                                      from FoodTicket f
                                                      where f.useDate = :date
                                                      and f.employee.id = :empId
                                                      """, FoodTicket.class)
                .setParameter("date", date)
                .setParameter("empId", emp.getId())
                .getResultList();

        return ticketsList.size() <= 1;
    }


    public List<AdminFoodTicketDTO> findAdminTickets(String employeeName, LocalDate startDate, LocalDate endDate, Status status) {
        StringBuilder query = new StringBuilder("""
                select new at.htl.boundary.dto.AdminFoodTicketDTO(
                f.id,
                concat(f.employee.firstName, ' ', f.employee.lastName),
                f.useDate,
                f.tier.name,
                f.costOrder.name,
                f.status,
                concat(admin.firstName, ' ', admin.lastName),
                f.checkDate
        )
        from FoodTicket f
        left join f.admin admin
        where f.ticketType = :type"""); // left join, weil sonst admin null sein könnte also null.firstname und des wirft einen fehler

        if (employeeName != null) {
            query.append(" and lower(concat(f.employee.firstName, ' ', f.employee.lastName)) like lower(:employeeName)");
        }

        if (startDate != null) {
            query.append(" and f.useDate >= :startDate ");
        }

        if (endDate != null) {
            query.append(" and f.useDate <= :endDate ");
        }

        if (status != null) {
            query.append(" and f.status = :status ");
        }


        TypedQuery<AdminFoodTicketDTO> q = entityManager
                .createQuery(query.toString(), AdminFoodTicketDTO.class)
                .setParameter("type", TicketType.ADMIN);


        if (employeeName != null) {
            q.setParameter("employeeName", "%" + employeeName + "%");
        }

        if (startDate != null) {
            q.setParameter("startDate", startDate);
        }

        if (endDate != null) {
            q.setParameter("endDate", endDate);
        }

        if (status != null) {
            q.setParameter("status", status);
        }


        return q.getResultList();
    }

    public List<AdminClearingDTO> createClearingTable(
            String employeeName,
            LocalDate startDate,
            LocalDate endDate,
            Status status,
            String conflict,
            String costOrder) {

        StringBuilder jpql = new StringBuilder("""
        select f
        from FoodTicket f
        where 1=1
    """);


        if (employeeName != null) {
            jpql.append("""
            and lower(concat(f.employee.firstName, ' ', f.employee.lastName))
            like lower(:employeeName)
        """);
        }

        if (startDate != null) {
            jpql.append(" and f.useDate >= :startDate ");
        }

        if (endDate != null) {
            jpql.append(" and f.useDate <= :endDate ");
        }

        if (status != null) {
            jpql.append(" and f.status = :status ");
        }

        if (conflict != null) {
            jpql.append(" and lower(f.conflict) like lower(:conflict) ");
        }

        if (costOrder != null) {
            jpql.append(" and f.costOrder.name = :costOrder ");
        }


        TypedQuery<FoodTicket> query =
                entityManager.createQuery(jpql.toString(), FoodTicket.class);


        if (employeeName != null) {
            query.setParameter("employeeName", "%" + employeeName + "%");
        }

        if (startDate != null) {
            query.setParameter("startDate", startDate);
        }

        if (endDate != null) {
            query.setParameter("endDate", endDate);
        }

        if (status != null) {
            query.setParameter("status", status);
        }

        if (conflict != null) {
            query.setParameter("conflict", "%" + conflict + "%");
        }

        if (costOrder != null) {
            query.setParameter("costOrder", costOrder);
        }


        List<FoodTicket> tickets = query.getResultList();

        // zuerst filter und dann erst clearing dto erstellen
        Set<Long> processed = new HashSet<>();
        List<AdminClearingDTO> result = new ArrayList<>();

        for (FoodTicket ticket : tickets) {

            if (processed.contains(ticket.getId())) {
                continue;
            }

            result.add(createClearingDTO(ticket));

            processed.add(ticket.getId());

            if (ticket.getMatchingTicket() != null) {
                processed.add(ticket.getMatchingTicket().getId());
            }
        }

        return result;
    }

    public AdminClearingDTO createClearingDTO(FoodTicket ticket) {

        FoodTicket employeeTicket = null;
        FoodTicket adminTicket = null;

        if (ticket.getTicketType() == TicketType.EMPLOYEE) {
            employeeTicket = ticket;

            if (ticket.getMatchingTicket() != null) {
                adminTicket = ticket.getMatchingTicket();
            }

        } else if (ticket.getTicketType() == TicketType.ADMIN) {
            adminTicket = ticket;

            if (ticket.getMatchingTicket() != null) {
                employeeTicket = ticket.getMatchingTicket();
            }
        }


        return getAdminClearingDTO(employeeTicket, adminTicket);
    }

    private AdminClearingDTO getAdminClearingDTO(FoodTicket employeeTicket, FoodTicket adminTicket) {
        return new AdminClearingDTO(
                // Employee Ticket
                employeeTicket != null ? employeeTicket.getId() : null,
                employeeTicket != null && employeeTicket.getEmployee() != null
                        ? employeeTicket.getEmployee().getFirstName() + " " + employeeTicket.getEmployee().getLastName()
                        : null,
                employeeTicket != null && employeeTicket.getTier() != null
                        ? employeeTicket.getTier().getName() : null,
                employeeTicket != null && employeeTicket.getCostOrder() != null
                        ? employeeTicket.getCostOrder().getName() : null,
                employeeTicket != null && employeeTicket.getRestaurant() != null
                        ? employeeTicket.getRestaurant().getName() : null,
                employeeTicket != null ? employeeTicket.getChangeLogs() : null,
                employeeTicket != null ? employeeTicket.getUseDate() : null,
                employeeTicket != null ? employeeTicket.getCheckDate() : null,
                employeeTicket != null ? employeeTicket.getStatus() : null,
                employeeTicket != null ? employeeTicket.getConflict() : null,


                // Admin Ticket
                adminTicket != null ? adminTicket.getId() : null,
                adminTicket != null && adminTicket.getEmployee() != null
                        ? adminTicket.getEmployee().getFirstName() + " " + adminTicket.getEmployee().getLastName()
                        : null,
                adminTicket != null && adminTicket.getTier() != null
                        ? adminTicket.getTier().getName() : null,
                adminTicket != null && adminTicket.getCostOrder() != null
                        ? adminTicket.getCostOrder().getName() : null,
                adminTicket != null && adminTicket.getRestaurant() != null
                        ? adminTicket.getRestaurant().getName() : null,
                adminTicket != null ? adminTicket.getChangeLogs() : null,
                adminTicket != null ? adminTicket.getUseDate() : null,
                adminTicket != null ? adminTicket.getCheckDate() : null,
                adminTicket != null ? adminTicket.getStatus() : null,
                adminTicket != null ? adminTicket.getConflict() : null
        );
    }

    public Map<String, Integer> getClearingInfoBox(
            String employeeName,
            LocalDate startDate,
            LocalDate endDate,
            Status status,
            String conflict,
            String costOrder) {


        List<FoodTicket> tickets = findClearingTickets(
                employeeName,
                startDate,
                endDate,
                status,
                conflict,
                costOrder
        );


        Set<Long> processed = new HashSet<>();

        int total = 0;
        int conflicts = 0;


        for (FoodTicket ticket : tickets) {

            if (processed.contains(ticket.getId())) {
                continue;
            }

            total++;


            boolean hasConflict = ticket.getStatus() == Status.CONFLICT || ticket.getStatus() == Status.NEEDS_FIXING;


            if (ticket.getMatchingTicket() != null) {

                processed.add(ticket.getMatchingTicket().getId());

                hasConflict |= ticket.getMatchingTicket().getStatus() == Status.CONFLICT || ticket.getMatchingTicket().getStatus() == Status.NEEDS_FIXING;
            }


            if (hasConflict) {
                conflicts++;
            }


            processed.add(ticket.getId());
        }

        Map<String, Integer> result = new LinkedHashMap<>();

        result.put("Gesamt", total);
        result.put("Offene Konflikte", conflicts);

        return result;
    }

    public List<FoodTicket> findClearingTickets(
            String employeeName,
            LocalDate startDate,
            LocalDate endDate,
            Status status,
            String conflict,
            String costOrder) {

        StringBuilder query = new StringBuilder("""
            select f
            from FoodTicket f
            where 1=1
            """);


        if (employeeName != null) {
            query.append("""
                and lower(concat(f.employee.firstName, ' ', f.employee.lastName))
                like lower(:employeeName)
                """);
        }

        if (startDate != null) {
            query.append(" and f.useDate >= :startDate ");
        }

        if (endDate != null) {
            query.append(" and f.useDate <= :endDate ");
        }

        if (status != null) {
            query.append(" and f.status = :status ");
        }

        if (conflict != null) {
            query.append(" and lower(f.conflict) like lower(:conflict) ");
        }

        if (costOrder != null) {
            query.append(" and f.costOrder.name = :costOrder ");
        }


        TypedQuery<FoodTicket> q = entityManager
                .createQuery(query.toString(), FoodTicket.class);


        if (employeeName != null) {
            q.setParameter("employeeName", "%" + employeeName + "%");
        }

        if (startDate != null) {
            q.setParameter("startDate", startDate);
        }

        if (endDate != null) {
            q.setParameter("endDate", endDate);
        }

        if (status != null) {
            q.setParameter("status", status);
        }

        if (conflict != null) {
            q.setParameter("conflict", "%" + conflict + "%");
        }

        if (costOrder != null) {
            q.setParameter("costOrder", costOrder);
        }


        return q.getResultList();
    }

    public boolean deleteTicket(Long ticketId) {
        // TODO Automatic Clearing
        FoodTicket ticket = entityManager.find(FoodTicket.class, ticketId);

        if (ticket == null) {
            return false;
        }

        entityManager.remove(ticket);
        return true;
    }

    public FoodTicketConflictResponseDTO getConflicts(
            String employeeName,
            LocalDate startDate,
            LocalDate endDate,
            Status status,
            String conflict) {

        StringBuilder jpql = new StringBuilder("""
        select f
        from FoodTicket f
        left join fetch f.admin
        left join fetch f.matchingTicket mt
        left join fetch mt.tier
        left join fetch mt.costOrder
        left join fetch mt.restaurant
        where (f.status = :conflictStatus or f.status = :needsFixingStatus)
        """);

        if (employeeName != null) {
            jpql.append("""
           and lower(concat(f.employee.firstName, ' ', f.employee.lastName))
            like lower(:employeeName)
        """);
        }

        if (startDate != null) {
            jpql.append(" and f.useDate >= :startDate ");
        }

        if (endDate != null) {
            jpql.append(" and f.useDate <= :endDate ");
        }

        if (status != null) {
            jpql.append(" and f.status = :status ");
        }

        if (conflict != null) {
            jpql.append(" and lower(f.conflict) like lower(:conflict) ");
        }

        TypedQuery<FoodTicket> query =
                entityManager.createQuery(jpql.toString(), FoodTicket.class);

        query.setParameter("conflictStatus", Status.CONFLICT);
        query.setParameter("needsFixingStatus", Status.NEEDS_FIXING);

        if (employeeName != null) {
            query.setParameter("employeeName", "%" + employeeName + "%");
        }

        if (startDate != null) {
            query.setParameter("startDate", startDate);
        }

        if (endDate != null) {
            query.setParameter("endDate", endDate);
        }

        if (status != null) {
            query.setParameter("status", status);
        }

        if (conflict != null) {
            query.setParameter("conflict", "%" + conflict + "%");
        }

        List<FoodTicket> tickets = query.getResultList();

        List<FoodTicketConflictDTO> result = new ArrayList<>();

        int open = 0;
        int needsFixing = 0;
        int conflictCount = 0;

        for (FoodTicket ticket : tickets) {

            switch (ticket.getStatus()) {
                case OPEN -> open++;
                case NEEDS_FIXING -> needsFixing++;
                case CONFLICT -> conflictCount++;
            }

            result.add(new FoodTicketConflictDTO(
                    ticket.getId(),
                    ticket.getEmployee().getFirstName() + " " + ticket.getEmployee().getLastName(),
                    ticket.getUseDate(),
                    ticket.getConflict(),
                    determineWrongField(ticket),
                    ticket.getStatus(),
                    ticket.getAdmin() == null
                            ? null
                            : ticket.getAdmin().getFirstName() + " " + ticket.getAdmin().getLastName(),
                    ticket.getChangeLogs()
            ));
        }

        Map<String, Integer> infoBox = new LinkedHashMap<>();

        infoBox.put("Gesamt", result.size());
        infoBox.put("Offen", open);
        infoBox.put("Nachbesserung", needsFixing);
        infoBox.put("Konflikte", conflictCount);

        return new FoodTicketConflictResponseDTO(result, infoBox);
    }


    private String determineWrongField(FoodTicket ticket) {

        FoodTicket matching = ticket.getMatchingTicket();

        if (matching == null) {
            return "Kein Ticket Gegenstück gefunden";
        }

        if (!Objects.equals(ticket.getTier(), matching.getTier())) {
            return "Tier: " + ticket.getTier().getName() + " -> " + matching.getTier().getName();
        }

        if (!Objects.equals(ticket.getCostOrder(), matching.getCostOrder())) {
            return "Kostenstelle: " + ticket.getCostOrder().getName() + " -> " + matching.getCostOrder().getName();
        }

        if (!Objects.equals(ticket.getRestaurant(), matching.getRestaurant())) {
            return "Restaurant: " + ticket.getRestaurant().getName() + " -> " + matching.getRestaurant().getName();
        }

        if (!Objects.equals(ticket.getUseDate(), matching.getUseDate())) {
            return "Datum: " + ticket.getUseDate() + " -> " + matching.getUseDate();
        }

        return "Unbekannter Unterschied";
    }

    @Transactional
    public void clearing(FoodTicket ticket) {

        TicketType ticketType = ticket.getTicketType();

        List<FoodTicket> possibleMatches = List.of();

        if (ticketType.equals(TicketType.EMPLOYEE)) {
            possibleMatches = getAllTickets(TicketType.ADMIN);
        } else if (ticketType.equals(TicketType.ADMIN)) {
            possibleMatches = getAllTickets(TicketType.EMPLOYEE);
        }

        for (FoodTicket possibleMatch : possibleMatches) {
            if (ticket.getEmployee().equals(possibleMatch.getEmployee())
                && ticket.getUseDate().equals(possibleMatch.getUseDate())) {
                if (ticket.getRestaurant().equals(possibleMatch.getRestaurant())
                    && ticket.getCostOrder().equals(possibleMatch.getCostOrder())
                    && ticket.getTier().equals(possibleMatch.getTier())
                ) {
                    // Tickets stimmen genau überein - Beide CHECKED
                    ticket.setStatus(Status.CHECKED);
                    possibleMatch.setStatus(Status.CHECKED);
                    // TODO assignTicket(ticket, possiblePartner)
                } else {
                    // Tickets stimmen nur in EmpName und Datum überein - Beide NEEDS_FIXING
                    ticket.setStatus(Status.NEEDS_FIXING);
                    possibleMatch.setStatus(Status.NEEDS_FIXING);
                    // TODO assignTicket(ticket, possiblePartner)
                }
                break;
            }
            return;
        }
        // Kein passendes Ticket wurde gefunden - EMP Ticket bleibt OPEN | ADMIN Ticket wird CONFLICT
        if (ticketType.equals(TicketType.EMPLOYEE)) {
            ticket.setStatus(Status.OPEN);
        } else if (ticketType.equals(TicketType.ADMIN)) {
            ticket.setStatus(Status.CONFLICT);
        }
    }

    private List<FoodTicket> getAllTickets(TicketType ticketType) {
        return entityManager.createQuery("""
                                                select f
                                                from FoodTicket f
                                                where f.ticketType = :ticketType
                                                """, FoodTicket.class)
                .setParameter("ticketType", ticketType)
                .getResultList();
    }
}