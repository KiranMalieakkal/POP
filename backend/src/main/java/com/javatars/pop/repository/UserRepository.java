package com.javatars.pop.repository;

import com.javatars.pop.model.User;
import org.springframework.stereotype.Repository;


@Repository
public class UserRepository {

    UserDbRepository userRepo;

    public UserRepository(UserDbRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User getUser(String email) {
        return userRepo.getUserByEmail(email);
    }

    public User getUser(Long id) {
        return userRepo.getUserById(id);
    }

    public void saveUser(User user) {
        userRepo.save(user);
    }

    public User getReceipts(String email) {
        return userRepo.getUserByEmail(email);
    }
}
