package at.htl.boundary.dto;

import at.htl.model.UsageDay;

import java.util.List;

public record TenantRulesDTO(
        List<UsageDay> usageDays,
        boolean restaurantRequired,
        boolean correctionHints
) {}
