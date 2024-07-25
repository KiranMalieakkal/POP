package com.javatars.pop.service;

import com.javatars.pop.model.Category;
import com.javatars.pop.repository.CategoryRepository;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category findByTitle(String title) {
        return categoryRepository.findByTitle(title);
    }
}
