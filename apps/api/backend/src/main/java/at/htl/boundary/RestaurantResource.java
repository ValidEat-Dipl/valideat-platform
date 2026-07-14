package at.htl.boundary;

import at.htl.model.Restaurant;
import at.htl.repository.RestaurantRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

import java.util.List;

@Path("/restaurant")
public class RestaurantResource {

    @Inject
    RestaurantRepository restaurantRepository;

    @GET
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }
}
