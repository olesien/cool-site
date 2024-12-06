import { Button, Image } from 'antd';
import { useState } from 'react';
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

    const [mainImage, setMainImage] = useState<string>(product.images[0]?.url || '');

    // Handle thumbnail click to change main image
    const handleThumbnailClick = (imageUrl: string) => {
        setMainImage(imageUrl);
    };

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

    return (
        <div className="product-display-container">
            <div className="product-display">
                <div className="product-images">
                    <div className="thumbnail-images">
                        {product.images.slice(0).map((image) => (
                            <img
                                key={image.id}
                                src={image.url}
                                alt={image.name}
                                className="thumbnail-image"
                                onClick={() => handleThumbnailClick(image.url)}
                            />
                        ))}
                    </div>
                    <Image
                        width={400}
                        height={400}
                        src={mainImage} alt={product.name}
                        className="main-image-product"
                    />
                </div>
                <div className="product-info">
                    <h1 className="product-title">{product.name}</h1>
                    <p className="product-price">SEK {product.price.toFixed(2)}</p>
                    <p className="product-quantity">
                        Available: {product.quantity}
                    </p>
                    {!!user && <>
                        {
                            (wishlist ? <Button className="wishlist-button" color="danger" onClick={() => removeFromWishlist(wishlist.id)}>
                                Remove from Wishlist
                            </Button> : <Button className="wishlist-button" color="default" onClick={() => onAddToWishlist(product.id)}>
                                Add to Wishlist
                            </Button>)
                        }
                    </>}
                    <Button
                        style={{ marginTop: 10 }}
                        className="buy-button"
                        type="primary"
                        disabled={product.quantity === 0}
                        onClick={() => {
                            if (product.quantity > 0) {
                                toast.success("Product in checkout");
                            }
                        }}
                    >
                        {product.quantity === 0 ? "Out of Stock" : "Buy"}
                    </Button>
                </div>
            </div>
        </div>)
}