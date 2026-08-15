package at.htl.boundary.dto;

import at.htl.model.Role;
import at.htl.model.Tenant;

public record LoginResponseDTO(
        String token,
        Long id,
        String firstName,
        String lastName,
        String email,
        Role role,
        Tenant tenant
) {
}
