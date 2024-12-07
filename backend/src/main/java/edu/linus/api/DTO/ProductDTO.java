package edu.linus.api.DTO;

import edu.linus.api.entity.Product;
import edu.linus.api.entity.UserWishList;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ProductDTO {
    private Long id;
    private String name;
    private Double price;
    private int quantity;
    private Long addedBy;
    private List<UserWishListDTO> wishlist;
    private SubCategoryDTO sub_category;
    private List<ProductImageDTO> images;

    private static ModelMapper modelMapper = new ModelMapper();

    public static ProductDTO convertToDto(Product post) {
        ProductDTO productDTO = modelMapper.map(post, ProductDTO.class);
        productDTO.setImages(post.getImages().stream().map(img -> {
            ProductImageDTO imgDTO = modelMapper.map(img, ProductImageDTO.class);
            imgDTO.setProduct(null);
            return imgDTO;
        }).collect(Collectors.toList()));
        List<UserWishListDTO> wishlistDTO = new ArrayList<>();

        for(UserWishList userWishList : post.getWishlists()) {
            UserWishListDTO userWishListDTO = new UserWishListDTO(userWishList.getId(), null, "");
            wishlistDTO.add(userWishListDTO);

        }
        productDTO.setWishlist(wishlistDTO);



        SubCategoryDTO subcatDTO = modelMapper.map(post.getSubCategory(), SubCategoryDTO.class);
        subcatDTO.getCategory().setSub_categories(null);
        subcatDTO.setProducts(null);

        productDTO.setSub_category(subcatDTO);
        return productDTO;
    }

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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setAddedBy(Long userId) {
        this.addedBy = userId;
    }

    public Long getAddedBy() {
        return this.addedBy;
    }

    public SubCategoryDTO getSub_category() {
        return sub_category;
    }

    public void setSub_category(SubCategoryDTO sub_category) {
        this.sub_category = sub_category;
    }

    public List<ProductImageDTO> getImages() {
        return images;
    }

    public void setImages(List<ProductImageDTO> images) {
        this.images = images;
    }

    public List<UserWishListDTO> getWishlist() {
        return wishlist;
    }

    public void setWishlist(List<UserWishListDTO> wishlist) {
        this.wishlist = wishlist;
    }
}
