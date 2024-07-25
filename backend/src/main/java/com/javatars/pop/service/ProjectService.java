package com.javatars.pop.service;

import com.javatars.pop.model.Project;
import com.javatars.pop.repository.ProjectRepository;
import org.springframework.stereotype.Service;


@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project findByTitle(String title) {
        return projectRepository.findByTitle(title);
    }
}
