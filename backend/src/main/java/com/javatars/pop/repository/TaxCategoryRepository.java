package com.javatars.pop.repository;

import com.javatars.pop.model.TaxCategory;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TaxCategoryRepository {

    private final TaxCategoryDbRepository taxDbRepo;

    public TaxCategoryRepository(TaxCategoryDbRepository taxDbRepo) {
        this.taxDbRepo = taxDbRepo;
    }

    public List<TaxCategory> getTaxCategories() {
        return taxDbRepo.findAll();
    }

    public TaxCategory getTaxById(Long id) {
        return taxDbRepo.getById(id);
    }

    public void save(TaxCategory taxCategory) {
        taxDbRepo.save(taxCategory);
    }

    public TaxCategory findById(Long id) {
        return taxDbRepo.getById(id);
    }
}
