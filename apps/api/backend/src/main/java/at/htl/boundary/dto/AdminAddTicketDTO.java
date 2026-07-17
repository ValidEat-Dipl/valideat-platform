package at.htl.boundary.dto;

import at.htl.model.Status;

import java.time.LocalDate;

public record AdminAddTicketDTO(LocalDate useDate, String employeeName, String costOrder, String tier, String restaurantName, String adminName, Status status, String description) {
}
