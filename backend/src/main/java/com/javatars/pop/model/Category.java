package com.javatars.pop.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Entity
@Getter @Setter
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(unique = true)
    private String title;

    @OneToMany(mappedBy = "category", cascade = {CascadeType.ALL})
    private final List<Receipt> receiptList = new ArrayList<>();
}
