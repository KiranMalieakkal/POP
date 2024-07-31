package com.javatars.pop.repository;

import com.javatars.pop.model.Project;
import com.javatars.pop.model.User;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class ProjectRepository {

    private final ProjectDbRepository projectDbRepository;
    public ProjectRepository(ProjectDbRepository projectDbRepository) {
        this.projectDbRepository = projectDbRepository;
    }

    public Project findByTitle(String title) {
        return projectDbRepository.findByTitle(title);
    }

    public List<Project> getProjectsByUserId(Long userId) {
        return projectDbRepository.findByUserId(userId);
    }

    public List<Project> getByUserIdAndTaxCategoryNull(Long id) {
        return projectDbRepository.findByUserIdAndTaxCategoryNull(id);
    }

    public Project getProjectByUserIdAndProjectId(Long projectId, Long userId) {
        return projectDbRepository.findByIdAndUserId(projectId, userId);
    }

    public Project getProjectByUserIdAndProjectTitle(String projectTitle, Long userId) {
        return projectDbRepository.findByTitleAndUserId(projectTitle, userId);
    }

    public Project createProject(String title, User user) {
        return projectDbRepository.save(new Project(title, user));
    }

    public void saveProject(Project project) {
        projectDbRepository.save(project);
    }
}
