package edu.linus.api.controller;

import edu.linus.api.entity.Category;
import edu.linus.api.entity.SubCategory;
import edu.linus.api.repository.CategoryRepository;
import edu.linus.api.repository.SubCategoryRepository;
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

    @Autowired
    private SubCategoryRepository subCategoryRepository;


    @GetMapping(path = "/all")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping(path = "/all/sub")
    public ResponseEntity<List<Category>> getAllSubCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Optional<Category>> getCategoryById(@PathVariable Long id){
        Optional<Category> categories = categoryRepository.findById(id);

        return ResponseEntity.ok(categories);
    }

    @PostMapping("sub/{categoryId}")
    public ResponseEntity<SubCategory> addSubcategory(@PathVariable Long categoryId, @RequestBody SubCategory subCategory){
         Category category = categoryRepository.findById(categoryId).orElse(null);

            subCategory.setCategory(category);

            SubCategory savedSub = subCategoryRepository.save(subCategory);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedSub);


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

    @PostMapping("deletesub/{id}")
    public ResponseEntity<Void> deleteSubCategory(@PathVariable Long id){
        subCategoryRepository.deleteById(id);

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

    @PutMapping("putsub/{id}")
    public ResponseEntity<SubCategory>updateSubCategory(@PathVariable Long id, @RequestBody SubCategory putSubCategory){
        SubCategory subCategory = subCategoryRepository.findById(id).orElse(null);

        if (subCategory == null){
            return ResponseEntity.notFound().build();
        }

        subCategory.setName(putSubCategory.getName());
        subCategory.setLinkName(putSubCategory.getLinkName());
        subCategoryRepository.save(subCategory);
        return ResponseEntity.ok(subCategory);
    }

}
