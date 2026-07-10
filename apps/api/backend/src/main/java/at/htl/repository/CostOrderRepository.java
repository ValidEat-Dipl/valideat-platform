package at.htl.repository;

import at.htl.model.CostOrder;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class CostOrderRepository {

    @Inject
    EntityManager entityManager;


    public CostOrder findByName(String name) {
        return entityManager.createQuery("select c from CostOrder c where lower(c.name) = lower(:name)", CostOrder.class)
                .setParameter("name", name).getSingleResult();
    }
}
