package at.htl.boundary.dto;

public record TenantOverviewDTO(Long tenantId, String tenantName, String manager, String email, String country, String companySize, long employeeCount, long adminCount, long restaurantCount, long costOrderCount, long tierCount, long foodTicketCount) {
}
