package at.htl.boundary.dto;

import at.htl.model.Status;

import java.time.LocalDate;

public record RestaurantTicketDTO(
        Long ticketId,
        LocalDate useDate,
        String restaurant,
        String tier,
        Status status,
        String costOrder
) {
}
