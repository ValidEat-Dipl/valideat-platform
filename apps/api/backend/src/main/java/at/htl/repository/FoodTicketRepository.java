package at.htl.repository;

import at.htl.model.Employee;
import at.htl.model.FoodTicket;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import jakarta.persistence.EntityManager;

import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class FoodTicketRepository {

    @Inject
    EntityManager entityManager;

    public List<FoodTicket> listAll() {
        return entityManager.createQuery("select f from FoodTicket f", FoodTicket.class).getResultList();
    }

    public void save(LocalDate date, Employee employee, int costOrder) {
        FoodTicket foodTicket = new FoodTicket(date, employee, costOrder);
        entityManager.persist(foodTicket);
    }
}
