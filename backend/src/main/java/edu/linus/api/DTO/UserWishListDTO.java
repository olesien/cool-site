package edu.linus.api.DTO;

public class UserWishListDTO {
    private Long id;
    private ProductDTO product;
    private String username;

    public UserWishListDTO(Long id, ProductDTO product, String username) {
        this.id = id;
        this.product = product;
        this.username = username;
    }

    // Getter and setter methods for DTO fields
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
