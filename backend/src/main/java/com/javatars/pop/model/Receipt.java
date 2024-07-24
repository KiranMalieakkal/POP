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

    public ReceiptDtoOut getDto() {
        return new ReceiptDtoOut(id, company, amount, currency, purchaseDate, project.title, category.title);
    }
}
