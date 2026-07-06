package at.htl.boundary;

import at.htl.repository.AdminDocumentationEntryRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/api/admin-documentation-entry")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class AdminDocumentationResource {

    @Inject
    AdminDocumentationEntryRepository adminDocumentationEntryRepository;

}
