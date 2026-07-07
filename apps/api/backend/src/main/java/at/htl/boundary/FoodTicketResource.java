package at.htl.boundary;

import at.htl.model.Employee;
import at.htl.model.FoodTicket;
import at.htl.repository.EmployeeRepository;
import at.htl.repository.FoodTicketRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.util.List;

@Path("/api/foodticket")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FoodTicketResource {

    @Inject
    FoodTicketRepository foodTicketRepository;
    @Inject
    EmployeeRepository employeeRepository;

    @GET
    public List<FoodTicket> listAll() {
        return foodTicketRepository.listAll();
    }

    @POST
    @Path("/addTicketeEntry/{date}/{employeeId}/{costOrder}")
    @Transactional
    public Response saveNewTicketEntry(@PathParam("date") LocalDate date,
                                       @PathParam("employeeId") Long empId,
                                       @PathParam("costOrder") int costOrder) {

        Employee employee = employeeRepository.getEmpById(empId);

        foodTicketRepository.save(date, employee, costOrder);
        return Response.ok().build();
    }

    @GET
    @Path("/getAllValidTickets")
    public List<FoodTicket> getAllValidTickets() {
        List<FoodTicket> list = foodTicketRepository.listAll();
        List<FoodTicket> result = new java.util.ArrayList<>(List.of());

        for (FoodTicket ticket : list) {
            boolean valid = checkIfDailyTicketUsageIsNotExceeded(ticket.getDate(), ticket.getEmployee());

            if (valid) {
                result.add(ticket);
            }
        }

        return result;
    }

    private boolean checkIfDailyTicketUsageIsNotExceeded(LocalDate date, Employee emp) {
        return foodTicketRepository.checkIfAmountOfTicketsOnSpecificDayFromOnePersonIsValid(date, emp);
    }
}
