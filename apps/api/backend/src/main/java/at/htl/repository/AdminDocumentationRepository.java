package at.htl.repository;

import at.htl.model.AdminDocumentation;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;

import java.util.List;

@ApplicationScoped
public class AdminDocumentationRepository {

    @Inject
    EntityManager em;

    public List<AdminDocumentation> getAllAdminDocumentations() {
        return em.createQuery("""
                                      select ad
                                      from AdminDocumentation ad
                                      """, AdminDocumentation.class)
                .getResultList();
    }
}
