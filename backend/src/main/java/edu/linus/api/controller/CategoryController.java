package edu.linus.api.controller;

import edu.linus.api.entity.Category;
import edu.linus.api.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000/", maxAge = 3600, allowCredentials = "true", allowPrivateNetwork = "true")
@RestController // This means that this class is a Controller
@RequestMapping(path="/categories") // This means URL's start with /demo (after Application path)
public class CategoryController {


    @Autowired
    private CategoryRepository categoryRepository;


    @GetMapping(path = "/all")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Category>> getCategoryById(@PathVariable Long id){
        Optional<Category> categories = categoryRepository.findById(id);

        return ResponseEntity.ok(categories);
    }

    @PostMapping(path = "/add")
    public ResponseEntity<Category> addCategory(@RequestBody Category category){
        Category categorySave = categoryRepository.save(category);

        return ResponseEntity.status(HttpStatus.CREATED).body(categorySave);
    }

    @PostMapping("delete/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id){
        categoryRepository.deleteById(id);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @RequestBody Category putCategory) {
        Category category = categoryRepository.findById(id).orElse(null);

        if (category == null) {
            return ResponseEntity.notFound().build();
        }

        category.setName(putCategory.getName());
        category.setLinkName(putCategory.getLinkName());
        categoryRepository.save(category);
        return ResponseEntity.ok(category);
    }



}
