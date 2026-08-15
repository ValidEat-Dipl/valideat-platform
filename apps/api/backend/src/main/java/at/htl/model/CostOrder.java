package at.htl.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class CostOrder {

    @Id
    private String name;

    @ManyToOne
    @JoinColumn(nullable = true, name = "tenant_id")
    private Tenant tenant;

    public CostOrder() {
    }

    public CostOrder(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }
}
