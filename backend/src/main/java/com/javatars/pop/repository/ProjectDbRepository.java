package com.javatars.pop.repository;
import com.javatars.pop.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectDbRepository extends JpaRepository<Project, Long> {

    Project findByTitle(String title);
}
