package at.htl.boundary;

import at.htl.model.CostOrder;
import at.htl.repository.CostOrderRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;

import java.util.List;

@Path("/costOrder")
public class CostOrderResource {

    @Inject
    CostOrderRepository costOrderRepository;

    @GET
    public List<CostOrder> getAllCostOrders() {
        return costOrderRepository.findAll();
    }
}
