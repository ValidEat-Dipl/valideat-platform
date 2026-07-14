package at.htl.boundary.dto;

import at.htl.model.Status;

import java.time.LocalDate;

public record EmployeeGetTicketsDTO(Long id, String firstName, String lastName, LocalDate useDate, String tier, String costOrder, String restaurantName, Status status, LocalDate checkDate) {
}
