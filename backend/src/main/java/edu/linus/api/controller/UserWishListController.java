package edu.linus.api.controller;

import edu.linus.api.DTO.ProductDTO;
import edu.linus.api.DTO.UserWishListDTO;
import edu.linus.api.entity.UserWishList;
import edu.linus.api.repository.UserWishListRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, allowCredentials = "true", allowPrivateNetwork = "true")
@RestController
@RequestMapping(path = "/wishlist")
public class UserWishListController {

    private final UserWishListRepository wishlistRepository;

    public UserWishListController(UserWishListRepository wishlistRepository) {
        this.wishlistRepository = wishlistRepository;
    }
    
    @GetMapping(path = "/{userId}")
    public ResponseEntity<List<UserWishListDTO>> getUserWishlist(@PathVariable int userId) {
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
