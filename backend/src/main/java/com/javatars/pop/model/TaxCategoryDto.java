package com.javatars.pop.model;

import java.util.List;

public record TaxCategoryDto (Long id, String title, String description, List<ProjectDto> projectDtoList) {
}
