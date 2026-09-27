package at.htl.boundary.dto;

public record EditTenantDTO(
        String organisationName,
        String contactPerson,
        String email,
        String country,
        String primaryColor,
        String accentColor,
        String companySize
) {}
