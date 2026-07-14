package at.htl.repository;

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
import java.util.List;
import java.util.Objects;

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

    public List<FoodTicket> filterTickets(Status status, String conflict, Long empId, LocalDateTime startDate, LocalDateTime endDate) {

        return entityManager.createQuery("""
                select f from FoodTicket f
                where f.status = :status
                and f.employee.id = :emp
                and f.useDate between :startDate and :endDate
                """, FoodTicket.class)
                .setParameter("status", status)
                .setParameter("emp", empId)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate).getResultList();
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
}