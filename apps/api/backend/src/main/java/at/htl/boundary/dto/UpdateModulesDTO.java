package at.htl.boundary.dto;

import java.util.List;

public record UpdateModulesDTO(
        List<Long> moduleIds
) {}
