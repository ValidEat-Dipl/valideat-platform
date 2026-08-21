package at.htl.repository;

import at.htl.boundary.dto.LoginResponseDTO;
import at.htl.model.Employee;
import at.htl.model.RestaurantUser;
import io.quarkus.elytron.security.common.BcryptUtil;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.NotAuthorizedException;

import java.time.Duration;
import java.util.List;

@ApplicationScoped
public class RestaurantUserRepository {
    @Inject
    EntityManager entityManager;

    public LoginResponseDTO login(String email, String password) {
        List<RestaurantUser> restaurantUsers = entityManager.createQuery("select ru from RestaurantUser ru where ru.email = :email", RestaurantUser.class)
                .setParameter("email", email).getResultList();

        if (restaurantUsers.isEmpty()) {
            throw new NotAuthorizedException("Invalid email or password");
        }

        if (restaurantUsers.size() > 1) {
            throw new NotAuthorizedException("Invalid email or password");
        }

        RestaurantUser restaurantUser = restaurantUsers.getFirst();

        if (BcryptUtil.matches(password, restaurantUser.getPasswordHash())) {
            String token = Jwt.issuer("ValidEat")
                    .subject(restaurantUser.getEmail())
                    .claim("id", restaurantUser.getId())
                    .claim("tenantId", restaurantUser.getTenant().getId())
                    .groups(restaurantUser.getRole().toString())
                    .expiresIn(Duration.ofHours(10))
                    .sign();
            return new LoginResponseDTO(token, restaurantUser.getId(), restaurantUser.getFirstName(), restaurantUser.getLastName(), restaurantUser.getEmail(), restaurantUser.getRole(), restaurantUser.getTenant());
        } else {
            return null;
        }
    }

    public String register(RestaurantUser restaurantUser) {
        try {
            restaurantUser.setPasswordHash(BcryptUtil.bcryptHash(restaurantUser.getPasswordHash()));
            entityManager.persist(restaurantUser);
        } catch (Exception e) {
            return e.getMessage();
        }

        return "New Employee Registered";
    }
}
