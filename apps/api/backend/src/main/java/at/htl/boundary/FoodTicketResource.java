package at.htl.boundary;

import at.htl.boundary.dto.*;
import at.htl.model.*;
import at.htl.repository.*;
import io.quarkus.security.Authenticated;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
    @Inject
    ChangeLogRepository changeLogRepository;

    @GET
    public List<FoodTicket> listAll() {
        return foodTicketRepository.listAll();
    }

    @GET
    @Path("/overview")
    public List<FoodTicket> overViewWithLast12Months(@QueryParam("last12Months") boolean last12Months, @QueryParam("orderBy") String orderBy) {
        return foodTicketRepository.findAll(last12Months, orderBy);
    }

    @GET
    @Path("/{id}")
    public EmployeeGetTicketsDTO getTicketById(@PathParam("id") Long id) {
        return foodTicketRepository.findEmployeeTicketDTOById(id);
    }

    @GET
    @Path("/findByEmployee/{id}")
    public List<EmployeeGetTicketsDTO> getTicketByEmployee(@PathParam("id") Long id) {
        return foodTicketRepository.findByEmployee(id);
    }

    @GET
    @Path("/admin-overview-info-box")
    public Map<String, Integer> getAdminOverviewInfoBox(@QueryParam("last12Months") boolean last12Months) {

        int employeeTickets = foodTicketRepository.countByTicketType(TicketType.EMPLOYEE.toString(), last12Months);
        int restaurantTickets = foodTicketRepository.countByTicketType(TicketType.ADMIN.toString(), last12Months);

        int openTickets = foodTicketRepository.countByStatus(Status.OPEN.toString(), last12Months);
        int checkedTickets = foodTicketRepository.countByStatus(Status.CHECKED.toString(), last12Months);
        int fixingTickets = foodTicketRepository.countByStatus(Status.NEEDS_FIXING.toString(), last12Months);
        int conflictTickets = foodTicketRepository.countByStatus(Status.CONFLICT.toString(), last12Months);
        int expiredTickets = foodTicketRepository.countByStatus(Status.EXPIRED.toString(), last12Months);

        Map<String, Integer> result = new LinkedHashMap<>();

        result.put("Mitarbeitereinträge", employeeTickets);
        result.put("Physische Markerl erfasst", restaurantTickets);
        result.put("Offen", openTickets);
        result.put("Änderung notwenig", fixingTickets);
        result.put("Abgeglichen", checkedTickets);
        result.put("Konflikte", conflictTickets);
        result.put("Abgelaufen", expiredTickets);

        return result;
    }

    @GET
    @Path("/listAdminTickets")
    public List<AdminFoodTicketDTO> findAdminTickets(@QueryParam("employeeName") String employeeName,
                                                     @QueryParam("startDate") LocalDate startDate,
                                                     @QueryParam("endDate") LocalDate endDate,
                                                     @QueryParam("status") Status status) {
        return foodTicketRepository.findAdminTickets(employeeName, startDate, endDate, status);
    }

    @GET
    @Path("/table-clearing")
    public List<AdminClearingDTO> createClearingTable(@QueryParam("employeeName") String employeeName,
                                                      @QueryParam("startDate") LocalDate startDate,
                                                      @QueryParam("endDate") LocalDate endDate,
                                                      @QueryParam("status") Status status,
                                                      @QueryParam("conflict") String conflict,
                                                      @QueryParam("costOrder") String costOrder) {
        return foodTicketRepository.createClearingTable(employeeName, startDate, endDate, status, conflict, costOrder);
    }

    @GET
    @Path("/table-clearing/{id}")
    public AdminClearingDTO getClearingCase(
            @PathParam("id") Long id) {
        FoodTicket ticket = foodTicketRepository.findById(id);

        if (ticket == null) {
            return null;
        }

        return foodTicketRepository.createClearingDTO(ticket);
    }

    @GET
    @Path("/clearing-info-box")
    public Map<String, Integer> getClearingInfoBox(
            @QueryParam("employeeName") String employeeName,
            @QueryParam("startDate") LocalDate startDate,
            @QueryParam("endDate") LocalDate endDate,
            @QueryParam("status") Status status,
            @QueryParam("conflict") String conflict,
            @QueryParam("costOrder") String costOrder) {

        return foodTicketRepository.getClearingInfoBox(
                employeeName,
                startDate,
                endDate,
                status,
                conflict,
                costOrder
        );
    }

    @GET
    @Path("/conflicts")
    public FoodTicketConflictResponseDTO getConflicts(@QueryParam("employeeName") String employeeName,
                                                    @QueryParam("startDate") LocalDate startDate,
                                                    @QueryParam("endDate") LocalDate endDate,
                                                    @QueryParam("status") Status status,
                                                    @QueryParam("conflict") String conflict) {
        return foodTicketRepository.getConflicts(employeeName, startDate, endDate, status, conflict);
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
                restaurant,
                TicketType.EMPLOYEE);
        foodTicketRepository.save(foodTicket);
        return Response.ok(foodTicket.getId()).build();
    }

    @POST
    @Path("/adminAddTicketEntry")
    @Transactional
    public Response adminSaveNewTicketEntry(AdminAddTicketDTO adminAddTicketDTO) {
        Employee employee;
        Tier tier;
        CostOrder costOrder;
        Restaurant restaurant;
        Employee admin;

        try {
            employee = employeeRepository.findByName(adminAddTicketDTO.employeeName());
            tier = tierRepository.findByName(adminAddTicketDTO.tier());
            costOrder = costOrderRepository.findByName(adminAddTicketDTO.costOrder());
            restaurant = restaurantRepository.findByName(adminAddTicketDTO.restaurantName());
            admin = employeeRepository.findByName(adminAddTicketDTO.adminName());
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        FoodTicket foodTicket = new FoodTicket(
                employee,
                adminAddTicketDTO.useDate(),
                tier,
                costOrder,
                Status.OPEN,
                restaurant,
                TicketType.ADMIN,
                admin,
                LocalDate.now());
        foodTicketRepository.save(foodTicket);

        ChangeLog newChange = new ChangeLog("Added new Entry.", LocalDate.now(), foodTicket, admin);
        changeLogRepository.save(newChange);

        foodTicketRepository.clearing(foodTicket);
        return Response.ok().build();
    }

    @PUT
    @Path("/{ticketId}/{empId}")
    @Transactional
    public Response empEditTicket(@PathParam("ticketId") Long ticketId, @PathParam("empId") Long empId,EmployeeFoodTicketDTO employeeFoodTicketDTO) {
        FoodTicket ticket = foodTicketRepository.findById(ticketId);

        if (ticket == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        if (!Objects.equals(ticket.getEmployee().getId(), empId) || ticket.getStatus() != Status.OPEN) { // null save, weil Objects
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        Tier tier;
        CostOrder costOrder;
        Restaurant restaurant;

        try {
            tier = tierRepository.findByName(employeeFoodTicketDTO.tier());
            costOrder = costOrderRepository.findByName(employeeFoodTicketDTO.costOrder());
            restaurant = restaurantRepository.findByName(employeeFoodTicketDTO.restaurantName());

            if (tier == null || costOrder == null || restaurant == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        ticket.setUseDate(employeeFoodTicketDTO.date());
        ticket.setCostOrder(costOrder);
        ticket.setTier(tier);
        ticket.setRestaurant(restaurant);

        return Response.noContent().build();
    }

    @PUT
    @Path("/adminEditTicket/{ticketId}")
    @Transactional
    public Response adminEditTicket(@PathParam("ticketId") Long ticketId, AdminAddTicketDTO adminAddTicketDTO) {
        FoodTicket ticket = foodTicketRepository.findById(ticketId);

        if (ticket == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }


        Tier tier;
        CostOrder costOrder;
        Restaurant restaurant;
        Employee employee;
        Employee admin;

        try {
            tier = tierRepository.findByName(adminAddTicketDTO.tier());
            employee = employeeRepository.findByName(adminAddTicketDTO.employeeName());
            costOrder = costOrderRepository.findByName(adminAddTicketDTO.costOrder());
            restaurant = restaurantRepository.findByName(adminAddTicketDTO.restaurantName());
            admin = employeeRepository.findByName(adminAddTicketDTO.adminName());

            if (tier == null || costOrder == null || restaurant == null || employee == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        ticket.setEmployee(employee);
        ticket.setUseDate(adminAddTicketDTO.useDate());
        ticket.setCostOrder(costOrder);
        ticket.setTier(tier);
        ticket.setRestaurant(restaurant);
        ticket.setCheckDate(LocalDate.now());
        ticket.setStatus(adminAddTicketDTO.status());

        ChangeLog newChange = new ChangeLog(adminAddTicketDTO.description(), LocalDate.now(), ticket, admin);
        changeLogRepository.save(newChange);

        foodTicketRepository.clearing(ticket);

        return Response.ok().build();
    }

    @PUT
    @Path("/assignTickets/{empTicketId}/{adminTicketId}")
    @Transactional
    public Response assignTickets(@PathParam("empTicketId") Long empTicketId, @PathParam("adminTicketId") Long adminTicketId) {
        FoodTicket empTicket = foodTicketRepository.findById(empTicketId);
        FoodTicket adminTicket = foodTicketRepository.findById(adminTicketId);

        if (empTicket == null || adminTicket == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        if (empTicket.getMatchingTicket() == null) {
            empTicket.setMatchingTicket(adminTicket);
            return Response.ok(empTicket).build();
        } else {
            adminTicket.setMatchingTicket(empTicket);
            return Response.ok(adminTicket).build();
        }
    }

    @DELETE
    @Transactional
    @Path("/{ticketId}")
    public Response deleteTicket(@PathParam("ticketId") Long id) {
        // TODO Automatic Clearing
        boolean deleted = foodTicketRepository.deleteTicket(id);

        if (!deleted) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.noContent().build();
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

    @GET
    @Path("/export-csv")
    @Produces("text/csv")
    public Response exportCSV() {
        List<FoodTicket> tickets = foodTicketRepository.listAll();
        String csv = tickets.stream()
                .map(this::convertFoodTicketToCSV)
                .collect(Collectors.joining("\n"));
        return Response.ok(
                "ID;Mitarbeiter;Datum;Stufe;Kostenstelle;Status;Tickettyp;Restaurant;Admin;Kontrolldatum\n"
                        + csv)
                .header("Content-Disposition", "attachment; filename=foodtickets.csv")
                .build();
    }

    private String convertFoodTicketToCSV(FoodTicket ticket) {
        String[] data = {
                ticket.getId().toString(),
                ticket.getEmployee().getFirstName()
                        + " "
                        + ticket.getEmployee().getLastName(),
                ticket.getUseDate().toString(),
                ticket.getTier().getName(),
                ticket.getCostOrder().getName(),
                ticket.getStatus().toString(),
                ticket.getTicketType().toString(),
                ticket.getRestaurant().getName(),
                ticket.getAdmin() != null
                        ? ticket.getAdmin().getFirstName()
                          + " "
                          + ticket.getAdmin().getLastName()
                        : "",
                ticket.getCheckDate() != null
                        ? ticket.getCheckDate().toString()
                        : ""
        };
        return Stream.of(data)
                .map(this::escapeSpecialCharacters)
                .collect(Collectors.joining(";"));
    }

    private String escapeSpecialCharacters(String data) {

        if (data == null) return "";
        String escapedData = data.replaceAll("\\R", " ");
        if (escapedData.contains(";")
            || escapedData.contains("\"")
            || escapedData.contains("'")) {
            escapedData = "\"" + escapedData + "\"";
        }

        return escapedData;
    }
}
