package at.htl.repository;

import at.htl.boundary.dto.*;
import at.htl.model.*;
import at.htl.model.Module;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.core.Response;

import java.util.LinkedList;
import java.util.List;

@ApplicationScoped
public class SaaSAdminRepository {

    @Inject
    EntityManager entityManager;

    @Transactional
    public Tenant createTenant(CreateTenantDTO dto) {

        Tenant tenant = new Tenant(
                null,
                dto.name(),
                dto.manager(),
                dto.email(),
                dto.country(),
                dto.companySize(),
                dto.primaryColor(),
                dto.accentColor()
        );

        entityManager.persist(tenant);

        return tenant;
    }

    public List<TenantOverviewDTO> getTenantOverviews() {

        List<Tenant> tenants = entityManager.createQuery(
                "select t from Tenant t order by t.name",
                Tenant.class
        ).getResultList();

        return tenants.stream()
                .map(tenant -> new TenantOverviewDTO(
                        tenant.getId(),
                        tenant.getName(),
                        tenant.getManager(),
                        tenant.getEmail(),
                        tenant.getCountry(),
                        tenant.getCompanySize(),

                        entityManager.createQuery("""
                                select count(e)
                                from Employee e
                                where e.tenant.id = :tenantId
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult(),

                        entityManager.createQuery("""
                                select count(e)
                                from Employee e
                                where e.tenant.id = :tenantId
                                and e.role = at.htl.model.Role.ADMIN
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult(),

                        entityManager.createQuery("""
                                select count(r)
                                from Restaurant r
                                where r.tenant.id = :tenantId
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult(),

                        entityManager.createQuery("""
                                select count(c)
                                from CostOrder c
                                where c.tenant.id = :tenantId
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult(),

                        entityManager.createQuery("""
                                select count(t)
                                from Tier t
                                where t.tenant.id = :tenantId
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult(),

                        entityManager.createQuery("""
                                select count(f)
                                from FoodTicket f
                                where f.tenant.id = :tenantId
                                """, Long.class)
                                .setParameter("tenantId", tenant.getId())
                                .getSingleResult()
                ))
                .toList();
    }

    public TenantOverviewDTO getTenantOverview(Long tenantId) {

        Tenant tenant = entityManager.createQuery("""
            select t
            from Tenant t
            where t.id = :tenantId
            """, Tenant.class)
                .setParameter("tenantId", tenantId)
                .getSingleResult();

        return new TenantOverviewDTO(
                tenant.getId(),
                tenant.getName(),
                tenant.getManager(),
                tenant.getEmail(),
                tenant.getCountry(),
                tenant.getCompanySize(),

                entityManager.createQuery("""
                    select count(e)
                    from Employee e
                    where e.tenant.id = :tenantId
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult(),

                entityManager.createQuery("""
                    select count(e)
                    from Employee e
                    where e.tenant.id = :tenantId
                    and e.role = at.htl.model.Role.ADMIN
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult(),

                entityManager.createQuery("""
                    select count(r)
                    from Restaurant r
                    where r.tenant.id = :tenantId
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult(),

                entityManager.createQuery("""
                    select count(c)
                    from CostOrder c
                    where c.tenant.id = :tenantId
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult(),

                entityManager.createQuery("""
                    select count(t)
                    from Tier t
                    where t.tenant.id = :tenantId
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult(),

                entityManager.createQuery("""
                    select count(f)
                    from FoodTicket f
                    where f.tenant.id = :tenantId
                    """, Long.class)
                        .setParameter("tenantId", tenantId)
                        .getSingleResult()
        );
    }

    public Tenant findTenantById(Long id) {
        return entityManager.find(Tenant.class, id);
    }

    public List<Tenant> findTenantBySaaSAdminId(String name) {
        System.out.println(name);
        return entityManager.createQuery("select t from Tenant t where t.manager like :managerName ", Tenant.class).setParameter("managerName", name).getResultList();
    }

    public Response assignEmpToTenant(Tenant tenant, Employee employee) {
        if (employee == null || tenant == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        employee.setTenant(tenant);

        return Response.ok().build();
    }

    public Response assignRestaurantToTenant(Tenant tenant, Restaurant restaurant) {
        if (restaurant == null || tenant == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        restaurant.setTenant(tenant);

        return Response.ok().build();
    }

    public Response assignUserToRestaurant(Tenant tenant, Restaurant restaurant, RestaurantUser restaurantUser) {if (restaurant == null || restaurantUser == null) {
        return Response.status(Response.Status.NOT_FOUND).build();
    }

        if (restaurant.getTenant() == null || !restaurant.getTenant().getId().equals(tenant.getId())) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        if (restaurantUser.getTenant() == null || !restaurantUser.getTenant().getId().equals(tenant.getId())) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }

        restaurantUser.setRestaurant(restaurant);

        return Response.ok().build();
    }

    public Response createTier(String name, double discount, Tenant tenant) {
        if (tenant == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        Tier tier = new Tier();
        tier.setName(name);
        tier.setDiscount(discount);
        tier.setTenant(tenant);

        entityManager.persist(tier);

        return Response.ok(tier).build();
    }

    @Transactional
    public Response createCostOrder(String name, Tenant tenant) {
        if (tenant == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        CostOrder costOrder = new CostOrder();
        costOrder.setName(name);
        costOrder.setTenant(tenant);

        entityManager.persist(costOrder);

        return Response.ok(costOrder).build();
    }

    public List<UnassignedEmpDTO> findEmpWithoutTenant() {
        return entityManager.createQuery("select new at.htl.boundary.dto.UnassignedEmpDTO(e.id, e.firstName, e.lastName, e.email, e.role) from Employee e where e.tenant is null", UnassignedEmpDTO.class).getResultList();
    }

    public void updateTenant(Long id, EditTenantDTO dto) {
        Tenant tenant = entityManager.find(Tenant.class, id);

        if (tenant == null) {
            throw new IllegalArgumentException("Tenant not found");
        }

        tenant.setName(dto.organisationName());
        tenant.setManager(dto.contactPerson());
        tenant.setEmail(dto.email());
        tenant.setCountry(dto.country());
        tenant.setPrimaryColor(dto.primaryColor());
        tenant.setAccentColor(dto.accentColor());
        tenant.setCompanySize(dto.companySize());

        entityManager.merge(tenant);
    }

    public List<TenantModuleDTO> getModulesForTenant(Long tenantId) {
        if (findTenantById(tenantId) == null) {
            throw new NotFoundException();
        }

        List<Module> modules = entityManager.createQuery("""
            select m
            from Module m
            """, Module.class)
                .getResultList();

        List<TenantModule> tenantModules = entityManager.createQuery("""
            select tm
            from TenantModule tm
            where tm.tenant.id = :tenantId
            """, TenantModule.class)
                .setParameter("tenantId", tenantId)
                .getResultList();

        List<TenantModuleDTO> result = new LinkedList<>();

        for (Module module : modules) {

            boolean enabled = false;

            for (TenantModule tenantModule : tenantModules) {
                if (tenantModule.getModule().getId().equals(module.getId())) {
                    enabled = true;
                    break;
                }
            }

            result.add(new TenantModuleDTO(
                    module.getId(),
                    module.getName(),
                    module.getDescription(),
                    enabled
            ));
        }

        return result;
    }


    public void updateModules(Long tenantId, List<Long> moduleIds) {

        entityManager.createQuery("""
            delete from TenantModule tm
            where tm.tenant.id = :tenantId
            """)
                .setParameter("tenantId", tenantId)
                .executeUpdate();

        for (Long moduleId : moduleIds) {

            Tenant tenant = entityManager.find(Tenant.class, tenantId);
            Module module = entityManager.find(Module.class, moduleId);

            if (tenant == null) {
                throw new IllegalArgumentException("Tenant not found");
            }

            if (module == null) {
                throw new IllegalArgumentException("Module not found: " + moduleId);
            }

            TenantModule tenantModule = new TenantModule();
            tenantModule.setTenant(tenant);
            tenantModule.setModule(module);

            entityManager.persist(tenantModule);
        }
    }

    public TenantRulesDTO getTenantRules(Long tenantId) {

        TenantRules rules = entityManager.createQuery("""
            select r
            from TenantRules r
            where r.tenant.id = :tenantId
            """, TenantRules.class)
                .setParameter("tenantId", tenantId)
                .getSingleResult();

        return new TenantRulesDTO(
                rules.getUsageDays(),
                rules.isRestaurantRequired(),
                rules.isCorrectionHints()
        );
    }

    public void updateTenantRules(Long tenantId, TenantRulesDTO dto) {

        TenantRules rules;

        List<TenantRules> result = entityManager.createQuery("""
            select r
            from TenantRules r
            where r.tenant.id = :tenantId
            """, TenantRules.class)
                .setParameter("tenantId", tenantId)
                .getResultList();

        if (result.isEmpty()) {

            Tenant tenant = entityManager.find(Tenant.class, tenantId);

            if (tenant == null) {
                throw new IllegalArgumentException("Tenant not found");
            }

            rules = new TenantRules();
            rules.setTenant(tenant);

            entityManager.persist(rules);

        } else {
            rules = result.getFirst();
        }

        rules.setUsageDays(dto.usageDays());
        rules.setRestaurantRequired(dto.restaurantRequired());
        rules.setCorrectionHints(dto.correctionHints());
    }

    public TenantBrandingDTO getTenantBranding(Long tenantId) {
        if (findTenantById(tenantId) == null) {
            throw new NotFoundException();
        }


        TenantBranding branding = entityManager.createQuery("""
            select b
            from TenantBranding b
            where b.tenant.id = :tenantId
            """, TenantBranding.class)
                .setParameter("tenantId", tenantId)
                .getSingleResult();

        BrandingDTO draft = new BrandingDTO(
                branding.getDraftAppName(),
                branding.getDraftShortName(),
                branding.getDraftPrimaryColor(),
                branding.getDraftAccentColor(),
                branding.getDraftLogo()
        );

        BrandingDTO published = new BrandingDTO(
                branding.getPublishedAppName(),
                branding.getPublishedShortName(),
                branding.getPublishedPrimaryColor(),
                branding.getPublishedAccentColor(),
                branding.getPublishedLogo()
        );

        return new TenantBrandingDTO(draft, published);
    }

    public void updateBranding(Long tenantId, BrandingDTO dto) {

        TenantBranding branding;

        List<TenantBranding> result = entityManager.createQuery("""
            select b
            from TenantBranding b
            where b.tenant.id = :tenantId
            """, TenantBranding.class)
                .setParameter("tenantId", tenantId)
                .getResultList();

        if (result.isEmpty()) {

            Tenant tenant = entityManager.find(Tenant.class, tenantId);

            if (tenant == null) {
                throw new IllegalArgumentException("Tenant not found");
            }

            branding = new TenantBranding();
            branding.setTenant(tenant);

            entityManager.persist(branding);

        } else {
            branding = result.getFirst();
        }

        branding.setDraftAppName(dto.appName());
        branding.setDraftShortName(dto.shortName());
        branding.setDraftPrimaryColor(dto.primaryColor());
        branding.setDraftAccentColor(dto.accentColor());
        branding.setDraftLogo(dto.logo());
    }


    public void publishBranding(Long tenantId) {

        TenantBranding branding = entityManager.createQuery("""
            select b
            from TenantBranding b
            where b.tenant.id = :tenantId
            """, TenantBranding.class)
                .setParameter("tenantId", tenantId)
                .getSingleResult();

        branding.setPublishedAppName(branding.getDraftAppName());
        branding.setPublishedShortName(branding.getDraftShortName());
        branding.setPublishedPrimaryColor(branding.getDraftPrimaryColor());
        branding.setPublishedAccentColor(branding.getDraftAccentColor());
        branding.setPublishedLogo(branding.getDraftLogo());
    }
}