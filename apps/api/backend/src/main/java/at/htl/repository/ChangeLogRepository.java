package at.htl.repository;

import at.htl.model.ChangeLog;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

@ApplicationScoped
public class ChangeLogRepository {

    @Inject
    EntityManager entityManager;

    public void save(ChangeLog changeLog) {
        entityManager.persist(changeLog);
    }
}
