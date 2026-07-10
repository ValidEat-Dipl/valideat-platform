package at.htl.repository;

import at.htl.model.Employee;
import io.quarkus.elytron.security.common.BcryptUtil;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import javax.swing.text.html.parser.Entity;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class EmployeeRepository {

    @Inject
    EntityManager em;

    public Employee getEmpById(Long id) {
        return em.find(Employee.class, id);
    }

    public Employee findByName(String name) {

        return em.createQuery(
                        """
            SELECT e FROM Employee e 
            WHERE lower(CONCAT(e.firstName, ' ', e.lastName)) = lower(:name)
               OR LOWER(CONCAT(e.lastName, ' ', e.firstName)) = lower(:name)
            """,
                        Employee.class)
                .setParameter("name", name)
                .getSingleResult();
    }


    public String login(String email, String password) {
        List<Employee> employees = em.createQuery("select e from Employee e where e.email = :email", Employee.class)
                .setParameter("email", email).getResultList();

        if (employees.isEmpty()) {
            return "No Employee found.";
        }

        if (employees.size() > 1) {
            return "There were more than one Result";
        }

        Employee employee = employees.getFirst();

        if (BcryptUtil.matches(password, employee.getPasswordHash())) {
            return "Login was Successful!";
        } else {
            return "Wrong password!";
        }
    }

    public String register(Employee emp) {
        try {
            emp.setPasswordHash(BcryptUtil.bcryptHash(emp.getPasswordHash()));
            em.persist(emp);
        } catch (Exception e) {
            return e.getMessage();
        }

        return "New Employee Registered";
    }


    public boolean checkIfTodaysTicketUsed(Employee emp, LocalDate date) {
        Long count = em.createQuery("select count(f) from FoodTicket f where f.useDate = :date and f.employee.id = :id", Long.class)
                .setParameter("date", date).setParameter("id", emp.getId()).getSingleResult();

        return count != 0;
    }
}
