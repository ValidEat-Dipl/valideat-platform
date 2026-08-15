package at.htl.repository;

import at.htl.boundary.dto.CreateTenantDTO;
import at.htl.boundary.dto.TenantOverviewDTO;
import at.htl.model.Tenant;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class SaaSAdminRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public Tenant createTenant(CreateTenantDTO dto) {

        Tenant tenant = new Tenant(
                null,
                dto.name(),
                dto.manager(),
                dto.email(),
                dto.country(),
                dto.companySize()
        );

        entityManager.persist(tenant);

        return tenant;
    }

    public List<TenantOverviewDTO> getTenantOverviews() {

        List<Tenant> tenants = entityManager.createQuery(
                "select t from Tenant t order by t.name",
                Tenant.class
        ).getResultList();

        return tenants.stream()
                .map(tenant -> new TenantOverviewDTO(
                        tenant.getId(),
                        tenant.getName(),
                        tenant.getManager(),
                        tenant.getEmail(),
                        tenant.getCountry(),
                        tenant.getCompanySize(),

                        entityManager.createQuery("""
                                select count(e)
                                from Employee e
                                where e.tenant.id = :tenantId
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult(),

                        entityManager.createQuery("""
                                select count(e)
                                from Employee e
                                where e.tenant.id = :tenantId
                                and e.role = at.htl.model.Role.ADMIN
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult(),

                        entityManager.createQuery("""
                                select count(r)
                                from Restaurant r
                                where r.tenant.id = :tenantId
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult(),

                        entityManager.createQuery("""
                                select count(c)
                                from CostOrder c
                                where c.tenant.id = :tenantId
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult(),

                        entityManager.createQuery("""
                                select count(t)
                                from Tier t
                                where t.tenant.id = :tenantId
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult(),

                        entityManager.createQuery("""
                                select count(f)
                                from FoodTicket f
                                where f.tenant.id = :tenantId
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult()
                ))
                .toList();
    }

    public Tenant findTenantById(Long id) {
        return entityManager.find(Tenant.class, id);
    }
}