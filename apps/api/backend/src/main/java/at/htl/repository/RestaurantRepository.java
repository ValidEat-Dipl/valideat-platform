package at.htl.repository;

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

    public List<Restaurant> findAll() {
        return entityManager.createQuery("select r from Restaurant r", Restaurant.class).getResultList();
    }

    public Restaurant findByName(String restaurantName) {
        return entityManager.createQuery("select r from Restaurant r where lower(r.name) = lower(:name)", Restaurant.class)
                .setParameter("name", restaurantName).getSingleResult();
    }
}
