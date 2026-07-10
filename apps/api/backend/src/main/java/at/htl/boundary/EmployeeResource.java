package at.htl.boundary;

import at.htl.model.Employee;
import at.htl.repository.EmployeeRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

import java.time.LocalDate;

@Path("/employee")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EmployeeResource {

    @Inject
    EmployeeRepository employeeRepository;

    @POST
    @Path("/login/{email}/{password}")
    public String login(@PathParam("email") String email, @PathParam("password") String password) {
        return employeeRepository.login(email, password);
    }

    @POST
    @Transactional
    @Path("/register")
    public String register(Employee emp) {
        return employeeRepository.register(emp);
    }

    @GET
    @Path("/checkIfTodaysTicketUsed/{empId}/{date}")
    public boolean checkIfTodaysTicketUsed(@PathParam("empId") Long id,
                                           @PathParam("date")LocalDate date) {
        Employee emp = employeeRepository.getEmpById(id);

        return employeeRepository.checkIfTodaysTicketUsed(emp, date);
    }

}
