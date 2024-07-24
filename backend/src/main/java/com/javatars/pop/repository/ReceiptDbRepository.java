package com.javatars.pop.repository;

import com.javatars.pop.model.Receipt;
import org.springframework.data.repository.ListCrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReceiptDbRepository extends ListCrudRepository<Receipt, Long> {

}
