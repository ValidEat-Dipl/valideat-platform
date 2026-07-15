package at.htl.boundary.dto;

import java.time.LocalDate;

public record AdminAddTicketDTO(LocalDate useDate, String employeeName, String costOrder, String tier, String restaurantName, String adminName) {
}
