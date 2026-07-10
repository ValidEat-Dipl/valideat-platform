package at.htl.repository;

import at.htl.model.Employee;
import at.htl.model.FoodTicket;
import at.htl.model.Status;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import jakarta.persistence.EntityManager;

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

    public void save(LocalDate date, Employee employee, int costOrder) {
        FoodTicket foodTicket = new FoodTicket(); // TODO: Needs fixing
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