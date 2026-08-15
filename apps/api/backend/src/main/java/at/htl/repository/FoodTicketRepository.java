package at.htl.repository;

import at.htl.blockchain.ValidEatBlockchainService;
import at.htl.boundary.TenantService;
import at.htl.boundary.dto.*;
import at.htl.model.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@ApplicationScoped
public class FoodTicketRepository {

    @Inject
    EntityManager entityManager;

    @Inject
    ValidEatBlockchainService blockchainService;

    @Inject
    TenantService tenantService;

    public List<FoodTicket> listAll() {
        return entityManager.createQuery("select f from FoodTicket f where f.tenant.id = :tenantId", FoodTicket.class)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getResultList();
    }

    public long countAll() {
        return entityManager.createQuery("""
                                                 select count(f)
                                                 from FoodTicket f
                                                 where f.tenant.id = :tenantId
                                                 """, Long.class)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getSingleResult();
    }

    public FoodTicket findById(Long id) {
        return entityManager.createQuery("""
                select f
                from FoodTicket f
                where f.id = :id
                and f.tenant.id = :tenantId
                """, FoodTicket.class)
                .setParameter("id", id)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getResultStream()
                .findFirst()
                .orElse(null);
    }

    public EmployeeGetTicketsDTO findEmployeeTicketDTOById(Long id) {
        return entityManager.createQuery("select new at.htl.boundary.dto.EmployeeGetTicketsDTO(f.id, f.employee.firstName, f.employee.lastName, f.useDate, f.tier.name, f.costOrder.name, f.restaurant.name, f.status, f.checkDate, admin.firstName, admin.lastName, f.ticketType) from FoodTicket f left join f.admin admin where f.id = :id and f.tenant.id = :tenantId ", EmployeeGetTicketsDTO.class)
                .setParameter("id", id)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getSingleResult();
    }

    public List<EmployeeGetTicketsDTO> findByEmployee(Long id) {
        return entityManager.createQuery("""
                select new at.htl.boundary.dto.EmployeeGetTicketsDTO(f.id, f.employee.firstName, f.employee.lastName, f.useDate, f.tier.name, f.costOrder.name, f.restaurant.name, f.status, f.checkDate, admin.firstName, admin.lastName, f.ticketType) from FoodTicket f left join f.admin admin where f.employee.id = :id and f.tenant.id = :tenantId""", EmployeeGetTicketsDTO.class)
                .setParameter("id", id)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getResultList();
    }


    public List<FoodTicket> findAll(boolean last12Months, String orderBy) {

        StringBuilder jpql = new StringBuilder("""
        select f
        from FoodTicket f
        where f.tenant.id = :tenantId
        """);

        if (last12Months) {
            jpql.append("""
            and f.useDate >= :date
            """);
        }


        if ("asc".equals(orderBy)) {
            jpql.append(" order by f.ticketType asc ");
        }
        else if ("desc".equals(orderBy)) {
            jpql.append(" order by f.ticketType desc ");
        }
        else {
            // Default Sortierung
            jpql.append(" order by f.useDate desc ");
        }


        TypedQuery<FoodTicket> query = entityManager.createQuery(
                jpql.toString(),
                FoodTicket.class
        );

        query.setParameter("tenantId", tenantService.getCurrentTenantId());


        if (last12Months) {
            query.setParameter("date", LocalDate.now().minusYears(1));
        }


        return query.getResultList();
    }

    public int countByTicketType(String type, boolean last12Months) {
        String jpql = """
            select count(f)
            from FoodTicket f
            where f.ticketType = :type
            and f.tenant.id = :tenantId
            """;

        if (last12Months) {
            jpql += " and f.useDate >= :date";
        }

        TypedQuery<Long> query = entityManager.createQuery(jpql, Long.class)
                .setParameter("type", TicketType.valueOf(type))
                .setParameter("tenantId", tenantService.getCurrentTenantId());

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
            and f.tenant.id = :tenantId
            """;

        if (last12Months) {
            jpql += " and f.useDate >= :date";
        }

        TypedQuery<Long> query = entityManager.createQuery(jpql, Long.class)
                .setParameter("status", Status.valueOf(status))
                .setParameter("tenantId", tenantService.getCurrentTenantId());

        if (last12Months) {
            query.setParameter("date", LocalDate.now().minusYears(1));
        }

        return Math.toIntExact(query.getSingleResult());
    }

    public void save(FoodTicket foodTicket) {
        entityManager.persist(foodTicket);
        entityManager.flush();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        try {
            blockchainService.addLog(
                    "Ticket " + foodTicket.getId()
                            + " created at: "
                            + LocalDateTime.now().format(formatter)
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public boolean checkIfAmountOfTicketsOnSpecificDayFromOnePersonIsValid (LocalDate date, Employee emp) {
        List<FoodTicket> ticketsList = entityManager.createQuery("""
                                                      select f
                                                      from FoodTicket f
                                                      where f.useDate = :date
                                                      and f.employee.id = :empId
                                                      and f.tenant.id = :tenantId
                                                      """, FoodTicket.class)
                .setParameter("date", date)
                .setParameter("empId", emp.getId())
                .setParameter("tenantId", tenantService.getCurrentTenantId())
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
        where f.ticketType = :type
        and f.tenant.id = :tenantId"""); // left join, weil sonst admin null sein könnte also null.firstname und des wirft einen fehler

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

