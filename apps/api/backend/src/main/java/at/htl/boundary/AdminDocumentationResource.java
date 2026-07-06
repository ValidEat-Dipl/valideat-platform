package at.htl.boundary;

import at.htl.model.AdminDocumentation;
import at.htl.repository.AdminDocumentationRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

import java.util.List;

@Path("/api/admin-documentation")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AdminDocumentationResource {

    @Inject
    AdminDocumentationRepository adminDocumentationRepository;

    @GET
    public List<AdminDocumentation> getAllAdminDocumentations() {
        return adminDocumentationRepository.getAllAdminDocumentations();
    }

}
