package at.htl.repository;

import at.htl.boundary.dto.LoginResponseDTO;
import at.htl.model.Employee;
import at.htl.model.FoodTicket;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotAuthorizedException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.core.Response;

import javax.swing.text.html.parser.Entity;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class EmployeeRepository {

    @Inject
    EntityManager em;

    public List<Employee> findAll() {
        return em.createQuery("select e from Employee e", Employee.class).getResultList();
    }

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


    public LoginResponseDTO login(String email, String password) {
        List<Employee> employees = em.createQuery("select e from Employee e where e.email = :email", Employee.class)
                .setParameter("email", email).getResultList();

        if (employees.isEmpty()) {
            throw new NotAuthorizedException("Invalid email or password");
        }

        if (employees.size() > 1) {
            throw new NotAuthorizedException("Invalid email or password");
        }

        Employee employee = employees.getFirst();

        if (BcryptUtil.matches(password, employee.getPasswordHash())) {
            String token = Jwt.issuer("ValidEat")
                    .subject(employee.getEmail())
                    .claim("id", employee.getId())
                    .groups(employee.getRole().toString())
                    .expiresIn(Duration.ofHours(10))
                    .sign();
            return new LoginResponseDTO(token, employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail(), employee.getRole());
        } else {
            return null;
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
