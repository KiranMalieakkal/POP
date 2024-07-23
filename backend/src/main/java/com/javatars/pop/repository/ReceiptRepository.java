package com.javatars.pop.repository;

import org.springframework.stereotype.Repository;

@Repository
public class ReceiptRepository {

    ReceiptDbRepository receiptRepo;

    public ReceiptRepository(ReceiptDbRepository receiptRepo) {
        this.receiptRepo = receiptRepo;
    }
}
