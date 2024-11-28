package edu.linus.api.DTO;

import edu.linus.api.entity.Category;
import edu.linus.api.entity.Product;
import edu.linus.api.entity.SubCategory;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public class CategoryDTO {
    private Long id;
    private String name;

    private String link_name;

    private List<SubCategoryDTO> sub_categories;

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

    public List<SubCategoryDTO> getSub_categories() {
        return sub_categories;
    }

    public void setSub_categories(List<SubCategoryDTO> sub_categories) {
        this.sub_categories = sub_categories;
    }

    private static ModelMapper modelMapper = new ModelMapper();
    public static CategoryDTO convertToDto(Category category) {
        CategoryDTO categoryDTO = modelMapper.map(category, CategoryDTO.class);
        categoryDTO.setSub_categories(category.getSub_categories().stream().map(subcat -> {
            SubCategoryDTO subCategoryDTO = modelMapper.map(subcat, SubCategoryDTO.class);
            subCategoryDTO.setProducts(null);
            subCategoryDTO.setCategory(null);
            return subCategoryDTO;
        }).collect(Collectors.toList()));
        return categoryDTO;
    }
}
