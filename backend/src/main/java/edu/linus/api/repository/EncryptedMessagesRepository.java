package edu.linus.api.repository;

import edu.linus.api.models.EncryptedMessages;
import edu.linus.api.models.Users21;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;
import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface EncryptedMessagesRepository extends CrudRepository<EncryptedMessages, Integer> {

    ArrayList<EncryptedMessages> findAllByUserOrderByIdAsc(Users21 user);

    Optional<EncryptedMessages> findByIdAndUser(int messageId, Users21 validUser);

    @Transactional
    @Modifying
    void deleteAllByUserId(Integer userid);
}