package at.htl.boundary;

import at.htl.boundary.dto.*;
import at.htl.model.Employee;
import at.htl.model.Restaurant;
import at.htl.model.RestaurantUser;
import at.htl.model.Tenant;
import at.htl.repository.EmployeeRepository;
import at.htl.repository.RestaurantRepository;
import at.htl.repository.RestaurantUserRepository;
import at.htl.repository.SaaSAdminRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.JsonWebToken;

import java.util.List;

@Path("/saas-admin")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class SaasAdminResource {

    @Inject
    SaaSAdminRepository saasAdminRepository;
    @Inject
    EmployeeRepository employeeRepository;

    @Inject
    JsonWebToken sessionToken;
    @Inject
    RestaurantRepository restaurantRepository;
    @Inject
    RestaurantUserRepository restaurantUserRepository;

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
    @Path("/tenant-overview")
    public TenantOverviewDTO getTenantOverview() {

        Long tenantId = Long.valueOf(sessionToken.getClaim("tenantId").toString()
        );

        return saasAdminRepository.getTenantOverview(tenantId);
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
    @Path("/assign/{empId}")
    @Transactional
    public Response assignEmpToTenant(@PathParam("empId") Long empId) {
        Long tenantId = Long.valueOf(sessionToken.getClaim("tenantId").toString());
        Tenant tenant = saasAdminRepository.findTenantById(tenantId);
        Employee employee = employeeRepository.findById(empId);
        return saasAdminRepository.assignEmpToTenant(tenant, employee);
    }

    @PUT
    @Path("/restaurant/{restaurantId}")
    @Transactional
    public Response assignRestaurantToTenant(
            @PathParam("restaurantId") Long restaurantId) {

        Long tenantId = Long.valueOf(sessionToken.getClaim("tenantId").toString());
        Tenant tenant = saasAdminRepository.findTenantById(tenantId);
        Restaurant restaurant = restaurantRepository.findById(restaurantId);

        return saasAdminRepository.assignRestaurantToTenant(
                tenant, restaurant
        );
    }

    @PUT
    @Path("/restaurant/{restaurantId}/user/{userId}")
    @Transactional
    public Response assignUserToRestaurant(
            @PathParam("restaurantId") Long restaurantId,
            @PathParam("userId") Long userId) {

        Long tenantId = Long.valueOf(sessionToken.getClaim("tenantId").toString());
        Tenant tenant = saasAdminRepository.findTenantById(tenantId);
        Restaurant restaurant = restaurantRepository.findById(restaurantId);
        RestaurantUser restaurantUser = restaurantUserRepository.findById(userId);

        return saasAdminRepository.assignUserToRestaurant(
                tenant,
                restaurant,
                restaurantUser
        );
    }

    @POST
    @Path("/tier")
    @Transactional
    @Consumes(MediaType.TEXT_PLAIN)
    public Response createTier(String name, @QueryParam("discount") double discount) {

        Long tenantId = Long.valueOf(sessionToken.getClaim("tenantId").toString());
        Tenant tenant = saasAdminRepository.findTenantById(tenantId);

        return saasAdminRepository.createTier(name, discount, tenant);
    }

    @POST
    @Path("/costorder")
    @Transactional
    @Consumes(MediaType.TEXT_PLAIN)
    public Response createCostOrder(String name) {

        Long tenantId = Long.valueOf(sessionToken.getClaim("tenantId").toString());
        Tenant tenant = saasAdminRepository.findTenantById(tenantId);

        return saasAdminRepository.createCostOrder(name, tenant);
    }

    @GET
    @Path("/unassigned-employees")
    public List<UnassignedEmpDTO> findEmpWithoutTenant() {
        return saasAdminRepository.findEmpWithoutTenant();
    }

    @PUT
    @Path("/assign/{tenantId}/{empId}")
    @Transactional
    public Response assignEmpToFixedTenant(@PathParam("tenantId") Long tenantId, @PathParam("empId") Long empId) {
        Tenant tenant = saasAdminRepository.findTenantById(tenantId);
        Employee employee = employeeRepository.findById(empId);
        if (employee.getTenant() == null) {
            return saasAdminRepository.assignEmpToTenant(tenant, employee);
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @PUT
    @Path("tenant/{id}")
    @Transactional
    public Response editTenant(@PathParam("id") Long tenantId, EditTenantDTO dto) {
        saasAdminRepository.updateTenant(tenantId, dto);

        return Response.ok().build();
    }


    @GET
    @Path("tenant/{tenantId}/modules")
    public List<TenantModuleDTO> getModules(
            @PathParam("tenantId") Long tenantId) {

        return saasAdminRepository.getModulesForTenant(tenantId);
    }


    @PUT
    @Path("tenant/{tenantId}/modules")
    @Transactional
    public Response updateModules(
            @PathParam("tenantId") Long tenantId,
            UpdateModulesDTO dto) {

        saasAdminRepository.updateModules(
                tenantId,
                dto.moduleIds()
        );

        return Response.ok().build();
    }




    @GET
    @Path("tenant/{tenantId}/rules")
    public TenantRulesDTO getRules(
            @PathParam("tenantId") Long tenantId) {

        return saasAdminRepository.getTenantRules(tenantId);
    }


    @PUT
    @Path("tenant/{tenantId}/rules")
    @Transactional
    public Response updateRules(
            @PathParam("tenantId") Long tenantId,
            TenantRulesDTO dto) {

        saasAdminRepository.updateTenantRules(
                tenantId,
                dto
        );

        return Response.ok().build();
    }


    @GET
    @Path("tenant/{tenantId}/branding")
    public TenantBrandingDTO getBranding(
            @PathParam("tenantId") Long tenantId) {

        return saasAdminRepository.getTenantBranding(tenantId);
    }


    @PUT
    @Path("tenant/{tenantId}/branding")
    @Transactional
    public Response updateBranding(
            @PathParam("tenantId") Long tenantId,
            BrandingDTO dto) {

        saasAdminRepository.updateBranding(
                tenantId,
                dto
        );

        return Response.ok().build();
    }


    @POST
    @Path("tenant/{tenantId}/branding/publish")
    @Transactional
    public Response publishBranding(
            @PathParam("tenantId") Long tenantId) {

        saasAdminRepository.publishBranding(tenantId);

        return Response.ok().build();
    }

}