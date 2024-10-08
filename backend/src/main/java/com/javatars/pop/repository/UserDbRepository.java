package com.javatars.pop.repository;

import com.javatars.pop.model.User;
import org.springframework.data.repository.ListCrudRepository;



public interface UserDbRepository extends ListCrudRepository<User, Long> {

    public User getUserByEmail(String email);

    public User getUserById(Long id);

}
