package at.htl.boundary;

import at.htl.boundary.dto.LoginDTO;
import at.htl.boundary.dto.LoginResponseDTO;
import at.htl.model.Employee;
import at.htl.model.FoodTicket;
import at.htl.repository.EmployeeRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.util.List;

@Path("/employee")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EmployeeResource {

    @Inject
    EmployeeRepository employeeRepository;

    @GET
    public List<Employee> listAll() {
        return employeeRepository.findAll();
    }

    @POST
    @Path("/login")
    public LoginResponseDTO login(LoginDTO loginDTO) {
        return employeeRepository.login(loginDTO.email(), loginDTO.password());
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
