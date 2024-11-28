package edu.linus.api.controller;

import edu.linus.api.entity.Product;
import edu.linus.api.entity.SubCategory;
import edu.linus.api.repository.ProductRepository;
import edu.linus.api.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, allowCredentials = "true", allowPrivateNetwork = "true")
@RestController // This means that this class is a Controller
@RequestMapping(path="/products") // This means URL's start with /demo (after Application path)
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    SubCategoryRepository subCategoryRepository;

    @GetMapping(path = "/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Product>> getProductbyID(@PathVariable Long id){
        Optional<Product> product = productRepository.findById(id);

        return ResponseEntity.ok(product);
    }

    /*
    @PostMapping(path = "/add")
    public ResponseEntity<String> addProduct(@RequestBody Product product){
        Product productSave = productRepository.save(product);

        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully added");
    }
     */

    @PostMapping("add/{subId}")
    public ResponseEntity<String> addProducts (@PathVariable Long subId, @RequestBody Product product){
        SubCategory subCategory = subCategoryRepository.findById(subId).orElse(null);

        product.setSubCategory(subCategory);

        productRepository.save(product);

        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully added");
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteProduct (@PathVariable Long id){
        productRepository.deleteById(id);

        return ResponseEntity.ok().body("Successfully deleted");
    }

    @PutMapping("put/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody Product putProduct){
        Product product = productRepository.findById(id).orElse(null);

        if (product == null){
            return ResponseEntity.notFound().build();
        }

        product.setName(putProduct.getName());
        product.setPrice(putProduct.getPrice());
        productRepository.save(product);
        return ResponseEntity.ok("Successfully updated");
    }
    
}
