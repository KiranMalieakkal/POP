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

    private final ProjectService projectService;
    private final CategoryService categoryService;

    public ReceiptService(ReceiptRepository receiptRepository, UserRepository userRepository, ProjectService projectService, CategoryService categoryService) {
        this.receiptRepository = receiptRepository;
        this.userRepository = userRepository;
        this.projectService = projectService;
        this.categoryService = categoryService;
    }

    public List<ReceiptDtoOut> getReceipts(String email) {
        User user = userRepository.getReceipts(email);
        if (user == null) return new ArrayList<>();
        return user.getReceipts().stream().map(Receipt::getDto).toList();
    }

    public List<ReceiptDtoOut> getReceipts(String email, FilterDto filters) {
        User user = userRepository.getReceipts(email);
        if (user == null) return new ArrayList<>();

        return user.getReceipts().stream()
                .filter(r -> filters.amountFrom() == null || r.getAmount() >= filters.amountFrom())
                .filter(r -> filters.amountTo() == null || r.getAmount() <= filters.amountTo())
                .filter(r -> filters.currency() == null || r.getCurrency().equals(filters.currency()))
                .filter(r -> filters.dateFrom() == null || !r.getPurchaseDate().isBefore(filters.dateFrom()))
                .filter(r -> filters.dateTo() == null || !r.getPurchaseDate().isAfter(filters.dateTo()))
                .filter(r -> filters.project() == null || (r.getProject() != null && r.getProject().getTitle().equals(filters.project())))
                .filter(r -> filters.category() == null || (r.getCategory() != null && r.getCategory().getTitle().equals(filters.category())))
                .map(Receipt::getDto)
                .toList();
    }


//..........................................................

    public Receipt findById(long id) {
       return receiptRepository.findById(id);
    }

    public Receipt save(Receipt receipt) {
        return receiptRepository.save(receipt);
    }

    public Project findProjectByTitle(String title) {
        return projectService.findByTitle(title);
    }

    public Category findCategoryByTitle(String title) {
        return categoryService.findByTitle(title);
    }

    public void delete(Receipt receipt) {
        receiptRepository.delete(receipt);
    }
}
