package com.javatars.pop.repository;

import com.javatars.pop.model.User;
import org.springframework.stereotype.Repository;


@Repository
public class UserRepository {

    UserDbRepository userRepo;

    public UserRepository(UserDbRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User getReceipts(String email) {
        User user = userRepo.getUserByEmail(email);
        return user;
    }
}
