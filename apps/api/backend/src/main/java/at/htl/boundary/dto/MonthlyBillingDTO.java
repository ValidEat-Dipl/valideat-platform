package at.htl.boundary.dto;

public record MonthlyBillingDTO(
        String month,
        long validTickets
) {}
