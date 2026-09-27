package at.htl.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tenant_branding")
public class TenantBranding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(optional = false)
    @JoinColumn(name = "tenant_id", nullable = false, unique = true)
    private Tenant tenant;

    // Draft
    private String draftAppName;

    private String draftShortName;

    private String draftPrimaryColor;

    private String draftAccentColor;

    private String draftLogo;


    // Published
    private String publishedAppName;

    private String publishedShortName;

    private String publishedPrimaryColor;

    private String publishedAccentColor;

    private String publishedLogo;


    public TenantBranding() {
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

    public String getDraftAppName() {
        return draftAppName;
    }

    public void setDraftAppName(String draftAppName) {
        this.draftAppName = draftAppName;
    }

    public String getDraftShortName() {
        return draftShortName;
    }

    public void setDraftShortName(String draftShortName) {
        this.draftShortName = draftShortName;
    }

    public String getDraftPrimaryColor() {
        return draftPrimaryColor;
    }

    public void setDraftPrimaryColor(String draftPrimaryColor) {
        this.draftPrimaryColor = draftPrimaryColor;
    }

    public String getDraftAccentColor() {
        return draftAccentColor;
    }

    public void setDraftAccentColor(String draftAccentColor) {
        this.draftAccentColor = draftAccentColor;
    }

    public String getDraftLogo() {
        return draftLogo;
    }

    public void setDraftLogo(String draftLogo) {
        this.draftLogo = draftLogo;
    }

    public String getPublishedAppName() {
        return publishedAppName;
    }

    public void setPublishedAppName(String publishedAppName) {
        this.publishedAppName = publishedAppName;
    }

    public String getPublishedShortName() {
        return publishedShortName;
    }

    public void setPublishedShortName(String publishedShortName) {
        this.publishedShortName = publishedShortName;
    }

    public String getPublishedPrimaryColor() {
        return publishedPrimaryColor;
    }

    public void setPublishedPrimaryColor(String publishedPrimaryColor) {
        this.publishedPrimaryColor = publishedPrimaryColor;
    }

    public String getPublishedAccentColor() {
        return publishedAccentColor;
    }

    public void setPublishedAccentColor(String publishedAccentColor) {
        this.publishedAccentColor = publishedAccentColor;
    }

    public String getPublishedLogo() {
        return publishedLogo;
    }

    public void setPublishedLogo(String publishedLogo) {
        this.publishedLogo = publishedLogo;
    }
}
