package at.htl.repository;

import at.htl.boundary.TenantService;
import at.htl.model.Restaurant;
import at.htl.model.Tier;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class RestaurantRepository {

    @Inject
    EntityManager entityManager;

    @Inject
    TenantService tenantService;

    public List<Restaurant> findAll() {
        return entityManager.createQuery("select r from Restaurant r where r.tenant.id = :tenantId", Restaurant.class)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getResultList();
    }

    public Restaurant findByName(String restaurantName) {
        return entityManager.createQuery("select r from Restaurant r where lower(r.name) = lower(:name) and r.tenant.id = :tenantId", Restaurant.class)
                .setParameter("name", restaurantName)
                .setParameter("tenantId", tenantService.getCurrentTenantId())
                .getSingleResult();
    }
}