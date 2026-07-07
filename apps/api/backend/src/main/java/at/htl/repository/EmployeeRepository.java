package at.htl.repository;

import at.htl.model.Employee;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.GET;

import javax.swing.text.html.parser.Entity;

@ApplicationScoped
public class EmployeeRepository {

    @Inject
    EntityManager em;

    @GET
    public Employee getEmpById(Long id) {
        return em.find(Employee.class, id);
    }
}
