package com.javatars.pop.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
public class TaxCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String title;
    @Column(columnDefinition = "TEXT")
    String description;

    String form;

    String section;

    String paragraph;

    public TaxCategory() {
    }

    public TaxCategory(long id, String title, String description, String form, String section, String paragraph) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.form = form;
        this.section = section;
        this.paragraph = paragraph;
    }

    @OneToMany(mappedBy = "taxCategory", cascade = {CascadeType.ALL})
    private final List<Project> projectList = new ArrayList<>();

    public TaxCategoryDto toTaxCategoryDto() {
        return new TaxCategoryDto(id, title, description, form, section, paragraph,
                projectList.stream().map(Project::toProjectDto).toList());
    }

    public void addProject(Project project) {
        projectList.add(project);
    }






}


