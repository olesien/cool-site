package edu.linus.api.repository;

import edu.linus.api.entity.UserWishList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserWishListRepository extends JpaRepository<UserWishList, Long> {
    List<UserWishList> findByUsersId(int userId);

    Optional<UserWishList> findByUsersIdAndId(int authenticatedUserIdLong, int id);
}
