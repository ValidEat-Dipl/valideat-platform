package at.htl.boundary;

import at.htl.model.Employee;
import at.htl.repository.EmployeeRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import java.time.LocalDate;

@Path("/employee")
public class EmployeeResource {

    @Inject
    EmployeeRepository employeeRepository;

    @POST
    @Path("/login/{email}")
    public String login(@PathParam("email") String email) {
        return employeeRepository.login(email);
    }

    @POST
    @Transactional
    @Path("/register/{emp}")
    public String register(@PathParam("emp") Employee emp) {
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
