package edu.linus.api.controller;


import edu.linus.api.entity.Users;
import edu.linus.api.repository.UsersRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsersController {

    UsersRepository usersRepository;

    public UsersController(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }


    @GetMapping(path = "/user")
    public ResponseEntity<List<Users>> getuser(){
        List<Users> user = usersRepository.findAll();

        return ResponseEntity.ok(user);
    }
}
