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

    public User() {
    }

    public User(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<Receipt> receipts = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = {CascadeType.ALL})
    private List<Project> projects = new ArrayList<>();

    public void addReceipt(Receipt receipt) {
        receipts.add(receipt);
    }

    public void addProject(Project project) {
        projects.add(project);
    }


    public void deleteReceipt(Receipt receipt) {
        receipts.remove(receipt);
    }
}
