package com.javatars.pop.repository;

import com.javatars.pop.model.Receipt;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    UserDbRepository userRepo;

    public UserRepository(UserDbRepository userRepo) {
        this.userRepo = userRepo;
    }

//    public List<Receipt> getReceipts(String email) {
//        userRepo.
//    }
}
