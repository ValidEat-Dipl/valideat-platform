package at.htl.boundary;

import at.htl.boundary.dto.CreateTenantDTO;
import at.htl.boundary.dto.TenantOverviewDTO;
import at.htl.model.Employee;
import at.htl.model.Tenant;
import at.htl.repository.EmployeeRepository;
import at.htl.repository.SaaSAdminRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/saas-admin")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SaasAdminResource {

    @Inject
    SaaSAdminRepository saasAdminRepository;
    @Inject
    EmployeeRepository employeeRepository;

    @POST
    @Path("/tenant")
    public Response createTenant(CreateTenantDTO dto) {

        Tenant tenant = saasAdminRepository.createTenant(dto);

        return Response.status(Response.Status.CREATED)
                .entity(tenant)
                .build();
    }

    @GET
    @Path("/tenants")
    public List<TenantOverviewDTO> getTenantOverviews() {
        return saasAdminRepository.getTenantOverviews();
    }

    @GET
    @Path("/tenant/{id}")
    public Response getTenant(@PathParam("id") Long id) {

        Tenant tenant = saasAdminRepository.findTenantById(id);

        if (tenant == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(tenant).build();
    }

    @GET
    @Path("/tenantByManager/{id}")
    public List<Tenant> getMyTenants(@PathParam("id") Long saasAdminId) {
        Employee saasAdmin = employeeRepository.getEmpById(saasAdminId);
        return saasAdminRepository.findTenantBySaaSAdminId(saasAdmin.getFirstName() + " " + saasAdmin.getLastName());
    }

    @PUT
    @Path("/assign/{tenantId}/{empId}")
    @Transactional
    public Response assignEmpToTenant(@PathParam("tenantId") Long tenantId, @PathParam("empId") Long empId) {
        Tenant tenant = saasAdminRepository.findTenantById(tenantId);
        Employee employee = employeeRepository.getEmpById(empId);
        return saasAdminRepository.assignEmpToTenant(tenant, employee);
    }
}