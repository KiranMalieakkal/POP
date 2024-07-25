package com.javatars.pop.repository;

import com.javatars.pop.model.Receipt;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReceiptDbRepository extends ListCrudRepository<Receipt, Long> {

    Receipt findById(long id);
}
