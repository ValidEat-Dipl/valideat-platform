package at.htl.model;

import jakarta.persistence.*;

@Entity
@Table(
        name = "tenant_module",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"tenant_id", "module_id"})
        }
)
public class TenantModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Tenant tenant;

    @ManyToOne
    private Module module;

    public TenantModule(){}

    public TenantModule(Tenant tenant, Module module) {
        this.tenant = tenant;
        this.module = module;
    }

    public Long getId() {
        return id;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }
}
