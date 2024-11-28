package edu.linus.api.DTO;

import edu.linus.api.entity.SubCategory;

import java.util.List;

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
}
