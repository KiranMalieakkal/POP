package com.javatars.pop.repository;

import com.javatars.pop.model.TaxCategory;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface TaxCategoryDbRepository extends ListCrudRepository<TaxCategory, Long> {

    public TaxCategory getById(Long id);

}