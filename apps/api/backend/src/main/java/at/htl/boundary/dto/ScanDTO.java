package at.htl.boundary.dto;

import at.htl.model.Status;

import java.time.LocalDate;

public record ScanDTO(
        LocalDate date,
        String tier,
        String costOrder,
        Status status
) {
}
