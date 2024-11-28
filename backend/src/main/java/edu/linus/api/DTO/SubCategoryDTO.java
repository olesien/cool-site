package edu.linus.api.DTO;

import edu.linus.api.entity.Category;
import edu.linus.api.entity.Product;
import edu.linus.api.entity.SubCategory;

import java.util.List;

public class SubCategoryDTO {
    private Long id;
    private String name;

    private String link_name;

    private CategoryDTO category;

    private List<ProductDTO> products;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLink_name() {
        return link_name;
    }

    public void setLink_name(String link_name) {
        this.link_name = link_name;
    }

    public CategoryDTO getCategory() {
        return category;
    }

    public void setCategory(CategoryDTO category) {
        this.category = category;
    }

    public List<ProductDTO> getProducts() {
        return products;
    }

    public void setProducts(List<ProductDTO> products) {
        this.products = products;
    }
}
