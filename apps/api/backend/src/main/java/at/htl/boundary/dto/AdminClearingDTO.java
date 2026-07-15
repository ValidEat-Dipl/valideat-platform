package at.htl.boundary.dto;

import at.htl.model.ChangeLog;
import at.htl.model.Status;

import java.time.LocalDate;

public record AdminClearingDTO(Long empTicketId, String empTicketEmpName, String empTicketTier, String empTicketCostOrder, String empTicketRestaurant, ChangeLog empTicketLog, LocalDate empTicketUseDate, LocalDate empTicketCheckDate, Status empTicketStatus, String empTicketConflict,
                               Long adminTicketId, String adminTicketEmpName, String adminTicketTier, String adminTicketCostOrder, String adminTicketRestaurant, ChangeLog adminTicketLog, LocalDate adminTicketUseDate, LocalDate adminTicketCheckDatem, Status adminTicketStatus, String adminTicketConflict) {
}
