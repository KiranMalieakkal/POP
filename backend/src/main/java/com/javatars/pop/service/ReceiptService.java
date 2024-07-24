package com.javatars.pop.service;

import com.javatars.pop.model.*;
import com.javatars.pop.repository.ReceiptRepository;
import com.javatars.pop.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReceiptService {

    ReceiptRepository receiptRepository;
    UserRepository userRepository;

    public ReceiptService(ReceiptRepository receiptRepository, UserRepository userRepository) {
        this.receiptRepository = receiptRepository;
        this.userRepository = userRepository;
    }

    public List<ReceiptDtoOut> getReceipts(String email) {
        User user = userRepository.getReceipts(email);
        if (user == null) return new ArrayList<>();
        return user.getReceipts().stream().map(Receipt::getDto).toList();
    }
}