        query.append(" order by f.useDate desc ");


        TypedQuery<AdminFoodTicketDTO> q = entityManager
                .createQuery(query.toString(), AdminFoodTicketDTO.class)
                .setParameter("type", TicketType.ADMIN)
                .setParameter("tenantId", tenantService.getCurrentTenantId());


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
        and f.tenant.id = :tenantId
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

        jpql.append(" order by f.useDate desc ");


        TypedQuery<FoodTicket> query =
                entityManager.createQuery(jpql.toString(), FoodTicket.class);

        query.setParameter("tenantId", tenantService.getCurrentTenantId());


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


            boolean hasConflict = ticket.getStatus() == Status.CONFLICT || ticket.getStatus() == Status.NEEDS_FIXING || ticket.getStatus() == Status.OPEN;


            if (ticket.getMatchingTicket() != null) {

                processed.add(ticket.getMatchingTicket().getId());

                hasConflict |= ticket.getMatchingTicket().getStatus() == Status.CONFLICT || ticket.getMatchingTicket().getStatus() == Status.NEEDS_FIXING || ticket.getStatus() == Status.OPEN;
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
            and f.tenant.id = :tenantId
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

        q.setParameter("tenantId", tenantService.getCurrentTenantId());


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
        FoodTicket ticket = entityManager.createQuery("""
                select f
                from FoodTicket f
                where f.id = :id
                and f.tenant.id = :tenantId
                """, FoodTicket.class)
                .setParameter("id", ticketId)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getResultStream()
                .findFirst()
                .orElse(null);

        if (ticket == null) {
            return false;
        }

        entityManager.remove(ticket);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        try {
            blockchainService.addLog(
                    "Ticket " + ticketId
                            + " removed at: "
                            + LocalDateTime.now().format(formatter)
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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
        where (f.status = :conflictStatus or f.status = :needsFixingStatus or f.status =:openStatus)
        and f.tenant.id = :tenantId
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

        jpql.append(" order by f.useDate desc ");


        TypedQuery<FoodTicket> query =
                entityManager.createQuery(jpql.toString(), FoodTicket.class);

        query.setParameter("conflictStatus", Status.CONFLICT);
        query.setParameter("needsFixingStatus", Status.NEEDS_FIXING);
        query.setParameter("openStatus", Status.OPEN);
        query.setParameter("tenantId", tenantService.getCurrentTenantId());

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
        infoBox.put("Korrektur erforderlich", needsFixing);
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
        boolean ticketFound = false;
        List<FoodTicket> possibleMatches = List.of();

        if (ticketType.equals(TicketType.EMPLOYEE)) {
            possibleMatches = getClearableTickets(TicketType.ADMIN);
        } else if (ticketType.equals(TicketType.ADMIN)) {
            possibleMatches = getClearableTickets(TicketType.EMPLOYEE);
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
                    assignTickets(ticket, possibleMatch);
                } else {
                    // Tickets stimmen nur in EmpName und Datum überein - Beide NEEDS_FIXING
                    ticket.setStatus(Status.NEEDS_FIXING);
                    possibleMatch.setStatus(Status.NEEDS_FIXING);
                    assignTickets(ticket, possibleMatch);
                }
                ticketFound = true;
                break;
            }
        }
        if (!ticketFound) {
            // Kein passendes Ticket wurde gefunden - EMP Ticket bleibt OPEN
            if (ticketType.equals(TicketType.EMPLOYEE)) {
                ticket.setStatus(Status.OPEN);
            } else if (ticketType.equals(TicketType.ADMIN)) { // ADMIN Ticket wird CONFLICT
                ticket.setStatus(Status.CONFLICT);
            }
        }
    }

    private List<FoodTicket> getClearableTickets(TicketType ticketType) {
        return entityManager.createQuery("""
        select f
        from FoodTicket f
        where f.ticketType = :ticketType
        and f.status <> :expired
        and f.tenant.id = :tenantId
        """, FoodTicket.class)
                .setParameter("ticketType", ticketType)
                .setParameter("expired", Status.EXPIRED)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getResultList();
    }

    public void assignTickets(FoodTicket ticketA, FoodTicket ticketB) {
        ticketA.setMatchingTicket(ticketB);
        ticketB.setMatchingTicket(ticketA);
    }

    public List<FoodTicket> getExpiredTickets() {
        return entityManager.createQuery("""
        select f
        from FoodTicket f
        where f.status = :status
        and f.tenant.id = :tenantId
        """, FoodTicket.class)
                .setParameter("status", Status.EXPIRED)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getResultList();
    }
}