package edu.linus.api.repository;
import java.util.List;


import edu.linus.api.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.awt.*;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findTop4ByOrderByPriceDesc();
}
