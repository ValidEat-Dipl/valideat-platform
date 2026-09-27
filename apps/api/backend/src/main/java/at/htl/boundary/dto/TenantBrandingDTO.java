package at.htl.boundary.dto;

public record TenantBrandingDTO(
        BrandingDTO draft,
        BrandingDTO published
) {}
