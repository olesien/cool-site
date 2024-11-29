package edu.linus.api.controller;
import java.util.List;


import edu.linus.api.DTO.ProductDTO;
import edu.linus.api.entity.Product;
import edu.linus.api.entity.ProductImage;
import edu.linus.api.entity.SubCategory;
import edu.linus.api.forms.NewProductForm;
import edu.linus.api.repository.ProductImageRepository;
import edu.linus.api.repository.ProductRepository;
import edu.linus.api.repository.SubCategoryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, allowCredentials = "true", allowPrivateNetwork = "true")
@RestController // This means that this class is a Controller
@RequestMapping(path="/products") // This means URL's start with /demo (after Application path)
@Transactional
public class ProductController {

    ProductRepository productRepository;
    SubCategoryRepository subCategoryRepository;
    ProductImageRepository productImageRepository;

    ProductController(ProductRepository productRepository, SubCategoryRepository subCategoryRepository, ProductImageRepository productImageRepository) {
        this.productRepository = productRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productImageRepository = productImageRepository;
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> dtoProducts = products.stream()
                .map(ProductDTO::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoProducts);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<ProductDTO>> getTop4HighestProducts() {
        List<Product> topProducts = productRepository.findTop4ByOrderByPriceDesc();
        List<ProductDTO> dtoProducts = topProducts.stream()
                .map(ProductDTO::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoProducts);
    }


    @GetMapping(path = "/{id}")
    public ResponseEntity<ProductDTO> getProductbyID(@PathVariable Long id){
        Optional<Product> product = productRepository.findById(id);

        // Check if the product exists, and map it to DTO
        return product
                .map(prod -> ResponseEntity.ok(ProductDTO.convertToDto(prod)))
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping(path = "/add")
    public ResponseEntity<String> addProduct(@RequestBody NewProductForm productForm){
        Product product = new Product();
        product.setName(productForm.getName());
        product.setPrice(Double.valueOf(productForm.getPrice()));

        Optional<SubCategory> subcat = subCategoryRepository.findById(productForm.getCategoryId());
        if (subcat.isEmpty() ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The category could not be found");
        }
        product.setSubCategory(subcat.get());
        Product productSave = productRepository.save(product);

        //Create images based on the created product

        List<ProductImage> images = productForm.getImages().stream().map(imgUrl -> {
            ProductImage productImage = new ProductImage();
            productImage.setProduct(productSave);
            productImage.setUrl(imgUrl);
            return productImage;
        }).toList();
        productImageRepository.saveAll(images);
        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully added");
    }

    @PutMapping("put/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody NewProductForm productForm){
        Product product = productRepository.findById(id).orElse(null);

        if (product == null){
            return ResponseEntity.notFound().build();
        }

        product.setName(productForm.getName());
        product.setPrice(Double.valueOf(productForm.getPrice()));

        Optional<SubCategory> subcat = subCategoryRepository.findById(productForm.getCategoryId());
        if (subcat.isEmpty() ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The category could not be found");
        }
        product.setSubCategory(subcat.get());

        productRepository.save(product);

        //Ideally, it checks only for those that have been added or removed, however to keep it easy, all are removed and readded.
        productImageRepository.deleteByProductId(id);

        List<ProductImage> images = productForm.getImages().stream().map(imgUrl -> {
            ProductImage productImage = new ProductImage();
            productImage.setProduct(product);
            productImage.setUrl(imgUrl);
            return productImage;
        }).toList();
        productImageRepository.saveAll(images);
        return ResponseEntity.ok("Successfully updated");
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteProduct (@PathVariable Long id){
        productRepository.deleteById(id);
        productImageRepository.deleteByProductId(id);

        return ResponseEntity.ok().body("Successfully deleted");
    }
    
}
