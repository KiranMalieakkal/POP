package com.javatars.pop.repository;

import com.javatars.pop.model.FilterDto;
import com.javatars.pop.model.Receipt;
import com.javatars.pop.model.ReceiptDtoOut;
import com.javatars.pop.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ReceiptRepository {

    ReceiptDbRepository receiptRepo;

    public ReceiptRepository(ReceiptDbRepository receiptRepo) {
        this.receiptRepo = receiptRepo;
    }

//    public List<ReceiptDtoOut> getReceipts(List<>, FilterDto filters) {
//        User user = userRepository.getReceipts(email);
//        if (user == null) return new ArrayList<>();
//        List<Receipt> receiptt = receiptRepo.;
//        if (user == null) return new ArrayList<>();
//
//    }
}
