package at.htl.repository;

import at.htl.boundary.TenantService;
import at.htl.model.CostOrder;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class CostOrderRepository {

    @Inject
    EntityManager entityManager;

    @Inject
    TenantService tenantService;

    public List<CostOrder> findAll() {
        Long tenantId = tenantService.getCurrentTenantId();
        return entityManager.createQuery("select c from CostOrder c where c.tenant.id = :tenantId", CostOrder.class).setParameter("tenantId", tenantId).getResultList();
    }

    public CostOrder findByName(String name) {
        Long tenantId = tenantService.getCurrentTenantId();
        return entityManager.createQuery("select c from CostOrder c where lower(c.name) = lower(:name) and c.tenant.id = :tenantId", CostOrder.class)
                .setParameter("name", name)
                .setParameter("tenantId", tenantId).getSingleResult();
    }
}
