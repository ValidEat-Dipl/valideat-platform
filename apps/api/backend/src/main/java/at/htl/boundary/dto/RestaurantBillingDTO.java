package at.htl.boundary.dto;

import java.util.Map;

public record RestaurantBillingDTO(
        long successful,
        Map<String, Long> costOrders,
        long failed
) {}
