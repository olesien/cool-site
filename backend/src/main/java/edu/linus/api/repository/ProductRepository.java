package edu.linus.api.repository;

import edu.linus.api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findTop5ByOrderByCreatedAtDesc(); // Fetch top 5 latest products
}
