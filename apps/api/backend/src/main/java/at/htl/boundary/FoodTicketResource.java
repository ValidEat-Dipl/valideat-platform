package at.htl.boundary;

import at.htl.boundary.dto.EmployeeFoodTicketDTO;
import at.htl.model.*;
import at.htl.repository.*;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Path("/foodticket")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FoodTicketResource {

    @Inject
    FoodTicketRepository foodTicketRepository;
    @Inject
    EmployeeRepository employeeRepository;
    @Inject
    TierRepository tierRepository;
    @Inject
    CostOrderRepository costOrderRepository;
    @Inject
    RestaurantRepository restaurantRepository;

    @GET
    public List<FoodTicket> listAll() {
        return foodTicketRepository.listAll();
    }

    @GET
    @Path("/overview")
    public List<FoodTicket> overViewWithLast12Months(@QueryParam("last12Months") boolean last12Months) {
        return foodTicketRepository.findAll(last12Months);
    }

    @GET
    @Path("/{id}")
    public FoodTicket getTicketById(@PathParam("id") Long id) {
        return foodTicketRepository.findById(id);
    }

    @GET
    @Path("/findByEmployee/{id}")
    public List<FoodTicket> getTicketByEmployee(@PathParam("id") Long id) {
        return foodTicketRepository.findByEmployee(id);
    }

    @GET
    @Path("/admin-overview-info-box")
    public Map<String, Integer> getAdminOverviewInfoBox(@QueryParam("last12Months") boolean last12Months) {

        int employeeTickets = foodTicketRepository.countByTicketType(TicketType.EMPLOYEE.toString(), last12Months);
        int restaurantTickets = foodTicketRepository.countByTicketType(TicketType.ADMIN.toString(), last12Months);

        int checkedTickets = foodTicketRepository.countByStatus(Status.CHECKED.toString(), last12Months);
        int conflictTickets = foodTicketRepository.countByStatus(Status.CONFLICT.toString(), last12Months);

        Map<String, Integer> result = new LinkedHashMap<>();

        result.put("Mitarbeitereinträge", employeeTickets);
        result.put("Physische Markerl erfasst", restaurantTickets);
        result.put("Abgeglichen", checkedTickets);
        result.put("Konflikte", conflictTickets);

        return result;
    }

    @POST
    @Path("/empAddTicketEntry")
    @Transactional
    public Response empSaveNewTicketEntry(EmployeeFoodTicketDTO employeeFoodTicketDTO) {
        Employee employee;
        Tier tier;
        CostOrder costOrder;
        Restaurant restaurant;

        try {
            employee = employeeRepository.findByName(employeeFoodTicketDTO.employeeName());
            tier = tierRepository.findByName(employeeFoodTicketDTO.tier());
            costOrder = costOrderRepository.findByName(employeeFoodTicketDTO.costOrder());
            restaurant = restaurantRepository.findByName(employeeFoodTicketDTO.restaurantName());
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }


        FoodTicket foodTicket = new FoodTicket(
                employee,
                employeeFoodTicketDTO.date(),
                tier,
                costOrder,
                Status.OPEN,
                restaurant);
        foodTicketRepository.save(foodTicket);
        return Response.ok().build();
    }

    @GET
    @Path("/filterTickets/{status}/{conflict}/{employeeId}/{startDate}/{endDate}")
    public List<FoodTicket> filterTicketEntries(@PathParam("status") Status status,
                                                @PathParam("conflict") String conflict,
                                                @PathParam("employeeId") Long empId,
                                                @PathParam("startDate") LocalDateTime startDate,
                                                @PathParam("endDate") LocalDateTime endDate) {


        return foodTicketRepository.filterTickets(status, conflict, empId, startDate, endDate);
    }

    @GET
    @Path("/getAllValidTickets")
    public List<FoodTicket> getAllValidTickets() {
        List<FoodTicket> list = foodTicketRepository.listAll();
        List<FoodTicket> result = new java.util.ArrayList<>(List.of());

        for (FoodTicket ticket : list) {
            boolean valid = checkIfDailyTicketUsageIsNotExceeded(ticket.getUseDate(), ticket.getEmployee());

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
