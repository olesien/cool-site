package edu.linus.api.DTO;

import edu.linus.api.entity.Product;

import java.util.List;

public class ProductImageDTO {
    private Long id;
    private String url;

    private Product product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
