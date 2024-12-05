package edu.linus.api.controller;

import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import edu.linus.api.Auth;
import edu.linus.api.DTO.ProductDTO;
import edu.linus.api.DTO.UserWishListDTO;
import edu.linus.api.entity.UserWishList;
import edu.linus.api.repository.UserWishListRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, allowCredentials = "true", allowPrivateNetwork = "true")
@RestController
@RequestMapping(path = "/wishlist")
public class UserWishListController {

    private final UserWishListRepository wishlistRepository;
    private final Environment env;

    public UserWishListController(UserWishListRepository wishlistRepository, Environment env) {
        this.wishlistRepository = wishlistRepository;
        this.env = env;
    }

    // Get the user ID from the JWT token (extracted from the cookie)
    private Integer getUserIdFromToken(HttpServletRequest request) {
        DecodedJWT validToken = Auth.extractTokenFromCookie(request.getCookies(), env);
        if (validToken != null) {
            return Integer.parseInt(validToken.getSubject());  // userId should be stored in the subject of JWT
        }
        return null;
    }

    // GET endpoint to fetch all products in a user's wishlist by userId
    @GetMapping(path = "/{userId}")
    public ResponseEntity<List<UserWishListDTO>> getUserWishlist(@PathVariable int userId, HttpServletRequest request) {
        // Get the userId from JWT token if it's not passed as a path variable
        Integer authenticatedUserId = getUserIdFromToken(request);


        // If the userId in the path doesn't match the authenticated userId (for security), reject the request
        if (authenticatedUserId == null || authenticatedUserId != userId) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);  // Forbidden if userId doesn't match
        }

        // Fetch the user's wishlist
        List<UserWishList> wishlist = wishlistRepository.findByUsersId(userId);

        if (wishlist.isEmpty()) {
            return ResponseEntity.status(404).body(null);  // No wishlist items found
        }

        // Map the UserWishList entities to UserWishListDTOs
        List<UserWishListDTO> wishlistDTOs = wishlist.stream()
                .map(w -> new UserWishListDTO(
                        w.getId(),
                        ProductDTO.convertToDto(w.getProduct()),  // Convert Product entity to ProductDTO
                        w.getUsers().getUsername()  // Fetch the username of the user
                ))
                .collect(Collectors.toList());

        // Return the wishlist DTOs
        return ResponseEntity.ok(wishlistDTOs);
    }
}
