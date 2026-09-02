package at.htl.boundary.dto;

import java.util.List;

public record RestaurantOverviewDTO(
        long totalScans,
        long successfulScans,
        long failedScans,
        List<ScanDTO> lastScans
) {
}
