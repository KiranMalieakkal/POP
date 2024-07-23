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
    long id;
    String title;

    @OneToMany(mappedBy = "project", cascade = {CascadeType.ALL})
    private List<Receipt> receiptList = new ArrayList<>();
}
