package at.htl.model;

import jakarta.persistence.*;

import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name = "tenant_rules")
public class TenantRules {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "tenant_id", nullable = false, unique = true)
    private Tenant tenant;

    @ElementCollection
    @Enumerated(EnumType.STRING)
    @CollectionTable(
            name = "tenant_usage_days",
            joinColumns = @JoinColumn(name = "tenant_rules_id")
    )
    @Column(name = "usage_day", nullable = false)
    private List<UsageDay> usageDays = new LinkedList<>();

    @Column(nullable = false)
    private boolean restaurantRequired;

    @Column(nullable = false)
    private boolean correctionHints;

    public TenantRules() {
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

    public List<UsageDay> getUsageDays() {
        return usageDays;
    }

    public void setUsageDays(List<UsageDay> usageDays) {
        this.usageDays = usageDays;
    }

    public boolean isRestaurantRequired() {
        return restaurantRequired;
    }

    public void setRestaurantRequired(boolean restaurantRequired) {
        this.restaurantRequired = restaurantRequired;
    }

    public boolean isCorrectionHints() {
        return correctionHints;
    }

    public void setCorrectionHints(boolean correctionHints) {
        this.correctionHints = correctionHints;
    }
}
