package at.htl.boundary.dto;

import at.htl.model.Status;
import at.htl.model.TicketType;

import java.time.LocalDate;

public record EmployeeGetTicketsDTO(Long id, String firstName, String lastName, LocalDate useDate, String tier, String costOrder, String restaurantName, Status status, LocalDate checkDate, String adminFirstName, String adminLastName, TicketType ticketType) {
}
