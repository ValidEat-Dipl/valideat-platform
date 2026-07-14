package at.htl.boundary;

import at.htl.model.Tier;
import at.htl.repository.TierRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

import java.util.List;

@Path("/tier")
public class TierResource {

    @Inject
    TierRepository tierRepository;

    @GET
    public List<Tier> getAllTiers() {
        return tierRepository.findAll();
    }
}
