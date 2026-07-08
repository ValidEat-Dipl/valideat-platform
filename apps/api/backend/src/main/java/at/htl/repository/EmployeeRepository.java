package at.htl.repository;

import at.htl.model.Employee;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import javax.swing.text.html.parser.Entity;
import java.util.List;

@ApplicationScoped
public class EmployeeRepository {

    @Inject
    EntityManager em;

    @GET
    public Employee getEmpById(Long id) {
        return em.find(Employee.class, id);
    }


    @POST
    public String login(String email) {
        List<Employee> employees = em.createQuery("select e from Employee e where e.email = :email", Employee.class)
                .setParameter("email", email).getResultList();

        if (employees.size() == 1) {
            return "Login was Succesfull!";
        } else if (employees.isEmpty()) {
            return "No Employee found.";
        } else {
            return "There were more then one Result";
        }
    }

    public String register(Employee emp) {
        try {
            em.persist(emp);
        } catch (Exception e) {
            return e.getMessage();
        }

        return "New Employee Registered";
    }
}
