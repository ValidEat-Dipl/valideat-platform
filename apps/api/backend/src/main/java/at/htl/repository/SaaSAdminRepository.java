package at.htl.repository;

import at.htl.boundary.dto.CreateTenantDTO;
import at.htl.boundary.dto.TenantOverviewDTO;
import at.htl.model.*;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.core.Response;

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
                dto.companySize(),
                dto.primaryColor(),
                dto.accentColor()
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

    public TenantOverviewDTO getTenantOverview(Long tenantId) {

        Tenant tenant = entityManager.createQuery("""
            select t
            from Tenant t
            where t.id = :tenantId
            """, Tenant.class)
                .setParameter("tenantId", tenantId)
                .getSingleResult();

        return new TenantOverviewDTO(
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
                        .setParameter("tenantId", tenantId)
                        .getSingleResult(),

                entityManager.createQuery("""
                    select count(e)
                    from Employee e
                    where e.tenant.id = :tenantId
                    and e.role = at.htl.model.Role.ADMIN
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult(),

                entityManager.createQuery("""
                    select count(r)
                    from Restaurant r
                    where r.tenant.id = :tenantId
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult(),

                entityManager.createQuery("""
                    select count(c)
                    from CostOrder c
                    where c.tenant.id = :tenantId
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult(),

                entityManager.createQuery("""
                    select count(t)
                    from Tier t
                    where t.tenant.id = :tenantId
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult(),

                entityManager.createQuery("""
                    select count(f)
                    from FoodTicket f
                    where f.tenant.id = :tenantId
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult()
        );
    }

    public Tenant findTenantById(Long id) {
        return entityManager.find(Tenant.class, id);
    }

    public List<Tenant> findTenantBySaaSAdminId(String name) {
        System.out.println(name);
        return entityManager.createQuery("select t from Tenant t where t.manager like :managerName ", Tenant.class).setParameter("managerName", name).getResultList();
    }

    public Response assignEmpToTenant(Tenant tenant, Employee employee) {
        if (employee == null || tenant == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        employee.setTenant(tenant);

        return Response.ok().build();
    }

    public Response assignRestaurantToTenant(Tenant tenant, Restaurant restaurant) {
        if (restaurant == null || tenant == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        restaurant.setTenant(tenant);

        return Response.ok().build();
    }

    public Response assignUserToRestaurant(Tenant tenant, Restaurant restaurant, RestaurantUser restaurantUser) {if (restaurant == null || restaurantUser == null) {
        return Response.status(Response.Status.NOT_FOUND).build();
    }

        if (restaurant.getTenant() == null || !restaurant.getTenant().getId().equals(tenant.getId())) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        if (restaurantUser.getTenant() == null || !restaurantUser.getTenant().getId().equals(tenant.getId())) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        restaurantUser.setRestaurant(restaurant);

        return Response.ok().build();
    }

    public Response createTier(String name, double discount, Tenant tenant) {
        if (tenant == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Tier tier = new Tier();
        tier.setName(name);
        tier.setDiscount(discount);
        tier.setTenant(tenant);

        entityManager.persist(tier);

        return Response.ok(tier).build();
    }

    @Transactional
    public Response createCostOrder(String name, Tenant tenant) {
        if (tenant == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        CostOrder costOrder = new CostOrder();
        costOrder.setName(name);
        costOrder.setTenant(tenant);

        entityManager.persist(costOrder);

        return Response.ok(costOrder).build();
    }
}