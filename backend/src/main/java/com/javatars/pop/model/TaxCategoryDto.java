package com.javatars.pop.model;

import java.util.List;

public record TaxCategoryDto (Long id,
                              String title,
                              String description,
                              String form,
                              String section,
                              String paragraph,
                              List<ProjectDto> projectDtoList) {
}
