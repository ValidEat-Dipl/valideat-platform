package at.htl.boundary;

import at.htl.model.Employee;
import at.htl.model.FoodTicket;
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

    @GET
    public List<FoodTicket> listAll() {
        return foodTicketRepository.listAll();
    }

    @POST
    @Path("/addTicketeEntry/{date}/{employee}/{costOrder}")
    @Transactional
    public Response saveNewTicketEntry(@PathParam("date") LocalDate date,
                                       @PathParam("employee") Employee employee,
                                       @PathParam("costOrder") int costOrder) {
        foodTicketRepository.save(date, employee, costOrder);
    }
}
