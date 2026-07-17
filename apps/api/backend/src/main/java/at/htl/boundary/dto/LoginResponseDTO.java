package at.htl.boundary.dto;

import at.htl.model.Role;

public record LoginResponseDTO(
        String token,
        Long id,
        String firstName,
        String lastName,
        String email,
        Role role
) {
}
