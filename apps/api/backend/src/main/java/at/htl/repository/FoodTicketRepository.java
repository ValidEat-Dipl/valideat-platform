package at.htl.repository;

import at.htl.model.Employee;
import at.htl.model.FoodTicket;
import at.htl.model.Status;
import at.htl.model.TicketType;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

    public List<FoodTicket> findByEmployee(Long id) {
        return entityManager.createQuery("select f from FoodTicket f where f.employee.id = :id", FoodTicket.class)
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
}