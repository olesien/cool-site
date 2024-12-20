import { Button, Image } from 'antd';
import { useState } from 'react';
import { useAppContext } from "@/contexts/useAppContext";
import axios from "axios";
import { base_url, getProductWishlist } from "@/services/api";
import { toast } from "react-toastify";
import "../ProductDisplay.scss";
import { Product } from "@/pages/admin/products";
import { useQuery } from '@tanstack/react-query';

// the ./types wouldnt refer correctly for some reason so now making mock of the Product interface for test

interface ProductDisplayProps {
    product: Product;
    refetch: () => void;
    productId: number;
}


export function ProductDisplay({ product, refetch, productId }: ProductDisplayProps) {
    const { user } = useAppContext();
    
    const { data: userWishlist, refetch: wishlistRefetch } = useQuery({
        queryKey: ['chosen-wishlist', productId],
        queryFn: () => getProductWishlist(productId),
    });

    //const [mainImage, setMainImage] = useState<string>(product.images[0]?.url || '');

    const [mainImage, setMainImage] = useState<string>(
        product.images[0]?.url || 'https://images.pexels.com/photos/102155/pexels-photo-102155.jpeg?auto=compress&cs=tinysrgb&w=600'
    );

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
            wishlistRefetch();
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
            refetch();
            wishlistRefetch();

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
    const wishlist = userWishlist ? userWishlist : null;

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
                        src={mainImage}
                        alt={product.name}
                        className="main-image-product"
                        preview={mainImage !== 'https://images.pexels.com/photos/102155/pexels-photo-102155.jpeg?auto=compress&cs=tinysrgb&w=600'}
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