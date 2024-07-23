package com.javatars.pop.repository;

import com.javatars.pop.model.Receipt;
import org.springframework.data.repository.ListCrudRepository;

public interface ReceiptDbRepository extends ListCrudRepository<Receipt, Long> {

}
