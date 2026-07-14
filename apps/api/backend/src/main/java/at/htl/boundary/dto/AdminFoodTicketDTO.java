package at.htl.boundary.dto;

import at.htl.model.Status;

import java.time.LocalDate;

public record AdminFoodTicketDTO(Long id, String employeeName, LocalDate useDate, String tier, String costOrder, Status status, String adminName, LocalDate checkDate) {
}
