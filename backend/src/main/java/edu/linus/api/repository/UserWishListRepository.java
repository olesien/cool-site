package edu.linus.api.repository;

import edu.linus.api.entity.UserWishList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserWishListRepository extends JpaRepository<UserWishList, Long> {
}
