package at.htl.boundary.dto;

public record CreateTenantDTO(String name, String manager, String email, String country, String companySize) {
}
