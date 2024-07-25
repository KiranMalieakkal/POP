package com.javatars.pop.repository;

import com.javatars.pop.model.Project;
import org.springframework.stereotype.Repository;


@Repository
public class ProjectRepository {

    private final ProjectDbRepository projectDbRepository;
    public ProjectRepository(ProjectDbRepository projectDbRepository) {
        this.projectDbRepository = projectDbRepository;
    }

    public Project findByTitle(String title) {
        return projectDbRepository.findByTitle(title);
    }
}
