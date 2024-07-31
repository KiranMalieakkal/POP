package com.javatars.pop.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String title;

    @OneToMany(mappedBy = "project", cascade = {CascadeType.ALL})
    private final List<Receipt> receiptList = new ArrayList<>();

    @ManyToOne()
    @JoinColumn(name="tax_category_id")
    private TaxCategory taxCategory;

    @ManyToOne()
    @JoinColumn(name="user_id")
    private User user;

    public Project() {
    }

    public Project (String title, User user) {
        this.title = title;
        this.user = user;
    }

    public ProjectDto toProjectDto () {
        return new ProjectDto(id, title, user == null ? null : user.id,
                taxCategory == null ? null : taxCategory.id,
                receiptList.stream().map(Receipt::getDtoOut).toList());
    }

    public void addReceipt (Receipt receipt) {
        receiptList.add(receipt);
    }

    public void deleteReceipt(Receipt receipt) {
        receiptList.remove(receipt);
    }
}
