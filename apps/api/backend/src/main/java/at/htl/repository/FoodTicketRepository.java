package at.htl.repository;

import at.htl.boundary.dto.AdminClearingDTO;
import at.htl.boundary.dto.AdminFoodTicketDTO;
import at.htl.boundary.dto.EmployeeFoodTicketDTO;
import at.htl.boundary.dto.EmployeeGetTicketsDTO;
import at.htl.model.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.time.LocalDateTime;
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

    public List<EmployeeGetTicketsDTO> findByEmployee(Long id) {
        return entityManager.createQuery("""
                select new at.htl.boundary.dto.EmployeeGetTicketsDTO(f.id, f.employee.firstName, f.employee.lastName, f.useDate, f.tier.name, f.costOrder.name, f.restaurant.name, f.status, f.checkDate) from FoodTicket f where f.employee.id = :id""", EmployeeGetTicketsDTO.class)
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
        entityManager.persist(foodTicket);
    }

    public boolean checkIfAmountOfTicketsOnSpecificDayFromOnePersonIsValid (LocalDate date, Employee emp) /* checkIfOnePersonTookMoreThanOneTicketOnOneDay */ {
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


    public List<AdminFoodTicketDTO> findAdminTickets(String employeeName, LocalDateTime startDate, LocalDateTime endDate, Status status) {
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
            LocalDateTime startDate,
            LocalDateTime endDate,
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
                employeeTicket != null ? employeeTicket.getChangeLog() : null,
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
                adminTicket != null ? adminTicket.getChangeLog() : null,
                adminTicket != null ? adminTicket.getUseDate() : null,
                adminTicket != null ? adminTicket.getCheckDate() : null,
                adminTicket != null ? adminTicket.getStatus() : null,
                adminTicket != null ? adminTicket.getConflict() : null
        );
    }

    public Map<String, Integer> getClearingInfoBox(
            String employeeName,
            LocalDateTime startDate,
            LocalDateTime endDate,
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
            LocalDateTime startDate,
            LocalDateTime endDate,
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

    public void clearing() { // für später wird aufgerufen nachdem admin ticket erstellt
    }
}