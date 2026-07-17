package at.htl.boundary.dto;

import at.htl.model.ChangeLog;
import at.htl.model.Status;

import java.time.LocalDate;
import java.util.List;

public record FoodTicketConflictDTO(Long id, String empName, LocalDate useDate, String conflict, String wrongField, Status status, String adminName,List<ChangeLog> changeLogs) {
}
