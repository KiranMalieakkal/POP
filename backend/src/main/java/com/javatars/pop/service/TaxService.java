package com.javatars.pop.service;

import com.javatars.pop.model.*;
import com.javatars.pop.repository.ProjectRepository;
import com.javatars.pop.repository.TaxCategoryRepository;
import com.javatars.pop.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaxService {

    private final TaxCategoryRepository taxRepo;
    private final UserRepository userRepo;
    private final ProjectRepository projectRepo;

    public TaxService (TaxCategoryRepository taxRepo, UserRepository userRepo, ProjectRepository projectRepo) {
        this.taxRepo = taxRepo;
        this.userRepo = userRepo;
        this.projectRepo = projectRepo;
    }

    public List<TaxCategory> getTaxCategories () {
        return taxRepo.getTaxCategories();
    }

    public List<TaxCategory> getTaxCategories (String email) {
        User user = userRepo.getUser(email);
        List<TaxCategory> filteredTaxCategories = new ArrayList<>();
        var taxCategories =  taxRepo.getTaxCategories();

        for (TaxCategory taxCategory : taxCategories) {
            var projects = taxCategory.getProjectList();
            for (Project project : projects) {
                if(project.getUser().equals(user)) {
                    filteredTaxCategories.add(taxCategory);
                    break;
                }
            }

        }
        return filteredTaxCategories;
    }

    public TaxCategory addProjectToTaxCategory (Long taxCategoryId, String email, Long projectId) {
        User user = userRepo.getUser(email);
        Project project = projectRepo.getProjectByUserIdAndProjectId(projectId, user.getId());
        TaxCategory taxCategory = taxRepo.getTaxById(taxCategoryId);
        project.setTaxCategory(taxCategory);
        projectRepo.saveProject(project);
        taxCategory.addProject(project);
        taxRepo.save(taxCategory);
        return taxCategory;
    }

    public List<Project> getTaxCategoryProjects(Long taxCategoryId, String email) {
        User user = userRepo.getUser(email);
        TaxCategory taxCategory = taxRepo.getTaxById(taxCategoryId);
        List<Project> projects = taxCategory.getProjectList()
                .stream()
                .filter(project -> project.getUser().equals(user))
                .toList();
        return projects;
    }

    
        public TaxCategory getTaxCategoryById(Long id) {
            return taxRepo.getTaxById(id);
        }
    
//-------------------------------
//    public Project getTaxCategoryProject(Long taxCategoryId, String email) {
//        User user = userRepo.getUser(email);
//        TaxCategory taxCategory = taxRepo.getTaxById(taxCategoryId);
//        Project project = taxCategory.getProject
//        return project;
//    }
}
