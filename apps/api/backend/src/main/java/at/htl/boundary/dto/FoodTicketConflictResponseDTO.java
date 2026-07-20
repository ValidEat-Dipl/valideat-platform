package at.htl.boundary.dto;

import java.util.List;
import java.util.Map;

public record FoodTicketConflictResponseDTO(List<FoodTicketConflictDTO> tickets, Map<String, Integer> infoBox) {}
