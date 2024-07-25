package com.javatars.pop.repository;
import com.javatars.pop.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryDbRepository extends JpaRepository<Category,Long> {

    Category findByTitle(String title);
}
