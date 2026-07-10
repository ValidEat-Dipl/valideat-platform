package at.htl.boundary.dto;

import java.time.LocalDate;

public record EmployeeFoodTicketDTO(LocalDate date, String employeeName, String costOrder, String tier, String restaurantName) {
}
