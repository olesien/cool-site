package edu.linus.api.controller;


import edu.linus.api.DTO.UserDTO;
import edu.linus.api.entity.Messages;
import edu.linus.api.entity.Users;
import edu.linus.api.forms.LoginForm;
import edu.linus.api.forms.RegisterForm;
import edu.linus.api.models.ApiResponse;
import edu.linus.api.repository.UsersRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

import static edu.linus.api.Auth.generateJWT;
import static edu.linus.api.Auth.hashPassword;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, allowCredentials = "true", allowPrivateNetwork = "true")
@RestController // This means that this class is a Controller
@RequestMapping(path="/users") // This means URL's start with /demo (after Application path)
public class UsersController {

    UsersRepository usersRepository;
    private final Environment env;

    public UsersController(UsersRepository usersRepository, Environment env) {
        this.usersRepository = usersRepository;
        this.env = env;
    }

    Cookie makeSecureCookie (String jwt) {
        Cookie cookie = new Cookie("auth-jwt", jwt);
        cookie.setHttpOnly(true);
        //cookie.setSecure(false);  // Turned off for HTTP, but in production mode this would be on
        //cookie.setAttribute("SameSite", "None"); //<- Also turned off for HTTP
        cookie.setSecure(true);
        cookie.setAttribute("SameSite", "None");
        cookie.setPath("/");  // Available to the entire app
        cookie.setMaxAge(7*24*60*60);
        return cookie;
    }

    @GetMapping(path="/ping")
    public @ResponseBody ResponseEntity<String> ping (HttpServletResponse response) {
        return ResponseEntity.status(HttpStatus.OK).body("Pong");
    }


    @PostMapping(path="/add") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity<ApiResponse<Object>> register (HttpServletResponse response, @RequestBody RegisterForm registerForm) throws NoSuchAlgorithmException {
        Users n = new Users();
        n.setUsername(registerForm.getUsername());
        n.setUser_role(1);
        n.setPassword(registerForm.getPassword());
        Users savedUser = usersRepository.save(n);
        //String jwt = generateJWT(env, savedUser.getId().toString());

        // Set HttpOnly cookie
        //response.addCookie(makeSecureCookie(jwt));
        System.out.println("Added cookie");
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Success", savedUser));
    }

    @PostMapping(path="/login") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity<ApiResponse<Object>> login (HttpServletResponse response, @RequestBody LoginForm loginForm) throws NoSuchAlgorithmException {
        //String hashedPassword = hashPassword(loginForm.getPassword(), env);
        String hashedPassword = loginForm.getPassword(); //For now, we skip hashing. Uncomment above line and comment this one to enable hashing

        Optional<Users> user = usersRepository.findByUsername(loginForm.getUsername());

        if (user.isPresent()) {
            Users newUser = user.get();
            if (newUser.getPassword().equals(hashedPassword)) {
                //Exists
                Boolean isAdmin = newUser.getUser_role() == 0;
                String jwt = generateJWT(env, newUser.getId().toString(), isAdmin);
                // Set HttpOnly cookie
                System.out.println(jwt);
                response.addCookie(makeSecureCookie(jwt));
                System.out.println("Added cookie");
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse<>("Success", new UserDTO(newUser.getId(), newUser.getUsername(), "", newUser.getUser_role(), isAdmin)));
            } else {
                //403; Passwords do not match
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse<>("Passwords do not match", null));

            }
        }
            //404 not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse<>("No user found with given name and password", null));

    }


    @GetMapping(path = "/all")
    public ResponseEntity<List<Users>> getusers(){
        List<Users> user = usersRepository.findAll();

        return ResponseEntity.ok(user);
    }

//    @PostMapping(path = "/add")
//    public ResponseEntity<ApiResponse<Users>> addUser (@RequestBody Users user){
//        try{
//            Users userSave = usersRepository.save(user);
//            return ResponseEntity.status(HttpStatus.CREATED)
//                    .body(new ApiResponse<>("Success", userSave));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(new ApiResponse<>("Failed to add user", null));
//        }
//    }
}
