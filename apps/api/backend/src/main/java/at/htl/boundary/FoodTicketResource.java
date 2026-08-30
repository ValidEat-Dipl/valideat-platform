package at.htl.boundary;

import at.htl.blockchain.ValidEatBlockchainService;
import at.htl.boundary.dto.*;
import at.htl.model.*;
import at.htl.repository.*;
import at.htl.websockets.QRCodeScanWebSocket;
import io.nayuki.qrcodegen.QrCode;
import io.quarkus.security.Authenticated;
import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.auth.principal.ParseException;
import io.smallrye.jwt.build.Jwt;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.json.Json;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
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

    @Inject
    ValidEatBlockchainService blockchainService;

    @Inject
    QRCodeService qrCodeService;

    @Inject
    QRCodeScanWebSocket qrCodeScanWebSocket;

    @Inject
    JWTParser parser;

    @Inject
    JsonWebToken sessionToken;
    @Inject
    RestaurantUserRepository restaurantUserRepository;

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
        result.put("Archiviert", expiredTickets);

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
    @Path("/export-info-box")
    public Map<String, Integer> getExportInfoBox() {

        long allTickets = foodTicketRepository.countAll();
        int checkedTickets =
                foodTicketRepository.countByStatus(String.valueOf(Status.CHECKED), false) +
                foodTicketRepository.countByStatus(String.valueOf(Status.EXPIRED), false);
        int conflictsSum =
                foodTicketRepository.countByStatus(String.valueOf(Status.CONFLICT), false) +
                foodTicketRepository.countByStatus(String.valueOf(Status.NEEDS_FIXING), false) +
                foodTicketRepository.countByStatus(String.valueOf(Status.OPEN), false);


        Map<String, Integer> result = new LinkedHashMap<>();

        result.put("Gesamt", (int) allTickets);
        result.put("Abgeglichene/ Archivierte Tickets", checkedTickets);
        result.put("Offene Konflikte", conflictsSum);

        return result;
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
            e.printStackTrace();
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

        ChangeLog newChange = new ChangeLog("Added new Entry.", LocalDate.now(), foodTicket, admin, admin.getTenant());
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

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        try {
            blockchainService.addLog(
                    "Ticket " + ticketId
                            + " changed at: "
                            + LocalDateTime.now().format(formatter)
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

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

        ChangeLog newChange = new ChangeLog(adminAddTicketDTO.description(), LocalDate.now(), ticket, admin, admin.getTenant());
        changeLogRepository.save(newChange);

        foodTicketRepository.clearing(ticket);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");
        try {
            blockchainService.addLog(
                    "Ticket " + ticketId
                            + " changed at: "
                            + LocalDateTime.now().format(formatter)
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

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
    @Path("/expired")
    public List<FoodTicket> getExpiredTickets() {
        return foodTicketRepository.getExpiredTickets();
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
                "ID;Mitarbeiter;Datum;Stufe;Kostenstelle;Status;Tickettyp;Restaurant;Admin;Kontrolldatum;Status\n"
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
                        : "",
                ticket.getStatus().toString()
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

    @POST
    @Path("/empCreateTicketQRCode")
    @Transactional
    public Response createTicket(EmployeeFoodTicketDTO employeeFoodTicketDTO) {
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

        String qrCodeId = UUID.randomUUID().toString();

        String qrToken = Jwt.issuer("ValidEat")
                .subject("FOOD_TICKET")
                .claim("ticketId", qrCodeId)
                .claim("employeeId", employee.getId())
                .claim("tenantId", employee.getTenant().getId())
                .claim("tier", tier.getName())
                .claim("costOrder", costOrder.getName())
                .claim("restaurantId", restaurant.getId())
                .claim("date", employeeFoodTicketDTO.date().toString())
                .expiresIn(Duration.ofMinutes(5))
                .sign();

        String qrCode = QRCodeService.toSvgString(qrCodeService.generateQrCode(qrToken), 4, "#FFFFFF", "#000000", true);

        return Response.ok(new QRCodeResponse(qrCode, qrToken, qrCodeId))
                .type(MediaType.APPLICATION_JSON)
                .build();
    }

    @POST
    @Path("/scanQRCode")
    @Consumes(MediaType.TEXT_PLAIN)
    @Transactional
    public Response scanQRCode(String qrToken) {
        try {
            JsonWebToken jwt = parser.parse(qrToken);

            if (!Objects.equals(jwt.getSubject(), "FOOD_TICKET")) {
                return Response.status(Response.Status.FORBIDDEN).build();
            }

            String qrCodeId = jwt.getClaim("ticketId").toString();

            Long employeeId = Long.valueOf(jwt.getClaim("employeeId").toString());
            String tierName = jwt.getClaim("tier").toString();
            String costOrderName = jwt.getClaim("costOrder").toString();
            Long restaurantId = Long.valueOf(jwt.getClaim("restaurantId").toString());
            LocalDate date = LocalDate.parse(jwt.getClaim("date").toString());

            Employee employee = employeeRepository.getEmpById(employeeId);
            Tier tier = tierRepository.findByName(tierName);
            CostOrder costOrder = costOrderRepository.findByName(costOrderName);
            Restaurant restaurant = restaurantRepository.getRestaurantById(restaurantId);

            if (tier == null || costOrder == null || restaurant == null || employee == null) {
                return Response.status(Response.Status.BAD_REQUEST).build();
            }

            FoodTicket foodTicket = new FoodTicket(employee, date, tier, costOrder, Status.CHECKED, restaurant, TicketType.EMPLOYEE);
            FoodTicket matchingFoodTicket = new FoodTicket(employee, date, tier, costOrder, Status.CHECKED, restaurant, TicketType.RESTAURANT);

            foodTicketRepository.save(foodTicket);
            foodTicketRepository.save(matchingFoodTicket);

            foodTicket.setMatchingTicket(matchingFoodTicket);
            matchingFoodTicket.setMatchingTicket(foodTicket);

            foodTicketRepository.save(foodTicket);
            foodTicketRepository.save(matchingFoodTicket);

            Long restaurantUserId = Long.valueOf(sessionToken.getClaim("id").toString());
            RestaurantUser restaurantUser = restaurantUserRepository.getRestaurantUserById(restaurantUserId);
            List<FoodTicket> ticketList = restaurantUser.getFoodTickets();
            ticketList.add(matchingFoodTicket);
            restaurantUser.setFoodTickets(ticketList);

            QRCodeScanWebSocket.notifyScan(qrCodeId);


            return Response.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity(e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/restaurantUser/{restaurantUserId}")
    public List<FoodTicket> findByRestaurantUser(@PathParam("restaurantUserId") Long id) {
        return foodTicketRepository.findByRestaurantUser(id);
    }
}
