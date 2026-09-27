package at.htl.boundary.dto;

import at.htl.model.Role;

public record UnassignedEmpDTO(Long id, String firstname, String lastname, String email, Role role) {
}
