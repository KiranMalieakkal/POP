package com.javatars.pop.service;

import com.javatars.pop.model.Receipt;
import com.javatars.pop.repository.ReceiptRepository;
import com.javatars.pop.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceiptService {

    ReceiptRepository receiptRepository;
    UserRepository userRepository;

    public ReceiptService(ReceiptRepository receiptRepository, UserRepository userRepository) {
        this.receiptRepository = receiptRepository;
        this.userRepository = userRepository;
    }

//    public List<Receipt> getReceipts(String email) {
//        return userRepository.getReceipts(email);
//    }
}
