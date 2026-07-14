package at.htl.repository;

import at.htl.model.CostOrder;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class CostOrderRepository {

    @Inject
    EntityManager entityManager;

    public List<CostOrder> findAll() {
        return entityManager.createQuery("select c from CostOrder c", CostOrder.class).getResultList();
    }

    public CostOrder findByName(String name) {
        return entityManager.createQuery("select c from CostOrder c where lower(c.name) = lower(:name)", CostOrder.class)
                .setParameter("name", name).getSingleResult();
    }
}
