package at.htl.boundary.dto;

public record TenantModuleDTO(
        Long id,
        String name,
        String description,
        boolean enabled
) {}
