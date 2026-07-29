package at.htl.boundary;


import at.htl.blockchain.ValidEatBlockchainService;
import at.htl.boundary.dto.LogRequest;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;


@Path("/logs")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class LogResource {


    @Inject
    ValidEatBlockchainService blockchain;



    @POST
    public String addLog(LogRequest request)
            throws Exception {
        blockchain.addLog(
                request.message
        );

        return "Blockchain Log gespeichert";
    }

    @GET
    public Object getLogs()
            throws Exception {
        return blockchain.getLogs();
    }
}