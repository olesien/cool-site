package edu.linus.api.controller;
import java.util.List;


import com.auth0.jwt.interfaces.DecodedJWT;
import edu.linus.api.Auth;
import edu.linus.api.DTO.ProductDTO;
import edu.linus.api.entity.Product;
import edu.linus.api.entity.ProductImage;
import edu.linus.api.entity.SubCategory;
import edu.linus.api.forms.NewProductForm;
import edu.linus.api.repository.ProductImageRepository;
import edu.linus.api.repository.ProductRepository;
import edu.linus.api.repository.SubCategoryRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, allowCredentials = "true", allowPrivateNetwork = "true")
@RestController // This means that this class is a Controller
@RequestMapping(path="/products") // This means URL's start with /demo (after Application path)
@Transactional
public class ProductController {

    ProductRepository productRepository;
    SubCategoryRepository subCategoryRepository;
    ProductImageRepository productImageRepository;
    private final Environment env;

    ProductController(ProductRepository productRepository, SubCategoryRepository subCategoryRepository, ProductImageRepository productImageRepository, Environment env) {
        this.productRepository = productRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productImageRepository = productImageRepository;
        this.env = env;
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> dtoProducts = products.stream()
                .map(ProductDTO::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoProducts);
    }

    @GetMapping(path = "/topPrice")
    public ResponseEntity<List<ProductDTO>> getTop4ByPrice() {
        List<Product> products = productRepository.findTop4ByOrderByPriceDesc();
        List<ProductDTO> dtoProducts = products.stream()
                .map(ProductDTO::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoProducts);
    }

    @GetMapping(path = "/latest")
    public ResponseEntity<List<ProductDTO>> getTop4ById() {
        List<Product> products = productRepository.findTop4ByOrderByIdDesc();
        List<ProductDTO> dtoProducts = products.stream()
                .map(ProductDTO::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoProducts);
    }

    /*@GetMapping(path= "/{categoryLinkName}/{subCategoryLinkName}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategoryAndSubCategory(
            @PathVariable String categoryLinkName,
            @PathVariable String subCategoryLinkName) {

        Optional<SubCategory> optionalSubCategory = productRepository.findByLinkNames(subCategoryLinkName, categoryLinkName);
            SubCategory subCategory = optionalSubCategory.get();
            List<Product> products = subCategory.getProducts();
            List<ProductDTO> dtoProducts = products.stream()
                    .map(ProductDTO::convertToDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(dtoProducts); 

    }*/

    @GetMapping(path= "/{category}/{subCategory}")
    public ResponseEntity<List<ProductDTO>> getProductsByCategoryAndSubCategoryy(
        @PathVariable String category,
        @PathVariable String subCategory) {
        Optional<SubCategory> optionalSubCategory = productRepository.findByLinkNames(category, subCategory);
            System.out.println(optionalSubCategory.get().getName());
            SubCategory subbCategory = optionalSubCategory.get();
            List<Product> products = subbCategory.getProducts();
            List<ProductDTO> dtoProducts = products.stream()
            .map(ProductDTO::convertToDto)
            .collect(Collectors.toList());
    return ResponseEntity.ok(dtoProducts); 
    }

    @GetMapping(path= "/search/{searchWord}")
    public ResponseEntity<List<ProductDTO>> getProductsBySearchWord(
            @PathVariable String searchWord) {
        List<Product> products= productRepository.findByNameContainingIgnoreCaseOrderByNameAsc(searchWord);

        List<ProductDTO> dtoProducts = products.stream()
                .map(ProductDTO::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoProducts);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ProductDTO> getProductByID(@PathVariable Long id){
        Optional<Product> product = productRepository.findById(id);

        // Check if the product exists, and map it to DTO
        return product
                .map(prod -> ResponseEntity.ok(ProductDTO.convertToDto(prod)))
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping(path = "/add")
    public ResponseEntity<String> addProduct(HttpServletRequest request, @RequestBody NewProductForm productForm){
        DecodedJWT validToken = Auth.extractTokenFromCookie(request.getCookies(), env);
        if (validToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not logged in");
        }
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
