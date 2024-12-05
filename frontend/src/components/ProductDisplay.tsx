import React from "react";
import { Button } from "antd";
import { useAppContext } from "@/contexts/useAppContext";
import axios from "axios";
import { base_url } from "@/services/api";
import { toast } from "react-toastify";
import "../ProductDisplay.scss";

// the ./types wouldnt refer correctly for some reason so now making mock of the Product interface for test
interface Product {
  id: number;
  name: string;
  price: number;
  images: { id: number; url: string; name: string }[];
  quantity: number;
}
interface ProductDisplayProps {
  product: Product;
}

export function ProductDisplay({ product }: ProductDisplayProps) {
  const { user } = useAppContext();

  const onAddToWishlist = async (productId: number) => {
    console.log("user id is: " + user?.user_role);
    if (!user) {
      alert("Please continue to log in to put this product into Your WishList");
      return;
    }
    try {
      const response = await axios.post<string>(
        base_url + "/products/addToWishlist",
        { productId },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: true,
        }
      );
      toast.success(response.data);
      alert("This product is now in Your Wishlist");
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        if (err.response?.data) {
          console.log(err.response?.data);
          toast.error(String(err.response?.data));
        } else {
          toast.error(err.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="product-display-container">
      <div className="product-display">
        <div className="product-images">
          <img
            src={product.images[0]?.url || "/placeholder.jpg"}
            alt={product.name}
            className="main-product-image"
          />
          <div className="thumbnail-images">
            {product.images.slice(1).map((image) => (
              <img
                key={image.id}
                src={image.url}
                alt={image.name}
                className="thumbnail-image"
              />
            ))}
          </div>
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-price">SEK {product.price.toFixed(2)}</p>
          <p className="product-quantity">
            Available Quantity: {product.quantity}
          </p>
          <Button
            type="primary"
            className="wishlist-button"
            onClick={() => onAddToWishlist(product.id)}
          >
            Add to Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
}
