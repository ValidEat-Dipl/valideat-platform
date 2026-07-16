package at.htl.boundary.dto;

import java.util.List;

public record FoodTicketConflictResponseDTO(List<FoodTicketConflictDTO> conflicts, long count) {
}
