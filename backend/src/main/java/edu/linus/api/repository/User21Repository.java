package edu.linus.api.repository;

import edu.linus.api.models.Users21;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface User21Repository extends CrudRepository<Users21, Integer> {

    Optional<Users21>  findByEmail(String email);
}