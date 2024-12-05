package edu.linus.api.repository;

import edu.linus.api.entity.UserWishList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserWishListRepository extends JpaRepository<UserWishList, Long> {
    List<UserWishList> findByUsersId(int userId);


}
