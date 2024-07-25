package com.javatars.pop.repository;

import com.javatars.pop.model.Category;
import org.springframework.stereotype.Repository;

@Repository
public class CategoryRepository {

    private final CategoryDbRepository categoryDbRepository;
    public CategoryRepository(CategoryDbRepository categoryDbRepository) {
        this.categoryDbRepository = categoryDbRepository;
    }

    public Category findByTitle(String title) {
        return categoryDbRepository.findByTitle(title);
    }
}
