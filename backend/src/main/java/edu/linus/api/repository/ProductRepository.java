package edu.linus.api.repository;

import edu.linus.api.entity.Product;
import edu.linus.api.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findTop4ByOrderByPriceDesc();
    List<Product> findTop4ByOrderByPriceAsc();
    List<Product> findTop4ByOrderByIdDesc();
    List<Product> findTop4ByOrderByIdAsc();


    @Query("SELECT sc FROM SubCategory sc JOIN sc.category c WHERE sc.link_name = :subCategoryLinkName AND c.link_name = :categoryLinkName")
    Optional<SubCategory> findByLinkNames(
        @Param("categoryLinkName") String category,
            @Param("subCategoryLinkName") String subCategory
            
    );

    
}
