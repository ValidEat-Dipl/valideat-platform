package at.htl.repository;

import at.htl.model.Tier;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class TierRepository {

    @Inject
    EntityManager entityManager;

    public List<Tier> findAll() {
        return entityManager.createQuery("select t from Tier t", Tier.class).getResultList();
    }

    public Tier findByName(String tier) {
        return entityManager.createQuery("select t from Tier t where lower(t.name) = lower(:name)", Tier.class)
                .setParameter("name", tier).getSingleResult();
    }
}
