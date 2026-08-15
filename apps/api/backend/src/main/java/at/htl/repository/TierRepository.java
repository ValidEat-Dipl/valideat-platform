package at.htl.repository;

import at.htl.boundary.TenantService;
import at.htl.model.Tier;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class TierRepository {

    @Inject
    EntityManager entityManager;

    @Inject
    TenantService tenantService;

    public List<Tier> findAll() {
        return entityManager.createQuery("select t from Tier t where t.tenant.id = :tenantId", Tier.class)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getResultList();
    }

    public Tier findByName(String tier) {
        return entityManager.createQuery("select t from Tier t where lower(t.name) = lower(:name) and t.tenant.id = :tenantId", Tier.class)
                .setParameter("name", tier)
                .setParameter("tenantId", tenantService.getCurrentTenantId()).getSingleResult();
    }
}