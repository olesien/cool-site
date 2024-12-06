package edu.linus.api.controller;
import java.util.*;


import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import edu.linus.api.Auth;
import edu.linus.api.DTO.ProductDTO;
import edu.linus.api.DTO.UserWishListDTO;
import edu.linus.api.entity.*;
import edu.linus.api.forms.NewProductForm;
import edu.linus.api.repository.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, allowCredentials = "true", allowPrivateNetwork = "true")
@RestController // This means that this class is a Controller
@RequestMapping(path="/products") // This means URL's start with /demo (after Application path)
@Transactional
public class ProductController {

    ProductRepository productRepository;
    SubCategoryRepository subCategoryRepository;
    ProductImageRepository productImageRepository;
    UsersRepository usersRepository;
    UserWishListRepository userWishListRepository;
    private final Environment env;

    ProductController(ProductRepository productRepository, SubCategoryRepository subCategoryRepository, ProductImageRepository productImageRepository, UsersRepository usersRepository, UserWishListRepository userWishListRepository, Environment env) {
        this.productRepository = productRepository;
        this.subCategoryRepository = subCategoryRepository;
        this.productImageRepository = productImageRepository;
        this.usersRepository = usersRepository;
        this.userWishListRepository = userWishListRepository;
        this.env = env;
    }

    private void createImages(@RequestBody NewProductForm productForm, Product product) {
        List<ProductImage> images = IntStream.range(0, productForm.getImages().size())
                .mapToObj(index -> {
                    ProductImage productImage = new ProductImage();
                    productImage.setProduct(product);
                    productImage.setUrl(productForm.getImages().get(index));
                    productImage.setDisplay_order(index + 1); // index starts from 0, so add 1
                    return productImage;
                })
                .toList();
        productImageRepository.saveAll(images);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productRepository.findAllByOrderByIdDesc();
        List<ProductDTO> dtoProducts = products.stream()
                .map(ProductDTO::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoProducts);
    }

    @GetMapping(path = "/filter")
    public ResponseEntity<List<ProductDTO>> getFilteredProducts(@RequestParam(required = false) Integer maxQuantity) {
        List<Product> products;

        if (maxQuantity != null) {
            products = productRepository.findByQuantityLessThan(maxQuantity);
        } else {
            products = productRepository.findAll();
        }

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
        Claim role = validToken.getClaim("roles");

        if (!Objects.equals(role.asString(), "admin")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You are not admin!");
        }

        if (productForm.getImages().size() > 5){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Too many images!");
        }
        Product product = new Product();
        product.setName(productForm.getName());
        product.setPrice(Double.valueOf(productForm.getPrice()));
        product.setQuantity(Integer.parseInt(productForm.getQuantity()));
        
        Optional<SubCategory> subcat = subCategoryRepository.findById(productForm.getCategoryId());
        if (subcat.isEmpty() ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The category could not be found");
        }
        product.setSubCategory(subcat.get());
        Product productSave = productRepository.save(product);

        //Create images based on the created product

        createImages(productForm, productSave);
        return ResponseEntity.status(HttpStatus.CREATED).body("Successfully added");
    }

    private Integer getUserIdFromToken(HttpServletRequest request) {
        DecodedJWT validToken = Auth.extractTokenFromCookie(request.getCookies(), env);
        if (validToken != null) {
            return Integer.parseInt(validToken.getSubject());  // userId should be stored in the subject of JWT
        }
        return null;
    }

    @PostMapping(path = "/addToWishlist")
    public ResponseEntity<String> addProductToWishList(HttpServletRequest request, @RequestBody Map<String, Long> body){
        DecodedJWT validToken = Auth.extractTokenFromCookie(request.getCookies(), env);

        if (validToken == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No token found. Please log out and back in");
        }
        int userId = Integer.parseInt(validToken.getSubject());

        Long productId = body.get("productId");
        Optional<Product> productOpt = productRepository.findById(productId);
        if (productOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }

        Product product = productOpt.get();

        Long authenticatedUserIdLong = (long) userId;

        Optional<Users> usersOpt = usersRepository.findById(authenticatedUserIdLong);
        if(usersOpt.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Users userForWishList = usersOpt.get();
        UserWishList userWishList = new UserWishList();
        userWishList.setUsers(userForWishList);
        userWishList.setProduct(product);

        userWishListRepository.save(userWishList);
        return ResponseEntity.status(HttpStatus.CREATED).body("This product is now added in Your Wishlist");


    }

    @PutMapping("put/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable Long id, @RequestBody NewProductForm productForm){
        Product product = productRepository.findById(id).orElse(null);

        if (product == null){
            return ResponseEntity.notFound().build();
        }

        if (productForm.getImages().size() > 5){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Too many images!");
        }

        product.setName(productForm.getName());
        product.setPrice(Double.valueOf(productForm.getPrice()));
        product.setQuantity(Integer.parseInt(productForm.getQuantity()));

        Optional<SubCategory> subcat = subCategoryRepository.findById(productForm.getCategoryId());
        if (subcat.isEmpty() ) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("The category could not be found");
        }
        product.setSubCategory(subcat.get());

        productRepository.save(product);

        //Ideally, it checks only for those that have been added or removed, however to keep it easy, all are removed and readded.
        productImageRepository.deleteByProductId(id);

        createImages(productForm, product);
        return ResponseEntity.ok("Successfully updated");
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteProduct (@PathVariable Long id){
        productRepository.deleteById(id);
        productImageRepository.deleteByProductId(id);

        return ResponseEntity.ok().body("Successfully deleted");
    }

    @GetMapping(path = "/my-products/{id}")
    public ResponseEntity<List<ProductDTO>> getProductsByUser(@PathVariable int id) {
        List<Product> productsBy = productRepository.findByUserId(id);
        List<ProductDTO> dtoProducts = productsBy.stream()
                .map(ProductDTO::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtoProducts);
    }
}
