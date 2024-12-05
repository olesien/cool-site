import React from "react";
import { Button } from "antd";
import { useAppContext } from "@/contexts/useAppContext";
import axios from "axios";
import { base_url } from "@/services/api";
import { toast } from "react-toastify";
import "../ProductDisplay.scss";
import { Product } from "@/pages/admin/products";

// the ./types wouldnt refer correctly for some reason so now making mock of the Product interface for test

interface ProductDisplayProps {
    product: Product;
    refetch: () => void;
}


export function ProductDisplay({ product, refetch }: ProductDisplayProps) {
    const { user } = useAppContext();


    const onAddToWishlist = async (productId: number) => {
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
            //alert("This product is now in Your Wishlist");
            refetch();
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
    }
    const removeFromWishlist = async (productId: number) => {

        try {
            const response = await axios.delete<string>(
                base_url + '/wishlist/remove/' + productId,
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*"
                    },
                    withCredentials: true,
                });
            toast.success(response.data);
            refetch()

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
                toast.error("Something went wrong")
            }
        }
    }
    const wishlist = user && product.wishlist.length > 0 ? product.wishlist[0] : null;

    return <div className="product-display-container">
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
                {!!user && (wishlist ? <Button className="wishlist-button" color="danger" onClick={() => removeFromWishlist(wishlist.id)}>
                    Remove from Wishlist
                </Button> : <Button className="wishlist-button" color="default" onClick={() => onAddToWishlist(product.id)}>
                    Add to Wishlist
                </Button>)}
            </div>
        </div>

    </div>
}
