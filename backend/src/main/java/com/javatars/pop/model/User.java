package com.javatars.pop.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "pop_user")
@Getter @Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    @Column(nullable = false)
    String firstName;
    @Column(nullable = false)
    String lastName;
    @Column(unique = true)
    @Email
    String email;

    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<Receipt> receipts = new ArrayList<>();

}
