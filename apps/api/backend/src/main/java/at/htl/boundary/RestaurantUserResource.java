package at.htl.boundary;

import at.htl.boundary.dto.LoginDTO;
import at.htl.boundary.dto.LoginResponseDTO;
import at.htl.model.Employee;
import at.htl.model.RestaurantUser;
import at.htl.repository.EmployeeRepository;
import at.htl.repository.RestaurantUserRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;

import java.time.LocalDate;
import java.util.List;

@Path("/restaurantUser")
public class RestaurantUserResource {

    @Inject
    RestaurantUserRepository restaurantUserRepository;


    @POST
    @Path("/login")
    public LoginResponseDTO login(LoginDTO loginDTO) {
        return restaurantUserRepository.login(loginDTO.email(), loginDTO.password());
    }

    @POST
    @Transactional
    @Path("/register")
    public String register(RestaurantUser restaurantUser) {
        return restaurantUserRepository.register(restaurantUser);
    }


}
