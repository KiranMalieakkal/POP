package com.javatars.pop.service;

import com.javatars.pop.model.Project;
import com.javatars.pop.model.Receipt;
import com.javatars.pop.model.User;
import com.javatars.pop.repository.ProjectRepository;
import com.javatars.pop.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Collection;
import java.util.List;


@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project findByTitle(String title) {
        return projectRepository.findByTitle(title);
    }

    public List<Project> getProjects(String email) {
        User user = userRepository.getUser(email);
        return projectRepository.getProjectsByUserId(user.getId());
    }

    public Project getProject(String email, Long projectId) {
        User user = userRepository.getUser(email);
        return projectRepository.getProjectByUserIdAndProjectId(projectId, user.getId());
    }

    public Project createProject(String email, String title) {
        User user = userRepository.getUser(email);
        Project project = projectRepository.createProject(title, user);
        user.addProject(project);
        userRepository.saveUser(user);
        return project;
    }

    public List<Project> getProjectsWithoutTaxCategory(String email) {
        User user = userRepository.getUser(email);
        return projectRepository.getByUserIdAndTaxCategoryNull(user.getId());
    }
}
