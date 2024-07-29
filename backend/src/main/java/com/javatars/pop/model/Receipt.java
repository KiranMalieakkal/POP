package com.javatars.pop.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter @Setter
public class Receipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    String company;
    double amount;
    String currency;
    LocalDate purchaseDate;
    @Column(columnDefinition = "TEXT")
    String textContent;
    String fileName;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;

    // One to One
    @ManyToOne()
    @JoinColumn(name="category_id")
    private Category category;

    // One to One
    @ManyToOne()
    @JoinColumn(name="project_id")
    private Project project;

    public ReceiptDtoOut getDtoOut() {
        return new ReceiptDtoOut(id, company, amount, currency, purchaseDate,textContent,
                project == null ? null : project.getTitle(), category == null ? null : category.getTitle());
    }

    public Receipt() {
    }

    public Receipt(String company, double amount, String currency, LocalDate purchaseDate, String textContent) {
        this.company = company;
        this.amount = amount;
        this.currency = currency;
        this.purchaseDate = purchaseDate;
        this.textContent = textContent;
    }

    public Receipt(ReceiptDtoGpt gptDtoReceipt) {
        this.company = gptDtoReceipt.company();
        this.amount = gptDtoReceipt.amount();
        this.currency = gptDtoReceipt.currency();
        this.purchaseDate = gptDtoReceipt.purchaseDate();
        this.textContent = gptDtoReceipt.textContent();
    }

    public Receipt(ReceiptDtoGpt gptDtoReceipt, User user) {
        this.company = gptDtoReceipt.company();
        this.amount = gptDtoReceipt.amount();
        this.currency = gptDtoReceipt.currency();
        this.purchaseDate = gptDtoReceipt.purchaseDate();
        this.textContent = gptDtoReceipt.textContent();
        this.user = user;
    }
}
