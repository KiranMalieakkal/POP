package com.javatars.pop.repository;

import com.javatars.pop.model.Receipt;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class ReceiptRepository {

    ReceiptDbRepository receiptRepo;

    public ReceiptRepository(ReceiptDbRepository receiptRepo) {
        this.receiptRepo = receiptRepo;
    }

    public Receipt findById(long id) {
        return receiptRepo.findById(id);
    }
    public Receipt save(Receipt receipt) {
        return receiptRepo.save(receipt);
    }

    public void delete(Receipt receipt) {
        receiptRepo.delete(receipt);
    }

//    public List<ReceiptDtoOut> getReceipts(List<>, FilterDto filters) {
//        User user = userRepository.getReceipts(email);
//        if (user == null) return new ArrayList<>();
//        List<Receipt> receiptt = receiptRepo.;
//        if (user == null) return new ArrayList<>();
//
//    }
}
