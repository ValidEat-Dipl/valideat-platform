package at.htl.boundary;

import at.htl.boundary.dto.*;
import at.htl.model.FoodTicket;
import at.htl.model.Restaurant;
import at.htl.model.RestaurantUser;
import at.htl.model.Status;
import at.htl.repository.FoodTicketRepository;
import at.htl.repository.RestaurantRepository;
import at.htl.repository.RestaurantUserRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

@Path("/restaurant")
public class RestaurantResource {

    @Inject
    RestaurantRepository restaurantRepository;

    @Inject
    FoodTicketRepository foodTicketRepository;

    @Inject
    RestaurantUserRepository restaurantUserRepository;

    @Inject
    JsonWebToken sessionToken;

    @GET
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    @GET
    @Path("/overview")
    public Response getRestaurantOverview() {

        Long restaurantUserId = Long.valueOf(sessionToken.getClaim("id").toString());

        RestaurantUser restaurantUser =
                restaurantUserRepository.getRestaurantUserById(restaurantUserId);

        if (restaurantUser == null || restaurantUser.getRestaurant() == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Long restaurantId = restaurantUser.getRestaurant().getId();

        List<FoodTicket> tickets =
                foodTicketRepository.findRestaurantScans(restaurantId);

        long totalScans = tickets.size();

        long successfulScans = tickets.stream()
                .filter(ticket -> ticket.getStatus() == Status.CHECKED)
                .count();

        long failedScans = tickets.stream()
                .filter(ticket ->
                        ticket.getStatus() == Status.CONFLICT ||
                                ticket.getStatus() == Status.NEEDS_FIXING)
                .count();

        List<ScanDTO> lastScans = tickets.stream()
                .limit(5)
                .map(ticket -> new ScanDTO(
                        ticket.getUseDate(),
                        ticket.getTier().getName(),
                        ticket.getCostOrder().getName(),
                        ticket.getStatus()
                ))
                .toList();

        return Response.ok(
                new RestaurantOverviewDTO(
                        totalScans,
                        successfulScans,
                        failedScans,
                        lastScans
                )
        ).build();
    }

    @GET
    @Path("/tickets")
    public Response getRestaurantTickets(@QueryParam("fromDate") LocalDate fromDate, @QueryParam("toDate") LocalDate toDate, @QueryParam("status") Status status, @QueryParam("costOrder") String costOrder) {

        Long restaurantUserId = Long.valueOf(sessionToken.getClaim("id").toString());

        RestaurantUser restaurantUser =
                restaurantUserRepository.getRestaurantUserById(restaurantUserId);

        if (restaurantUser == null || restaurantUser.getRestaurant() == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Long restaurantId = restaurantUser.getRestaurant().getId();

        List<RestaurantTicketDTO> tickets =
                foodTicketRepository.findRestaurantTickets(
                        restaurantId,
                        fromDate,
                        toDate,
                        status,
                        costOrder
                );

        return Response.ok(tickets).build();
    }

    @GET
    @Path("/abrechnung")
    public Response getBilling(
            @QueryParam("fromDate") LocalDate fromDate,
            @QueryParam("toDate") LocalDate toDate) {

        Long restaurantUserId =
                Long.valueOf(sessionToken.getClaim("id").toString());

        RestaurantUser restaurantUser =
                restaurantUserRepository.getRestaurantUserById(restaurantUserId);

        if (restaurantUser == null || restaurantUser.getRestaurant() == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        if (fromDate == null || toDate == null) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("fromDate und toDate müssen angegeben werden.")
                    .build();
        }

        Long restaurantId = restaurantUser.getRestaurant().getId();

        long successful =
                foodTicketRepository.countSuccessfulTickets(
                        restaurantId, fromDate, toDate);

        Map<String, Long> costOrders =
                foodTicketRepository.countCostOrders(
                        restaurantId, fromDate, toDate);

        long failed =
                foodTicketRepository.countFailedTickets(
                        restaurantId, fromDate, toDate);

        return Response.ok(
                new RestaurantBillingDTO(
                        successful,
                        costOrders,
                        failed
                )
        ).build();
    }

    @GET
    @Path("/abrechnung/monthly")
    public Response getMonthlyBilling() {

        Long restaurantUserId =
                Long.valueOf(sessionToken.getClaim("id").toString());

        RestaurantUser restaurantUser =
                restaurantUserRepository.getRestaurantUserById(restaurantUserId);

        if (restaurantUser == null || restaurantUser.getRestaurant() == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Long restaurantId = restaurantUser.getRestaurant().getId();

        List<Object[]> result =
                foodTicketRepository.countTicketsPerMonth(restaurantId);

        List<MonthlyBillingDTO> months = new ArrayList<>();

        for (Object[] row : result) {
            int year = (Integer) row[0];
            int month = (Integer) row[1];
            long count = (Long) row[2];

            String monthName = switch (month) {
                case 1 -> "Januar";
                case 2 -> "Februar";
                case 3 -> "März";
                case 4 -> "April";
                case 5 -> "Mai";
                case 6 -> "Juni";
                case 7 -> "Juli";
                case 8 -> "August";
                case 9 -> "September";
                case 10 -> "Oktober";
                case 11 -> "November";
                case 12 -> "Dezember";
                default -> "";
            };

            months.add(new MonthlyBillingDTO(
                    monthName + " " + year,
                    count
            ));
        }

        return Response.ok(months).build();
    }
}
